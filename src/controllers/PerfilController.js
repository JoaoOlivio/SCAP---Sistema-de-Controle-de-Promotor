import { PerfilService } from "../services/PerfilService.js";

class PerfilController {
  
  static async findAll(req, res, next) {
    PerfilService.findAll()
        .then(objs => res.json(objs))
        .catch(next);
  }

  static async findByPk(req, res, next) {
    PerfilService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async create(req, res, next) {
    PerfilService.create(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async update(req, res, next) {
    PerfilService.update(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

  static async delete(req, res, next) {
    PerfilService.delete(req)
        .then(obj => res.json(obj))
        .catch(next);
  }

}

export { PerfilController };