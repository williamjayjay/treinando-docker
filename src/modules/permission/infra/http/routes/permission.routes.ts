import { Router } from "express"
import { PermissionController } from "../controllers/PermissionController"

const permissionRouter = Router()
const permissionController = new PermissionController()

permissionRouter.post("/", permissionController.create)

export { permissionRouter }
