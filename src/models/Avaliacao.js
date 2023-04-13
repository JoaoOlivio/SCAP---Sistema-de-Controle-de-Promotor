import { Model, DataTypes } from 'sequelize';

class Avaliacao extends Model {

  static init(sequelize) {
    super.init({
        cracha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Crachá é obrigatório" },
              len: { args: [2, 50], msg: "Crachá deve ter entre 2 e 50 caracteres" }
            }
          },
          ServicoConcluido: {
            type: DataTypes.BOOLEAN,
            validate: {
              notEmpty: { msg: "Serviço concluído é obrigatório" }
            }
          },
          nota: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Nota é obrigatória" },
              isFloat: { msg: "Nota deve ser um número decimal" }
            }
          },
          observacao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Observação é obrigatória" },
              len: { args: [2, 500], msg: "Observação deve ter entre 2 e 300 caracteres" }
            }
          }
    }, { sequelize, modelName: 'avaliacao', tableName: 'avaliacoes' })
  }

  static associate(models) {
   
  }
  
}

export { Avaliacao };