const tires = require("express").Router();
const { Op } = require("sequelize");
const db = require("../models");
const { Tire } = db;

//create newTire
tires.post("/", async (req, res) => {
  try {
    const newTire = await Tire.create(req.body);

    res.status(201).json({
      message: 'Insert a new Tire!',
      data: newTire
    })
  } catch (error) {
    res.status(422).json(error)
  }
});

// SELECT ONE - GET
tires.get('/:id', async (req, res) => {
  try {
      const foundTire = await Tire.findOne({
          where: { tire_id: req.params.id }
      })
      res.status(200).json(foundTire)
  } catch (error) {
      res.status(500).json(error)
  }
})

// SHOW ALL Tires - GET
tires.get('/', async (req, res) => {
  try {
    const foundTires = await Tire.findAll({
      order: [['tire_id', 'ASC']]
    })
    console.log(foundTires)
    res.status(200).json(foundTires)
  } catch (error) {
    res.status(500).json({
      message: 'Tires not found', error: error
    })
  }
})

// DELETE A Tire
tires.delete('/:id', async (req, res) => {
  try {
    await Tire.destroy({
      where: { tire_id: req.params.id }
    })
    res.status(200).json({ message: 'Tire deleted' })
  } catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE A Tire - PUT
tires.put('/:id', async (req, res) => {
  try {
    const updatedTire = await Tire.update(req.body, {
      where: { tire_id: req.params.id },
      returning: true
    })
    res.status(200).json(updatedTire)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = tires;
