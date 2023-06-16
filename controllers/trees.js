const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Tree = require('./../models/tree');

const getAllTrees = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ all trees.'
*/
  const trees = await Tree.find();
  res.status(200).json({
    status: 'success',
    results: trees.length,
    data: { trees },
  });
});

const getTreeById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific tree by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to find desired tree.');
  }
  const treeId = new ObjectId(req.params.id);
  const tree = await Tree.findById(treeId);
  res.status(200).json({
    status: 'success',
    data: { tree },
  });
});

const addTree = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new tree.'
*/
  if (!req.body.puppyTempName) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const tree = new Tree({
    commonName: req.body.commonName,
    scientificName: req.body.scientificName,
    otherName: req.body.otherName,
    cycle: req.body.cycle,
    watering: req.body.watering,
    sunlight: req.body.sunlight,
    leafType: req.body.leafType,
    imageURL: req.body.imageURL,
  });
  const newTree = await Tree.create(tree);
  res.status(201).json({
    status: 'success',
    data: { tree: newTree },
  });
});

const updateTree = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'UPDATE a specific tree by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to update desired tree.');
  }
  const treeId = new ObjectId(req.params.id);
  const changeTree = {
    commonName: req.body.commonName,
    scientificName: req.body.scientificName,
    otherName: req.body.otherName,
    cycle: req.body.cycle,
    watering: req.body.watering,
    sunlight: req.body.sunlight,
    leafType: req.body.leafType,
    imageURL: req.body.imageURL,
  };
  const tree = await Tree.findByIdAndUpdate(treeId, changeTree, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: { tree },
  });
});

const deleteTree = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a tree by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to delete desired tree.');
  }
  const treeId = new ObjectId(req.params.id);
  await Tree.findByIdAndDelete(treeId);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllTrees,
  getTreeById,
  addTree,
  updateTree,
  deleteTree,
};
