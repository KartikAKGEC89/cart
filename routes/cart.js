const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Cart = require('../models/Cart');

router.post('/cartdetails', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    } catch (error) {
        res.status(402).json(error);
    }
});

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatecart = await Cart.findByIdAndUpdate(req.params.id);
        res.status(200).json(updatecart);
    } catch (error) {
        res.status(402).json(error);
    }
});

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('deleted..');
    } catch (error) {
        res.status(402).json(error);
    }
});

router.get('/allcart', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allcart = await Cart.find();
        res.status(200).json(allcart);
    } catch (error) {
        res.status(402).json(error);
    }
})


module.exports = router;