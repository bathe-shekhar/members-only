const db = require('../db/queries');

async function getHomePage(req, res) {

    const isMember = req.user ? req.user.ismember : false;
    // console.log('isMember', isMember);
    const messages = await db.getAllMessages(isMember);
    // console.log('messages', messages);;

    try {
        console.log("User: ", req.user);

        res.render('index', { title: 'Home', messages: messages, user: req.user });//, viewCount: req.session.viewCount });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getHomePage,
};