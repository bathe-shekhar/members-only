const admin = (req, res, next) => {

    console.log("this: ", req.user);

    if (req.user && req.user.isadmin === true) {
        return next();
    }

    res.send('You are not authorized to perform this action.');

}


module.exports = admin;