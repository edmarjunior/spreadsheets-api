import Tabletop from "tabletop";
import Apontamento from "../models/Apontamento";
import ApontamentoAnalistas from "../models/ApontamentoAnalistas";
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];

class ApontamentosPlanilhaController {
    async index(req, res) {
        const { mes, ano } = req.query;

        if (!mes || !ano) {
            return res.status(400).json({ error: "Não foi enviado o mes/ano dos apontamentos" })
        }
        

        Tabletop.init({
            key: process.env.APONTAMENTOS_KEY,
            callback: (dataIgnore, googleData) => {
                const mesAno = `${meses[+mes - 1]}/${ano}`;
                const data = {
                    elements: googleData.models[mesAno].elements,
                    mes,
                    ano
                };

                const ultima_linha_lida = data.elements.length + 1;
                const apontamentos = ApontamentosPlanilhaController.readGoogleData(data);
               
                return res.json({
                    ultima_linha_lida,
                    apontamentos
                });
            },
            simpleSheet: true
        })
    }

    async store(req, res) {
        const { mes, ano } = req.query;

        if (!mes || !ano) {
            return res.status(400).json({ error: "Não foi enviado o mes/ano dos apontamentos" })
        }

        Tabletop.init({
            key: process.env.APONTAMENTOS_KEY,
            callback: async (dataIgnore, googleData)  =>  {
                const mesAno = `${meses[+mes - 1]}/${ano}`;
                const data = {
                    elements: googleData.models[mesAno].elements,
                    mes,
                    ano
                };

                const ultima_linha_lida = data.elements.length + 1;
                const apontamentos = ApontamentosPlanilhaController.readGoogleData(data);
                
                if (!apontamentos) {
                   return res.status(400).json({ error: 'Nenhum apontamento para ser sincronizado'}) 
                }

                const apontamentosAnalistasDb = await ApontamentoAnalistas.findAll({
                    include: [
                        {
                            required: true,
                            model: Apontamento,
                            as: 'apontamento',
                            attributes: ['id', 'mes', 'ano'],
                            where: { mes, ano }
                        }
                    ]
                })

                const idsApontamentos = apontamentosAnalistasDb.map(x => x.apontamento.id);
                let idsApontamentosDistintos = [];
                
                idsApontamentos.forEach((i) => {
                    if (idsApontamentosDistintos.indexOf(i) < 0) {
                        idsApontamentosDistintos.push(i);
                    }
                })

                await ApontamentoAnalistas.destroy({
                    where: {
                        id_apontamento: idsApontamentos
                    }
                });
                
                await Apontamento.destroy({ 
                    where: { 
                        mes: +mes, 
                        ano: +ano,
                    } 
                });

                await Apontamento.bulkCreate(apontamentos);

                const apontamentosDb = await Apontamento.findAll({
                    where: { 
                        mes: +mes, 
                        ano: +ano,
                    } 
                });

                let apontamentosAnalistas = [];

                apontamentosDb.forEach(a => {
                    a.range_analistas = a.range_analistas.toLowerCase();

                    let analistas = [];

                    if (a.range_analistas.includes('alexandre'))
                        analistas.push(2); // Alexandre

                    if (a.range_analistas.includes('alysson'))
                        analistas.push(3); // Alysson
                    
                    if (a.range_analistas.includes('bruno'))
                        analistas.push(4); // "Bruno Alves

                    if (a.range_analistas.includes('caires'))
                        analistas.push(5); // Caires Pezzoni

                    if (a.range_analistas.includes('claudanilo'))
                        analistas.push(6); // Claudanilo Xavier

                    if (a.range_analistas.includes('diego')
                        || a.range_analistas.includes('ruguê'))
                        analistas.push(7); // Diego Ruguê

                    if (a.range_analistas.includes('douglas'))
                        analistas.push(8); // Douglas da Mata

                    if (a.range_analistas.includes('edmar'))
                        analistas.push(9); // Edmar

                    if (a.range_analistas.includes('ericson'))
                        analistas.push(10); // Ericson

                    if (a.range_analistas.includes('felipe'))
                        analistas.push(11); // Felipe Araujo

                    if (a.range_analistas.includes('calza'))
                        analistas.push(12); // Felipe Calza
                        
                    if (a.range_analistas.includes('guilherme'))
                        analistas.push(13); // Guilherme Souza
                        
                    if (a.range_analistas.includes('gustavo'))
                        analistas.push(14); // Gustavo Dantas
                        
                    if (a.range_analistas.includes('maritan'))
                        analistas.push(15); // Gustavo Maritan
                        
                    if (a.range_analistas.includes('josiel'))
                        analistas.push(16); // Josiel
                        
                    if (a.range_analistas.includes('joão')
                        || a.range_analistas.includes('joao'))
                        analistas.push(17); // João Gabriel"
                        
                    if (a.range_analistas.includes('lenon'))
                        analistas.push(18); // Lenon Bordini
                        
                    if (a.range_analistas.includes('lamarca'))
                        analistas.push(19); // Lilian Lamarca
                        
                    if (a.range_analistas.includes('luan'))
                        analistas.push(20); // Luan Felipe
                        
                    if (a.range_analistas.includes('marcos'))
                        analistas.push(21); // Marcos Vinicius
                        
                    if (a.range_analistas.includes('maria'))
                        analistas.push(22); // Maria Andressa
                        
                    if (a.range_analistas.includes('rafael'))
                        analistas.push(23); // Rafael Morais
                        
                    if (a.range_analistas.includes('pessoni'))
                        analistas.push(24); // Rafael Pessoni
                        
                    if (a.range_analistas.includes('rívia')
                        || a.range_analistas.includes('rivia'))
                        analistas.push(25); // Rivia Araújo
                        
                    if (a.range_analistas.includes('rondinele'))
                        analistas.push(26); // Rondinele Lourenço
                        
                    if (a.range_analistas.includes('tábata')
                        || a.range_analistas.includes('tabata'))
                        analistas.push(27); // Tábata Vasconcelos
                        
                    if (a.range_analistas.includes('vinícius lemes')
                        || a.range_analistas.includes('vinicius lemes'))
                        analistas.push(28); // Vinícius Lemes
                        
                    if (a.range_analistas.includes('mussak'))
                        analistas.push(29); // Vinícius Mussak

                    if (a.range_analistas.includes('ricardo'))
                        analistas.push(30); // Ricardo Corrales
                    
                    if (!analistas.length)
                        analistas.push(1); // Automático Sistema
                    
                    let saldo = a.minutos_apontados;

                    let analistasComMinutos = analistas.map(id_analista => {
                        
                        const dividido = Math.floor(a.minutos_apontados / analistas.length);
                        saldo -= dividido

                        return {
                            id_analista,
                            id_apontamento: a.id,
                            minutos_apontados: dividido
                        }
                    });

                    if (saldo)
                        analistasComMinutos[0].minutos_apontados += saldo;

                    apontamentosAnalistas = [...apontamentosAnalistas, ...analistasComMinutos];
                });

                await ApontamentoAnalistas.bulkCreate(apontamentosAnalistas);

                return res.json({
                    ultima_linha_lida,
                    qtd_apontamentos_antes: idsApontamentosDistintos.length,
                    qtd_apontamentos_atual: apontamentos.length
                });
            },
            simpleSheet: true
        });
    }

    static readGoogleData = (data) => {
        const dataAtual = new Date();
        let apontamentos = [];

        data.elements.forEach(row => {
            const nomeAnalista = row['Analista'].trim().toLowerCase();
            
            if (!nomeAnalista) {
                return;
            }

            apontamentos.push({
                data_solicitacao: dataAtual, //row['Data da Solicitação'],
                range_analistas: row['Analista'],
                tipo_tendimento: row['Tipo de Atendimento'],
                solicitante: row['Solicitante'],
                area: row['Área'],
                inicio: dataAtual, //row['Início'],
                termino: dataAtual, //row['Término'],
                assunto: row['Assunto'],
                descricao: row['Descrição da solução'],
                minutos_apontados: +row['Tempo gasto (Minutos)'],
                indicador_aprovacao: row['Aprovado? (S/N) [Wagner]'],
                anotacao: row['Anotação'],
                nota: row['Nota'],
                mes: +data.mes,
                ano: +data.ano,
            });
        });

        return apontamentos;
    }
}

export default new ApontamentosPlanilhaController();
