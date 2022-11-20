import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../../typeorm/repositories/UsersRepository"
import { hash } from "bcryptjs"
// import RoleRepository from "../repositories/RoleRepository"

class UsersController {
  async create (request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository)
    // const roleRepository = getCustomRepository(RoleRepository)

    const { name, username, password, roles } = request.body

    const existUser = await usersRepository.findOne({ username })

    if (existUser) {
      return response.status(400).json({ message: "User already exists!" })
    }

    const passwordHashed = await hash(password, 8)

    // const existsRoles = await roleRepository.findByIds(roles)
    // console.log(existsRoles)

    const user = usersRepository.create({
      name,
      username,
      password: passwordHashed
      // roles: existsRoles
    })

    await usersRepository.save(user)

    delete user.password
    console.log(user)

    return response.status(201).json(user)
  }
}

export { UsersController }
