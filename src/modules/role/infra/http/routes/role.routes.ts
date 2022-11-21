import { Router } from "express"
import { RoleController } from "../controllers/RoleController"

const roleRouter = Router()
const roleController = new RoleController()

roleRouter.post("/", roleController.create)

export { roleRouter }
