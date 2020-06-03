import Time from "../models/Time";

class TimeController {
    async index(req, res) {
        const times = await Time.findAll({
            attributes: ['id', 'nome', 'cor_hexa']
        });
        return res.json(times);
    }
}

export default new TimeController();
