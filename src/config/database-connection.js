import Sequelize from 'sequelize';
import { databaseConfig } from "./database-config.js";

import { Avaliacao} from '../models/Avaliacao.js';
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

//Uf.associate(sequelize.models);


databaseInserts(); // comentar quando estiver em ambiente de produção (não criar tabelas e não inserir registros de teste)

function databaseInserts() {
    (async () => {

        await sequelize.sync({ force: true }); 

        const uf1 = await Uf.create({ sigla: "ES", nome: "Espírito Santo" });

    })();
}

export default sequelize;