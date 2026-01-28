import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dbPath = join(__dirname, '../db.json');

// Create db.json if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({
    users: [],
    challenges: [],
    test_cases: [],
    mcq_questions: [],
    personality_questions: [],
    assessment_sessions: [],
    submissions: [],
    submission_analysis: [],
    security_events: [],
  }, null, 2));
}

const adapter = new JSONFile(dbPath);
const db = new Low(adapter, {
    users: [],
    challenges: [],
    test_cases: [],
    mcq_questions: [],
    personality_questions: [],
    assessment_sessions: [],
    submissions: [],
    submission_analysis: [],
    security_events: [],
});

export default db;

