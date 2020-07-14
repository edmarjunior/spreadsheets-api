
import Tabletop from "tabletop";

import { convertToNumericMonth } from "../../lib/Helper";

class ApontamentoPeriodosController {
    index(req, res) {

        Tabletop.init({
            key: process.env.APONTAMENTOS_KEY,
            callback: (dataIgnore, googleData) => {

                let periodos = [];
                let id = 1000;

                for (let prop in dataIgnore) {
                    const [mes, ano] = prop.split('/');
                    
                    periodos.push({
                        id,
                        nome: prop,
                        mes: convertToNumericMonth(mes),
                        ano: +ano
                    });

                    id--;
                }

                return res.json(periodos);
            }
        });
    }
}

export default new ApontamentoPeriodosController();
