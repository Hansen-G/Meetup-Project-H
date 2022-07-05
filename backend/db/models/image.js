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
      Image.belongsTo(models.Event, {
        foreignKey: 'eventId',
        onDelete: 'CASCADE',
      });
      Image.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
      })
    }
  }
  Image.init({
    eventId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};