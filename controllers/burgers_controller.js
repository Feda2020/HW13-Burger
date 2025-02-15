var express = require("express");

var router = express.Router();
// Import the model (burger.js)
var burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data,
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


router.post("/api/burgers", function(req, res) {
    var devoured = 0;
    if (req.body.devoured === "true") {
        devoured = 1;
    }
    burger.create(
        ["burger_name", "devoured"], [req.body.burger_name, devoured],
        function(result) {
            console.log(result);
            // Send back the ID of the new burger
            res.json({ id: result.insertId });
        }
    );
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    burger.update({
            devoured: req.body.devoured,
        }, condition,
        function(result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});

router.delete("/api/burgers/:id", function(req, res) {
    const condition = `id = ${req.params.id}`;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
});
// Export routes for server.js to use.
module.exports = router;