import { Model, DataTypes } from 'sequelize';

class Saida extends Model {

  static init(sequelize) {
    super.init({
      cracha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: "Crachá não pode ser nulo"},
          notEmpty: { msg: "Crachá é obrigatório" },
          len: { args: [2, 50], msg: "Crachá deve ter entre 2 e 50 caracteres" }
        }
      },
      horario: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          notNull: {msg: "Horário não pode ser nulo"},
          notEmpty: { msg: "Horário é obrigatório" }
        }
      },
      data: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          notNull: {msg: "Data não pode ser nulo"},
          notEmpty: { msg: "Data é obrigatório" }
        }
      }
    }, { sequelize, modelName: 'saida', tableName: 'saidas' })
  }

  static associate(models) {
    this.belongsTo(models.usuario, { foreignKey: {name: 'usuarioId' , allowNull: false, validate: {notNull: {msg: 'Usuário não pode ser nulo!'}}}});
    this.belongsTo(models.portao, { foreignKey: {name: 'portaoId' , allowNull: false, validate: {notNull: {msg: 'O portão deve ser selecionado!'}}}});
    this.belongsTo(models.entrada, { foreignKey: {name: 'entradaId' , allowNull: false, validate: {notNull: {msg: 'A entrada não pode ser null!'}}}});
  }
  
}

export { Saida };