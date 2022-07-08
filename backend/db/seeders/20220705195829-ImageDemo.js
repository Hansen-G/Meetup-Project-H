'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
     {
      imageableType: 'event',
      eventId: 1,
      url: 'url1',
      userId: 1
     },
    {
      imageableType: 'group',
      groupId: 1,
      url: 'url2',
      userId: 1
     },
    {
      imageableType: 'event',
      eventId: 2,
      url: 'url3',
      userId: 1
    },
    {
      imageableType: 'event',
      eventId: 1,
      url: 'url4',
      userId: 2
    },
    {
      imageableType: 'group',
      groupId: 1,
      url: 'url5',
      userId: 2
    }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      url: { [Op.in]: ['url1', 'url2', 'url3'] }
    }, {});
  }
};
