var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TemperatureSchema = new Schema({
    id: String,
    name: String,
    temperature: String,
    serial: String,
    timestamp: String
});

mongoose.model('Temperature', TemperatureSchema);