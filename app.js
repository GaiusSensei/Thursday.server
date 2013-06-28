// Initialize
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    tor = require("./torjs/tor.js");
var app = module.exports = express();

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
        res.send(400);
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
app.post('/api/generic/token', function(req, res, next) {
    if (!req.body.authToken) {
        res.send(400);
    } else { 
        tor.getToken(
            req.body.authToken,
            function tokenF(response){
                if (response.error) {
                    res.send(401);
                } else {
                    res.send(JSON.stringify(response.data)); 
                }
            }
        );
    }
});
app.post('/api/generic/userinfo', function(req, res, next) {
    if (!req.body.authToken) {
        res.send(400);
    } else { 
        tor.getUserInfo(
            req.body.authToken,
            function userinfoF(response){
                if (response.error) {
                    res.send(401);
                } else {
                    res.send(JSON.stringify(response.data)); 
                }
            }
        );
    }
});
app.post('/api/generic/preference/list', function(req, res, next) {
    if (!req.body.authToken) {
        res.send(400);
    } else { 
        tor.getPreferenceList(
            req.body.authToken,
            function preferencelistF(response){
                if (response.error) {
                    res.send(401);
                } else {
                    res.send(JSON.stringify(response.data)); 
                }
            }
        );
    }
});
app.post('/api/generic/friend/list', function(req, res, next) {
    if (!req.body.authToken) {
        res.send(400);
    } else { 
        tor.getFriendList(
            req.body.authToken,
            function friendlistF(response){
                if (response.error) {
                    res.send(401);
                } else {
                    res.send(JSON.stringify(response.data)); 
                }
            }
        );
    }
});
app.post('/api/folders/list', function(req, res, next) {
    if (!req.body.authToken) {
        res.send(400);
    } else { 
        tor.getFolderList(
            req.body.authToken,
            function folderlistF(response){
                if (response.error) {
                    res.send(401);
                } else {
                    res.send(JSON.stringify(response.data)); 
                }
            }
        );
    }
});
app.post('/api/folders/preference/list', function(req, res, next) {
    if (!req.body.authToken) {
        res.send(400);
    } else { 
        tor.getFolderPreferences(
            req.body.authToken,
            function folderpreferencelistF(response){
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