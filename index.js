var express = require("express");
var app = express();
app.engine("html", require("ejs").renderFile);
var http = require("http");
var fs = require("fs"); //file system to read file
//app.set("view engine", "html");
// This is the definition of the Person class -- DO NOT CHANGE IT!
class Person {
  constructor(id, status, date) {
    this.id = id;
    this.status = status;
    this.date = date;
  }
}

// This is the map of IDs to Person objects -- DO NOT CHANGE IT!
var people = new Map();
people.set("1234", new Person("1234", "safe", new Date().getTime()));
people.set("5678", new Person("5678", "missing", new Date().getTime()));
people.set("1111", new Person("1111", "safe", new Date().getTime()));
people.set("4321", new Person("4321", "deceased", new Date().getTime()));
people.set("5555", new Person("5555", "hospitalized", new Date().getTime()));
people.set("3500", new Person("3500", "safe", new Date().getTime()));

// This is the '/test' endpoint that you can use to check that this works
// Do not change this, as you will want to use it to check the test code in Part 2
app.use("/test", (req, res) => {
  // create a JSON object
  var data = { message: "It works!" };
  // send it back
  //res.json(data);
  res.render("index.html");
});

// This is the endpoint you need to implement in Part 1 of this assignment
app.use("/get", (req, res) => {
  var ids = req.query.id;
  var jArray = [];
  var person;
  if (Array.isArray(ids)) {
    ids.forEach(id => {
      person = people.get(id);
      if (person) {
        jArray.push({ id: id, status: person.status, date: person.date });
      } else if (id) {
        people.set(id, new Person(id, "unknown", new Date().getTime()));
        people.get(id);
        jArray.push({ id: id, status: person.status, date: person.date });
      }
    });
  } else {
    person = people.get(ids);
    if (person) {
      jArray.push({ id: ids, status: person.status, date: person.date });
    } else if (ids) {
      people.set(ids, new Person(ids, "unknown", new Date().getTime()));
      person = people.get(ids);
      jArray.push({ id: ids, status: person.status, date: person.date });
    }
  }
  res.json(jArray);
});

// -------------------------------------------------------------------------
// DO NOT CHANGE ANYTHING BELOW HERE!

// This endpoint allows a caller to add data to the Map of Person objects
// You do not need to do anything with this code; it is only provided
// as an example but will also be used for grading your code
app.use("/set", (req, res) => {
  // read id and status from query parameters
  var id = req.query.id;
  var status = req.query.status;
  // create new Person object
  var person = new Person(id, status, new Date().getTime());
  // add it to Map
  people.set(id, person);
  // send it back to caller
  res.json(person);
});

// This just sends back a message for any URL path not covered above
app.use("/", (req, res) => {
  //res.write("Welcome to to-do meow~.");
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./index.html", null, function(error, data) {
    if (error) {
      res.writeHead(404);
      res.write("File not found!");
    } else {
      res.write(data);
    }
    res.end();
  });
});

// This starts the web server on port 3000.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
