const Sequelize = require ('sequelize');
const User = require('../models/User');
const dbConfig = require('./../config/database');
const Collect = require ('./../models/Collect')

const connection = new Sequelize(dbConfig);
Collect.init(connection);
User.init(connection);
module.exports = connection;