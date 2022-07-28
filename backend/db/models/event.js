'use strict';
const {
  Model, NOW
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Event.belongsToMany(models.User, {
      //   through: models.EventAttendee
      // });
      Event.hasMany(models.Image, {
        foreignKey: 'eventId',
        onDelete: 'CASCADE',

      });
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId',
        // onDelete: 'CASCADE',
      });
      Event.belongsTo(models.Group, {
        foreignKey: 'groupId',
        // onDelete: 'CASCADE',
      })
      Event.hasMany(models.EventAttendee, {
        foreignKey:'eventId',
        onDelete: 'CASCADE',

      })

    }
  }
  Event.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['Online', 'In Person']]
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: sequelize.fn('NOW') 
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        endDateAfterStartDate(value) {
          if (value < this.startDate) {
            throw new Error('Must be after start date');
          }
        }
      }
    },
    price:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numAttending: {
      type: DataTypes.INTEGER,
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Event',
    defaultScope: {
      attributes: {
        exclude: ['price', 'createdAt', 'updatedAt']
      },
    }
  });
  return Event;
};