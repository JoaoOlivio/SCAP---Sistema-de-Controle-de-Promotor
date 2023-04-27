import { Destaque } from "../models/Destaque.js";

class DestaqueService {

  static async findAll() {
    const objs = await Destaque.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Destaque.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const {  nome } = req.body;
    const obj = await Destaque.create({  nome });
    return await Destaque.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const {  nome } = req.body;
    const obj = await Destaque.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Destaque não encontrado!';
    Object.assign(obj, {  nome });
    return await obj.save();
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Destaque.findByPk(id);
    if (obj == null) throw 'Destaque não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover uma Destaque que possui avaliações!";
    }
  }

}

export { DestaqueService };