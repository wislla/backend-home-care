const Collect = require ('./../models/Collect');
const { Op } = require("sequelize");

function previsao(ordem) {
    if (ordem == 1 || ordem == 2)
        return "07h15 - 7h30"
    if (ordem == 3 || ordem == 4)
        return "07h30 - 8h00"
    if (ordem == 5 || ordem == 6)
        return "8h00 - 8h20"
    if (ordem == 7 || ordem == 8)
        return "8h20 - 8h40"
    if (ordem == 9 || ordem == 10)
        return "8h40 - 9h00"
    else return "sem previsao"
    
}

function order(previsao) {
  if (previsao == '07h10 - 8h')
      return "1"
      if (previsao == '08h10 - 9h')
      return "2"
      if (previsao == '10h - 11h')
      return "3"
      if (previsao == '11h - 12h')
      return "4"
      if (previsao == '14h30 - 16h')
      return "5"
}

function previsaoNumber(previsao) {
  if (previsao == '1')
      return "07h10 - 8h"
      if (previsao == '2')
      return "08h10 - 9h"
      if (previsao == '3')
      return "10h - 11h"
      if (previsao == '4')
      return "11h - 12h"
      if (previsao == '5')
      return "14h30 - 16h"

  
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
              ['previsao', 'ASC']
            ],
        });
        let coletas =[];
          let i = 0;

          collect.forEach(coleta => {
            coleta.dataValues.ordem = order(coleta.dataValues.previsao);
            
            coletas.push(coleta)
              
              i++;
          });

        
          console.log(coletas);
        return res.json(coletas);
    },
    async SelecionaColeta (req, res){
      const { id } = req.params;
      const collect = await Collect.findAll({
          where: {
              id : {
              [Op.like]: id
            }
          },
          order: [
              ['previsao', 'ASC']
          ],
      });
      console.log(collect);
      
      return res.json(collect);
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
                ['created_at', 'ASC']
            ],
            
          });

          let coletas =[];
          let i = 0;

          rows.forEach(coleta => {
            coleta.dataValues.ordem = order(coleta.dataValues.previsao);
           
            coletas.push(coleta)
              
              i++;
          });
          return res.json(coletas);
    },

    async ListForDateHour (req, res){
      const { dt_coleta, previsao } = req.params;
      console.log(previsaoNumber(previsao))
      const { count, rows } = await Collect.findAndCountAll({
          where: {
              dt_coleta,
              previsao: previsaoNumber(previsao),
          },
          order: [
              ['created_at', 'ASC']
          ],
          
        });

     
        return res.json(count);
  },

     updateCollect (req, res){
        const id = req.body;
        id.forEach(async element => {
             await Collect.update({ 
               coletado: "true",
               responsavel:element.responsavel,
              }, {
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
            previsao,
            isolamento,
            
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
            previsao,
            isolamento,
        });
        
       return res.json(collect);
    },
}