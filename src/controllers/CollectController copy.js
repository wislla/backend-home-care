const Collect = require ('./../models/Collect');
const { Op } = require("sequelize");

function previsao(ordem) {
    if (ordem == 1 || ordem == 2)
        return "7h15 - 7h30"
    if (ordem == 3 || ordem == 4)
        return "7h30 - 8h00"
    if (ordem == 5 || ordem == 6)
        return "8h00 - 8h20"
    if (ordem == 7 || ordem == 8)
        return "8h20 - 8h40"
    if (ordem == 9 || ordem == 10)
        return "8h40 - 9h00"
    else return "sem previsao"
    
}
module.exports={
    
    async ColetasSelecionadas (req, res){
        const { user } = req.params;
        const date = Date.now();
        const collect = await Collect.findAll({
            where: {
                dt_coleta : {
                [Op.like]: date
              },
              coletado:{
                  [Op.like]: 'true'
              },
              responsavel: user,

            },
            order: [
                ['createdAt', 'ASC']
            ],
        });
        let coletas =[];
          let i = 0;

          collect.forEach(coleta => {
            coleta.dataValues.ordem = i+1;
            
            coletas.push(coleta)
              
              i++;
          });
        return res.json(coletas);
    },
    async index (req, res){
        
        const collect = await Collect.findAll();
        
        return res.json(collect);
    },
    async indexToday (req, res){
        const date = Date.now();
        
        const { count, rows } = await Collect.findAndCountAll({
            where: {
                dt_coleta : {
                [Op.like]: date
              }
            },
            order: [
                ['createdAt', 'ASC']
            ],
            
          });

          let coletas =[];
          let i = 0;

          rows.forEach(coleta => {
            coleta.dataValues.ordem = i+1;
            coleta.dataValues.previsao = previsao(i+1);
            coletas.push(coleta)
              
              i++;
          });
          return res.json(coletas);
    },
     updateCollect (req, res){
        const id = req.body;
        id.forEach(async element => {
             await Collect.update({ coletado: "true",responsavel:element.responsavel }, {
                where: {
                  id: element.id,
                }
              });
        });
        
          return res.json({"msg": "ok"})
    },
    async indexDate(req, res){
        const {date} = req.params;
        const { count, rows } = await Collect.findAndCountAll({
            where: {
                dt_coleta : {
                [Op.like]: date
              }
            },
            
          });
          return res.json(count);
    },
    async store(req, res){
        const {
            nome,
            rg,
            cpf,
            dt_nascimento,
            telefone,
            convenio,
            num_carteira,
            endereco,
            ponto_ref,
            exames,
            dt_coleta,
            obs,
            valor_total,
            recebido,
            
        } = req.body;

        const { count } = await Collect.findAndCountAll({
            where: {
                dt_coleta : {
                [Op.like]: dt_coleta
              }
            },
            
          });
        console.log(count);
        
        const collect = await Collect.create({
            
            nome,
            rg,
            cpf,
            dt_nascimento,
            telefone,
            convenio,
            num_carteira,
            endereco,
            ponto_ref,
            exames,
            dt_coleta,
            obs,
            valor_total,
            recebido,
            coletado: 'false',
            previsao: previsao(count+1),
        });
        
       return res.json(collect);
    },
}