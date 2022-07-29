'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', 
      [
        {
          organizerId: 1,
          name: '1 NYC MLOps Community',
          about: 'MLOps NYC is a local meetup that talks about the engineering challenges of deploying and maintaining ML solutions. MLOps is the extension of the DevOps methodology to include Machine Learning and Data Science. As the industry of Machine Learning matures, the requirement of deploying ML- based applications to production facing more and more challenges bringing the Software Development Life Cycle.', 
          type: 'Tech',
          private: false,
          city: 'New York',
          state: 'NY',
          numMembers: 780,
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1659068349/WeMeet/group1_hcqspo.webp'
        },
        {
          organizerId: 2,
          name: '2 JavaScript New York',
          about: 'JavaScript New York is a volunteer-run community that aims to support people on their journey to learn JavaScript. This group is open to all, especially those on a self-directed learning path.',
          type: 'Tech',
          private: true,
          city: 'New York',
          state: 'NY',
          numMembers: 90,
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1659068349/WeMeet/group2_dcu5ik.webp'
        },
        {
          organizerId: 3,
          name: '3 Chicago Hiking, Outdoor & Adventures for Young Professionals',
          about: '"The best things in life are the people we love, the places we\'ve been, and the memories we\'ve made along the way." Hello Chicago! Welcome to the Chicago Hiking, Outdoor, & Adventures for Young Professionals Group. This is a group for any young professionals interested in hiking, camping, backpacking, running, exploring outdoors, challenging new things, etc. The main purpose to start this group is to meet good people and make friends as well as explore the nature together and build a better community. We\'re looking forward to exploring the outdoors with \'YOU\' who are nice, kind, respectful, generous, and honest people.Get up and join with us.Stay positive and enjoy your life!',
          type: 'Sport',
          private: false,
          city: 'Baltimore',
          state: 'MD',
          numMembers: 100,
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1659068349/WeMeet/group3_lztxjx.webp'
        },
        {
          organizerId: 3,
          name: '4 Crofton-Odenton 55+ Social Scene',
          about: 'This is a social group looking to get out and enjoy life. Our purpose is to make new friends, have adventures and do fun things together in the area. Activities include: Going to dinner, dancing, movies, live music, wine tastings, day trips, and whatever anyone might want to host. Guidelines/ Policies.',
          type: 'Social',
          private: true,
          city: 'Baltimore',
          state: 'MD',
          numMembers: 100,
          previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1659068349/WeMeet/group4_l8h45c.webp'
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
