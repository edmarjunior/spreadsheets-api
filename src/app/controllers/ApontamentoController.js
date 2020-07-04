import Apontamento from '../models/Apontamento';
import ApontamentoAnalistas from '../models/ApontamentoAnalistas';
import { attrs } from 'factory-girl';

class ApontamentoControler {
    async index(req, res) {
        const { 
            analistas: rangeAnalistas, 
            situacoes: rangeSituacoes,
            mes,
            ano,
        } = req.query;

        const idsAnalistas = rangeAnalistas === 'todos' ? [] : rangeAnalistas.split(',').map(id => +id);

        console.log(rangeAnalistas);
        console.log(idsAnalistas);

        let apontamentosAnalistas;
        
        if (rangeAnalistas === 'todos') {
            apontamentosAnalistas = await ApontamentoAnalistas.findAll({
                include: [
                    {
                        model: Apontamento,
                        as: 'apontamento',
                        attributes: ['id', 'range_analistas', 'assunto', 'descricao', 'indicador_aprovacao']
                    }
                ]
            }); 
        } else {
            apontamentosAnalistas = await ApontamentoAnalistas.findAll({
                include: [
                    {
                        model: Apontamento,
                        as: 'apontamento',
                        attributes: ['id', 'range_analistas', 'assunto', 'descricao', 'indicador_aprovacao']
                    }
                ],
                where: {
                    id_analista: idsAnalistas 
                }
            }); 
        }

        let apontamentosDistinct = [];

        apontamentosAnalistas.forEach(apontamento => {
            if (apontamentosDistinct.length && apontamentosDistinct.find(ap => ap.id === apontamento.apontamento.id)) {
                return;
            }

            apontamentosDistinct.push({
                range_analistas: apontamento.apontamento.range_analistas,
                assunto: apontamento.apontamento.assunto,
                descricao: apontamento.apontamento.descricao,
                indicador_aprovacao: apontamento.apontamento.indicador_aprovacao,
            });
        })

        return res.json(apontamentosDistinct);
    }
}

export default new ApontamentoControler();
