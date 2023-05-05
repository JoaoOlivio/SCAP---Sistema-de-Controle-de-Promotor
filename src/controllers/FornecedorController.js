import { FornecedorService } from "../services/FornecedorService.js";

class FornecedorController {
  
  static async findAll(req, res, next) {
    FornecedorService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    FornecedorService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    FornecedorService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    FornecedorService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    FornecedorService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { FornecedorController };