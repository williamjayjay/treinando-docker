import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../../typeorm/repositories/UsersRepository"
import { hash } from "bcryptjs"
import RoleRepository from "../../../../role/infra/typeorm/repositories/RoleRepository"
// import RoleRepository from "../repositories/RoleRepository"

class UsersController {
  async create (request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository)
    const roleRepository = getCustomRepository(RoleRepository)

    const { name, username, password, role } = request.body

    const existUser = await usersRepository.findOne({ username })

    if (existUser) {
      return response.status(400).json({ message: "User already exists!" })
    }

    const passwordHashed = await hash(password, 8)

    if (role.length === 0) {
      return response.status(400).json({ err: 'Role not passed!' })
    }

    const existsRole = await roleRepository.findByIds(role)
    // console.log(existsRoles)

    const user = usersRepository.create({
      name,
      username,
      password: passwordHashed,
      role: existsRole
    })

    await usersRepository.save(user)

    delete user.password
    console.log(user)

    return response.status(201).json(user)
  }
}

export { UsersController }
