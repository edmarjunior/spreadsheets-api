module.exports = {
  up: queryInterface  => {
    const dataAtual = new Date();

    return queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Automático Sistema',
        email: 'automatico@smn.com.br',
        senha_hash: process.env.USER_PASS_HASH,
        data_cadastro: dataAtual,
        data_ativacao: dataAtual,
        id_time: null,
        created_at: dataAtual,
        updated_at: dataAtual,
      }
    ], {});
  },

  down: queryInterface => {
      return queryInterface.bulkDelete('usuarios', null, {});
  }
};
