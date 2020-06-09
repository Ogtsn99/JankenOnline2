'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Results = loader.database.define('results', {
  userId: { //userと同じにする
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  userTwitterId: { //userと同じ
    type: Sequelize.INTEGER,
    primaryKey: true,
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

module.exports = Results;