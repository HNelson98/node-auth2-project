const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const jwt = require("jsonwebtoken")

const Users = require("../users/users-model.js");
const configVars = require("../config/vars")
const { isValid } = require('../users/users-service')

router.post('/register', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {

        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash

        Users.add(credentials).then(user => {
            res.status(201).json({ data: user })
        })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })

    } else {
        res.status(400).json({ message: 'please provide a username and password, and the password should be a string' })
    }


})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
 if (isValid(req.body)){
    Users.findBy({ username })

        .then(([user]) => {



            if (user && bcryptjs.compareSync(password, user.password)) {

                token = generateToken(user)



                res.status(200).json({ message: 'Welcome!', token })

            } else {
                res.status(401).json({ message: 'please provide a valid username and password' })
            }

        })
        .catch(err => {
            res.status(500).json({ message: `THIS DONT WORK, ${err} ` })
        })


    } else {
        res.status(400).json({ message: 'please provide a username and password, and the password should be a string' })
    }


})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };


    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, configVars.jwtSecret, options)
}


module.exports = router;