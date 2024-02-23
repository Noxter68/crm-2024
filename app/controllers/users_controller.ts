import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.findBy('id', 1)

    return users
  }
}
