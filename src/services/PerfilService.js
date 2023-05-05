import { Perfil } from "../models/Perfil.js";

class PerfilService {

  static async findAll() {
    const objs = await Perfil.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Perfil.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { nome, equipe, admin, descricao } = req.body;
    const obj = await Perfil.create({ nome, equipe, admin, descricao  });
    return await Perfil.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const { nome, equipe, admin, descricao  } = req.body;
    const obj = await Perfil.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Perfil não encontrado!';
    Object.assign(obj, { nome, equipe, admin, descricao  });
    return await obj.save();
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Perfil.findByPk(id);
    if (obj == null) throw 'Perfil não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um Perfil que possui Usuários Relacionado!";
    }
  }

}

export { PerfilService };