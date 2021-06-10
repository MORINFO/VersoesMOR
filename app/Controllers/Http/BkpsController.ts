import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Backups_clientes from 'App/Models/Backups_clientes'

export default class BkpsController {

  public async store ({ request }: HttpContextContract) {

    const empresa = request.only(['empresa'])

    const pesquiaEmpresa = await Backups_clientes.findBy('empresa', empresa)

    if(pesquiaEmpresa){

      await Backups_clientes.create(empresa)
    }

    pesquiaEmpresa?.merge(empresa)
    await pesquiaEmpresa?.save()

    return
  }

}