const User = require("./../models/User")

module.exports = {
    async store (req, res){
        const {nome, usuario, senha} = req.body;
        const row  = await User.create({
            nome, usuario, senha,
        });
        return res.json(row);
    },
}