module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('apontamentos', 'ano', {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
	},

	down: queryInterface => {
		return queryInterface.removeColumn('apontamentos', 'ano');
	},
};
