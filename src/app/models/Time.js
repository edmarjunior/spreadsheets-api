import Sequelize, { Model } from 'sequelize';

class Time extends Model {
	static init(sequelize) {
		super.init(
			{
				nome: Sequelize.STRING,
                cor_hexa: Sequelize.STRING,
                data_cadastro: Sequelize.DATE,
			},
			{ sequelize }
		);
        
		return this;
	}
}

export default Time;
