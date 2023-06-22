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
        type: String,
        required: [true, 'Needs to be true or false'],
        enum: {
            values: [ 'true', 'false'],
            message: ' {VALUE} is not supported',
        },
    },
    coldTolerant: {
        type: String,
        required: [true, 'Needs to be true or false'],
        enum: {
            values: [ 'true', 'false'],
            message: ' {VALUE} is not supported',
        },
    },
    droughtTolerant:{
        type: String,
        required: [true, 'Needs to be true or false'],
        enum: {
            values: [ 'true', 'false'],
            message: ' {VALUE} is not supported',
        }, 
    },
    shadeTolerant: {
        type: String,
        required: [true, 'Needs to be true or false'],
        enum: {
            values: [ 'true', 'false'],
            message: ' {VALUE} is not supported',
        },
    },
    growingSpeed: {
        type: String,
        required: [true, 'Need to be slow or fast'],
        enum: {
            values: [ 'slow', 'fast'],
            message: ' {VALUE} is not supported',
        },
    },
});

const Grass = mongoose.model('Grass', grassSchema);

module.exports = Grass;