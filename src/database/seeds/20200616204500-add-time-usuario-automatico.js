module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query('UPDATE usuarios SET id_time = 6 WHERE id = 1');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE usuarios SET id_time = null WHERE id = 1');
  }
};
