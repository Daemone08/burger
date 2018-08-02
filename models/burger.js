// Import the ORM
var orm = require("../config/orm.js");

var burger = {
    selectAll: function(callback) {
      orm.selectAll("burgers", function(res) {
        callback(res);
      });
    },
    // The variables columns and values are arrays.
    insertOne: function(columns, values, callback) {
      orm.insertOne("burgers", columns, values, function(res) {
        callback(res);
      });
    },
    updateOne: function(columnValuesObj, condition, callback) {
      orm.updateOne("burgers", columnValuesObj, condition, function(res) {
        callback(res);
      });
    }
  };

// Export the database functions for the controller
module.exports = burger;
