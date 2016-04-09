var controller = require("../controllers/taps.server.controller");

module.exports = function(app) {
    app.get('/taps', function (req, res) {
        controller.getAllTaps(req.params, function(results){res.json(results);});
    });

    app.get('/taps/:id', function (req, res) {
        controller.getTap(req.params.id, function(results){res.json(results);});
    });

    app.put('/taps/:id', function (req, res) {
        controller.updateTap(req.body, function(results){res.sendStatus(results);});
    });
};
