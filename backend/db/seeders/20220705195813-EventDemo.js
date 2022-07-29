'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: 2,
        name: 'Event1 AI Roundtable: Quantum Computing',
        type: 'Online',
        description: 'Our July 20 TEDCO AI Roundtable session features expert guest Piotr Kulczakowicz',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event1_tpi7bo.webp'
      },
      {
        groupId: 2,
        venueId: 3,
        name: 'Event2 Social Anxiety & Grounding',
        type: 'In Person',
        description: 'I want to share a tool that has helped me a bunch on this journey - GROUNDING. Some of you may already be familiar with this concept, others totally new to it. Either way, I want to share what works for me so far, and how grounding has brought tremendous support to my life while dealing with social anxiety.',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 100,
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event2_j1dhaz.webp'
      },
      {
        groupId: 3,
        venueId: 4,
        name: 'Event3 The Cartographers Book Discussion',
        type: 'Online',
        description: 'The votes are in… our August Book will be The Cartographers by Peng Shepherd. We will meet again by the tables near Burger Bar in Cross Street Market. I’ll be the one with the Cartographers on the table in front of her :p',
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
        name: 'Event4 The Memory Librarian by Janelle Monae',
        type: 'Online',
        description: 'Hello, moms, dads, and caregivers living in Catonsville, Ellicott City and Columbia. Are you new to the area? Just had a baby? Need pint-sized playmates for your preschoolers? ',
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
        description: 'Our June 30 TEDCO AI Roundtable session features Larry Brown from NVIDIA for a discussion machine learning and modeling with training on GPUs',
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
        description: 'Our June 30 TEDCO AI Roundtable session features Larry Brown from NVIDIA for a discussion machine learning and modeling with training on GPUs',
        startDate: '2022-07-06 20:00:00',
        endDate: '2022-07-10 20:00:00',
        price: 10,
        capacity: 10,
        numAttending: 9,
        previewImage: 'https://res.cloudinary.com/hansenguo/image/upload/v1658793269/WeMeet/event1_tpi7bo.webp'
      },
      {
        groupId: 2,
        venueId: 1,
        name: 'AIII Roundtable: MAGIC, Digital Twins & Tech Ecosystems with guest Graham Dodge',
        type: 'Online',
        description: 'Our June 30 TEDCO AI Roundtable session features Larry Brown from NVIDIA for a discussion machine learning and modeling with training on GPUs',
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
        name: 'AP Roundtable: MAGIC, Digital Twins & Tech Ecosystems with guest Graham Dodge',
        type: 'Online',
        description: 'Our June 30 TEDCO AI Roundtable session features Larry Brown from NVIDIA for a discussion machine learning and modeling with training on GPUs',
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
