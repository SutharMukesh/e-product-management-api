const app = require('express')();
const User = require('../models/user');
const _ = require('lodash');

app.post('/', async (req, res, next) => {
    try {
        const user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
        await user.save();
        const token = await user.generateAuthToken()
        res.header('x-auth-header', token).status(200).send(_.pick(user, ['name', 'email']));
    }
    catch (error) {
        res.status(401).send(`Error while creating user: ${error}`);
    }
})


app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.header('x-auth-header', token).status(200).send(`Login successful.`);
    }
    catch (error) {
        res.status(401).send(`Error while creating user: ${((error.stack) ? error.stack : error)}`);
    }
})
module.exports = app;
