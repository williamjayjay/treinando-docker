import { Router, Request, Response } from "express"
import { ROLE_ADMIN, ROLE_USER } from "../../../../constants/permissions"
import { is } from "../../../../middlewares/permission"
import { permissionRouter } from "../../../../modules/permission/infra/http/routes/permission.routes"
import { productsRouter } from "../../../../modules/products/infra/http/routes/products.routes"
import { roleRouter } from "../../../../modules/role/infra/http/routes/role.routes"
import { sessionRouter } from "../../../../modules/session/infra/http/routes/session.routes"
import { usersRouter } from "../../../../modules/users/infra/http/routes/user.routes"
// import UserController from "./modules/user/infra/http/controllers/UserController"
// import SessionController from "./controllers/SessionController";
// import PermissionController from "./controllers/PermissionController";
// import RoleController from "./controllers/RoleController";
// import ProductController from "./controllers/ProductController";

// import { is } from "./middlewares/permission"

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.json({
    data: {
      code: 200,
      status: 'OK',
      Message:
        'Ola você está tentando acessar uma api Privada, por favor realize o login para acessar as funcionalidades!',
      url: 'https://api.treinando.docker.com.br/'
    }
  })
})

routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
routes.use('/permission', permissionRouter)
routes.use('/role', roleRouter)
routes.use('/products', productsRouter)
// router.post("/sessions", SessionController.create)
// router.post("/permissions", PermissionController.create)
// router.post("/roles", RoleController.create)

// router.post("/products", is(["ROLE_ADMIN"]), ProductController.create)
// router.get(
//   "/products",
//   is(["ROLE_ADMIN", "ROLE_USER"]),
//   ProductController.index
// )
// router.get(
//   "/products/:id",
//   is(["ROLE_ADMIN", "ROLE_USER"]),
//   ProductController.show
// )

export { routes }
