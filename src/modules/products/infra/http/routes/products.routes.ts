import { Router } from "express"
import { ROLE_ADMIN, ROLE_USER } from "../../../../../constants/permissions"
import { is } from "../../../../../middlewares/permission"
import { ProductsController } from "../controllers/ProductsController"

const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.post("/", is([ROLE_ADMIN]), productsController.create)
productsRouter.get("/", is([ROLE_ADMIN, ROLE_USER]), productsController.index)
productsRouter.get("/:id", is([ROLE_ADMIN, ROLE_USER]), productsController.show)

export { productsRouter }
