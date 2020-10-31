const {Model, DataTypes} =  require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            usuario: DataTypes.STRING,
            senha: DataTypes.STRING,
        },{
            tableName: 'users',
            sequelize,
        })
    }

}
module.exports = User;