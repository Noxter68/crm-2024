const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import User from '#models/user'

router.get('/', [UsersController, 'index'])
router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})
