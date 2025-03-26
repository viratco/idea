import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateBusinessIdea } from './services/openRouterService';
import { IdeaGenerationParams } from './types/idea';
import businessPlanRoutes from './routes/businessPlanRoutes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Routes
app.use('/api/business-plan', businessPlanRoutes);

app.post('/api/generate-idea', async (req, res) => {
  try {
    console.log('Received request to generate idea:', req.body);
    const idea = await generateBusinessIdea(req.body);
    console.log('Successfully generated idea');
    res.json(idea);
  } catch (error: any) {
    console.error('Error in /api/generate-idea:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to generate business idea',
      error: error.stack
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
