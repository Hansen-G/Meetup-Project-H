'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: 1,
        name: 'Event1',
        type: 'Online',
        description: 'HIII',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'url1'
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'Event2',
        type: 'In Person',
        description: 'HIII',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 100,
        previewImage: 'url2'
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'Event3',
        type: 'Online',
        description: 'HIII',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-01 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'url3'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      name: { [Op.in]: ['Event1', 'Event2', 'Event3'] }
    }, {});
  }
};
