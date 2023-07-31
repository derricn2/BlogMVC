const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  // method to check if the provided password matches the hashed password in the database
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    // user ID (primary key)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // username
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // hashed Password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      // before a new user is created, hash their password
      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
      // before an existing user is updated, hash their password if it's changed
      async beforeUpdate(updatedUser) {
        if (updatedUser.changed('password')) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }
        return updatedUser;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
