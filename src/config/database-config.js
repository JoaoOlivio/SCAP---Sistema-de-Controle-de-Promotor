// Configuração do bando de dados no ambiente de teste
// export const databaseConfig = {
//     dialect: 'sqlite',
//     storage: 'database.sqlite',
//     define: {
//       timestamps: true,
//       freezeTableName: true, //Não prularizar
//       underscored: true //Trabalr com _
//     }
//   };
  
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
  

  // Configuração do bando de dados no ambiente de produção
  export const databaseConfig = {
    dialect: 'postgres',
    host: 'dpg-ci65f7enqql3q38ebrc0-a.oregon-postgres.render.com',
    username: 'scap_backend_node_sequelize_user',
    password: 'UxSmKyPVMd91qgYBsppF2RBsfzoDhSuv',
    database: 'scap_backend_node_sequelize',
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    },
    dialectOptions: {
      ssl: true
    }
  };


