const {Model, DataTypes} = require('sequelize');

class Collect extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            rg: DataTypes.STRING,
            cpf: DataTypes.STRING,
            dt_nascimento: DataTypes.DATEONLY,
            telefone: DataTypes.STRING,
            convenio: DataTypes.STRING,
            num_carteira: DataTypes.STRING,
            endereco: DataTypes.STRING,
            ponto_ref: DataTypes.STRING,
            exames: DataTypes.STRING,
            dt_coleta: DataTypes.DATEONLY,
            obs: DataTypes.STRING,
            valor_total: DataTypes.FLOAT,
            recebido: DataTypes.STRING,
            coletado: DataTypes.STRING,
            responsavel: DataTypes.STRING,
            previsao: DataTypes.STRING,

        },{
            tableName: 'collect',
            sequelize,
            
        });
        
    }

}
module.exports = Collect;