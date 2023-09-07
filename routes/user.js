const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const User = require('../models/User');

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SEC).toString();
    }
    
    try {
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updateuser);
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }

})

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {

    
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("deleteduser");
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }

});


// Not authorized **************************************************


router.get('/find', verifyTokenAndAdmin, async (req, res) => {

    
    try {
        const user = await User.find();
        res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }

});


module.exports = router;