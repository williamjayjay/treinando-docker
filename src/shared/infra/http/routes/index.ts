import { Router } from "express"
import { sessionRouter } from "../../../../modules/session/infra/http/routes/session.routes"
import { usersRouter } from "../../../../modules/users/infra/http/routes/user.routes"
// import UserController from "./modules/user/infra/http/controllers/UserController"
// import SessionController from "./controllers/SessionController";
// import PermissionController from "./controllers/PermissionController";
// import RoleController from "./controllers/RoleController";
// import ProductController from "./controllers/ProductController";

// import { is } from "./middlewares/permission"

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
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
