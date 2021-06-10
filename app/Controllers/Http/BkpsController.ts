import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Backups_clientes from 'App/Models/Backups_clientes'

export default class BkpsController {

  public async store({ request, response }: HttpContextContract) {

    try {
      const dados = request.all()

      let pesquiaEmpresa = await Backups_clientes.findBy('empresa', dados.empresa)

      if (pesquiaEmpresa) {

        pesquiaEmpresa.merge(dados)
        await pesquiaEmpresa.save()

        return response.send({Mensagem: "Serviço de BKP MOR"})
      }

      await Backups_clientes.create(dados)

      return response.send({Mensagem: "Serviço de BKP MOR"})

    } catch (error) {
      return response.status(500).send(error)
    }

  }

}