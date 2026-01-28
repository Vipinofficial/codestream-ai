
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

const authRoutes = require('./routes/auth');

const challengesRoutes = require('./routes/challenges');

const submissionsRoutes = require('./routes/submissions');

const geminiRoutes = require('./routes/gemini');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/gemini', geminiRoutes);

app.get('/', (req, res) => {
  res.send('Codestream AI Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
