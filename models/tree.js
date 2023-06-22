const mongoose = require('mongoose');
mongoose.Schema.Types.String.set('trim', true);
const treeSchema = new mongoose.Schema({
  common_name: {
    type: String,
    required: [true, 'Need tree common name'],
    unique: true,
    maxLength: [30, 'Common name should be less than 31 characters'],
  },
  scientific_name: {
    type: Array,
    required: [true, 'Need tree scientific name'],
    maxLength: [30, 'Scientific name should be less than 31 characters'],
  },
  other_name: {
    type: Array,
    required: false,
    maxLength: [30, 'Other name should be less than 31 characters'],
  },
  cycle: {
    type: String,
    required: [true, 'Enter life cycle. i.e. perennial or annual'],
    maxLength: [15, 'Life cycle should be less than 16 characters'],
  },
  watering: {
    type: String,
    required: [true, 'Need watering frequency'],
    maxLength: [15, 'Watering frequency should be less than 16 characters'],
  },
  sunlight: {
    type: Array,
    required: [true, 'Need amount of sunlight required.'],
    maxLength: [15, 'Sunlight requirement should be less than 16 characters'],
  },
  leafType: {
    type: String,
    required: [true, 'Leaf type should be deciduous or coniferous'],
    enum: {
      values: ['deciduous', 'coniferous'],
      message: '{VALUE} is not supported',
    },
  },
  imageURL: {
    type: String,
    required: false,
  },
});

const Tree = mongoose.model('Tree', treeSchema);

module.exports = Tree;
