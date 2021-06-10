import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Backups_clientes from 'App/Models/Backups_clientes'

export default class BkpsController {

  public async store({ request, response }: HttpContextContract) {

    const empresa = request.all()

    try {
      const pesquiaEmpresa = await Backups_clientes.findBy('empresa', empresa)

      if (!pesquiaEmpresa) {

        await Backups_clientes.create(empresa)
        return
      }

      console.log(empresa)
      pesquiaEmpresa.merge(empresa)
      await pesquiaEmpresa.save()

      return
    } catch (error) {
      return response.status(500).send(error)
    }

  }

}