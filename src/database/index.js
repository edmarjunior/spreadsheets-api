import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Usuario from '../app/models/Usuario';
import Time from '../app/models/Time';
import Apontamento from '../app/models/Apontamento';
import ApontamentoAnalistas from '../app/models/ApontamentoAnalistas';

const models = [Usuario, Time, Apontamento, ApontamentoAnalistas];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models.map(model => model.init(this.connection));

		models.forEach(model => {
			if (model.associate) model.associate(this.connection.models);
		});
	}
}

export default new Database();
