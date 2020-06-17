import Sequelize, { Model } from 'sequelize';

class ApontamentoAnalistas extends Model {
	static init(sequelize) {
		super.init(
			{
				minutos_apontados: Sequelize.INTEGER
			},
			{ sequelize }
		);
		return this;
	}

	static associate(models) {
		this.belongsTo(models.Apontamento, { foreignKey: 'id_apontamento', as: 'apontamento', onDelete: 'cascade' });
		this.belongsTo(models.Usuario, { foreignKey: 'id_analista', as: 'analista' });
	}
}

export default ApontamentoAnalistas;
