require('dotenv/config');

module.exports = {  
    dialect: 'mysql',
    host: process.env.HOST, 
    username: 'root', 
    password: '',
    database: process.env.DATABASE,
    define:{
        timestamps: true,
        underscored: true,
    }
}