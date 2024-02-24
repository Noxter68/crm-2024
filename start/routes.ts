const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from './kernel.js'
import { HttpContext } from '@adonisjs/core/http'

router.get('/', [UsersController, 'index'])
router.post('/auth', [UsersController, 'checkUser'])

router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)

  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})

// show all the tokens
router
  .get('/tokens', async ({ auth, request }: HttpContext) => {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    if (auth.isAuthenticated) {
      console.log(user)
      return User.accessTokens.all(auth.user!)
    }
  })
  .use(
    middleware.auth({
      guards: ['api'],
    }),
  )
