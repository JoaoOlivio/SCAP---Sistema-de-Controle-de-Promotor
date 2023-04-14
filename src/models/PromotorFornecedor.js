//Gabriel
import { Model, DataTypes } from 'sequelize';
import { Promotor } from "./Promotor.js";
import { Fornecedor } from "./Fornecedor.js";

class PromotorFornecedor extends Model {

    static init(sequelize) {
        super.init({
            // promotorId: {
            //     type: DataTypes.INTEGER,
            //     references: { model: Promotor, key: 'id' },
            //     validate: {
            //         notEmpty: { msg: "ID do Promotor deve ser informado!" }
            //     }
            // },
            // fornecedorId: {
            //     type: DataTypes.INTEGER,
            //     references: { model: Fornecedor, key: 'id' },
            //     validate: {
            //         notEmpty: { msg: "ID do Fornecedor deve ser informado!" }
            //     }
            // }
        }, { sequelize, modelName: 'promotor_fornecedor', tableName: 'promotor_fornecedores' })
    }

    static associate(models) {
        this.removeAttribute('id');
        this.belongsTo(models.promotor, { foreignKey: { primaryKey: true, name: 'promotorId' , allowNull: false, validate: {notNull: {msg: 'Promotor não pode ser nulo!'}}}, as: 'promotor' });
        this.belongsTo(models.fornecedor, { foreignKey: { primaryKey: true, name: 'fornecedorId' , allowNull: false, validate: {notNull: {msg: 'Fornecedor não pode ser nulo!'}}}, as: 'fornecedor' });
    }

}

export { PromotorFornecedor };