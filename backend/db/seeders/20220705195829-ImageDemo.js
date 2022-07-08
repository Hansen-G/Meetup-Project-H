'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
     {
      eventId: 1,
      url: 'url1'
     },
    {
      groupId: 1,
      url: 'url2'
     },
      {
        eventId: 2,
        url: 'url3'
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
