const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }

});



router.post('/login', async (req, res) => {
   
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json('Wrong Details');

        const hassedpassword = CryptoJS.AES.decrypt(user.password, process.env.SEC);
        
        const password = hassedpassword.toString(CryptoJS.enc.Utf8);
        password != req.body.password && res.status(401).json('Wrong Details');
        
        const accesstoken = JWT.sign({
            id: user._id,
            isadmin: user.isadmin,
        },
            process.env.SEC,
        { expiresIn:"10h" });
        
        
        res.status(200).json({user, accesstoken});


    } catch (error) {
        res.status(501).json(error);
        console.log(error)
    }
})


module.exports = router;