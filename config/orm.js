// Require the mysql connection
var connection = require("../config/connection.js")


// USING HELPER FUNCTIONS FROM CatsApp TO FORMAT QUERYSTRING ARGUMENTS FOR SQL SYNTAX AND ESCAPING
// -----------------------------------------------------------------------------------------------

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}


// END OF HELPER FUNCTIONS FROM CatsApp 
// ------------------------------------


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
        queryString = "INSERT INTO " + tableTarget + " (" + columns.toString() + ") VALUES (" + printQuestionMarks(values.length) + ");"
        console.log(queryString);
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
        var queryString = "UPDATE " + tableTarget + " SET " + objToSql(columnValuesObj) + " WHERE " + condition + ";";
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