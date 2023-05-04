import { Loja }from "../models/Loja.js";

class LojaService {

    static async findAll(){
        const objs = await Loja.findAll({ include: { all: true, nested: true}});
        return objs;
    }
    static async findByPk(req){
        const {id} = req.params; 
        const obj = await Loja.findByPk(id, {include: {all: true, nested: true}});
        return obj;
    }

    static async create(req){
        const {nome, cnpj, endereco, descricao} = req.body;
        const obj = await Loja.create({nome, cnpj, endereco, descricao});
        return await Loja.findByPk(obj.id, { include: { all: true, nested: true}})
    }

    static async update(req){
        const {id} = req.params;
        const {nome, cnpj, endereco, descricao} = req.body;
        const obj = await Loja.findByPk(id, {include: {all: true, nested: true}})
        if(obj == null) throw 'Loja não encontrada';
        Object.assign(obj, {nome, cnpj, endereco, descricao});
        await obj.save();
        return await Loja.findByPk(obj.id, {include: {all: true, nested: true}} );
    }

    static async delete(req){
        const {id} = req.params;
        const obj = await Loja.findByPk(id);
        if (obj == null) throw 'Loja não encontrada!';
        try{
            await obj.destroy();
            return obj;
        } catch (error) {
            throw "Não é possivel remover uma loja que possui portao e/ou usuarios vinculados"
        }
    }
}

export {LojaService};