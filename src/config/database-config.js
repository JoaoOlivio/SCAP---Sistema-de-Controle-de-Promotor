//Configuração do bando de dados no ambiente de teste
// export const databaseConfig = {
//     dialect: 'sqlite',
//     storage: 'database.sqlite',
//     define: {
//       timestamps: true,
//       freezeTableName: true, //Não prularizar
//       underscored: true //Trabalr com _
//     }
//   };
  
  
  //Configuração do bando de dados no ambiente de desenvolvimento
  // export const databaseConfig = {
  //   dialect: 'postgres',
  //   host: 'localhost',
  //   username: 'postgres',
  //   password: 'postgres',
  //   database: 'scv-backend-node-sequelize',
  //   define: {
  //     timestamps: true,
  //     freezeTableName: true,
  //     underscored: true
  //   }
  // };
  
  

  //Configuração do bando de dados no ambiente de produção
  export const databaseConfig = {
    dialect: 'postgres',
    host: 'dpg-cifdnd95rnujc4s6cm9g-a.oregon-postgres.render.com',
    username: 'scap_backend_node_sequelize_user',
    password: 'Sw4Mma2jZWfPoN8deIGekxhmr7Bm7psz',
    database: 'scap_backend_node_sequelize_obnh',
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    },
    dialectOptions: {
      ssl: true
    }
  };


