const pool = require('./pool.js');
const bcrypt = require('bcryptjs');

async function getAllMessages(isMember) {

    let selectFields = 'id, message';

    if (isMember) {
        selectFields += ', createdby, createdat';
    }

    try {
        const { rows } = await pool.query(`SELECT ${selectFields} FROM messages ORDER BY createdat DESC`);
        console.log('Fetched messages:', rows);
        return rows;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

async function addMeassage(message, username) {
    try {
        const { rows } = await pool.query('INSERT INTO messages (createdby, message) VALUES ($1, $2) RETURNING *', [username, message]);
        return rows[0];
    } catch (error) {
        console.error('Error creating message:', error);
        throw error;
    }
}

async function deleteMessage(messageId) {
    try {
        const { rows } = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [messageId]);
        return rows[0];
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
}

async function createUser(username, password, useremail) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query('INSERT INTO users (username, userpassword, useremail) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, useremail]);
        return rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function joinTheClub(userid) {
    console.log('Joining the club for user:', userid);
    try {
        const { rows } = await pool.query('UPDATE users SET ismember = true WHERE id = $1 RETURNING *', [userid]);
        return rows[0];
    } catch (error) {
        console.error('Error joining the club:', error);
        throw error;
    }

}



module.exports = {
    getAllMessages,
    createUser,
    addMeassage,
    joinTheClub,
    deleteMessage
    // Add other query functions here as needed
};