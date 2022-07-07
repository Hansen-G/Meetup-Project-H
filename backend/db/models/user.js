'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }

    // Define an instance method validatePassword in the user.js model file. 
    // It should accept a password string and return true if there is a match with the User instance's hashedPassword. 
    // If there is no match, it should return false.

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    // Use the currentUser scope to return a User with that id.

    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    // Define a static method login in the user.js model file. 
    // It should accept an object with credential and password keys. 
    // The method should search for one User with the specified credential (either a username or an email). 
    // If a user is found, then the method should validate the password by passing 
    // it into the instance's .validatePassword method. 
    // If the password is valid, then the method should return the user by using the currentUser scope.

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }


    // Define a static method signup in the user.js model file that accepts an object 
    // with a username, email, and password key. 
    // Hash the password using the bcryptjs package's hashSync method. 
    // Create a User with the username, email, and hashedPassword. 
    // Return the created user using the currentUser scope.
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      // User.belongsToMany(models.Group,{
      //   through: models.GroupMember
      // });
      User.belongsToMany(models.Event, {
        through: models.EventAttendee
      });
      User.hasMany(models.Group, {
        foreignKey: 'organizerId',
        onDelete: 'CASCADE',

      });
      User.hasMany(models.GroupMember, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',

      });
      User.hasMany(models.EventAttendee, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',

      })

    }
  };
  
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      firstName: {
        type: DataTypes.STRING(56),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(56),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        generalInfoForGroups: {
          attributes: { exclude: ['username','hashedPassword', 'email', 'createdAt', 'updatedAt'] },
        },
        loginUser: {
          attributes: {},
        }
      }
    }
  );
  return User;
};