import { PromotorService } from "../services/PromotorService.js";

class PromotorController {
  
  static async findAll(req, res, next) {
    PromotorService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    PromotorService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    PromotorService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    PromotorService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    PromotorService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { PromotorController };