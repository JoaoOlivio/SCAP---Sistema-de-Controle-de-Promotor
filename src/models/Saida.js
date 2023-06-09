// Diogo
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
          nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {msg: "Nome não pode ser nulo"},
              notEmpty: { msg: "Nome é obrigatório" },
              len: { args: [3, 50], msg: "Nome deve ter entre 3 e 50 caracteres" }
            }
          },
          cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {msg: "CPF não pode ser nulo"},
              notEmpty: { msg: "CPF é obrigatório" },
              is: {args: ["[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}"], msg: "O CPF deve seguir o padrão NNN.NNN.NNN-NN!" },
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
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
              notNull: {msg: "Data não pode ser nulo"},
              notEmpty: { msg: "Data é obrigatória" },
              isDate: { msg: "Data deve ser uma data válida" }
            }
          }
    }, { sequelize, modelName: 'saida', tableName: 'saidas' })
  }

  static associate(models) {
    this.belongsTo(models.usuario, { foreignKey: {name: 'usuarioId' , allowNull: false, validate: {notNull: {msg: 'Usuário não pode ser nulo!'}}}, as: 'usuario' });
    this.belongsTo(models.portao, { foreignKey: {name: 'portaoId' , allowNull: false, validate: {notNull: {msg: 'O portão deve ser selecionado!'}}}, as: 'portao' });
    this.belongsTo(models.avaliacao, { foreignKey: {name: 'avaliacaoId' , allowNull: false, validate: {notNull: {msg: 'A avaliacao não pode ser null!'}}}, as: 'avaliacao' });
  }
  
}

export { Saida };