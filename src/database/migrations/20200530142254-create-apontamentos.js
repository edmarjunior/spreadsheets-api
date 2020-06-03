'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('apontamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_solicitacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      range_analistas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_tendimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      solicitante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      termino: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      assunto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
      minutos_apontados: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      indicador_aprovacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      anotacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nota: {
        type: Sequelize.STRING,
        allowNull: true,
      },
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('apontamentos');
  }
};