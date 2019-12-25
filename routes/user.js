const app = require('express')();
const User = require('../models/user');
const _ = require('lodash');

// create user
app.post('/', async (req, res, next) => {
    try {
        const user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
        await user.save();
        const token = await user.generateAuthToken()
        logger.info(`User: user created for - ${JSON.stringify(req.body)}`);
        res.header('x-auth-header', token).status(200).send(_.pick(user, ['name', 'email']));
    }
    catch (error) {
        logger.error(`User: Error while creating user: ${((error.stack) ? error.stack : error)}`)
        res.status(401).send(`Error while creating user: ${error}`);
    }
})

// login user 
app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password)
        if (!user) {
            logger.warn(`User/login: No User found for ${email}`);
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        logger.info(`User/login: login for email: ${email} successful`);
        res.header('x-auth-header', token).status(200).send(`Login successful.`);
    }
    catch (error) {
        logger.error(`User/login: Error while login user ${req.body.email}: ${((error.stack) ? error.stack : error)}`)
        res.status(401).send(`User/login: Error while login user ${req.body.email}: ${error}`);
    }
})
module.exports = app;
