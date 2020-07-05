
import Tabletop from "tabletop";

import { convertToNumericMonth } from "../../lib/Helper";

class ApontamentoPeriodosController {
    index(req, res) {

        Tabletop.init({
            key: process.env.APONTAMENTOS_KEY,
            callback: (dataIgnore, googleData) => {

                let periodos = [];
                let id = 0;
                for (let prop in dataIgnore) {
                    id++;
                    const [mes, ano] = prop.split('/')
                    periodos.push({
                        id,
                        nome: prop,
                        mes: convertToNumericMonth(mes),
                        ano: +ano
                    })
                }

                return res.json(periodos);
            }
        });
    }
}

export default new ApontamentoPeriodosController();
