import { Model, DataTypes } from 'sequelize';

class PromotorFornecedor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
      },
      { sequelize, modelName: 'promotor_fornecedor', tableName: 'promotor_fornecedores' }
    );
  }

  static associate(models) {
    this.belongsTo(models.promotor, {
      foreignKey: {
        name: 'promotorId',
        allowNull: false,
        validate: {
          notNull: { msg: 'Promotor não pode ser nulo!' }
        }
      },
      as: 'promotor'
    });
    this.belongsTo(models.fornecedor, {
      foreignKey: {
        name: 'fornecedorId',
        allowNull: false,
        validate: {
          notNull: { msg: 'Fornecedor não pode ser nulo!' }
        }
      },
      as: 'fornecedor'
    });
  }
}

export { PromotorFornecedor };