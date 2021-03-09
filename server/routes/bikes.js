var express = require('express');
const path = require("path");
const Bike = require("../models/Bike")
var router = express.Router();

/* GET users listing. */
router.get('/bikes', async (req, res, next) => {
  try{
    const bikes = await Bike.find()
    res.status(201).send({bikes, message: "Data was loaded"})
  }catch (e){
    console.log(e)
    return res.status(500).send({message: "Data can't be load. Server error"})
  }
});

router.post("/createNewBike", async(req, res) => {
  try {
    console.log("Data for create new Bike: ", req.body)
    const {name, type, price} = req.body
    const isAvailable = await Bike.findOne({name})
    if(isAvailable){
      return res.status(500).send({message: "This bike already created"})
    }else{
      if(name.trim().length === 0) return res.status(500).send({message: "Field name is empty"})
      if(price < 1) return res.status(500).send({message: "The price must be at least $1"})
      const bike = new Bike({name, type, price});
      await bike.save();
      res.status(201).send({bike})
    }
  }catch(e) {
    console.log(e.message)
    return res.status(500).send({message: "Can't create new bike. Server error"})
  }
})

router.put("/rentBike", async (req, res) => {
  try {
    console.log("RENT: ", req.body)
    const {id, rent_hours} = req.body

    await Bike.findByIdAndUpdate(id, {isRent: true, rent_hours: rent_hours}, {useFindAndModify: true}).then(data => {
      if(!data) res.status(500).send({message: `Bike wasn't found`})
      else res.status(201).send({message: "Bike was rent"})
    })
  }catch(e){
    console.log(e.message)
    return res.status(500).send({message: "Can't rent bike. Server error"})
  }
})

router.put("/unrentBike", async (req, res) => {
  try {
    console.log("UNRENT: ", req.body)
    const {id, rent_hours} = req.body

    await Bike.findByIdAndUpdate(id, {isRent: false, rent_hours: rent_hours}, {useFindAndModify: true}).then(data => {
      if(!data) res.status(500).send({message: `Bike wasn't found`})
      else res.status(201).send({message: "Rent on this bike was cancel"})
    })
  }catch(e){
    console.log(e.message)
    return res.status(500).send({message: "Can't cancel rent. Server error"})
  }
})

router.delete("/deleteBike", async (req, res) => {
  try {
    console.log("DELETE: ", req.body)
    const {id, rent_hours} = req.body

    await Bike.findByIdAndRemove(id, {useFindAndModify: true}).then(data => {
      if(!data) res.status(500).send({message: `Bike wasn't found`})
      else res.status(201).send({message: "Bike was delete"})
    })
  }catch(e){
    console.log(e.message)
    return res.status(500).send({message: "Can't delete this bike. Server error"})
  }
})

module.exports = router;
