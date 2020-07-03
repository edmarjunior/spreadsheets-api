import Usuario from "../models/Usuario";
import Time from "../models/Time";

class UsuarioController {
    async index(req, res) {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nome', 'email'],
            include: [
                {
                    model: Time,
                    as: 'time',
                    attributes: ['id', 'nome', 'cor_hexa']
                }
            ]
        });
        return res.json(usuarios);
    }
}

export default new UsuarioController();
