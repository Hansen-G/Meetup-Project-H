'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'john.smith@gmail.com',
        username: 'FakeUser0',
        hashedPassword: bcrypt.hashSync('secret password'),
        firstName: 'John',
        lastName: 'Smith',
      },
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Hansen',
        lastName: 'Guo',
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Kevin',
        lastName: 'Zhang',
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Don',
        lastName: 'Chin',
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Don3',
        lastName: 'Chin',
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Don4',
        lastName: 'Chin',
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Don5',
        lastName: 'Chin',
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Don6',
        lastName: 'Chin',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
