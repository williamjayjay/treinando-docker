import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UsersRepository } from '../../../../users/infra/typeorm/repositories/UsersRepository'

class SessionController {
  async create (request: Request, response: Response) {
    const { username, password } = request.body

    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findOne({ username })

    if (!user) {
      return response.status(400).json({ error: 'User not found!' })
    }

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) {
      return response.status(400).json({ error: 'Incorrect password or username' })
    }

    const token = sign({}, process.env.JWT_SECRET_TOKEN, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRESIN
    })

    return response.json({
      token,
      user
    })
  }
}

export { SessionController }
