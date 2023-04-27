import { DestaqueService } from "../services/DestaqueService.js";

class DestaqueController {
  
  static async findAll(req, res, next) {
    DestaqueService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    DestaqueService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    DestaqueService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    DestaqueService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    DestaqueService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { DestaqueController };