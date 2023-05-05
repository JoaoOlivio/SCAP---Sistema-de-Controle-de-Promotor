import { Saida } from "../models/Saida.js"

class SaidaService{
    static async findAll() {
        const objs = await Saida.findAll({ include: { all: true, nested: true } });
        return objs;
    }
    
    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Saida.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req){
        const {portaoId, nome, cracha, cpf, horario, data, avaliacaoId, usuarioId} = req.body;
        if(avaliacaoId == null) throw "O Id da avaliação deve ser preenchido";
        if(usuarioId == null) throw "O Id do usuario deve ser preenchido";
        const obj = await Saida.create({portaoId, nome, cracha, cpf, horario, data, avaliacaoId, usuarioId});
        return await Saida.findByPk(obj.id, { include: { all: true, nested: true}})
    }

    static async update(req){
        const {id} = req.params;
        const {portaoId, nome, cracha, cpf, horario, data, avaliacaoId, usuarioId} = req.body;
        if(avaliacaoId == null) throw "O Id da avaliação deve ser preenchido";
        if(usuarioId == null) throw "O Id do usuario deve ser preenchido";
        const obj = await Saida.findByPk(id, {include: {all: true, nested: true}})
        if(obj == null) throw 'Saida não encontrada';
        Object.assign(obj, {portaoId, nome, cracha, cpf, horario, data, avaliacaoId, usuarioId});
        await obj.save();
        return await Saida.findByPk(obj.id, {include: {all: true, nested: true}} );
    }

    static async delete(req){
        const {id} = req.params;
        const obj = await Saida.findByPk(id);
        if (obj == null) throw 'Saida não encontrada!';
        await obj.destroy();
        return obj;
    }
}

export { SaidaService };