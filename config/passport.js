const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../db/pool.js');

const verifyCallback = async (username, password, done) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];
        console.log(user);


        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        else {
            const match = await bcrypt.compare(password, user.userpassword);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        const user = rows[0];

        done(null, user);
    } catch (error) {
        console.error('Error deserializing user:', error);
        done(error);
    }
});