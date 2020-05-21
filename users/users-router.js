const router = require("express").Router();
const jwt = require("jsonwebtoken")
const Users = require("../users/users-model.js");
const configVars = require("../config/vars")

function restrict(req, res, next) {
   const token = req.headers.authorization
    if (token){
        jwt.verify(token, configVars.jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json({message: "invalid token"})
            } else {
                req.subject = decodedToken.subject
                req.username = decodedToken.username
                next()
            }
        })
    } else {
        res.status(401).json({message: 'YOU, SHALL NOT, PAAAAAAAAASSSS!'})
    }
}



router.get('/', restrict, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router