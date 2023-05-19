//Gabriel
import { Model, DataTypes } from 'sequelize';

class Entrada extends Model {

  static init(sequelize) {
    super.init({
        cracha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Crachá é obrigatório" },
              notNull: { msg: "Crachá não pode ser nulo" },
              len: { args: [2, 50], msg: "Crachá deve ter entre 2 e 50 caracteres" }
            }
          },
          horario: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
              notEmpty: { msg: "Horário é obrigatório" },
            }
          },
          data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
              notEmpty: { msg: "Data é obrigatória" },
              is: {args: ["[0-9]{4}\-[0-9]{2}\-[0-9]{2}"], msg: "A Data deve seguir o padrão yyyy-MM-dd!" },
              isDate: { msg: "Data deve ser uma data válida" }
            }
          }
    }, { sequelize, modelName: 'entrada', tableName: 'entradas' })
  }

  static associate(models) {
    this.belongsTo(models.usuario, { foreignKey: {name: 'usuarioId' , allowNull: false, validate: {notNull: {msg: 'Usuário não pode ser nulo!'}}}, as: 'usuario' });
    this.belongsTo(models.promotor, { foreignKey: {name: 'promotorId' , allowNull: false, validate: {notNull: {msg: 'promotor_fornecedor não pode ser nulo!'}}}, as: 'promotor', through: 'promotor_fornecedor' });
    this.belongsTo(models.fornecedor, { foreignKey: {name: 'fornecedorId' , allowNull: false, validate: {notNull: {msg: 'promotor_fornecedor não pode ser nulo!'}}}, as: 'fornecedor', through: 'promotor_fornecedor' });

  }
  
}

export { Entrada };