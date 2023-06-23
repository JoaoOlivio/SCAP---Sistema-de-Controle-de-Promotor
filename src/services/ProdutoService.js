import { Produto } from "../models/Produto.js";

class ProdutoService {

  static async findAll() {
    const objs = await Produto.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Produto.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async findByFornecedor(req) {
    const { id } = req.params;
    const objs = await Produto.findAll({ where: { fornecedorId: id }, include: { all: true, nested: true } });
    return objs;
  }

  static async create(req) {
    const { descricao, precoCusto, precoVenda, fornecedor } = req.body;
    if (fornecedor == null) throw 'O fornecedor de Produto deve ser preenchido!';
    const obj = await Produto.create({ descricao, precoCusto, precoVenda, fornecedorId: fornecedor });
    return await Produto.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const { descricao, precoCusto, precoVenda, fornecedor } = req.body;
    if (fornecedor == null) throw 'O fornecedor de Produto deve ser preenchido!';
    const obj = await Produto.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Produto não encontrado!';
    Object.assign(obj, { descricao, precoCusto, precoVenda, fornecedorId: fornecedor.id });
    await obj.save();
    return await Produto.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Produto.findByPk(id);
    if (obj == null)
      throw 'Produto não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um Produto com Fornecedores!";
    }
  }

}

export { ProdutoService };