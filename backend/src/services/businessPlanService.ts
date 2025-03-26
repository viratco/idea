import axios from 'axios';

export interface BusinessPlanData {
  title: string;
  ideaFitness: string;
}

export interface BusinessMetrics {
  annualRevenuePotential: string;
  marketSize: string;
  projectedUsers: string;
  timeToBreakeven: string;
  initialInvestment: string;
  competitiveEdge: string;
}

export interface BusinessPlanResponse {
  title: string;
  introduction: string;
  metrics: BusinessMetrics;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeOpenRouterRequest = async (messages: any[], retryCount = 0): Promise<any> => {
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      messages,
      model: 'qwen/qwen2.5-vl-72b-instruct:free',
      temperature: 0.5,
      max_tokens: 400,
      stream: false,
      top_p: 0.9
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3001',
        'Content-Type': 'application/json',
        'X-Title': 'Business Plan Generator'
      },
      timeout: 30000
    });

    const responseData = response.data;
    
    if (!responseData || typeof responseData !== 'object') {
      throw new Error('Invalid response: Empty or non-object response received');
    }

    if (!Array.isArray(responseData.choices) || responseData.choices.length === 0) {
      throw new Error('Invalid response: Missing or empty choices array');
    }

    const firstChoice = responseData.choices[0];
    if (!firstChoice.message || typeof firstChoice.message !== 'object') {
      throw new Error('Invalid response: Missing or invalid message object in first choice');
    }

    if (typeof firstChoice.message.content !== 'string') {
      throw new Error('Invalid response: Missing or non-string content in message');
    }

    return responseData;
  } catch (error: any) {
    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      console.log(`Rate limit hit, retrying in ${RETRY_DELAY}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(RETRY_DELAY);
      return makeOpenRouterRequest(messages, retryCount + 1);
    }
    throw error;
  }
};

export const generateBusinessPlan = async (params: BusinessPlanData): Promise<BusinessPlanResponse> => {
  try {
    console.log('Generating business plan for:', params.title);
    const introPrompt = `Write a very brief business introduction (max 3-5 sentences) for this idea:\n\nTitle: ${params.title}\nIdea Fitness Assessment:\n${params.ideaFitness}\n\nFocus on the core concept and its unique value proposition. Be concise and professional.`;

    const metricsPrompt = `Analyze this business idea and provide STRICTLY numerical values ONLY. Use K for thousands, M for millions, B for billions. DO NOT include any explanatory text, just the numbers in the exact format below:\n\nTitle: ${params.title}\nIdea Fitness Assessment:\n${params.ideaFitness}\n\nRequired EXACT format - numbers only:\nAnnual Revenue Potential: [number]K/M/B\nMarket Size: [number]K/M/B\nProjected Users: [number]K\nTime to Breakeven: [number]\nInitial Investment: [number]K/M\nCompetitive Edge: [number]\n\nIMPORTANT: Respond with ONLY the numerical values in the exact format above. No additional text or explanations.`;

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured');
    }

    console.log('Making API request to OpenRouter...');
    // Get introduction
    const introResponse = await makeOpenRouterRequest([
      {
        role: 'system',
        content: 'You are a business analyst. Write very brief and concise business introductions in 2-3 sentences.'
      },
      {
        role: 'user',
        content: introPrompt
      }
    ]);

    console.log('Received intro response:', introResponse);
    
    if (!introResponse || typeof introResponse !== 'object') {
      throw new Error('Empty or invalid response received from AI service');
    }

    if (!Array.isArray(introResponse.choices) || introResponse.choices.length === 0) {
      throw new Error('Invalid response format: missing choices array');
    }

    const firstChoice = introResponse.choices[0];
    if (!firstChoice.message || typeof firstChoice.message !== 'object') {
      throw new Error('Invalid response format: missing or invalid message object');
    }

    if (typeof firstChoice.message.content !== 'string') {
      throw new Error('Invalid response format: missing or non-string content');
    }

    const introduction = introResponse.choices[0].message.content.trim();
    
    if (!introduction) {
      throw new Error('Empty introduction received from AI service');
    }
    
    // Get metrics
    const metricsResponse = await makeOpenRouterRequest([
      {
        role: 'system',
        content: 'You are a business analyst. Provide only numerical values for business metrics.'
      },
      {
        role: 'user',
        content: metricsPrompt
      }
    ]);

    console.log('Received metrics response:', metricsResponse);

    if (!metricsResponse || typeof metricsResponse !== 'object') {
      throw new Error('Empty or invalid metrics response received from AI service');
    }

    if (!Array.isArray(metricsResponse.choices) || metricsResponse.choices.length === 0) {
      throw new Error('Invalid metrics response format: missing choices array');
    }

    const metricsFirstChoice = metricsResponse.choices[0];
    if (!metricsFirstChoice.message || typeof metricsFirstChoice.message !== 'object') {
      throw new Error('Invalid metrics response format: missing or invalid message object');
    }

    if (typeof metricsFirstChoice.message.content !== 'string') {
      throw new Error('Invalid metrics response format: missing or non-string content');
    }

    const metricsText = metricsFirstChoice.message.content;

    if (!metricsText) {
      throw new Error('Empty metrics text received from AI service');
    }

    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    // Extract metrics using precise regex patterns
    console.log('Extracting numerical values from response...');
    const metrics = {
      annualRevenuePotential: metricsText.match(/Annual Revenue Potential:\s*\$?(\d+(?:\.\d+)?\s*[KMB])/i)?.[1]?.trim() || '0',
      marketSize: metricsText.match(/Market Size:\s*\$?(\d+(?:\.\d+)?\s*[KMB])/i)?.[1]?.trim() || '0',
      projectedUsers: metricsText.match(/Projected Users:\s*(\d+(?:\.\d+)?\s*K)/i)?.[1]?.trim() || '0',
      timeToBreakeven: metricsText.match(/Time to Breakeven:\s*(\d+(?:\.\d+)?)/i)?.[1]?.trim() || '0',
      initialInvestment: metricsText.match(/Initial Investment:\s*\$?(\d+(?:\.\d+)?\s*[KM])/i)?.[1]?.trim() || '0',
      competitiveEdge: metricsText.match(/Competitive Edge:\s*(\d+(?:\.\d+)?)/i)?.[1]?.trim() || '0'
    };

    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    console.log('Extracted raw metrics:', metrics);
    console.log('Formatting metrics for consistent presentation...');
    // Format metrics to ensure consistent presentation
    const formattedMetrics = {
      annualRevenuePotential: metrics.annualRevenuePotential.replace(/\s+/g, ''),
      marketSize: metrics.marketSize.replace(/\s+/g, ''),
      projectedUsers: metrics.projectedUsers.replace(/\s+/g, ''),
      timeToBreakeven: metrics.timeToBreakeven,
      initialInvestment: metrics.initialInvestment.replace(/\s+/g, ''),
      competitiveEdge: metrics.competitiveEdge
    };


    // Validate that we extracted at least some valid metrics
    const hasValidMetrics = Object.values(metrics).some(value => value !== '0');
    if (!hasValidMetrics) {
      throw new Error('Failed to extract valid metrics from AI service response');
    }

    return {
      title: params.title,
      introduction: introduction,
      metrics: metrics
    };
  } catch (error: any) {
    console.error('Error generating business plan introduction:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    
    let errorMessage = 'Failed to generate business plan introduction';
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid request format.';
      } else if (error.response?.status === 401) {
        errorMessage = 'API authentication error.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment.';
      } else if (error.response?.data?.error) {
        errorMessage = typeof error.response.data.error === 'string'
          ? error.response.data.error
          : error.response.data.error.message || 'Unknown API error';
      }
    }
    
    throw new Error(errorMessage);
  }
};
