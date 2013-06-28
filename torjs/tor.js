var util = require("./tor.util.js");

exports.test = function test(callback) {
    var credentials = {
        "client":"Thursday",
        "accountType":"HOSTED_OR_GOOGLE",
        "service":"reader",
        "Email":"test@test.test",
        "Passwd":"test1234",
        "output":"json"
    };
    
    util.post("/reader/api/0/accounts/ClientLogin",
        credentials, null, callback);
};