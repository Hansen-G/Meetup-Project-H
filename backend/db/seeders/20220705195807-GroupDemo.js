'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', 
      [
        {
          organizerId: 1,
          name: 'HansenS Group1',
          about: 'Hansen first group',
          type: 'Game',
          private: true,
          city: 'Baltimore',
          state: 'MD',
          numMembers: 10,
          previewImage: 'url1'
        },
        {
          organizerId: 2,
          name: 'KevinS Group2',
          about: 'Kevin first group',
          type: 'Game',
          private: true,
          city: 'Baltimore',
          state: 'MD',
          numMembers: 90,
          previewImage: 'url2'
        },
        {
          organizerId: 3,
          name: 'DanS Group3',
          about: 'Dan first group',
          type: 'Game',
          private: false,
          city: 'Baltimore',
          state: 'MD',
          numMembers: 100,
          previewImage: 'url3'
        }
      ], {});

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ['HansenS Group', 'KevinS Group2', 'DanS Group3'] }
    }, {});
  }
};
