//DIOGO
import { Loja } from "../models/Loja.js"
import { LojaService } from "../services/LojaService.js"

class LojaController {

    static async findAll(req, res, next){
        LojaService.findAll()
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next){
        LojaService.findByPk(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next){
        LojaService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async update(req, res, next){
        LojaService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
    
    static async delete(req, res, next){
        LojaService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}

export { LojaController };
///DIOGO