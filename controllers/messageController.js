const db = require('../db/queries.js');

const { body, validationResult } = require('express-validator');
const lengthError = 'must be at 3 to 150 characters long.';

const validateMessage = [
    body('message')
        .isLength({ min: 3, max: 150 }).withMessage(`Message ${lengthError}`),
];

async function getCreateMessagePage(req, res) {
    try {
        res.render('create-message', { title: 'Add Message' });
    } catch (error) {
        console.error('Error rendering add message page:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createMeassage = [validateMessage, async (req, res) => {
    const { message } = req.body;
    const username = req.user.username;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(400).render('create-message', { title: 'Add Message', errors: errors.array() });
    }

    try {
        await db.addMeassage(message, username);
        console.log('Message added successfully');
        res.redirect('/');
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).send('Internal Server Error');
    }

}];


async function deleteMessage(req, res) {
    const messageId = req.params.id;
    console.log('Deleting message with ID:', messageId);

    try {
        await db.deleteMessage(messageId);
        console.log('Message deleted successfully');
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    createMeassage,
    getCreateMessagePage,
    deleteMessage
    // Add other controller functions here as needed
};