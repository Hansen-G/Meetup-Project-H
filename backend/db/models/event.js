'use strict';
const {
  Model
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
      Event.belongsToMany(models.User, {
        through: models.EventAttendee
      });
      Event.hasMany(models.Image, {
        foreignKey: 'eventId',
      });
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId',
      });
      Event.belongsTo(models.Group, {
        foreignKey: 'groupId',
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
    },
    description: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: DataTypes.NOW
        //TO BE DONE IN THE FUTURE
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isAfter: this.startDate
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
      allowNull: false,
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};