import { Model, DataTypes } from 'sequelize';

class Destaque extends Model {

  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nome é obrigatório" },
          len: { args: [3, 50], msg: "Nome deve ter entre 3 e 50 caracteres" }
        }
      },
    }, { sequelize, modelName: 'destaque', tableName: 'destaques' })
  }

  static associate(models) {
   
  }
  
}

export { Destaque };