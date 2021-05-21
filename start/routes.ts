import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { Mensagem: 'Sistema de verificação de versões dos sistemas MOR' }
})
Route.post('/atualizaversao', 'VersoesController.store')

Route.get('/versoes', 'VersoesController.index')
