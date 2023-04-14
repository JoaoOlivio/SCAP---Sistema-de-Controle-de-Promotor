import { Model, DataTypes } from 'sequelize';

class Loja extends Model {

    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "O nome não pode ser nulo!" },
                    notEmpty: { msg: "Nome é obrigatório" },
                    len: { args: [3, 50], msg: "Nome deve ter entre 3 e 50 caracteres" }
                }
            },
            CNPJ: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: "O CNPJ não pode ser nulo!" },
                    notEmpty: { msg: "CNPJ é obrigatório" },
                    is: {args: ["[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}"], msg: "O CPF deve seguir o padrão NN.NNN.NNN/NNNN-NN!" },
                }
            },
            endereco: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "O Endereço não pode ser nulo!" },
                    notEmpty: { msg: "Endereço é obrigatório" },
                    len: { args: [5, 100], msg: "Endereço deve ter entre 5 e 100 caracteres" }
                }
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Descrição é obrigatória" },
                    notNull: { msg: "A descrição não pode ser nula!" },
                    len: { args: [10, 200], msg: "Descrição deve ter entre 10 e 200 caracteres" }
                }
            }

        }, { sequelize, modelName: 'loja', tableName: 'lojas' })
    }

    static associate(models) {

    }

}

export { Loja };