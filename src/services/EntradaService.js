import { QueryTypes } from "sequelize";
import { Entrada } from "../models/Entrada.js"
import sequelize from "../config/database-connection.js"

class EntradaService{
    static async findAll() {
        const objs = await Entrada.findAll({ include: { all: true, nested: true } });
        return objs;
    }
    
    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Entrada.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req){
        const {cracha, horario, data, usuarioId, promotorFornecedorId } = req.body;
    
        this.findEntradasPromotor(cracha, data);

        const obj = await Entrada.create({ cracha, horario, data, usuarioId, promotorFornecedorId });
        return await Entrada.findByPk(obj.id, { include: { all: true, nested: true}})
    }

    static async update(req){
        const {id} = req.params;
        const {cracha, horario, data, avaliacaoId, usuarioId} = req.body;
        if(avaliacaoId == null) throw "O Id da avaliação deve ser preenchido";
        if(usuarioId == null) throw "O Id do usuario deve ser preenchido";
        const obj = await Entrada.findByPk(id, {include: {all: true, nested: true}})
        if(obj == null) throw 'Entrada não encontrada';
        Object.assign(obj, {cracha, horario, data, avaliacaoId, usuarioId});
        await obj.save();
        return await Entrada.findByPk(obj.id, {include: {all: true, nested: true}} );
    }

    static async delete(req){
        const {id} = req.params;
        const obj = await Entrada.findByPk(id);
        if (obj == null) throw 'Entrada não encontrada!';
        await obj.destroy();
        return obj;
    }

    static async findEntradasPromotor(cracha, data){
        const lst_EntradasComSaidas = await sequelize.query(`SELECT entradas.*
        FROM entradas
        JOIN saidas ON entradas.id = saidas.entrada_id
        WHERE entradas.cracha = :cracha
          AND entradas.data = :data;`, {replacements: {cracha: cracha, data: data}, type: QueryTypes.SELECT});

        const lst_Entradas = await sequelize.query(`SELECT entradas.*
          FROM entradas
          WHERE entradas.cracha = :cracha
            AND entradas.data = :data;`, {replacements: {cracha: cracha, data: data}, type: QueryTypes.SELECT});

        if(lst_Entradas.length != lst_EntradasComSaidas.length) throw "Nao é possivel registrar uma nova entrada, pois já existe uma entrada em aberto."
    }

    static async limiteEntrada(data){
        const lst_Entradas = await sequelize.query(`SELECT COUNT(*) AS total_entradas_em_aberto
        FROM entradas
        LEFT JOIN saidas ON entradas.id = saidas.entrada_id
        WHERE entradas.data = :data
        AND saidas.id IS NULL
        LIMIT 2;`, {replacements: {data: data}, type: QueryTypes.SELECT});

       

        if(lst_Entradas.length > 2 ) throw "Nao é possivel registrar uma nova entrada, pois já existe 2 entradas em aberto no momento."
    }
}

export { EntradaService };