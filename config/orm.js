var connection = require("../config/connection.js")

// ORM object for all SQL queries
var orm = {

    selectAll: func,

    insertOne: func,

    updateOne: func

}

// Export the ORM object
module.exports = orm;