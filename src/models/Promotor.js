import { Model, DataTypes } from 'sequelize';

class Promotor extends Model {

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
              razaoSocial: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Razão social é obrigatória" },
                  len: { args: [3, 50], msg: "Razão social deve ter entre 3 e 50 caracteres" }
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
                  isDate: { msg: "Data inválida" }
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

    }

}

export { Promotor };