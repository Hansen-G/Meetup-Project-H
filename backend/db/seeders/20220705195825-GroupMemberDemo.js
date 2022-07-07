'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupMembers', [
      {
        userId: 1,
        groupId: 1,
        memberStatus: 'member',
      },
      {
        userId: 1,
        groupId: 2,
        memberStatus: 'member',
      },
      {
        userId: 1,
        groupId: 3,
        memberStatus: 'member',
      },
      {
        userId: 2,
        groupId: 1,
        memberStatus: 'pending',
      },
      {
        userId: 2,
        groupId: 2,
        memberStatus: 'pending',
      },
      {
        userId: 3,
        groupId: 2,
        memberStatus: 'pending',
      },
      {
        userId: 3,
        groupId: 4,
        memberStatus: 'pending',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupMembers', {
      userId: { [Op.in]: [ 1 ] }
    }, {});
  }
};
