const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Grass = require('../models/grass');

const getAllGrass = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ all grasses.'
*/
  const grasses = await Grass.find();
  res.status(200).json({
    status: 'success',
    results: grasses.length,
    data: { grasses },
  });
});

const getGrassByHeatTolerant = catchAsync(async (req, res) => {
  /*
    #swagger.description = 'READ deciduous trees.'
  */
  const grass = await Grass.find({ heatTolerant: req.params.heatTolerant });
  res.status(200).json({
    status: 'success',
    results: grass.length,
    data: { grass },
  });
});

const getGrassById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific tree by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to find desired grass.');
  }
  const grassId = new ObjectId(req.params.id);
  const grass = await Grass.findById(grassId);
  res.status(200).json({
    status: 'success',
    data: { grass },
  });
});

const addGrass = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new Grass.'
*/
  if (!req.body.common_name) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const grass = new Grass({
    name: req.body.name,
    heatTolerant: req.body.heatTolerant,
    coldTolerant: req.body.coldtolerant,
    droughtTolerant: req.body.droughtTolerant,
    shadeTolerant: req.body.shadeTolerant,
    growingSpeed: req.body.growingSpeed,
  });

  const newGrass = await Grass.create(grass);
  res.status(201).json({
    status: 'success',
    data: { grass: newGrass },
  });
});

const updateGrass = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'UPDATE a specific Grass by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to update desired Grass.');
  }
  const grassId = new ObjectId(req.params.id);
  const changeGrass = {
    name: req.body.name,
    heatTolerant: req.body.heatTolerant,
    coldTolerant: req.body.coldtolerant,
    droughtTolerant: req.body.droughtTolerant,
    shadeTolerant: req.body.shadeTolerant,
    growingSpeed: req.body.growingSpeed,
  };
  const grass = await Grass.findByIdAndUpdate(grassId, changeGrass, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: { grass },
  });
});

const deleteGrass = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a grass by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to delete desired grass.');
  }
  const grassId = new ObjectId(req.params.id);
  await Grass.findByIdAndDelete(grassId);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllGrass,
  getGrassByHeatTolerant,
  getGrassById,
  addGrass,
  updateGrass,
  deleteGrass,
};
