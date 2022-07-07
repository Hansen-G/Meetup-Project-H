'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupMember.belongsTo(models.User, {
        foreignKey: 'userId',
      }),
      GroupMember.belongsTo(models.Group, {
        foreignKey: 'groupId',
      })
    }
  }
  GroupMember.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    memberStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GroupMember',
  });
  return GroupMember;
};