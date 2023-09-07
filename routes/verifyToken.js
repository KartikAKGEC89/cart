const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {

    const authheader = req.headers.token;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, process.env.SEC, (err, user) => {
            if (err) res.status(403).json('hello');
            req.user = user;
            next();
        });
    } else {
        return res.send(401).json('not authenticated');
    }
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isadmin) {
            next();
        } else {
            res.status(403).json('you are not autorized');
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isadmin) {
            next();
        } else {
            res.status(403).json('you are not autorized');
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };