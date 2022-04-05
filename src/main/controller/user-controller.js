const express = require('express')
const { users } = require('../data/users')
const objectUtils = require('../utils/object-utils');
const userValidationSchema = require('../domain/validation/user')
const bcrypt = require('bcrypt')

const router = express.Router();
router.use(express.json());

// middleware
router.use((req, res, next) => {
    console.log("Inside user controller");
    next();
});

router.get("/", (req, res) => {
    if (objectUtils.isNotEmpty(req.query)) {
        const age_eq = req.query['age_eq'];
        const age_ge = req.query['age_ge'];
        const age_le = req.query['age_le'];
        if (age_eq) {
            res.send(users.filter(user => user.age === age_eq));
        }
        if (age_ge) {
            res.send(users.filter(user => user.age >= age_ge));
        }
        if (age_le) {
            res.send(users.filter(user => user.age <= age_le));
        }
    } else{
        res.send(users);
    }
})

// path variable
router.get("/:id", (req, res) => {
    const user = users.find(user=> user.id == req.params.id);
    if(user) {
        res.send(user);
    } else {
        res.status(404).send(`User Not found with id: ${req.params.id}`);
    }
})

router.post('/', (req, res) => {
    const user = req.body;
    const { error, result } = userValidationSchema.validate(user);
    if (error) {
        res.status(400).send(error.message);
    } else {
        user['id'] = users.length + 1;
        bcrypt.hash(user['password'], 10, (err, hash) => {
            user['password'] = hash;
            user['repeat_password'] = hash;
            users.push(user);
            res.send(user);
        });
    }
});

module.exports = router;