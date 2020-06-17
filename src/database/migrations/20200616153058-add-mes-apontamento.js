module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('apontamentos', 'mes', {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
	},

	down: queryInterface => {
		return queryInterface.removeColumn('apontamentos', 'mes');
	},
};
