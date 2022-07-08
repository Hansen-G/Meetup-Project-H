'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
    {
      address: 'AAA',
      groupId: 1,
      city: 'Baltimore',
      state: 'MD',
      lat: 18.783212,
      lng: 60.82393,
    },
    {
      address: 'BBB',
      groupId: 2,
      city: 'New York',
      state: 'NY',
      lat: 19.783212,
      lng: 67.82393,
    },
    {
      address: 'CCC',
      groupId: 3,
      city: 'Chicago',
      state: 'IL',
      lat: 16.783212,
      lng: 50.82393,
    },
    {
      address: 'DDD',
      groupId: 1,
      city: 'LA',
      state: 'CA',
      lat: 16.783212,
      lng: 50.82393,
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
