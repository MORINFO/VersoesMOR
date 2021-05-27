import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import Versao from 'App/Models/Versoes'
import Database from '@ioc:Adonis/Lucid/Database'


export default class VersoesController {
  async index({ }: HttpContextContract) {
    const versoes = await Versao.all()

    return versoes
  }

  async store({ response, request }: HttpContextContract) {

    try {
      const dados = request.only(['empresa', 'faturamento', 'financeiro', 'compras'])

      let pesquisaEmpresa = await Versao.findBy('empresa', dados.empresa)

      let consulta =
      {
        empresa: dados.empresa,
        sistema: dados.faturamento && 'faturamento' || dados.financeiro && 'financeiro' || dados.compras && 'compras',
        versao: dados.faturamento && dados.faturamento || dados.financeiro && dados.financeiro || dados.compras && dados.compras
      }


      if (pesquisaEmpresa) {
        pesquisaEmpresa.merge(dados)

        await pesquisaEmpresa.save()

      } else {
        await Versao.create(dados)

      }

      let desatualizado = await Database
        .from('versoes')
        .select('empresa', `${consulta.sistema} AS versao`)
        .where(consulta.sistema, '<', consulta.versao)
        .andWhere(consulta.sistema, '>', 0)

      if (desatualizado) {
        await Mail.sendLater((message) => {
          message
            .from('morinfo@morinfo.com.br')
            .to('suporte@morinfo.com.br')
            .cc('nicolas@morinfo.com.br', 'ronaldo@morinfo.com.br')
            .subject('Aviso de Empresas desatualizadas')
            .htmlView('emails/email', { desatualizado, sistema: consulta.sistema })
        })

      }

    } catch (error) {
      return response.send(error)
    }
  }

  async show({ }: HttpContextContract) { }

  async update({ }: HttpContextContract) { }
}
