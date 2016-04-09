var RaspiCam = require("raspicam"),
    fs = require('fs');
var latestFile = '';

fs.symlink('/greenhouse/photos', './public/img/camera', function (err) {
    if (err) {
        console.log(err);
    }
});

var camera = new RaspiCam({
    mode: 'timelapse',
    encoding: "jpg",
    output: '/greenhouse/photos/image_%06d.jpg',
    timelapse: 900000, //15 mins
    timeout: 1000000000});

camera.stop();
camera.start();

camera.on("read", function( err, timestamp, filename ){
    console.log("photo image captured with filename: " + filename + " at " + timestamp);
    latestFile = filename;
});


module.exports.getLatestPhoto = function(params, callback) {
    console.log("get latest photo %s", latestFile);
    callback({filename : latestFile });
}