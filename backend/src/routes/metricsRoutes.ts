import express from 'express';
import { generateMetrics } from '../services/metricsService';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { ideaTitle, ideaFitness } = req.body;

    if (!ideaTitle || !ideaFitness) {
      return res.status(400).json({ 
        message: 'Idea title and fitness are required'
      });
    }

    const metrics = await generateMetrics(ideaTitle, ideaFitness);
    res.json(metrics);
  } catch (error: any) {
    console.error('Error generating metrics:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to generate metrics'
    });
  }
});

export default router;