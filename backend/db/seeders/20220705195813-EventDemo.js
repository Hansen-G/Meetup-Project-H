'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: 1,
        name: 'Event1 AI Roundtable: Quantum Computing',
        type: 'Online',
        description: 'Our July 20 TEDCO AI Roundtable session features expert guest Piotr Kulczakowicz, director of the Quantum Startup Foundry at University of Maryland. Our focus topic will be quantum computing: technology and applications including machine learning and optimization, QC work in Maryland and the DMV, and opportunities. There\'s a lot of activity locally, in the federal government, universities, industry, and via consortia.One of the leading QC startups, IonQ(https://ionq.com/), is headquartered in College Park.',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event1_tpi7bo.webp'
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
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event2_j1dhaz.webp'
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
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event3_ro8fuj.webp'
      },
      {
        groupId: 4,
        venueId: 1,
        name: 'Event4',
        type: 'Online',
        description: 'HIIIhhi',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-01 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event4_ainztp.webp'
      },
      {
        groupId: 1,
        venueId: 1,
        name: 'Event5 AI Roundtable: Machine learning and modeling with training on GPUs',
        type: 'Online',
        description: 'Our June 30 TEDCO AI Roundtable session features Larry Brown from NVIDIA for a discussion machine learning and modeling with training on GPUs (graphics processing units) and also the federal marketplace, given Larry\'s NVIDIA role as a federal solutions architect.This will be a fully participatory discussion, online starting at 4 pm.Please bring your own experiences and insights to the session!',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event1_tpi7bo.webp'
      },
      {
        groupId: 1,
        venueId: 1,
        name: 'AI Roundtable: MAGIC, Digital Twins & Tech Ecosystems with guest Graham Dodge',
        type: 'Online',
        description: 'Our June 30 TEDCO AI Roundtable session features Larry Brown from NVIDIA for a discussion machine learning and modeling with training on GPUs (graphics processing units) and also the federal marketplace, given Larry\'s NVIDIA role as a federal solutions architect.This will be a fully participatory discussion, online starting at 4 pm.Please bring your own experiences and insights to the session!',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event1_tpi7bo.webp'
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
