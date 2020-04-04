// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var currid = 0;
// //mention the public dir from serving
// app.use(express.static(__dirname + "/views"));
// app.use(express.static(__dirname + "/public"));
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);
// // This is the definition of the Task class -- DO NOT CHANGE IT!
// class Task {
//   constructor(id, name, status, date) {
//     this.name = name;
//     this.id = id;
//     this.status = status;
//     this.date = date;
//   }
// }

// // This is the map of IDs to Task objects -- DO NOT CHANGE IT!
// var tasks = new Map();
// tasks.set("0", new Task("0", "play Zelda", "current", new Date().getTime()));
// tasks.set("1", new Task("1", "finish CIS350", "missed", new Date().getTime()));
// tasks.set("2", new Task("2", "run a lap", "completed", new Date().getTime()));
// tasks.set("3", new Task("3", "read book", "current", new Date().getTime()));

// // This is the '/test' endpoint that you can use to check that this works
// // Do not change this, as you will want to use it to check the test code in Part 2
// app.use("/test", (req, res) => {
//   // create a JSON object
//   var data = { message: "It works!" };
//   // send it back
//   //res.json(data);
// });

// app.use("/get", (req, res) => {
//   var ids = req.query.id;
//   var jArray = [];
//   var task;
//   if (Array.isArray(ids)) {
//     ids.forEach(id => {
//       task = tasks.get(id);
//       if (task) {
//         jArray.push({ id: id, status: task.status, date: task.date });
//       } else if (id) {
//         tasks.set(id, new Task(id, "unknown", new Date().getTime()));
//         tasks.get(id);
//         jArray.push({ id: id, status: task.status, date: task.date });
//       }
//     });
//   } else {
//     task = tasks.get(ids);
//     if (task) {
//       jArray.push({ id: ids, status: task.status, date: task.date });
//     } else if (ids) {
//       tasks.set(ids, new Task(ids, "unknown", new Date().getTime()));
//       task = tasks.get(ids);
//       jArray.push({ id: ids, status: task.status, date: task.date });
//     }
//   }
//   res.json(jArray);
// });

// // This endpoint allows a caller to add data to the Map of Task objects
// app.use("/add", (req, res) => {
//   // read id and status from query parameters
//   var id = currid++;
//   var status = req.query.status;
//   // create new Task object
//   var task = new Task(id, status, new Date().getTime());
//   // add it to Map
//   tasks.set(id, task);
//   // send it back to caller
//   res.json(task);
// });

// // This just sends back a message for any URL path not covered above
// app.use("/", (req, res) => {
//   res.render("index");
// });

// var data = [{ item: "run raps" }, { item: "finish CIS350" }]; //property: value
// // tasks page
// app.get("/tasks", (req, res) => {
//   //   res.render("index", { tasks: tasks.values() });
//   //   res.render("index", { tasks: data });
//   var name = "hello";
//   res.render("index", { name: name });
// });

// app.post("/tasks", urlencodedParser, (req, res) => {
//   console.log(req.body);
//   res.render("index", { qs: req.query });
// });

// app.delete("/tasks", urlencodedParser, (req, res) => {});

// // This starts the web server on port 3000.
// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });

var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname);
var name = "hello";
app.get("/", function(req, res) {
  res.render("views/index", { name: name });
});

// This starts the web server on port 3000.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
