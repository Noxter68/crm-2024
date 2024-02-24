import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ auth }: HttpContext) {
    if (auth.isAuthenticated) {
      return User.findBy('id', 1)
    }
  }

  async checkUser({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return response.abort('Invalid credentials.')
    }

    const token = await User.accessTokens.create(user)

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }
}
