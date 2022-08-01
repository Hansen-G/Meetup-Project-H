'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [

    {
      imageableType: 'group',
      groupId: 1,
      url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572770/cld-sample-4.jpg',
      userId: 1
     },
    {
      imageableType: 'group',
      groupId: 1,
      url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample.jpg',
      userId: 2
    },
      {
        imageableType: 'group',
        groupId: 1,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572752/samples/bike.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 1,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572758/samples/cloudinary-group.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 1,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572759/samples/animals/kitten-playing.gif',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 2,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572771/cld-sample-5.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 2,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572770/cld-sample-3.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 2,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572770/cld-sample-3.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 3,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample.jpg',
        userId: 2
      },
      {
        imageableType: 'group',
        groupId: 3,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572752/samples/bike.jpg',
        userId: 1
      },


      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572770/cld-sample-4.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample.jpg',
        userId: 2
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572752/samples/bike.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572758/samples/cloudinary-group.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572759/samples/animals/kitten-playing.gif',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572771/cld-sample-5.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572770/cld-sample-3.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572770/cld-sample-3.jpg',
        userId: 1
      },
      {
        imageableType: 'group',
        groupId: 3,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample.jpg',
        userId: 2
      },
      {
        imageableType: 'group',
        groupId: 4,
        url: 'https://res.cloudinary.com/hansenguo/image/upload/v1654572752/samples/bike.jpg',
        userId: 1
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      url: { [Op.in]: ['url1', 'url2', 'url3'] }
    }, {});
  }
};
