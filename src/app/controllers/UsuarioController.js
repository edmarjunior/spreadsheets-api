import Usuario from "../models/Usuario";

class UsuarioController {
    async index(req, res) {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nome', 'email']
        });
        return res.json(usuarios);
    }
}

export default new UsuarioController();
