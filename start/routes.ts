import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { Mensagem: 'Sistema de verificação de versões dos sistemas MOR' }
})

// Rotas para Versoes
Route.get('/atualizaversao', 'VersoesController.store')

Route.get('/versoes', 'VersoesController.index')

//Rotas para controle de Bkps
Route.get('/bkp', 'BkpsController.store')
