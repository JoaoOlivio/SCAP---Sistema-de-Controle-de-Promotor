import { Avaliacao } from "../models/Avaliacao.js";
import { PromotorService } from "../services/PromotorService.js";

import sequelize from '../config/database-connection.js';
import { QueryTypes } from 'sequelize';

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
    const { cracha, servicoConcluido, nota, observacao } = req.body;

    let obj = await Avaliacao.create({ cracha, servicoConcluido, nota, observacao, usuarioId: usuario.id, destaqueId: destaque.id, entradaId: entrada.id });
    obj = Avaliacao.findByPk(obj.id, { include: { all: true, nested: true } });

    this.verificarRegrasDeNegocio(req, obj)
  }

  //   static async update(req) {
  //     const { id } = req.params;
  //     const { data, valor, cliente, itens } = req.body;
  //     const obj = await Avaliacao.findByPk(id, { include: { all: true, nested: true } });
  //     if (obj == null) throw 'Empréstimo não encontrado!';
  //     const t = await sequelize.transaction();
  //     Object.assign(obj, { data, valor, clienteId: cliente.id });
  //     await obj.save({ transaction: t }); // Salvando os dados simples do objeto empréstimo
  //     try {
  //       await Promise.all((await obj.itens).map(item => item.destroy({ transaction: t }))); // destruindo todos itens deste empréstimo
  //       await Promise.all(itens.map(item => obj.createItem({ valor: item.valor, entrega: item.entrega, AvaliacaoId: obj.id, fitaId: item.fita.id }, { transaction: t })));
  //       await t.commit();
  //       return await Avaliacao.findByPk(obj.id, { include: { all: true, nested: true } });
  //     } catch (error) {
  //       await t.rollback();
  //       throw "Pelo menos uma das fitas informadas não foi encontrada!";
  //     }
  //   }

  //   static async delete(req) {
  //     const { id } = req.params;
  //     const obj = await Avaliacao.findByPk(id);
  //     if (obj == null) throw 'Empréstimo não encontrado!';
  //     try {
  //       await obj.destroy();
  //       return obj;
  //     } catch (error) {
  //       throw "Não é possível remover um empréstimo que possui devoluções ou multas!";
  //     }
  //   }


  static async verificarMediaAvaliacoes(req) {
    const objs = await sequelize.query(`SELECT AVG(a.nota) AS media_avaliacoes
  FROM avaliacoes a
INNER JOIN entradas e on a.entrada_id = e.id
INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
WHERE pf.promotor_id = ${req.body.id}
ORDER BY a.created_at DESC
LIMIT 3`, { type: QueryTypes.SELECT });
    return objs;
  }

  // Implementando as regras de negócio relacionadas ao processo de negócio Empréstimo
  // Regra de Negócio 1: Se o promotor tiver os 3 últimos serviços sem ser finalizado, o sistema exibe um alerta desse promotor.
  // Regra de Negócio 2: Não podem ser emprestadas fitas reservadas para outros clientes
  static async verificarRegrasDeNegocio(req, obj) {

    // Regra de Negócio 1: Se o promotor tiver os 3 últimos serviços sem ser finalizado, o sistema exibe um alerta desse promotor.
    const servicoNaoConcluido = await PromotorService.verificarUltimosServicosNaoConcluido(req);
    if (servicoNaoConcluido.servicos_nao_concluidos === 3) {
      obj.msg1 = "Esse promotor possui os últimos 3 serviços não concluídos.";
    }

    // Regra de Negócio 2: Se a média das últimas 3 avaliações for menor que 6, será emitido um alerta desse promotor.
    const mediaAvaliacoes = await verificarMediaAvaliacoes(req);
    let notaAprovacao = ((5 * 60) / 100);
    if (mediaAvaliacoes.media_avaliacoes < notaAprovacao) {
      obj.msg2 = "A média das últimas 3 avaliações do promotor não atingiu o valor de 60%!";
    }
  }

}

export { AvaliacaoService };