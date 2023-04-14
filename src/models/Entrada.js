import { Model, DataTypes } from 'sequelize';

class Entrada extends Model {

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
          nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Nome é obrigatório" },
              len: { args: [3, 50], msg: "Nome deve ter entre 3 e 50 caracteres" }
            }
          },
          CPF: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "CPF é obrigatório" },
              is: {args: ["[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}"], msg: "O CPF deve seguir o padrão NNN.NNN.NNN-NN!" },
            }
          },
          horario: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
              notEmpty: { msg: "Horário é obrigatório" }
            }
          },
          data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
              notEmpty: { msg: "Data é obrigatória" },
              //is: {args: ["[0-9]{4}\-[0-9]{2}\-[0-9]{2}"], msg: "A Data deve seguir o padrão yyyy-MM-dd!" },
              isDate: { msg: "Data deve ser uma data válida" }
            }
          }
    }, { sequelize, modelName: 'entrada', tableName: 'entradas' })
  }

  static associate(models) {
    this.belongsTo(models.usuario, { foreignKey: {name: 'usuarioId' , allowNull: false, validate: {notNull: {msg: 'Usuário não pode ser nulo!'}}}, as: 'usuario' });
    this.belongsTo(models.promotor_fornecedor, { foreignKey: {name: 'promotor_fornecedorId' , allowNull: false, validate: {notNull: {msg: 'promotor_fornecedor não pode ser nulo!'}}}, as: 'promotor_fornecedor' });

  }
  
}

export { Entrada };