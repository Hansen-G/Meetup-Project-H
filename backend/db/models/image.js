'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, {
        foreignKey: 'userId',
        // onDelete: 'CASCADE',
      });
      Image.belongsTo(models.Group, {
        foreignKey: 'groupId',
        // onDelete: 'CASCADE',
      });
      Image.belongsTo(models.Event, {
        foreignKey: 'eventId',
        // onDelete: 'CASCADE',
      })
    }
  }
  Image.init({
    imageableType: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['group', 'event']]
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      validate:{
        eitherOr(value){
          if (this.groupId && value){
            throw new Error ("Can only have either evenId or groupId")
          }
        }
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      validate: {
        eitherOr(value) {
          if (this.eventId && value) {
            throw new Error("Can only have either evenId or groupId")
          }
        }
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        include: ['url']
      }
    },
  });
  return Image;
};