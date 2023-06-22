const mongoose = require('mongoose');
mongoose.Schema.Types.String.set('trim', true);
const flowersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Need flower name'],
    unique: true,
    maxLength: [30, 'Name should be less than 31 characters'],
  },
  growingZones: {
    type: String,
    required: [true, 'Need growing zones.'],
    maxLength: [
      10,
      'Growing zones should be fewer than 10 characters. For example, "5-9"',
    ],
  },
  sunlight: {
    type: Array,
    required: [
      true,
      'Sunlight requirement should be full sun, part shade, or shade.',
    ],
  },
  colors: {
    type: Array,
    required: false,
    maxLength: [30, 'Color should be less than 31 characters'],
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

const Flowers = mongoose.model('Flowers', flowersSchema);

module.exports = Flowers;
