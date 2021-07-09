require('dotenv/config');

module.exports = {  
    dialect: 'mysql',
    host: process.env.HOST, 
    username: process.env.USERNAME, 
    password: process.env.PASS,
    database: process.env.DATABASE,
    define:{
        timestamps: true,
        underscored: true,
    }
}