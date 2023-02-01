const {model, Schema} = require('mongoose');
const Increment = new Schema({count: {type: Number}});
IncrementModel = model('counter', Increment);
module.exports = IncrementModel;
