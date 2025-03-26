import { EventEmitter } from 'events';
import axios from 'axios';
import dotenv from 'dotenv';

export interface BusinessMetrics {
  annualRevenuePotential: string;
  marketSize: string;
  projectedUsers: string;
  timeToBreakeven: string;
  initialInvestment: string;
  competitiveEdge: string;
  lastUpdated?: string;
  status?: 'processing' | 'complete' | 'error';
}

class MetricsEventEmitter extends EventEmitter {}
export const metricsEmitter = new MetricsEventEmitter();

export const generateMetrics = async (ideaTitle: string, ideaFitness: string): Promise<BusinessMetrics> => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenRouter API key not found');
  }

  const prompt = `Given a business idea titled "${ideaTitle}" with a fitness score of ${ideaFitness}, provide only numerical values for the following metrics:
- Annual Revenue Potential (e.g., 5M, 100K)
- Market Size (e.g., 1B, 500M)
- Projected Users (e.g., 100K, 1M)
- Time to Breakeven in months (e.g., 12, 24)
- Initial Investment (e.g., 500K, 2M)
- Competitive Edge score from 1-10

Provide ONLY the numerical values in this exact format:
annualRevenuePotential: [value]
marketSize: [value]
projectedUsers: [value]
timeToBreakeven: [value]
initialInvestment: [value]
competitiveEdge: [value]`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-opus',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    return extractMetricsFromResponse(aiResponse);
  } catch (error) {
    console.error('Error generating metrics:', error);
    throw error;
  }
};

export const extractMetricsFromResponse = (aiResponse: any): BusinessMetrics => {
  try {
    let extractedMetrics: Partial<BusinessMetrics> = {};
    
    if (typeof aiResponse === 'object' && aiResponse !== null) {
      extractedMetrics = aiResponse;
    } else if (typeof aiResponse === 'string') {
      const cleanedResponse = aiResponse.trim();
      
      // Extract metrics using regex patterns
      const patterns = {
        annualRevenuePotential: /Annual Revenue Potential:\s*\$?(\d+(?:\.\d+)?\s*[KMB])/i,
        marketSize: /Market Size:\s*\$?(\d+(?:\.\d+)?\s*[KMB])/i,
        projectedUsers: /Projected Users:\s*(\d+(?:\.\d+)?\s*K)/i,
        timeToBreakeven: /Time to Breakeven:\s*(\d+(?:\.\d+)?)/i,
        initialInvestment: /Initial Investment:\s*\$?(\d+(?:\.\d+)?\s*[KM])/i,
        competitiveEdge: /Competitive Edge:\s*(\d+(?:\.\d+)?)/i
      };

      Object.entries(patterns).forEach(([key, pattern]) => {
        const match = cleanedResponse.match(pattern);
        if (match && match[1]) {
          extractedMetrics[key as keyof Omit<BusinessMetrics, 'status' | 'lastUpdated'>] = match[1].trim();
        }
      });
    }

    // Format and validate metrics
    const metrics: BusinessMetrics = {
      annualRevenuePotential: formatMetric(extractedMetrics.annualRevenuePotential),
      marketSize: formatMetric(extractedMetrics.marketSize),
      projectedUsers: formatMetric(extractedMetrics.projectedUsers),
      timeToBreakeven: formatMetric(extractedMetrics.timeToBreakeven),
      initialInvestment: formatMetric(extractedMetrics.initialInvestment),
      competitiveEdge: formatMetric(extractedMetrics.competitiveEdge),
      lastUpdated: new Date().toISOString(),
      status: 'complete'
    };

    // Emit metrics update event
    metricsEmitter.emit('metricsUpdate', metrics);
    return metrics;

  } catch (error) {
    console.error('Error processing metrics:', error);
    const errorMetrics: BusinessMetrics = {
      annualRevenuePotential: 'N/A',
      marketSize: 'N/A',
      projectedUsers: 'N/A',
      timeToBreakeven: 'N/A',
      initialInvestment: 'N/A',
      competitiveEdge: 'N/A',
      lastUpdated: new Date().toISOString(),
      status: 'error'
    };
    metricsEmitter.emit('metricsError', error);
    return errorMetrics;
  }
};

const formatMetric = (value: string | undefined): string => {
  if (!value) return 'N/A';
  return value.replace(/\s+/g, '');
};

export const startMetricsProcessing = (): void => {
  metricsEmitter.emit('metricsUpdate', {
    annualRevenuePotential: 'Processing...',
    marketSize: 'Processing...',
    projectedUsers: 'Processing...',
    timeToBreakeven: 'Processing...',
    initialInvestment: 'Processing...',
    competitiveEdge: 'Processing...',
    lastUpdated: new Date().toISOString(),
    status: 'processing'
  });
};