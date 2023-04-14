// joao olivio
import { Model, DataTypes } from 'sequelize';

class Avaliacao extends Model {

  static init(sequelize) {
    super.init({
        cracha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Crachá é obrigatório" },
              notNull: { msg: "Crachá não pode ser nulo." },
              len: { args: [2, 50], msg: "Crachá deve ter entre 2 e 50 caracteres" }
            }
          },
          servicoConcluido: {
            type: DataTypes.BOOLEAN,
            validate: {
              notEmpty: { msg: "Serviço concluído é obrigatório" },
            }
          },
          nota: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Nota é obrigatória" },
              notNull: { msg: "Nota não pode ser nulo." },
              isFloat: { msg: "Nota deve ser um número decimal" }
            }
          },
          observacao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Observação é obrigatória" },
              notNull: { msg: "Observação não pode ser nulo." },
              len: { args: [2, 500], msg: "Observação deve ter entre 2 e 300 caracteres" }
            }
          }
    }, { sequelize, modelName: 'avaliacao', tableName: 'avaliacoes' })
  }

  static associate(models) {
    this.belongsTo(models.usuario, { foreignKey: {name: 'usuarioId' , allowNull: false, validate: {notNull: {msg: 'Usuário não pode ser nulo!'}}}, as: 'usuario' });
    this.belongsTo(models.destaque, { foreignKey: {name: 'destaqueId' , allowNull: false, validate: {notNull: {msg: 'Destaque não pode ser nulo!'}}}, as: 'destaque' });
    this.belongsTo(models.entrada, { foreignKey: {name: 'entradaId' , allowNull: false, validate: {notNull: {msg: 'A entrada não pode ser nula!'}}}, as: 'entrada' });
  }
  
}

export { Avaliacao };