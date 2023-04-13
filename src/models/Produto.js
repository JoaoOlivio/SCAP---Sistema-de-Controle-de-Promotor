import { Model, DataTypes } from 'sequelize';

class Produto extends Model {

    static init(sequelize) {
        super.init({
            precoCusto: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Preço de custo é obrigatório" },
                  notNull: { msg: "Preço de custo não pode ser nulo" },
                  min: { args: [0], msg: "Preço de custo deve ser maior ou igual a zero" }
                }
              },
              precoVenda: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Preço de venda é obrigatório" },
                  notNull: { msg: "Preço de venda não pode ser nulo" },
                  min: { args: [0], msg: "Preço de venda deve ser maior ou igual a zero" }
                }
              },
              descricao: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: { msg: "Descrição é obrigatória" },
                  len: { args: [10, 200], msg: "Descrição deve ter entre 10 e 200 caracteres" }
                }
              }
        }, { sequelize, modelName: 'produto', tableName: 'produtos' })
    }

    static associate(models) {

    }

}

export { Produto };