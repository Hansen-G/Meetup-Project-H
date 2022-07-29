'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
    {
      address: 'Online',
      groupId: 1,
      city: 'Online',
      state: 'Online',
      lat: 0,
      lng: 0,
    },
    {
      address: 'Broadway &, Chambers St, New York, NY 10007',
      groupId: 2,
      city: 'New York',
      state: 'NY',
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      address: '1300 S Linn White Dr, Chicago, IL 60605',
      groupId: 3,
      city: 'Chicago',
      state: 'IL',
      lat: 41.8781,
      lng: -87.6298,
    },
    {
      address: '6000 Santa Monica Blvd, Los Angeles, CA 90038',
      groupId: 1,
      city: 'LA',
      state: 'CA',
      lat: 34.0522,
      lng: -118.2437,
    },
    {
      address: 'Johns Hopkins University',
      groupId: 1,
      city: 'Balitmore',
      state: 'MD',
      lat: 39.2904,
      lng: -76.6122,
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      city: { [Op.in]: ['Baltimore', 'New York', 'Chicago'] }
    }, {});
  }
};
