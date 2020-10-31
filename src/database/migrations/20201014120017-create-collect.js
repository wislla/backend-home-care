'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.createTable('collect', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
       },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cpf:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      dt_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      convenio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      num_carteira: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ponto_ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      exames: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dt_coleta: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      obs: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor_total: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      recebido: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      coletado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      responsavel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      previsao: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      });
     
     
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('collect');
     
  }
};
