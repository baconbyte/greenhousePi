var express = require('express');
var bodyParser = require('body-parser');
module.exports = function() {
    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PUT");
        next();
    });

    app.use(express.static('public'));

    app.listen(process.env.PORT || 4730);

    require('../app/routes/taps.server.routes.js')(app);
    require('../app/routes/thermometer.server.routes')(app);
    require('../app/routes/camera.server.routes')(app);

    return app;
};