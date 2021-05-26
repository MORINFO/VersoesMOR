/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
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
            .from(Env.get('EMAIL_FROM'))
            .to(Env.get('EMAIL_TO'))
            .cc(Env.get('EMAIL_CC'))
            .subject('Aviso de Atualização Sistema MOR')
            .htmlView('emails/welcome', { dados })
        })
        return
      }
      await Versao.create(dados)
      await Mail.sendLater((message) => {
        message
          .from(Env.get('EMAIL_FROM'))
          .to(Env.get('EMAIL_TO'))
          .cc(Env.get('EMAIL_CC'))
          .subject('Aviso de Atualização Sistema MOR')
          .htmlView('emails/welcome', { dados })
      })
      return
    } catch (error) {
      return response.send(error)
    }
  }

  async show({}: HttpContextContract) {}

  async update({}: HttpContextContract) {}
}
