// Initialize
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    tor = require("./torjs/tor.js");
    //mongoose = require('mongoose');
var app = module.exports = express();

// Database
// mongoose.connect('mongodb://' + process.env.IP +'/thursdayDB');

// CORS
var allowedDomains = ["*"];
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', allowedDomains.join(','));
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
};
// Config
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Thursday API
app.all('/api', function (req, res, next) {
    res.send('Thursday.server is up and running!');
});
app.all('/api/test', function (req, res, next) {
    tor.test(function testF(response){ 
        res.send(JSON.stringify(response)); 
    });
});
app.post('/api/init', function(req, res, next) {
    if ((!req.body.email) || (!req.body.passwd)) {
        res.send(400, "Thursday.error: Email and Password required.");
    } else { 
        tor.init(
            req.body.email,
            req.body.passwd,
            function initF(response){
                if (response.error) {
                    res.send(401);
                } else {
                    res.send(JSON.stringify(response.data)); 
                }
            }
        );
    }
});

// Launch server
app.listen(process.env.PORT, process.env.IP);