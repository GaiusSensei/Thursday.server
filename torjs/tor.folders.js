var util = require("./tor.util.js");

exports.getFolderList = function getFolderListF(authToken, callback) {    
    util.get("/reader/api/0/tag/list?output=json",
        null, authToken, callback);    
};
exports.getFolderPreferences = function getFolderPreferencesF(authToken, callback) {    
    util.get("/reader/api/0/preference/stream/list?output=json",
        null, authToken, callback);    
};
exports.postFolderPreferences = function postFolderPreferencesF(authToken, data, callback) {    
    util.post("/reader/api/0/preference/stream/set",
        data, authToken, callback);    
};
exports.postFolderName = function postFolderNameF(authToken, data, callback) {    
    util.post("/reader/api/0/rename-tag",
        data, authToken, callback);    
};
exports.deleteFolderName = function deleteFolderNameF(authToken, data, callback) {    
    util.post("/reader/api/0/disable-tag",
        data, authToken, callback);    
};