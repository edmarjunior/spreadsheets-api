import ApontamentoAnalistas from "../models/ApontamentoAnalistas";
import Apontamento from "../models/Apontamento";
import Usuario from "../models/Usuario";
import Time from "../models/Time";
import { compare, convertToHour, sum } from '../../lib/Helper';

class ApontamentoTimeController {
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
                            attributes: ['id', 'nome', 'cor_hexa'],
                        }
                    ]
                },
                
            ]
        });

        let times = [];

        apontamentos.forEach(a => {
            const timeApontamento = a.analista.time;
            let time = times.find(x => x.id === timeApontamento.id);

            if (!time) {
                time = { 
                    ...timeApontamento.dataValues,
                    minutos_apontados: 0,
                    minutos_aprovados: 0,
                    minutos_reprovados: 0,
                    minutos_nao_analisados: 0,
                };
                
                times.push(time);
            }

            let minutosApontados = a.minutos_apontados;
            let indicadorAprovacao = a.apontamento.indicador_aprovacao;

            if (indicadorAprovacao) {
                indicadorAprovacao = indicadorAprovacao.toUpperCase();
            }

            let aprovado = indicadorAprovacao  === 'S';

            time.minutos_apontados += minutosApontados;
            
            if (!indicadorAprovacao) {
                time.minutos_nao_analisados += minutosApontados;
            } else if (aprovado) {
                time.minutos_aprovados += minutosApontados;
            } else {
                time.minutos_reprovados += minutosApontados;
            }
        });

        const retorno = times.map(x => ({
            id: x.id,
            nome: x.nome,
            cor_hexa: x.cor_hexa,
            horas_apontadas: convertToHour(x.minutos_apontados),
            horas_aprovadas: convertToHour(x.minutos_aprovados),
            horas_reprovadas: convertToHour(x.minutos_reprovados),
            horas_nao_analisadas: convertToHour(x.minutos_nao_analisados),
        }))

        return res.json(retorno.sort((a, b) => compare(a, b, order_property, order_direction)));
    }
}

export default new ApontamentoTimeController();
