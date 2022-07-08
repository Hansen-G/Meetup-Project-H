'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventAttendees', [
      {
        eventId: 1,
        userId: 1,
        attendeeStatus: 'pending'
      },
      {
        eventId: 1,
        userId: 2,
        attendeeStatus: 'member'
      },
      {
        eventId: 1,
        userId: 3,
        attendeeStatus: 'waiting list'
      },
      {
        eventId: 2,
        userId: 1,
        attendeeStatus: 'member'
      },
      {
        eventId: 2,
        userId: 2,
        attendeeStatus: 'waiting list'
      },
      {
        eventId: 2,
        userId: 3,
        attendeeStatus: 'pending'
      },
      {
        eventId: 3,
        userId: 3,
        attendeeStatus: 'waiting list'
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
