import { Model, DataTypes } from 'sequelize';

class Avaliacao extends Model {

  static init(sequelize) {
    super.init({
        cracha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Crachá é obrigatório" },
              len: { args: [2, 50], msg: "Crachá deve ter entre 2 e 50 caracteres" }
            }
          },
          ServicoConcluido: {
            type: DataTypes.BOOLEAN,
            validate: {
              notEmpty: { msg: "Serviço concluído é obrigatório" }
            }
          },
          nota: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Nota é obrigatória" },
              isFloat: { msg: "Nota deve ser um número decimal" }
            }
          },
          observacao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Observação é obrigatória" },
              len: { args: [2, 500], msg: "Observação deve ter entre 2 e 300 caracteres" }
            }
          }
    }, { sequelize, modelName: 'avaliacao', tableName: 'avaliacoes' })
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: {name: 'usuarioId' , allowNull: false, validate: {notNull: {msg: 'Usuário não pode ser nulo!'}}}, as: 'usuario' });
    this.belongsTo(models.Destaque, { foreignKey: {name: 'destaqueId' , allowNull: false, validate: {notNull: {msg: 'Destaque não pode ser nulo!'}}}, as: 'destaque' });
  }
  
}

export { Avaliacao };