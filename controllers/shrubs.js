const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Shrubs = require('./../models/shrubs');

const getAllShrubs = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ all shrubs.'
*/
  const allShrubs = await Shrubs.find();
  res.status(200).json({
    status: 'success',
    results: allShrubs.length,
    data: { allShrubs },
  });
});

const getShrubsByLightRequirement = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ shrubs with specified light requirement /shrubs/sunlight/(full sun, part shade, shade).'
*/
  const shrubs = await Shrubs.find({ sunlight: req.params.sunlight });
  res.status(200).json({
    status: 'success',
    results: shrubs.length,
    data: { shrubs },
  });
});

const getShrubById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific shrub by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to find desired shrub.');
  }
  const shrubId = new ObjectId(req.params.id);
  const shrub = await Shrubs.findById(shrubId);
  res.status(200).json({
    status: 'success',
    data: { shrub },
  });
});

const addShrub = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new shrub.'
*/
  if (!req.body.name) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const shrub = new Shrubs({
    name: req.body.name,
    growingZones: req.body.growingZones,
    sunlight: req.body.sunlight,
    height: req.body.height,
    waterRequirement: req.body.waterRequirement,
  });
  const newShrub = await Shrubs.create(shrub);
  res.status(201).json({
    status: 'success',
    data: { shrub: newShrub },
  });
});

const updateShrub = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'UPDATE a specific shrub by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to update desired shrub.');
  }
  const shrubId = new ObjectId(req.params.id);
  const changeShrub = {
    name: req.body.name,
    growingZones: req.body.growingZones,
    sunlight: req.body.sunlight,
    height: req.body.height,
    waterRequirement: req.body.waterRequirement,
  };
  const shrub = await Shrubs.findByIdAndUpdate(shrubId, changeShrub, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: { shrub },
  });
});

const deleteShrub = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a shrub by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to delete desired shrub.');
  }
  const shrubId = new ObjectId(req.params.id);
  await Shrubs.findByIdAndDelete(shrubId);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllShrubs,
  getShrubsByLightRequirement,
  getShrubById,
  addShrub,
  updateShrub,
  deleteShrub,
};
