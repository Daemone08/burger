// Require express
var express = require("express");
// Require router
var router = express.Router();
// Require model
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

// Basic route
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Post route for additional client input burgers
router.post("/api/burgers", function (req, res) {
    console.log(req.body)
    burger.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.burger_name, req.body.devoured
        ], function (result) {
            // Send back the ID of the new burger
            res.json({ id: result.insertId });
        });
});


// Export routes for server.js to use.
module.exports = router;
