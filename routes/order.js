const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require('./verifyToken');
const Order = require('../models/Order');

router.post('/orderdeatils', verifyTokenAndAdmin, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        res.status(402).json(error);
    }
});

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const update = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('deleted successfully');
    } catch (error) {
        res.status(402).json(error);
    }
});

router.get('allorder', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allorder = await Order.find();
        res.status(200).json(allorder);
    } catch (error) {
        res.status(402).json(error);
    }
});


module.exports = router;