var https = require("https");

var send = function sendF(m, p, d, authToken, callback) {
    var options = {
        host: 'theoldreader.com',
        port: 443,
        path: p,
        method: m,
        headers: {"content-type":"application/json"}
    }, r = { 
        status:"0",
        headers:{},
        data:{},
        error:""
    };
    if (authToken) {
        options.headers = {
            "content-type":"application/json",
            "Authorization":"GoogleLogin auth=" + authToken
        };
    }
    var torReq = https.request(options, function(torRes) {
        var temp = "";
        torRes.setEncoding('utf8');
        torRes.on('data', function (chunk) {
            temp = temp + chunk;
        });
        r.status = torRes.statusCode;
        r.headers = torRes.headers;
        torRes.on('end', function(){
            if (torRes.statusCode !== 200) {
                r.error = torRes.headers.status;
            }
            if (temp) {
                try {
                    r.data = JSON.parse(temp);
                } catch(e) {
                    r.data = { "d" : temp };
                }
            }
            callback(r);
        });
    });
    torReq.on('error', function(e) {
        r.error = e.message;
        callback(r);
    });
    if (d) { torReq.write(JSON.stringify(d)) }
    torReq.end();
};

exports.get = function getF(path, data, authToken, callback) {
    send("GET", path, data, authToken, callback);
};

exports.post = function postF(path, data, authToken, callback) {
    send("POST", path, data, authToken, callback);
};