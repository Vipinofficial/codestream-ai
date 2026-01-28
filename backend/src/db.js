
const { Low, JSONFile } = require('lowdb');
const { join } = require('path');

const adapter = new JSONFile(join(__dirname, '../db.json'));
const db = new Low(adapter);

async function initializeDatabase() {
    await db.read();
    db.data = db.data || {
        users: [],
        challenges: [],
        test_cases: [],
        mcq_questions: [],
        personality_questions: [],
        assessment_sessions: [],
        submissions: [],
        submission_analysis: [],
        security_events: [],
    };
    await db.write();
}

initializeDatabase();

module.exports = db;
