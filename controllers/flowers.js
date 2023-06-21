const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Flowers = require('./../models/flowers');

const getAllFlowers = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ all flowers.'
*/
  const flowers = await Flowers.find();
  res.status(200).json({
    status: 'success',
    results: flowers.length,
    data: { flowers },
  });
});

const getFlowersByLightRequirement = catchAsync(async (req, res) => {
    /*
    #swagger.description = 'READ flowers with specified light requirement (full sun, part shade).'
  */
    const flowers = await Flowers.find({ sunlight: req.params.sunlight });
    res.status(200).json({
      status: 'success',
      results: flowers.length,
      data: { flowers },
    });
  });

const getFlowersByColor = catchAsync(async (req, res) => {
/*
#swagger.description = 'READ flowers with specified color.'
*/
const flowers = await Flowers.find({ sunlight: req.params.colors });
res.status(200).json({
    status: 'success',
    results: flowers.length,
    data: { flowers },
});
});

const getFlowersById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific flower by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to find desired flowers.');
  }
  const flowersId = new ObjectId(req.params.id);
  const flowers = await Flowers.findById(flowersId);
  res.status(200).json({
    status: 'success',
    data: { flowers },
  });
});

const addFlowers= catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new flower.'
*/
  if (!req.body.common_name) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const flowers = new Flowers({
    name: req.body.name,
    growingZones: req.body.growingZones,
    sunlight: req.body.sunlight,
    colors: req.body.colors,
    waterRequirement: req.body.waterRequirement,
    });

  const newFlowers = await Flowers.create(flowers);
  res.status(201).json({
    status: 'success',
    data: { flowers: newflowers },
  });
});

const updateFlowers = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'UPDATE a specific flower by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to update desired flower.');
  }
  const flowersId = new ObjectId(req.params.id);
  const changeFlowers = {
    name: req.body.name,
    growingZones: req.body.growingZones,
    sunlight: req.body.sunlight,
    colors: req.body.colors,
    waterRequirement: req.body.waterRequirement,
  };
  const flowers = await Flowers.findByIdAndUpdate(flowersId, changeFlowers, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: { flowers },
  });
});

const deleteFlowers = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a flower by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to delete desired flower.');
  }
  const flowersId = new ObjectId(req.params.id);
  await Flowers.findByIdAndDelete(flowersId);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllFlowers,
  getFlowersByLightRequirement,
  getFlowersByColor,
  getFlowersById,
  addFlowers,
  updateFlowers,
  deleteFlowers,
};