// # HotRestaurant

// * Description: Basic app demonstrating Node and Express with jQuery. Overall purpose is to help schedule reservation requests. Restaurant has just 5 tables available. First five requests get a reservation, every request after that is sent to the waiting list.
// * Live Demo: <https://hot-restaurant-fsf.herokuapp.com/>

// ![Hot Restaurant Image](Images/HotRestaurant.png)

// ## Notes

// * You will NOT need a MySQL Database for this exercise.
// * Current app doesn't have admin handling. We'll deal with that at a later time.
// * Don't separate the JavaScript from the HTML in the client-side code. (i.e. Don't use external JavaScript. If you do, you will need an additional line of code to configure the express server to know where the JavaScript is).

// ## Good luck! Don't stress out

// * Spend some time trying to build exposure. But don't get overwhelmed. We'll have plenty of time to come back to this.

// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Star Wars tables (DATA)
// =============================================================
var tables = [{
        uniqueID: 1,
        name: "Yoda",
        phone: "323-555-6789",
        email: "her@him.com"
    },
    {
        uniqueID: 2,
        name: "Darth Maul",
        phone: "310 234-8173",
        email: "you@me.com"
    },
    {
        uniqueID: 3,
        name: "Obi Wan Kenobi",
        phone: "818-867-5309",
        email: "me@otherguy.com"
    }
];
console.log(tables);

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
    console.log("test1");
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
    console.log("test2");
});

// Displays all tables
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newTable
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.uniqueID = newTable.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);

    tables.push(newTable);

    res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});