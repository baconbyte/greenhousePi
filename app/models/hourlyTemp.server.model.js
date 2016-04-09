var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HourlyTemperatureSchema = new Schema({
    timestamp: Date,
    sensor_id: String,
    temperature_sum: Number,
    count: Number
});

mongoose.model('HourlyTemperature', HourlyTemperatureSchema);