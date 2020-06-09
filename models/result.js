'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Result = loader.database.define('results', {
  userId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  userTwitterId: { //userと同じ
    type: Sequelize.STRING,
    primaryKey: false,
    allowNull: false
  },
  win: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  lose: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  draw: {
    type: Sequelize.INTEGER,
    allowNull: false  
  },
  gu: {
      type: Sequelize.INTEGER,
      allowNull: false  
  },
  choki: {
    type: Sequelize.INTEGER,
    allowNull: false  
  },
  pa: {
    type: Sequelize.INTEGER,
    allowNull: false  
  },
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = Result;