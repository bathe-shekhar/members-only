const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const flash = require("express-flash");
dotenv.config({ path: path.join(__dirname, '.env') });
// const pg = require('pg');
// const bcrypt = require('bcryptjs');
const indexRouter = require('./routes/indexRoute');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool.js');
const userRouter = require('./routes/userRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
        pool: pool,
        tableName: 'session',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

app.use(flash());

// Passport middleware

require('./config/passport.js');
app.use(passport.initialize());
app.use(passport.session());


// Middleware

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});


//Routes

app.use("/", indexRouter);
// app.use("/user", userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
