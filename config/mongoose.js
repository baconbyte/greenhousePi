var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    require('../app/models/temperature.server.model');
    require('../app/models/hourlyTemp.server.model');
    require('../app/models/dailyTemp.server.model');
    return db;
};