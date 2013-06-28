var util = require("./tor.util.js"),
    generic = require("./tor.generic.js"),
    folders = require("./tor.folders.js");

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

exports.getToken = generic.getToken;
exports.getUserInfo = generic.getUserInfo;
exports.getPreferenceList = generic.getPreferenceList;
exports.getFriendList = generic.getFriendList;
exports.getFolderList = folders.getFolderList;
exports.getFolderPreferences = folders.getFolderPreferences;
exports.postFolderPreferences = folders.postFolderPreferences;
exports.postFolderName = folders.postFolderName;
exports.deleteFolderName = folders.deleteFolderName;