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
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793142/WeMeet/group1_o344yu.jpg'
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
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793142/WeMeet/group2_bzbjcl.jpg'
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
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793142/WeMeet/group3_isboka.jpg'
        },
        {
          organizerId: 3,
          name: 'HG Group4',
          about: 'HG first group',
          type: 'Game',
          private: false,
          city: 'Baltimore',
          state: 'MD',
          numMembers: 100,
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793142/WeMeet/group4_h9xjyt.jpg'
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
