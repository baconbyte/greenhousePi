//tap is connected to pin 17 on the pi
var GPIO = require('onoff').Gpio;

//var tapPin = new GPIO(17, 'out');
var piPins = [];

var taps = [ { id: 1,  name : 'Greenhouse', status: true, timerStatus: false, timerSeconds: 600, pin : 17 }];

// initialise each of the pi pins in the taps collection
taps.forEach(function (value) {
    piPins[value.pin] = new GPIO(value.pin, 'out');
});

// initialise timer
setInterval(function() {
    taps.forEach(function(timedTap) {
        if (timedTap.timerStatus) {
            if (timedTap.timerSeconds > 0) {
                timedTap.timerSeconds--;
                //timedTap.status = true;
                piPins[timedTap.pin].writeSync(1);
            } else {
                timedTap.timerStatus = false;
                //timedTap.status = false;
                piPins[timedTap.pin].writeSync(0);
            }
        }
    })
}, 1000);

module.exports.getAllTaps = function(params, callback){
    //console.log("Fetching tap status for: " + params.tapid);
    taps.forEach(function(value) {
        value.status = 1 === piPins[value.pin].readSync();
    });

    callback(taps);
}

module.exports.getTap = function(id, callback){
    console.log("get status for tap %s", id);
    callback({id : '1', name : 'Greenhouse', status: 1 === piPins[17].readSync()});
}

module.exports.updateTap = function(tap, callback) {
    console.log("update status for tap %s", tap);
    taps.forEach(function(value) {
        if (value.id == tap.id) {
            value.timerStatus =  tap.timerStatus;
            value.timerSeconds =  tap.timerSeconds;
        }
    });
    piPins[tap.pin].writeSync(tap.status ? 1 : 0);
    callback(200);
}
