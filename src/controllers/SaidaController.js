//DIOGO
import { SaidaService } from "../services/SaidaService.js"

class SaidaController {

    static async findAll(req, res, next){
        SaidaService.findAll()
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async findByPk(req, res, next){
        SaidaService.findByPk(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async create(req, res, next){
        SaidaService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async update(req, res, next){
        SaidaService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
    
    static async delete(req, res, next){
        SaidaService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async saidaAutomatizada(req, res, next){
        SaidaService.saidaAutomatizada(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}

export { SaidaController };
///DIOGO