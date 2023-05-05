import { Promotor } from "../models/Promotor.js";
import { Fornecedor } from "../models/Fornecedor.js";

import sequelize from '../config/database-connection.js';

class PromotorService {

  static async findAll() {
    const objs = await Promotor.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Promotor.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { nome, email, telefone, cpf, sexo, nascimento, fornecedores, razaoSocial } = req.body;
    const t = await sequelize.transaction();
    const obj = await Promotor.create({ nome, email, telefone, cpf, sexo, nascimento,razaoSocial }, { transaction: t });
    try {
      await Promise.all(fornecedores.map(fornecedor => obj.addFornecedores(Fornecedor.build(fornecedor), { transaction: t })));
      await t.commit();
      return await Promotor.findByPk(obj.id, { include: { all: true, nested: true } });
    } catch (error) {
      await t.rollback();
      throw "Um dos fornecedores informados não foi encontrado!";
    }
  }

  static async update(req) {
    const { id } = req.params;
    const { nome, email, telefone, cpf, sexo, nascimento, fornecedores, razaoSocial } = req.body;
    const obj = await Promotor.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Promotor não encontrado!';
    const t = await sequelize.transaction();
    Object.assign(obj, { nome, email, telefone, cpf, sexo, nascimento, razaoSocial });    
    
    await obj.save({ transaction: t }); // Salvando os dados simples do objeto Promotor
    try {      
      await sequelize.models.promotor_fornecedor.destroy({ where: { promotorId: obj.id }, transaction: t }); // Removendo os Fornecedores antigos
      await Promise.all(fornecedores.map(fornecedor => obj.addFornecedores(Fornecedor.build(fornecedor), { transaction: t })));
      await t.commit();
      return await Promotor.findByPk(obj.id, { include: { all: true, nested: true } });
    } catch (error) {
      await t.rollback();
      throw "Um dos Fornecedores informados não foi encontrado!";
    }
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Promotor.findByPk(id);
    if (obj == null) throw 'Promotor não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um Promotor que possui Fornecedores!";
    }
  }

}

export { PromotorService };