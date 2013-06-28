var util = require("./tor.util.js");

exports.test = function testF(callback) {
    this.init('test@test.test','test123456',callback);
};

exports.init = function initF(email, password, callback) {
    var credentials = {
        "client":"Thursday",
        "accountType":"HOSTED_OR_GOOGLE",
        "service":"reader",
        "Email":email,
        "Passwd":password,
        "output":"json"
    };
    
    util.post("/reader/api/0/accounts/ClientLogin",
        credentials, null, callback);    
};