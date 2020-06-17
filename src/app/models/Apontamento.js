import Sequelize, { Model } from 'sequelize';

class Apontamento extends Model {
	static init(sequelize) {
		super.init(
			{
				data_solicitacao: Sequelize.DATE,
				range_analistas: Sequelize.STRING,
				tipo_tendimento: Sequelize.STRING,
				solicitante: Sequelize.STRING,
				area: Sequelize.STRING,
				inicio: Sequelize.DATE,
				termino: Sequelize.DATE,
				assunto: Sequelize.STRING,
				descricao: Sequelize.STRING,
				minutos_apontados: Sequelize.INTEGER,
				indicador_aprovacao: Sequelize.STRING,
				anotacao: Sequelize.STRING,
				nota: Sequelize.STRING,
				mes: Sequelize.INTEGER,
				ano: Sequelize.INTEGER,

			},
			{ sequelize }
		);
		return this;
	}
}

export default Apontamento;
