var fs = require('fs');
var thermometers = [{id : '1', name : 'Greenhouse', temperature : 20, serial : "28-021581e038ff"},
    {id : '2', name : 'Outside', temperature : 15, serial : "28-0115818bbaff"}];

var devicesDir = '/sys/bus/w1/devices/';

var HourlyTemperature = require('mongoose').model('HourlyTemperature');
var DailyTemperature = require('mongoose').model('DailyTemperature');

module.exports.getAllThermometers = function(params, callback){
    callback(thermometers);
}


module.exports.read = function(req, res) {
    res.json(req.therm);
}

module.exports.dailyById = function(req, res, next, id) {
    DailyTemperature.find({
        id: id
    },
        function(err, therm) {
            if (err) {
                return next(err);
            }
            else {
                req.therm = therm;
                next();
            }
        }
    );
};

module.exports.allDaily = function(req, res) {
    var promise = DailyTemperature.find({}).lean().exec();
    promise.then(function (readings) {
        var result = readings.map(function(reading){
            temp.average = reading.temperature_sum/reading.count;
            temp.timestamp = reading.timestamp;
            return temp
        });
        res.json(result);
    });


};

module.exports.hourlyById = function(req, res, next, id) {
    HourlyTemperature.find({
            id: id,
            timestamp : { $gte: new Date(new Date().setDate(new Date().getDate()-1)), $lt: new Date() }
        },
        function(err, therm) {
            if (err) {
                return next(err);
            }
            else {
                req.therm = therm;
                next();
            }
        }
    );
};

function readThermometerFiles() {
    thermometers.forEach(function (thermometer) {
        if (thermometer.serial) {
            var thermFile = devicesDir + thermometer.serial + '/w1_slave';
            fs.readFile(thermFile, 'utf8', function (err, data) {
                if (err) throw err;
                matches = data.match(/t=([0-9]+)/);
                //convert to celsius
                thermometer.temperature = parseInt(matches[1]) / 1000;
                thermometer.timestamp = new Date().getTime();
                saveTemperatureMetrics(thermometer);
            });
        }
        ;
    });
}
function saveTemperatureMetrics(thermometer) {
    console.log(thermometer);
    var currentDate = new Date();
    var hour = new Date( currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours() );
    var day = new Date( currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate());

    var hourlyQuery = { id: thermometer.id, timestamp: hour}
    HourlyTemperature.findOneAndUpdate(hourlyQuery,
        { $inc: { temperature_sum : thermometer.temperature, count : 1 }},
        {upsert : true}, function(err, hourlyTemp) {
            if (err) throw err;
                console.error(hourlyTemp);
            });

    var dailyQuery = { id: thermometer.id, timestamp: day}
    DailyTemperature.findOneAndUpdate(dailyQuery,
        { $inc: { temperature_sum : thermometer.temperature, count : 1 }},
        {upsert : true}, function(err, dailyTemp) {
            if (err) throw err;
                console.error(dailyTemp);
            });
}

readThermometerFiles();
setInterval(readThermometerFiles, 60000);

