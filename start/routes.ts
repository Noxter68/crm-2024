const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from './kernel.js'

router.get('/', [UsersController, 'index']).use([middleware.auth()])

router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)

  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})
