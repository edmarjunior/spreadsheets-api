import { format } from "date-fns";

import Apontamento from '../models/Apontamento';
import ApontamentoAnalistas from '../models/ApontamentoAnalistas';

class ApontamentoControler {
    async index(req, res) {
        const { 
            analistas: rangeAnalistas, 
            situacoes: rangeSituacoes,
            mes,
            ano,
        } = req.query;

        if (!rangeAnalistas) {
            return res.status(400).json({message: 'Favor informar algum analista'})
        }

        if (!rangeSituacoes) {
            return res.status(400).json({message: 'Favor informar algum status'})
        }

        if (!mes || !ano) {
            return res.status(400).json({message: 'Favor informar o mês e ano'})
        }

        const idsAnalistas = rangeAnalistas === 'todos' ? [] : rangeAnalistas.split(',').map(id => +id);
        
        const apontamentosAnalistas = await ApontamentoAnalistas.findAll({
            include: [
                {
                    required: true,
                    model: Apontamento,
                    as: 'apontamento',
                    where: {
                        mes,
                        ano,
                    }
                },
            ],
            where: rangeAnalistas === 'todos' ? {} : { id_analista: idsAnalistas }
        }); 

        let apontamentosDistinct = [];
        let contador = 0;

        apontamentosAnalistas.forEach(apontamentoAnalista => {
            let { apontamento, apontamento: { indicador_aprovacao } } = apontamentoAnalista;

            if (indicador_aprovacao) {
                indicador_aprovacao = indicador_aprovacao.toUpperCase();
            }

            if (rangeSituacoes !== 'todos') {
                if ((rangeSituacoes.includes('1,2') && !indicador_aprovacao) ||
                    (rangeSituacoes.includes('1,3') && indicador_aprovacao === 'N') ||
                    (rangeSituacoes.includes('2,3') && indicador_aprovacao === 'S') ||
                    (rangeSituacoes === '1' && indicador_aprovacao !== 'S') ||
                    (rangeSituacoes === '2' && indicador_aprovacao !== 'N') ||
                    (rangeSituacoes === '3' && !!indicador_aprovacao)) {
                    return;
                }
            }

            if (apontamentosDistinct.length && apontamentosDistinct.find(ap => ap.id === apontamento.id)) {
                return;
            }

            apontamentosDistinct.push({
                ...apontamento.dataValues,
                data_solicitacao: format(apontamento.data_solicitacao, 'dd/MM/yyyy'),
                inicio: format(apontamento.inicio, 'dd/MM/yyyy'),
                termino: format(apontamento.termino, 'dd/MM/yyyy'),
                contador: ++contador,
            });
        });

        return res.json(apontamentosDistinct);
    }
}

export default new ApontamentoControler();
