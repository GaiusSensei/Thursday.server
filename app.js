// Initialize
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    tor = require("./torjs/tor.js");
    //mongoose = require('mongoose');
var app = module.exports = express();

// Database
// mongoose.connect('mongodb://' + process.env.IP +'/thursdayDB');

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Test API
app.get('/api', function (req, res) {
    res.send('Thursday.server is up and running!');
});
app.get('/api/test', function (req, res) {
    tor.test(function(response){ res.send(JSON.stringify(response)); });
});

// Launch server
app.listen(process.env.PORT, process.env.IP);