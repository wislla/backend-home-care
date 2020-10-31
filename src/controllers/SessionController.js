const User = require('./../models/User')
const { Op } = require("sequelize");
const { response } = require('express');
module.exports = {
    async create (req, res){
        const {user, pass} = req.body;
        const {count, rows} = await User.findAndCountAll({
            where:{
                usuario: {
                    [Op.like]: user
                },
                senha:{
                    [Op.like]: pass
                }
            }
        })
        return res.json(count);       
    }
}