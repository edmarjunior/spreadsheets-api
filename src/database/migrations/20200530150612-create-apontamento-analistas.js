module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('apontamento_analistas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_apontamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
				references: {
					model: 'apontamentos',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
      },
      id_analista: {
        type: Sequelize.INTEGER,
        allowNull: false,
				references: {
					model: 'usuarios',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
      },
      minutos_apontados: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('apontamento-analistas');
  }
};