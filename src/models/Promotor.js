//Gabriel
import { Model, DataTypes } from 'sequelize';

class Promotor extends Model {

    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Nome é obrigatório" },
                  notNull: { msg: "Nome é obrigatório" },
                  len: { args: [3, 100], msg: "Nome deve ter entre 3 e 50 caracteres" }
                }
              },
              razaoSocial: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Razão social é obrigatória" },
                  len: { args: [3, 100], msg: "Razão social deve ter entre 3 e 50 caracteres" }
                }
              },
              cpf: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "CPF é obrigatório" },
                  notNull: { msg: "CPF não pode ser Nulo." },
                  is: {args: ["[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}"], msg: "O CPF deve seguir o padrão NNN.NNN.NNN-NN!" },
                }
              },
              email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Email é obrigatório" },
                  isEmail: { msg: "Email inválido" }
                }
              },
              sexo: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Sexo é obrigatório" },
                  isIn: { args: [["Masculino", "Feminino",]], msg: "Sexo deve ser Masculino ou Feminino" }
                }
              },
              nascimento: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Data de nascimento é obrigatória" },
                  isDate: { msg: "Nascimento do Promotor deve ser preenchido!" },
                  is: {args: ["[0-9]{4}\-[0-9]{2}\-[0-9]{2}"], msg: "Nascimento do Promotor deve seguir o padrão yyyy-MM-dd!" }
                }
              },
              telefone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Telefone é obrigatório" },
                  is: {args: /^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}/, msg: "Telefone deve seguir o padrão (NN) NNNNN-NNNN" }
                }
              }
        }, { sequelize, modelName: 'promotor', tableName: 'promotores' })
    }

    static associate(models) {
      this.belongsToMany(models.fornecedor, {as: 'fornecedores', through: 'promotor_fornecedor', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }

}

export { Promotor };