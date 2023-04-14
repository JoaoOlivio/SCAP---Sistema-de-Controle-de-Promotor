import Sequelize from 'sequelize';
import { databaseConfig } from "./database-config.js";

import { Avaliacao } from '../models/Avaliacao.js';
import { Entrada } from '../models/Entrada.js';
import { Fornecedor } from '../models/Fornecedor.js';
import { Loja } from '../models/Loja.js';
import { Perfil } from '../models/Perfil.js';
import { Produto } from '../models/Produto.js';
import { Promotor } from '../models/Promotor.js';
import { Saida } from '../models/Saida.js';
import { Usuario } from '../models/Usuario.js';

const sequelize = new Sequelize(databaseConfig);

Avaliacao.init(sequelize);
Entrada.init(sequelize);
Fornecedor.init(sequelize);
Loja.init(sequelize);
Perfil.init(sequelize);
Produto.init(sequelize);
Promotor.init(sequelize);
Saida.init(sequelize);
Usuario.init(sequelize);


// A ordem das efetivações das associações importa: neste exemplo, Uf.associate antes de Cidade.associate deixa foreignKey: { allowNull: true } poder ser null
// Loja.associate(sequelize.models);
// Perfil.associate(sequelize.models);
// Usuario.associate(sequelize.models);


databaseInserts(); // comentar quando estiver em ambiente de produção (não criar tabelas e não inserir registros de teste)

function databaseInserts() {
    (async () => {

        await sequelize.sync({ force: true });

        // const loja1 = await Loja.create({ nome: "Loja 1", CNPJ: "11.111.111/0001-00", endereco: "Rua Exemplo, 111", descricao: "Esta é uma loja de exemplo.", });
        // const loja2 = await Loja.create({ nome: "Loja 2", CNPJ: "22.222.222/0001-00", endereco: "Rua Exemplo, 222", descricao: "Esta é uma loja de exemplo.", });
        // const loja3 = await Loja.create({ nome: "Loja 3", CNPJ: "33.333.333/0001-00", endereco: "Rua Exemplo, 333", descricao: "Esta é uma loja de exemplo.", });
        // const loja4 = await Loja.create({ nome: "Loja 4", CNPJ: "44.444.444/0001-00", endereco: "Rua Exemplo, 444", descricao: "Esta é uma loja de exemplo.", });

        // const perfil1 = await Perfil.create({ nome: "Perfil 1", equipe: false, admin: false, descricao: "Este é um perfil de exemplo.", });
        // const perfil2 = await Perfil.create({ nome: "Perfil 2", equipe: true, admin: false, descricao: "Este é um perfil de exemplo.", });
        // const perfil3 = await Perfil.create({ nome: "Perfil 3", equipe: false, admin: true, descricao: "Este é um perfil de exemplo.", });
        // const perfil4 = await Perfil.create({ nome: "Perfil 4", equipe: true, admin: true, descricao: "Este é um perfil de exemplo.", });

        // const usuario1 = await Usuario.create({
        //     nome: "Usuário 1", senha: "123456", email: "usuarioexemplo1@email.com",
        //     perfilId: perfil1.id, // ID do perfil criado anteriormente
        // });
        // const usuario2 = await Usuario.create({
        //     nome: "Usuário 2", senha: "123456", email: "usuarioexemplo2@email.com",
        //     perfilId: perfil2.id, // ID do perfil criado anteriormente
        // });
        // const usuario3 = await Usuario.create({
        //     nome: "Usuário 3", senha: "123456", email: "usuarioexemplo3@email.com",
        //     perfilId: perfil3.id, // ID do perfil criado anteriormente
        // });
        // const usuario4 = await Usuario.create({
        //     nome: "Usuário 4", senha: "123456", email: "usuarioexemplo4@email.com",
        //     perfilId: perfil4.id, // ID do perfil criado anteriormente
        // });

        // const promotor1 = await Promotor.create({
        //     nome: "Promotor 1",
        //     email: "promotorexemplo@email.com",
        //     telefone: "(11) 98765-4321",
        //     cpf: "000.000.000-00",
        //     sexo: "Masculino",
        //     nascimento: "1990-01-01",
        // });

        // const fornecedor1 = await Fornecedor.create({
        //     nomeFantasia: "Fornecedor 1",
        //     razaoSocial: "Fornecedor Exemplo Ltda",
        //     email: "fornecedorexemplo@email.com",
        //     telefone: "(11) 12345-6789",
        //     CNPJ: "00.000.000/0001-00",
        // });

        // const produto1 = await Produto.create({ descricao: "Produto 1", precoCusto: 10.0, precoVenda: 20.0, fornecedorId: fornecedor1.id, });
        // const produto2 = await Produto.create({ descricao: "Produto 2", precoCusto: 15.0, precoVenda: 40.0, fornecedorId: fornecedor1.id, });
        // const produto3 = await Produto.create({ descricao: "Produto 3", precoCusto: 20.0, precoVenda: 60.0, fornecedorId: fornecedor1.id, });
        // const produto4 = await Produto.create({ descricao: "Produto 4", precoCusto: 25.0, precoVenda: 80.0, fornecedorId: fornecedor1.id, });

        // const entrada1 = await Entrada.create({
        //     nome: "Entrada  1",
        //     cracha: "CR111",
        //     cpf: "111.111.111-11",
        //     horario: "08:00",
        //     data: "2023-04-13",
        //     usuarioId: usuario1.id, // ID do usuário criado anteriormente
        //     promotorFornecedorId: promotorFornecedor1.id, // ID da relação Promotor_Fornecedor criada anteriormente
        //   });

        //   const avaliacao1 = await Avaliacao.create({
        //     cracha: "CR111",
        //     nota: 4.5,
        //     servicoConcluido: true,
        //     observacao: "Bom trabalho.",
        //     entradaId: entrada1.id, // ID da entrada criada anteriormente
        //   });

        //   const saida1 = await Saida.create({
        //     nome: "Saida 1",
        //     cracha: "CR111",
        //     cpf: "111.111.111-11",
        //     horario: "18:00",
        //     data: "2023-04-13",
        //     avaliacaoId: avaliacao1.id, //  ID da avaliação criada anteriormente
        //     usuarioId: usuario1.id, // ID do usuário criado anteriormente
        //   });
          
          
    })();
}

export default sequelize;