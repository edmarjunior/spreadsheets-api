import ApontamentoAnalistas from "../models/ApontamentoAnalistas";
import Apontamento from "../models/Apontamento";
import Usuario from "../models/Usuario";
import Time from "../models/Time";
import { compare, convertToHour, sum } from '../../lib/Helper';

class ApontamentoAnalistaController {
    async index(req, res) {
        const { 
            order_property = 'horas_aprovadas', 
            order_direction = 'desc', 
            mes,
            ano 
        } = req.query;
        
        const apontamentos = await ApontamentoAnalistas.findAll({
            include: [
                {
                    required: true,
                    model: Apontamento,
                    as: 'apontamento',
                    attributes: ['id', 'indicador_aprovacao'],
                    where: { mes, ano }
                },
                {
                    model: Usuario,
                    as: 'analista',
                    attributes: ['id', 'nome'],
                    include: [
                        {
                            model: Time,
                            as: 'time',
                            attributes: ['id', 'cor_hexa']
                        }
                    ]
                },
                
            ],
        });

        let analistas = [];

        apontamentos.forEach(a => {
            let analista = analistas.find(x => x.id === a.analista.id);

            if (!analista) {
                analista = { 
                    id: a.analista.id,
                    nome: a.analista.nome,
                    minutos_apontados: 0,
                    minutos_aprovados: 0,
                    minutos_reprovados: 0,
                    minutos_nao_analisados: 0,
                    time: a.analista.time
                };
                
                analistas.push(analista);
            }

            let minutosApontados = a.minutos_apontados;
            let indicadorAprovacao = a.apontamento.indicador_aprovacao;
           
            if (indicadorAprovacao) {
                indicadorAprovacao = indicadorAprovacao.toUpperCase();
            }

            let aprovado = indicadorAprovacao  === 'S';

            analista.minutos_apontados += minutosApontados;
            
            if (!indicadorAprovacao) {
                analista.minutos_nao_analisados += minutosApontados;
            } else if (aprovado) {
                analista.minutos_aprovados += minutosApontados;
            } else {
                analista.minutos_reprovados += minutosApontados;
            }
        });

        const retorno = analistas.map(x => ({
            id: x.id,
            nome: x.nome,
            horas_apontadas: convertToHour(x.minutos_apontados),
            horas_aprovadas: convertToHour(x.minutos_aprovados),
            horas_reprovadas: convertToHour(x.minutos_reprovados),
            horas_nao_analisadas: convertToHour(x.minutos_nao_analisados),
            time: x.time
        }))

        return res.json(retorno.sort((a, b) => compare(a, b, order_property, order_direction)));
    }
}

export default new ApontamentoAnalistaController();
