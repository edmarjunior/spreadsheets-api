module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('times', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			nome: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			cor_hexa: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			id_usuario_cad: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'usuarios',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
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
		return queryInterface.dropTable('times');
	},
};
