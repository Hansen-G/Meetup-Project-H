'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventAttendees', [
      {
        eventId: 1,
        userId: 1,
        attendeeStatus: 'Panding'
      },
      {
        eventId: 1,
        userId: 2,
        attendeeStatus: 'Accepted'
      },
      {
        eventId: 1,
        userId: 3,
        attendeeStatus: 'Waiting list'
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('EventAttendees', {
      eventId: { [Op.in]: [ 1 ] }
    }, {});

  }
};
