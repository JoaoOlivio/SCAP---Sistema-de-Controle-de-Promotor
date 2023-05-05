import { ProdutoService } from "../services/ProdutoService.js";

class ProdutoController {
  
  static async findAll(req, res, next) {
    ProdutoService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    ProdutoService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async findByFornecedor(req, res, next) {
    ProdutoService.findByFornecedor(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    ProdutoService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    ProdutoService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    ProdutoService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { ProdutoController };