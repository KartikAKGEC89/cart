const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
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


module.exports = router;