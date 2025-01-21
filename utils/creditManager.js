const db = require('../src/config/database');

const deductCredits = async (session_name, amount = 1) => {
    try {
        await db.query(
            'UPDATE clients SET available_credits = available_credits - ? WHERE session_name = ? AND available_credits >= ?',
            [amount, session_name, amount]
        );
        return true;
    } catch (error) {
        console.error('Error deducting credits:', error);
        return false;
    }
};

module.exports = { deductCredits }; 