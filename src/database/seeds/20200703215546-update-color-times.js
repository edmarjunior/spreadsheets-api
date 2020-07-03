module.exports = {
  up: queryInterface => {
      return queryInterface.sequelize.query(
        `UPDATE times SET cor_hexa = '#28a745' WHERE id = 2; ` +
        `UPDATE times SET cor_hexa = '#ffc107' WHERE id = 3; ` +
        `UPDATE times SET cor_hexa = '#007bff' WHERE id = 4; ` +
        `UPDATE times SET cor_hexa = '#333333' WHERE id = 6;`
      );
  },

  down: queryInterface => {
    return queryInterface.sequelize.query(
      `UPDATE times SET cor_hexa = '#28a745' WHERE id = 2; ` +
      `UPDATE times SET cor_hexa = '#ffc107' WHERE id = 3; ` +
      `UPDATE times SET cor_hexa = '#007bff' WHERE id = 4; ` +
      `UPDATE times SET cor_hexa = '#333333' WHERE id = 6;`
    );
  }
};
