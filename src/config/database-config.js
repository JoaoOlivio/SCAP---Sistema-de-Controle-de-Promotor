// Configuração do bando de dados no ambiente de teste
export const databaseConfig = {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    define: {
      timestamps: true,
      freezeTableName: true, //Não prularizar
      underscored: true //Trabalr com _
    }
  };
  
  /*
  // Configuração do bando de dados no ambiente de desenvolvimento
  export const databaseConfig = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'scv-backend-node-sequelize',
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    }
  };
  */
  
  /*
  // Configuração do bando de dados no ambiente de produção
  export const databaseConfig = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'scv-backend-node-sequelize',
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    }
  };
  */