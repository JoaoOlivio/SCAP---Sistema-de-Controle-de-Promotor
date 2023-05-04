import { Usuario } from "../models/Usuario.js"

class UsuarioService{
    static async findAll() {
        const objs = await Usuario.findAll({ include: { all: true, nested: true } });
        return objs;
    }
    
    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Usuario.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req){
        const {nome, senha, email, lojaId, perfilId} = req.body;
        if(lojaId == null) throw "O Id da loja deve ser preenchido";
        if(perfilId == null) throw "O Id do perfil deve ser preenchido";
        const obj = await Usuario.create({nome, senha, email, lojaId, perfilId});
        return await Usuario.findByPk(obj.id, { include: { all: true, nested: true}})
    }

    static async update(req){
        const {id} = req.params;
        const {nome, senha, email, lojaId, perfilId} = req.body;
        if(lojaId == null) throw "O Id da loja deve ser preenchido";
        if(perfilId == null) throw "O Id do perfil deve ser preenchido";
        const obj = await Usuario.findByPk(id, {include: {all: true, nested: true}})
        if(obj == null) throw 'Usuário não encontrado';
        Object.assign(obj, {nome, senha, email, lojaId, perfilId});
        await obj.save();
        return await Usuario.findByPk(obj.id, {include: {all: true, nested: true}} );
    }

    static async delete(req){
        const {id} = req.params;
        const obj = await Usuario.findByPk(id);
        if (obj == null) throw 'Usuario não encontrada!';
        try{
            await obj.destroy();
            return obj;
        } catch (error) {
            throw "Não é possivel remover um usuário que registrou entradas e/ou avaliações e/ou saídas de promotores. Para isso você precisa primeiro apagar estes registros"
        }
    }
}

export { UsuarioService };