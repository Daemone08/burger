var connection = require("../config/connection.js")

// ORM object for all SQL queries
var orm = {

    // selectAll method takes two arguments
    selectAll: function (tableTarget, callback) {
        // first the query string must be created in the form SELECT * FROM table;
        var queryString = "SELECT * FROM " + tableTarget + ";";
        // next the sql query is run using the sql query syntax
        connection.query(queryString, function (err, result) {
            // check for errors + throw
            if (err) {
                throw err;
            }
            // otherwise pass the result to the callback
            callback(result);
        })
    },

    // insertOne method takes four arguments (columns and values are arrays)
    insertOne: function (tableTarget, columns, values, callback) {
        // first the query string must be created in the form INSERT INTO table (columns) VALUES (values);
        // *****columns and values must be strings********values is values.length number of ?,? for escape purposes
        queryString = "INSERT INTO " + tableTarget + " (" + columns + ") (" + values + ");"
        // next the sql query is run using the sql query syntax (values is still the same array)
        connection.query(queryString, values, function (err, result) {
            // check for errors + throw
            if (err) {
                throw err;
            }
            // otherwise pass the result to the callback
            callback(result);
        })
    },

    // updateOne method takes four arguments
    updateOne: function (tableTarget, columnValuesObj, condition, callback) {
        // first the query string must be created in the form UPDATE table SET col1name=value1,col2name=value2,etc WHERE condition
        // ***columnValuesObj must be converted to string***
        var queryString = "UPDATE " + tableTarget + " SET " + columnValuesObj + " WHERE " + condition + ";";
        // next the sql query is run using the sql query syntax
        connection.query(queryString, function (err, result) {
            // check for errors + throw
            if (err) {
                throw err;
            }
            // otherwise pass the result to the callback
            callback(result);
        })
    }

}

// Export the ORM object
module.exports = orm;