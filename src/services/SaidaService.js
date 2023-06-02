import { QueryTypes } from "sequelize";
import { Saida } from "../models/Saida.js"
import sequelize from "../config/database-connection.js"

class SaidaService{
    static async findAll() {
        const objs = await Saida.findAll({ include: { all: true, nested: true } });
        return objs;
    }
    
    static async findByPk(req) {
        const { id } = req.params;
        const obj = await Saida.findByPk(id, { include: { all: true, nested: true } });
        return obj;
    }

    static async create(req){
        const {portaoId, cracha, horario, data, usuarioId} = req.body;
        const entrada = await SaidaService.findEntradasPromotor(cracha, data); //retorna a ultima entrada feita pelo promotor no dia
        const avaliacao= await SaidaService.findAvaliacoesPromotor(entrada); //retorna avaliações feitas das entradas
        
        if(avaliacao == null) throw "Não existe avaliação para a ultima entrada de hoje"
        const entradaId= entrada.id;
        // if(!avaliacao.entrada_id == entrada.id){
        //     throw "A ultima entrada feita hoje nao foi avaliada"
        // }
        if(entrada.id == null) throw "O Id da avaliação deve ser preenchido";
        if(usuarioId == null) throw "O Id do usuario deve ser preenchido";
        const obj = await Saida.create({portaoId, cracha, horario, data, entradaId, usuarioId});
        return await Saida.findByPk(obj.id, { include: { all: true, nested: true}})
    }

    static async update(req){
        const {id} = req.params;
        const {portaoId, nome, cracha, cpf, horario, data, avaliacaoId, usuarioId} = req.body;
        if(avaliacaoId == null) throw "O Id da avaliação deve ser preenchido";
        if(usuarioId == null) throw "O Id do usuario deve ser preenchido";
        const obj = await Saida.findByPk(id, {include: {all: true, nested: true}})
        if(obj == null) throw 'Saida não encontrada';
        Object.assign(obj, {portaoId, nome, cracha, cpf, horario, data, avaliacaoId, usuarioId});
        await obj.save();
        return await Saida.findByPk(obj.id, {include: {all: true, nested: true}} );
    }

    static async delete(req){
        const {id} = req.params;
        const obj = await Saida.findByPk(id);
        if (obj == null) throw 'Saida não encontrada!';
        await obj.destroy();
        return obj;
    }

    static async findEntradasPromotor(cracha, data){
        const lst_Entradas = await sequelize.query("SELECT * FROM entradas WHERE entradas.cracha = :cracha AND entradas.data = :data", {replacements: {cracha: cracha, data: data}, type: QueryTypes.SELECT});
        if(lst_Entradas.length == 0) throw "Nao existe uma entrada do promotor nesse dia"
        const entrada= lst_Entradas.reduce(function(prev, current) {
            return (prev.id > current.id) ? prev : current
        })//pego a entrada mais recente
        const saidaDaEntrada= await sequelize.query("SELECT * FROM saidas WHERE saidas.entrada_id = :entrada_id", {replacements: {entrada_id: entrada.id, data: data}, type: QueryTypes.SELECT})
        if(saidaDaEntrada.length != 0)throw "A entrada já possui uma saida "
        return entrada
    }

    static async findAvaliacoesPromotor( entrada){
        let avaliacao
        avaliacao= await sequelize.query("SELECT * FROM avaliacoes WHERE avaliacoes.entrada_id = :entrada_id", {replacements: {entrada_id: entrada.id}, type: QueryTypes.SELECT});
        return avaliacao[0];
    }

    static async saidaAutomatizada(req){
        const {dataAtual, horarioAtual} = req.body;
        const lst_Entradas = await sequelize.query("SELECT * FROM entradas", { type: QueryTypes.SELECT});
        const lst_Saidas= await sequelize.query("SELECT * FROM saidas", { type: QueryTypes.SELECT})
        // Obter os IDs das entradas com saída vinculada
        const idsEntradasComSaida = lst_Saidas.map(saida => saida.entrada_id);

        // Encontrar as entradas sem saída vinculada
        const lst_entradasSemSaida = lst_Entradas.filter(entrada => {
            return !idsEntradasComSaida.find(id => id === entrada.id);
        });
        lst_entradasSemSaida.forEach(async element => {
            const dtEntrada = new Date(element.data);
            const dtAtual = new Date(dataAtual)
        
            // Calcular a diferença em milissegundos entre as datas
            const diferencaMilissegundos = Math.abs(dtAtual - dtEntrada);

            // Converter a diferença em milissegundos para dias
            const diferencaDias = Math.ceil(diferencaMilissegundos / (1000 * 60 * 60 * 24));
            if(diferencaDias > 1){
                const portaoId = 5;
                const cracha = element.cracha;
                const horario = horarioAtual
                const data = dataAtual
                const entradaId = element.id
                const usuarioId = element.promotor_fornecedor_id
                const obj = await Saida.create({portaoId, cracha, horario, data, entradaId, usuarioId});
            }
        });
        return "Deu Certo"
    }

    //Diogo
    static async horasPorPromotor(req) {
        const { inicio, termino } = req.params;
        const objs = await sequelize.query(`
                    SELECT p.nome,
                    s.horario - e.horario as horas
            FROM saidas s
            INNER JOIN entradas e on s.entrada_id = e.id
            INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
            INNER JOIN promotores p on pf.promotor_id = p.id
            WHERE s.data BETWEEN :inicio AND :termino
            GROUP BY p.nome
        `, { replacements: { inicio: inicio, termino: termino }, type: QueryTypes.SELECT });
        return objs;
    }

    //Diogo
    static async saidaNaoRealizada(req) {
        const { inicio, termino } = req.params;
        const objs = await sequelize.query(`
                    SELECT f.razao_social,
                    COUNT(e.id) AS visitas
            FROM entradas e
            LEFT JOIN saidas s on s.entrada_id = e.id
            INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
            INNER JOIN fornecedores f on pf.fornecedor_id = f.id
            WHERE e.data BETWEEN :inicio AND :termino
            AND s.id IS NULL
            GROUP BY f.razao_social
        `, { replacements: { inicio: inicio, termino: termino }, type: QueryTypes.SELECT });
        return objs;
    }
}

export { SaidaService };