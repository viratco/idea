import express from 'express';
import { generateBusinessPlan, BusinessPlanData } from '../services/businessPlanService';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    if (!req.body.title || !req.body.ideaFitness) {
      return res.status(400).json({
        message: 'Title and idea fitness assessment are required'
      });
    }

    const params = {
      title: req.body.title,
      ideaFitness: req.body.ideaFitness
    };

    const result = await generateBusinessPlan(params);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/business-plan/generate:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to generate business plan'
    });
  }
});

export default router;