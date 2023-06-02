import { Avaliacao } from "../models/Avaliacao.js";
import { PromotorService } from "../services/PromotorService.js";

import sequelize from '../config/database-connection.js';
import { QueryTypes } from "sequelize";
import { PromotorFornecedor } from "../models/PromotorFornecedor.js";
import { Entrada } from "../models/Entrada.js";

class AvaliacaoService {

  static async findAll() {
    const objs = await Avaliacao.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Avaliacao.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { cracha, servicoConcluido, nota, observacao, usuarioId, destaqueId, entradaId  } = req.body;
  
    let obj = await Avaliacao.create({ cracha, servicoConcluido, nota, observacao, usuarioId, destaqueId, entradaId });
    obj = await this.verificarRegrasDeNegocio(req, obj);

    return obj
  }


  static async update(req){
    const {id} = req.params;

    const obj = await Avaliacao.findByPk(id, {include: {all: true, nested: true}})
    if(obj == null) throw 'Avaliação não encontrada';
    Object.assign(obj, {cracha, servicoConcluido, nota, observacao, usuarioId, destaqueId});
    await obj.save();
    return await Avaliacao.findByPk(obj.id, {include: {all: true, nested: true}} );
}

    static async delete(req) {
      const { id } = req.params;
      const obj = await Avaliacao.findByPk(id);
      if (obj == null) throw 'Avaliação não encontrada!';
      try {
        await obj.destroy();
        return obj;
      } catch (error) {
        throw "Não é possível remover uma Avaliação pois está relacionado a uma entrada!";
      }
    }


  static async verificarMediaAvaliacoes(req) {
    let entrada = await Entrada.findByPk(req.body.entradaId)
    let promotor_fornecedor = await PromotorFornecedor.findByPk(entrada.id)
    const objs = await sequelize.query(`SELECT AVG(a.nota) AS media_avaliacoes
  FROM avaliacoes a
INNER JOIN entradas e on a.entrada_id = e.id
INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
WHERE pf.promotor_id = ${promotor_fornecedor.promotorId}
ORDER BY a.created_at DESC
LIMIT 3`, { type: QueryTypes.SELECT });
    return objs[0]['media_avaliacoes'];
  }

  // Implementando as regras de negócio relacionadas ao processo de negócio Empréstimo
  // Regra de Negócio 1: Se o promotor tiver os 3 últimos serviços sem ser finalizado, o sistema exibe um alerta desse promotor.
  // Regra de Negócio 2: Não podem ser emprestadas fitas reservadas para outros clientes
  static async verificarRegrasDeNegocio(req, obj) {
    let result = JSON.parse(JSON.stringify(obj));
    
    // Regra de Negócio 1: Se o promotor tiver os 3 últimos serviços sem ser finalizado, o sistema exibe um alerta desse promotor.
    const servicoNaoConcluido = await PromotorService.verificarUltimosServicosNaoConcluido(req);
    if (servicoNaoConcluido === 3) {
      result['msg1'] = "Esse promotor possui os últimos 3 serviços não concluídos.";
    }

    // Regra de Negócio 2: Se a média das últimas 3 avaliações for menor que 6, será emitido um alerta desse promotor.
    const mediaAvaliacoes = await this.verificarMediaAvaliacoes(req);
    let notaAprovacao = ((5 * 60) / 100);
    if (mediaAvaliacoes < notaAprovacao) {
      result['msg2'] = "A média das últimas 3 avaliações do promotor não atingiu o valor de 60%!";
    }


    return result
  }

  //Joao
  static async mediaAvaliacaoPorPeriodo(req) {
    const { inicio, termino } = req.params;
    const objs = await sequelize.query(`
    SELECT p.nome,
       AVG(a.nota) AS media_avaliacoes
  FROM avaliacoes a
INNER JOIN entradas e on a.entrada_id = e.id
INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
INNER JOIN promotores p on pf.promotor_id = p.id
WHERE a.created_at BETWEEN  :inicio AND :termino
GROUP BY p.nome
    `, { replacements: { inicio: inicio, termino: termino }, type: QueryTypes.SELECT });
    return objs;
  }

  //Joao
  static async ranqueDeDestaque(req) {
    const { id } = req.params;
    const objs = await sequelize.query(`SELECT d.nome as destaques,
    COUNT(d.id) as quantidade
FROM avaliacoes a
INNER JOIN entradas e on a.entrada_id = e.id
INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
INNER JOIN destaques d on a.destaque_id = d.id
WHERE pf.promotor_id = :id
GROUP BY d.nome
ORDER BY COUNT(d.id) DESC
    `, { replacements: { id: id, }, type: QueryTypes.SELECT });
    return objs;
  }

}

export { AvaliacaoService };