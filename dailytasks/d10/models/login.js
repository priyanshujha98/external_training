const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('login', {
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    pass: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    EmpNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'empno'
      }
    }
  }, {
    sequelize,
    tableName: 'login',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "EmpNo",
        using: "BTREE",
        fields: [
          { name: "EmpNo" },
        ]
      },
    ]
  });
};
