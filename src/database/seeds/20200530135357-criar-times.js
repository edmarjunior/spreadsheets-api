module.exports = {
  up: (queryInterface, Sequelize) => {
    const dataAtual = new Date();
    
    return queryInterface.bulkInsert('times', [
      {
        nome: 'Tábata',
        cor_hexa: '#F53107',
        id_usuario_cad: 1,
        created_at: dataAtual,
        updated_at: dataAtual,
      },
      {
        nome: 'Suporte',
        cor_hexa: '#07F536',
        id_usuario_cad: 1,
        created_at: dataAtual,
        updated_at: dataAtual,
      },
      {
        nome: 'Rondinele',
        cor_hexa: '#EAF507',
        id_usuario_cad: 1,
        created_at: dataAtual,
        updated_at: dataAtual,
      },
      {
        nome: 'Lilian',
        cor_hexa: '#07ADF5',
        id_usuario_cad: 1,
        created_at: dataAtual,
        updated_at: dataAtual,
      },
      {
        nome: 'Felipe',
        cor_hexa: '#a300ff',
        id_usuario_cad: 1,
        created_at: dataAtual,
        updated_at: dataAtual,
      },
      {
        nome: 'Outros',
        cor_hexa: '#ddd',
        id_usuario_cad: 1,
        created_at: dataAtual,
        updated_at: dataAtual,
      },
    ], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('times', null, {});
  }
};
