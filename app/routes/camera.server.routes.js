var controller = require("../controllers/camera.server.controller");

module.exports = function(app) {
    app.get('/photos/latest', function (req, res) {
        controller.getLatestPhoto(req.params, function(results){res.json(results);});
    });
};
