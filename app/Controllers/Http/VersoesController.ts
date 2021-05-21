/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Versao from 'App/Models/Versoes'

export default class VersoesController {
  async index({}: HttpContextContract) {
    const versoes = await Versao.all()

    console.log(versoes)

    return versoes
  }

  async store({ request }: HttpContextContract) {
    try {
      const dados = request.only([
        'empresa',
        'versaofaturamento',
        'versaofinanceiro',
        'versaocompras',
      ])

      let pesquisaEmpresa = await Versao.findBy('empresa', dados.empresa)

      if (pesquisaEmpresa) {
        pesquisaEmpresa.merge(dados)
        await pesquisaEmpresa.save()
        return
      }
      await Versao.create(dados)

      return
    } catch (error) {
      return error
    }
  }

  async show({}: HttpContextContract) {}

  async update({}: HttpContextContract) {}
}
