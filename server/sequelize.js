const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('db_2', 'vika123', '123', {
    host: 'db',
    dialect: 'postgres'
  });

  module.exports = sequelize

  const User = sequelize.define("users", {
    name: DataTypes.TEXT, 
    surname: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: {
      type: DataTypes.INTEGER, 
      defaultValue: 1
    } 
  });


  const Project = sequelize.define("projects", {
    id_user: DataTypes.INTEGER,
    projectName: DataTypes.TEXT,  
    h: DataTypes.INTEGER,
  });
  
  module.exports = {
    User: User,
    Project: Project
  }