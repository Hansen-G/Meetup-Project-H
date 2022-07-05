'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
    {
      address: 'AAA',
      city: 'Baltimore',
      state: 'MD',
      latitude: 18.783212,
      longitude: 60.82393,
    },
    {
      address: 'BBB',
      city: 'New York',
      state: 'NY',
      latitude: 19.783212,
      longitude: 67.82393,
    },
    {
      address: 'CCC',
      city: 'Chicago',
      state: 'IL',
      latitude: 16.783212,
      longitude: 50.82393,
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      city: { [Op.in]: ['Baltimore', 'New York', 'Chicago'] }
    }, {});
  }
};
