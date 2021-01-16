const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    EmpNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmpName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    DeptNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'department',
        key: 'deptno'
      }
    },
    EmpSalary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EmpNo" },
        ]
      },
      {
        name: "employee_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "DeptNo" },
        ]
      },
    ]
  });
};
