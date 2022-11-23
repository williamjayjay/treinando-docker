import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import ProductsRepository from "../../typeorm/repositories/ProductsRepository"

class ProductsController {
  async create (request: Request, response: Response) {
    const productsRepository = getCustomRepository(ProductsRepository)

    const { name, description } = request.body

    const existsProduct = await productsRepository.findOne({ name })

    if (existsProduct) {
      return response.status(400).json({ err: "Product already exists!" })
    }

    const product = productsRepository.create({
      name,
      description
    })

    await productsRepository.save(product)

    return response.json(product)
  }

  async index (request: Request, response: Response) {
    const productsRepository = getCustomRepository(ProductsRepository)

    const products = await productsRepository.find()

    return response.json(products)
  }

  async show (request: Request, response: Response) {
    const productsRepository = getCustomRepository(ProductsRepository)

    const { id } = request.params

    const product = await productsRepository.findOne(id)

    return response.json(product)
  }
}

export { ProductsController }
