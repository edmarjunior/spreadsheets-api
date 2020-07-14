
import Tabletop from "tabletop";

import { convertToNumericMonth } from "../../lib/Helper";

class ApontamentoPeriodosController {
    index(req, res) {

        Tabletop.init({
            key: process.env.APONTAMENTOS_KEY,
            callback: (dataIgnore, googleData) => {
                let periodos = [];

                for (let prop in dataIgnore) {
                    const [mes, ano] = prop.split('/');
                    
                    periodos.push({
                        nome: prop,
                        mes: convertToNumericMonth(mes),
                        ano: +ano
                    });
                }

                let id = 1000;

                return res.json(periodos
                    .sort((a, b) => a.ano > b.ano ? -1 : 1)
                    .sort((a, b) => a.mes > b.mes ? -1 : 1)
                    .map(periodo => ({
                        ...periodo,
                        id: id--,
                    })));
            }
        });
    }
}

export default new ApontamentoPeriodosController();
