var util = require("./tor.util.js");

exports.getToken = function getTokenF(authToken, callback) {    
    util.get("/reader/api/0/token",
        null, authToken, callback);    
};
exports.getUserInfo = function getUserInfoF(authToken, callback) {    
    util.get("/reader/api/0/user-info?output=json",
        null, authToken, callback);    
};
exports.getPreferenceList = function getPreferenceListF(authToken, callback) {    
    util.get("/reader/api/0/preference/list?output=json",
        null, authToken, callback);    
};
exports.getFriendList = function getFriendListF(authToken, callback) {    
    util.get("/reader/api/0/friend/list?output=json",
        null, authToken, callback);    
};