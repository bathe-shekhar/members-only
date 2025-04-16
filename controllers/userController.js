const passport = require('passport');
const db = require('../db/queries.js');
const { body, validationResult } = require('express-validator');

const alphaError = 'must contain only characters.';
const lengthError = 'must be at least 3 and max 30 characters long.';
const passwordError = 'must be at least 8 and max 80 characters long.';

const validateUser = [
    body('username')
        .trim().isAlpha().withMessage(`Username ${alphaError}`)
        .isLength({ min: 3, max: 30 }).withMessage(`Username ${lengthError}`),
    body('password')
        .isLength({ min: 8, max: 80 }).withMessage(`Password ${passwordError}`),
];

async function getSignupPage(req, res) {
    try {
        res.render('user-sign-up', { title: 'Sign Up' });
    } catch (error) {
        console.error('Error rendering signup page:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createUser = [validateUser, async (req, res) => {

    console.log('Creating user:', req.body);


    const { username, password, useremail } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(400).render('user-sign-up', { title: 'Sign Up', errors: errors.array() });
    }

    try {
        await db.createUser(username, password, useremail);
        res.render('user-login', { title: 'Login:', message: 'User created successfully. Please log in.' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}]

async function getLoginPage(req, res) {
    try {
        res.render('user-login', { title: 'Login' });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error');
    }

}

const postLogin = [
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in',
        failureFlash: true,
    }),
];

function getJoinTheClubPage(req, res) {
    try {
        res.render('join-the-club', { title: 'Join the Club', user: req.user });
    } catch (error) {
        console.error('Error rendering join the club page:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function joinTheClub(req, res) {
    const { passcode } = req.body;
    console.log('Joining the club for user:', req.user);

    if (passcode !== process.env.PASSCODE) {
        console.error('Invalid passcode:', passcode);
        return res.status(403).send('Forbidden: Invalid passcode');
    }
    else {
        try {
            await db.joinTheClub(req.user.id);
            res.redirect('/');
        } catch (error) {
            console.error('Error joining the club:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = {
    getSignupPage,
    getLoginPage,
    postLogin,
    createUser,
    getJoinTheClubPage,
    joinTheClub
};