'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {
      // define association here
      // Group.belongsToMany(models.User, {
      //   through: models.GroupMember
      // });
      Group.hasMany(models.Image, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',

      });
      Group.hasMany(models.Event, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',

      });
      Group.belongsTo(models.User, {
        foreignKey: 'organizerId',
        // onDelete: 'CASCADE',
      });
      Group.hasMany(models.GroupMember, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',

      })
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: { 
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 60],
      }
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        len: [50, 10000],
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['In person', 'Online']],
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },   
    numMembers: {
      type: DataTypes.INTEGER,
     
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};