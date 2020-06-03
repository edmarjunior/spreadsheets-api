module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('usuarios', 'id_time', {
			type: Sequelize.INTEGER,
			references: { model: 'times', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
			allowNull: true,
		});
	},

	down: queryInterface => {
		return queryInterface.removeColumn('usuarios', 'id_time');
	},
};
