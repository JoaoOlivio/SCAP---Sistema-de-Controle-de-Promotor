import { Model, DataTypes } from 'sequelize';

class Usuario extends Model {

  static init(sequelize) {
    super.init({
      nome: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nome do Usuário deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Usuário deve ter entre 2 e 50 letras!" }
        }
      },
      email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          isEmail: { msg: "Email inválido!" },
          notEmpty: { msg: "O Email do Usuário deve ser preenchido!" },
        }
      },
      senha: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: { msg: "Senha do Usuário deve ser preenchida!" },
          len: { args: [6, 15], msg: "Senha do Usuário deve ter entre 6 e 15 caracteres!" }
        }
      },
    }, { sequelize, modelName: 'usuario', tableName: 'usuarios' })
  }

  static associate(models) {
   
  }
  
}

export { Usuario };