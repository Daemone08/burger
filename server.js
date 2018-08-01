// Require express and require bodyParser
var express = require("express");
var bodyParser = require("body-parser");

// Indicate which port to use --> environmental variable port for Heroku deployment OR 8080 for localhost
var PORT = process.env.PORT || 8080;

// Assign express function to variable app
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

// Set the express engine to handlebars and the default layout to "main" 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Set the view engine property of express to "handlebars"
app.set("view engine", "handlebars");

// Import burgers_controller routes.
var routes = require("./controllers/burgers_controller.js");

// Give the express server access to the routes imported from burgers_controller.
app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
