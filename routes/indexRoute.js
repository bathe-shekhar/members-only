const { Router } = require('express');
const { getHomePage } = require('../controllers/homeController');
const passport = require('passport');
const indexRouter = Router();
const { getSignupPage, getLoginPage, createUser, getJoinTheClubPage, joinTheClub, postLogin, postUserLogin } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const { createMeassage, getCreateMessagePage, deleteMessage } = require('../controllers/messageController');
const admin = require('../middlewares/adminMiddleware');

indexRouter.get('/', getHomePage);

indexRouter.get('/login-success', (req, res) => {
    console.log('Login successful:', req.user);

    res.send('<p>Login successful!<p>');
});


indexRouter.get("/sign-up", getSignupPage)
indexRouter.post("/sign-up", createUser); // Assuming you want to handle POST requests as well

indexRouter.get("/log-in", getLoginPage);
indexRouter.post("/log-in", passport.authenticate('local', { failureRedirect: '/log-in', successRedirect: '/', failureFlash: true }));

indexRouter.get("/join-the-club", auth, getJoinTheClubPage);
indexRouter.post("/join-the-club", auth, joinTheClub);

indexRouter.get("/add-message", auth, getCreateMessagePage); // Assuming you have a function to render the message creation page
indexRouter.post("/add-message", auth, createMeassage);

indexRouter.get("/delete-message/:id", admin, deleteMessage);

indexRouter.get("/log-out", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
});


module.exports = indexRouter;