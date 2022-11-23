import { Request, Response, NextFunction } from "express"
import { decode, JwtPayload } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { Users } from "../modules/users/infra/typeorm/entities/Users"
import { UsersRepository } from "../modules/users/infra/typeorm/repositories/UsersRepository"

async function decoder (request: Request): Promise<Users | undefined > {
  const authHeader = request.headers.authorization || ""

  console.log(request.headers.authorization)
  console.log('request.headers.authorization ')

  if (!authHeader || authHeader === "Bearer" + "") {
    return null
  }

  const usersRepository = getCustomRepository(UsersRepository)

  const [, token] = authHeader?.split(" ")

  const payload: any = decode(token)

  const user = await usersRepository.findOne(payload?.sub, {
    relations: ["role"]
  })

  return user
}

function is (role: String[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = await decoder(request)

    if (!user) {
      return response.status(401).json({ message: "Missing header token auth!" })
    }

    const userRole = user?.role.map((roleUser) => roleUser.name)

    const existsRole =
  role.length === userRole.length &&
  role.every(function (element: string) {
    return userRole.includes(element)
  })

    console.log('-------|||||||||||||||||||||||---------')

    console.log(role)
    console.log(userRole)
    console.log('-------|||||||||||||||||||||||---------')

    // const existsRole = userRole.includes()
    // const existsRole = userRole?.some((r) => role.includes(r))

    if (existsRole) {
      return next()
    }

    return response.status(401).json({ message: "Not authorized!" })
  }

  return roleAuthorized
}

export { is }
