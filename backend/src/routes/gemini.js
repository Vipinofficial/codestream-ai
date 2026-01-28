import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// IMPORTANT: Set the API_KEY in your environment variables
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.post('/proxy', async (req, res) => {
  if (!process.env.API_KEY) {
    return res.status(500).json({ message: 'API key is not configured on the server.' });
  }

  const { model, contents, config } = req.body;

  if (!model || !contents) {
    return res.status(400).json({ message: 'Model and contents are required.' });
  }

  try {
    const generativeModel = genAI.getGenerativeModel({ model });
    const result = await generativeModel.generateContent({ contents, generationConfig: config });
    const response = await result.response;
    res.json(response);
  } catch (error) {
    console.error('Error proxying request to Gemini API:', error);
    res.status(500).json({ message: 'Error processing your request.' });
  }
});

export default router;

