const mongoose = require('mongoose');
mongoose.Schema.Types.String.set('trim', true);
const shrubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Need shrub name'],
    unique: true,
    maxLength: [30, 'Name should be less than 31 characters'],
  },
  growingZones: {
    type: String,
    required: [true, 'Need growing zones.'],
    maxLength: [10, 'Growing zones should be fewer than 10 characters. For example, "5-9"'],
  },
  sunlight: {
    type: String,
    required: [true, 'Sunlight requirement should be full sun, part shade, or shade.'],
    enum: {
      values: ['full sun', 'part shade', 'shade'],
      message: '{VALUE} is not supported',
    },
  },
  height: {
    type: String,
    required: false,
    maxLength: [30, 'Height should be less than 31 characters'],
  },
  waterRequirement: {
    type: String,
    required: [true, 'Water requirement should be low, medium, or high.'],
    enum: {
      values: ['low', 'medium', 'high'],
      message: '{VALUE} is not supported',
    },
  },
});

const Shrubs = mongoose.model('Shrubs', shrubSchema);

module.exports = Shrubs;
