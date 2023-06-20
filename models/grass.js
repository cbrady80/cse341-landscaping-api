const mongoose = require('mongoose');
mongoose.schema.Types.String.set('trim', true);
const grassSchema = new mongoose.schema({
    name: {
        type: String,
        required: [true, 'Need grass name'],
        unique: true,
        maxLength: [30, 'Name should be less than 31 characters'],
    },
    heatTolerant: {
        type: Boolean,
        required: [true, 'Needs to be true or false'],
        maxLength: [5, 'Should be less than 6 characters'],
    },
    coldTolerant: {
        type: Boolean,
        required: [true, 'Needs to be true or false'],
        maxLength: [5, 'Should be less than 6 characters'],
    },
    droughtTolerant:{
        type: Boolean,
        required: [true, 'Needs to be true or false'],
        maxLength: [5, 'Should be less than 6 characters'], 
    },
    shadeTolerant: {
        type: Boolean,
        required: [true, 'Needs to be true or false'],
        maxLength: [5, 'Should be less than 6 characters'],
    },
    growingSpeed: {
        type: String,
        required: [true, 'Need growth speed'],
        maxLength: [10, 'Should be less than 11 characters']
    },
});

const Grass = mongoose.model('Grass', grassSchema);

module.exports = Grass;