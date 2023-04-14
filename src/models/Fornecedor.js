import { Model, DataTypes } from 'sequelize';

class Fornecedor extends Model {

    static init(sequelize) {
        super.init({
            nomeFantasia: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Nome fantasia é obrigatório" },
                  len: { args: [3, 50], msg: "Nome fantasia deve ter entre 3 e 50 caracteres" }
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
              CNPJ: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                  notEmpty: { msg: "CNPJ é obrigatório" },
                  is: {args: ["[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}"], msg: "O CPF deve seguir o padrão NN.NNN.NNN/NNNN-NN!" },
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
              telefone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Telefone é obrigatório" },
                  is: {args: /^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}/, msg: "Telefone deve seguir o padrão (NN) NNNNN-NNNN" }
                }
              }           
        }, { sequelize, modelName: 'fornecedor', tableName: 'fornecedores' })
    }

    static associate(models) {

    }

}

export { Fornecedor };