import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import PermissionRepository from "../../../../permission/infra/typeorm/repositories/PermissionRepository"
import RoleRepository from "../../typeorm/repositories/RoleRepository"

class RoleController {
  async create (request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository)
    const permissionRepository = getCustomRepository(PermissionRepository)

    const { name, description, permission } = request.body

    const existRole = await roleRepository.findOne({ name })

    if (existRole) {
      return response.status(400).json({ err: 'Role already exists!' })
    }

    if (permission.length === 0) {
      return response.status(400).json({ err: 'Permissions not passed!' })
    }

    const existsPermissions = await permissionRepository.findByIds(permission)

    const role = roleRepository.create({
      name,
      description,
      permission: existsPermissions
    })

    await roleRepository.save(role)

    return response.json(role)
  }
}

export { RoleController }
