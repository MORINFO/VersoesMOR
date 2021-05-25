/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import Versao from 'App/Models/Versoes'

export default class VersoesController {
  async index({}: HttpContextContract) {
    const versoes = await Versao.all()

    return versoes
  }

  async store({ request, response }: HttpContextContract) {
    try {
      const dados = request.only(['empresa', 'faturamento', 'financeiro', 'compras'])

      let pesquisaEmpresa = await Versao.findBy('empresa', dados.empresa)

      if (pesquisaEmpresa) {
        pesquisaEmpresa.merge(dados)
        await pesquisaEmpresa.save()

        await Mail.sendLater((message) => {
          message
            .from('morinfo@morinfo.com.br')
            .to('suporte@morinfo.com.br')
            .cc('nicolas@morinfo.com.br', 'ronaldo@morinfo.com.br')
            .subject('Aviso de Atualização Sistema MOR')
            .htmlView('emails/welcome', { dados })
        })
        console.log('aki')
        return
      }
      await Versao.create(dados)
      await Mail.sendLater((message) => {
        message
          .from('suporte@morinfo.com.br')
          .to('suporte@morinfo.com.br')
          .cc('nicolas@morinfo.com.br', 'ronaldo@morinfo.com.br')
          .subject('Aviso de Atualização Sistema MOR')
          .htmlView('emails/welcome', { dados })
      })

      console.log('aki 2')
      return
    } catch (error) {
      return response.send(error)
    }
  }

  async show({}: HttpContextContract) {}

  async update({}: HttpContextContract) {}
}
