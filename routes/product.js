const router = require('express').Router();
const { verifyTokenAndAdmin } = require('./verifyToken');
const Product = require('../models/Product');

router.post('/description', verifyTokenAndAdmin, async (req, res) => {
    const newproduct = new Product(req.body);
    
    try {
        const saveproduct = await newproduct.save();
        res.status(200).json(saveproduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedata = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedata);
    } catch (error) {
        res.status(404).json(error);
    }
});


router.get('/allproduct', verifyTokenAndAdmin, async (res) => {
    try {
        const allproduct = await Product.find();
        res.status(200).json(allproduct);

    } catch (error) {
        console.log(error);
        res.status(402).json(error);
    }
});


router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product deleted");
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router;