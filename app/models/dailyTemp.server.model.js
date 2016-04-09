var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DailyTemperatureSchema = new Schema({
    timestamp: Date,
    sensor_id: String,
    temperature_sum: Number,
    count: Number,
    max_temp: Number,
    min_temp: Number
});

mongoose.model('DailyTemperature', DailyTemperatureSchema);