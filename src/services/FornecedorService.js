import { Fornecedor } from "../models/Fornecedor.js";

class FornecedorService {

  static async findAll() {
    const objs = await Fornecedor.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Fornecedor.findByPk(id, { include: { all: true, nested: true }});
    return obj;
  }

  static async create(req) {
    const { nomeFantasia, razaoSocial, cnpj, email, telefone } = req.body;
    const obj = await Fornecedor.create({nomeFantasia, razaoSocial, cnpj, email, telefone });
    return await Fornecedor.findByPk(obj.id, { include: { all: true, nested: true }});
  }

  static async update(req) {
    const { id } = req.params;
    const {nomeFantasia, razaoSocial, cnpj, email, telefone } = req.body;
    const obj = await Fornecedor.findByPk(id, { include: { all: true, nested: true }});
    if (obj == null) throw 'Fornecedor não encontrado!';
    Object.assign(obj, {nomeFantasia, razaoSocial, cnpj, email, telefone });
    await obj.save();
    return await Fornecedor.findByPk(id, { include: { all: true, nested: true }});
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Fornecedor.findByPk(id, { include: { all: true, nested: true }});
    if (obj == null) throw 'Fornecedor não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um Fornecedor associado a um produto e promotor!";
    }
  }

}

export { FornecedorService };