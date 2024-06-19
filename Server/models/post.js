const Sequelize = require('sequelize');

const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    location: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    isOpen: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    brightness: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    checkDate: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    temp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    humidity: {
      type: DataTypes.STRING(10),
      allowNull: true,
    }
  }, {
    timestamps: false,
    underscored: false,
    modelName: 'Post',
    tableName: 'posts',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  return Post;
};

module.exports = Post;
