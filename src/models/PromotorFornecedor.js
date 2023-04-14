import { Model, DataTypes } from 'sequelize';
import { Promotor } from "./Promotor.js";
import { Fornecedor } from "./Fornecedor.js";

class PromotorFornecedor extends Model {

    static init(sequelize) {
        super.init({
            promotorId: {
                type: DataTypes.INTEGER,
                references: { model: Promotor, key: 'id' },
                validate: {
                    notEmpty: { msg: "ID do Promotor deve ser informado!" }
                }
            },
            fornecedorId: {
                type: DataTypes.INTEGER,
                references: { model: Fornecedor, key: 'id' },
                validate: {
                    notEmpty: { msg: "ID do Fornecedor deve ser informado!" }
                }
            }
        }, { sequelize, modelName: 'promotor_fornecedor', tableName: 'promotor_fornecedores' })
    }

}

export { PromotorFornecedor };