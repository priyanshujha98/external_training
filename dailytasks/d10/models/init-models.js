var DataTypes = require("sequelize").DataTypes;
var _department = require("./department");
var _login = require("./login");

function initModels(sequelize) {
  var department = _department(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);

  login.belongsTo(employee, { foreignKey: "EmpNo"});
  employee.hasMany(login, { foreignKey: "EmpNo"});

  return {
    department,
    login,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
