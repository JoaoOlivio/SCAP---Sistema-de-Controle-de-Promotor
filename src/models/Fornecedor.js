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
                  is: { args: ["^[0-9]{14}$"], msg: "CNPJ deve conter 14 dígitos" }
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
                  is: { args: [/^(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})$/], msg: "Telefone inválido" }
                }
              }           
        }, { sequelize, modelName: 'fornecedor', tableName: 'fornecedores' })
    }

    static associate(models) {

    }

}

export { Fornecedor };