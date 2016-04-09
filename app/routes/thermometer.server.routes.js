var controller = require("../controllers/thermometer.server.controller");

module.exports = function(app) {
    app.get('/thermometers', function (req, res) {
        controller.getAllThermometers(req.params, function(results){res.json(results);});
    });

    app.route('/thermometers/:dailyId/daily').get(controller.read);
    app.route('/thermometers/:hourlyId/hourly').get(controller.read);

    app.route('/thermometers/daily').get(controller.allDaily);

    app.param('dailyId', controller.dailyById);
    app.param('hourlyId', controller.hourlyById);
};
