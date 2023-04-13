import { Model, DataTypes } from 'sequelize';

class Perfil extends Model {

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
            equipe: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "A descrição não pode ser nula!" },
                    notEmpty: { msg: "Descrição é obrigatória" },
                    len: { args: [10, 100], msg: "Descrição deve ter entre 10 e 100 caracteres" }
                }
            }
        }, { sequelize, modelName: 'perfil', tableName: 'perfils' })
    }

    static associate(models) {

    }

}

export { Perfil };