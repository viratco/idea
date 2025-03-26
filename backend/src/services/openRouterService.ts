import axios from 'axios';
import { IdeaGenerationParams } from '../types/idea';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const generateBusinessIdea = async (params: IdeaGenerationParams): Promise<string> => {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is not configured');
    }

    const systemMessage = `You are an expert startup advisor and business strategist. Your task is to generate innovative, practical business ideas that STRICTLY match the user's constraints, especially their budget.

    CRITICAL RULES:
    1. NEVER suggest ideas requiring more capital than the user's specified budget
    2. Focus on lean, bootstrappable ideas when budget is under $5K
    3. Suggest only realistic features and plans that can be executed within the budget
    4. Consider cost-effective alternatives and minimal viable solutions
    5. If budget is low, emphasize digital products, services, or low-overhead businesses
    6. Always explain how the idea can be started within the specified budget range
    7. Include specific cost breakdowns in the analysis

    Format your response according to the exact template provided.`;

    const prompt = `Generate a practical, budget-conscious business idea based on the following parameters:

    STRICT BUDGET CONSTRAINT: $${params.budget[0]} - $${params.budget[1]}
    This budget limit is ABSOLUTE - do not suggest anything requiring more capital.

    Consider:
    - User Type: ${params.userType}
    - Industries of Interest: ${params.industries.join(', ')}
    - Technical Skills: ${params.technicalSkills.join(', ')}
    - Time Available: ${params.timeCommitment}
    - Risk Tolerance: ${params.riskLevel}
    - Key Challenges: ${params.challenges.join(', ')}
    ${params.focusNiche ? `- Target Niche: ${params.focusNiche}` : ''}
    ${params.suggestTrending ? '- Consider current market trends and emerging technologies' : ''}
    ${params.suggestCompetitors ? '- Include competitor analysis' : ''}
    
    Format the response as follows:

    Title: [Practical, budget-friendly product/service name]

    Description: [Two sentences: First describing the core offering, second explaining how it fits within the budget]

    Market Analysis:
    - Market Size: [High/Medium/Low]
    - Competition Level: [High/Medium/Low]
    - Industry: [Single-word category]
    - Business Model: [Specific revenue model]
    - Initial Investment: [Must be within $${params.budget[0]} - $${params.budget[1]}]

    Required Skills:
    - [Technical Skill]
    - [Business Skill]
    - [Optional Additional Skill]

    Idea Fitness:
    [3-4 sentences: First on market fit, second on skill match, third on budget feasibility, optional fourth on growth potential]

    MVP Features:
    1. [Essential Feature Name - Include approximate cost]
    Description: [One sentence explaining the feature and its budget-conscious implementation]
    2. [Core Feature Name - Include approximate cost]
    Description: [One sentence explaining the feature and its budget-conscious implementation]
    3. [Basic Feature Name - Include approximate cost]
    Description: [One sentence explaining the feature and its budget-conscious implementation]

    Differentiation:
    1. [Cost-effective Unique Selling Point]
    Description: [One sentence on competitive advantage within budget constraints]
    2. [Resource-efficient Unique Selling Point]
    Description: [One sentence on lean implementation approach]
    3. [Market-focused Unique Selling Point]
    Description: [One sentence on customer value proposition]

    Revenue Model:
    Primary Revenue: [Main revenue stream with ROI timeline]
    Secondary Revenue: [Additional revenue stream requiring minimal extra investment]

    Scalability Plan:
    1. [Launch Phase - First 3 months]
    - Timeline: [Specific milestones]
    - Costs: [Breakdown of initial expenses]
    - Goals: [Measurable targets]

    2. [Growth Phase - Months 4-12]
    - Expansion: [Key growth areas]
    - Investment: [Profit reinvestment strategy]
    - Metrics: [Success indicators]

    3. [Scale Phase - Year 2+]
    - Market: [Target market expansion]
    - Operations: [Team and process scaling]
    - Technology: [Platform/service improvements]

    Deep Insights:
    1. Market Demand:
    [2-3 sentences analyzing:
    - Target market size and demographics
    - Current market gaps and needs
    - Growth potential within budget constraints]

    2. Technological Feasibility:
    [2-3 sentences covering:
    - Required technical infrastructure
    - Implementation complexity
    - Available tools and resources within budget]

    3. Customer Retention:
    [2-3 sentences explaining:
    - User engagement strategies
    - Loyalty program implementation
    - Cost-effective retention tactics]

    4. Growth Strategy:
    [2-3 sentences detailing:
    - Initial market entry approach
    - Scaling roadmap
    - Resource allocation plan]

    Cost Breakdown:
    Initial Setup ($${params.budget[0]} max):
    - Technology: [Software/tools costs]
    - Marketing: [Initial promotion budget]
    - Legal/Admin: [Registration/compliance costs]
    - Emergency Fund: [10-20% of total budget]

    Monthly Operations:
    - Fixed Costs: [List with amounts]
    - Variable Costs: [List with estimates]
    - Marketing Budget: [Monthly allocation]
    - Profit Margin: [Expected percentage]

    CRITICAL RULES:
    1. All costs MUST stay within $${params.budget[0]} - $${params.budget[1]}
    2. Each deep insight section MUST be detailed and actionable
    3. Scalability plan MUST be realistic for the budget
    4. All features and strategies MUST be implementable with available resources`;

    const detailsPrompt = `Based on the initial idea, generate a detailed analysis in the following format:

    Please provide a comprehensive analysis in the following format:

    Title: [Product/Service Name]

    Description: [Two flowing sentences]

    Market Analysis:
    - Market Size: [High/Medium/Low]
    - Competition Level: [High/Medium/Low]
    - Industry: [Single-word category]
    - Business Model: [Specific revenue model]
    - Initial Investment: [Format: $XXK - $YYK]

    Required Skills:
    - [Technical Skill]
    - [Business Skill]
    - [Optional Additional Skill]

    Idea Fitness:
    [3-4 sentences explaining why this idea is particularly well-suited for the user's background, skills, and market conditions]

    MVP Features:
    1. [Core Feature Name]
    Description: [One sentence explaining the feature]
    2. [Core Feature Name]
    Description: [One sentence explaining the feature]
    3. [Core Feature Name]
    Description: [One sentence explaining the feature]

    Differentiation:
    1. [Unique Selling Point]
    Description: [One sentence explaining the advantage]
    2. [Unique Selling Point]
    Description: [One sentence explaining the advantage]
    3. [Unique Selling Point]
    Description: [One sentence explaining the advantage]

    Revenue Model:
    Primary Revenue: [Main revenue stream with brief explanation]
    Secondary Revenue: [Additional revenue stream with brief explanation]

    Scalability Plan:
    1. [Phase 1 with specific milestone]
    2. [Phase 2 with specific milestone]
    3. [Phase 3 with specific milestone]

    Deep Insights:
    1. Market Demand: [2-3 sentences on market potential and customer needs]
    2. Technological Feasibility: [2-3 sentences on technical implementation and challenges]
    3. Customer Retention: [2-3 sentences on user engagement and loyalty strategies]
    4. Growth Strategy: [2-3 sentences on expansion and scaling plans]

    CRITICAL FORMATTING RULES:
    1. Follow the exact format and section headers
    2. Keep descriptions concise but informative
    3. Ensure all sections are properly numbered where indicated
    4. Maintain consistent formatting for lists and subsections

    Base this analysis on:
    - User Type: ${params.userType}
    - Industries: ${params.industries.join(', ')}
    - Technical Skills: ${params.technicalSkills.join(', ')}
    - Time Available: ${params.timeCommitment}
    - Risk Level: ${params.riskLevel}
    - Key Challenges: ${params.challenges.join(', ')}
    - Budget Range: $${params.budget[0]}
    ${params.focusNiche ? `- Target Niche: ${params.focusNiche}` : ''}
    ${params.suggestTrending ? '- Consider current market trends and emerging technologies' : ''}
    ${params.suggestCompetitors ? '- Include competitor analysis' : ''}`;

    const messages = [
      {
        role: 'system',
        content: 'You are an expert startup advisor. Generate a practical business idea that strictly fits within the given budget. Format your response with these exact sections: Title, Description, Market Analysis, Required Skills, MVP Features, Revenue Model, and Deep Insights.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    console.log('=== AI REQUEST START ===');
    console.log('Sending messages to AI:', JSON.stringify(messages, null, 2));

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'qwen/qwen2.5-vl-72b-instruct:free',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://github.com/vikaschauhan1995',
          'X-Title': 'Trendgen Cofounder'
        }
      }
    );

    console.log('=== AI RESPONSE START ===');
    console.log('AI Response:', response.data.choices[0].message.content);
    console.log('=== AI RESPONSE END ===');

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error('No response from OpenRouter API');
    }

    const content = response.data.choices[0].message.content;
    
    // More flexible validation - check for key sections but don't fail if some are missing
    const requiredSections = ['Title:', 'Description:', 'Market Analysis:', 'Required Skills:'];
    const missingSections = requiredSections.filter(section => !content.includes(section));
    
    if (missingSections.length > 0) {
      console.error('Missing required sections:', missingSections);
      throw new Error('Incomplete AI response - missing core sections');
    }

    // If deep insights are missing, append default content
    if (!content.includes('Deep Insights:')) {
      console.log('Adding default deep insights section');
      return content + `\n\nDeep Insights:
1. Market Demand: The idea targets a growing market segment with clear customer needs. Initial research suggests strong potential for early adoption among the target audience. Focus on validating market assumptions through customer interviews and surveys.

2. Technological Feasibility: Implementation can be achieved using readily available tools and technologies. The MVP can be built using low-code solutions and free-tier services initially. Technical complexity is kept minimal to match the budget constraints.

3. Customer Retention: Focus on delivering core value proposition effectively. Build strong customer relationships through personalized support and regular feedback collection. Implement basic but effective engagement strategies.

4. Growth Strategy: Start with a focused niche market and expand gradually. Use organic growth and word-of-mouth marketing initially. Scale operations based on validated demand and customer feedback.`;
    }

    return content;
  } catch (error: any) {
    console.error('Error generating business idea:', error.response?.data || error.message);
    
    if (error.response?.status === 402) {
      throw new Error('OpenRouter API requires credits. Please visit https://openrouter.ai/settings/credits to add credits to your account.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid OpenRouter API key. Please check your API key configuration.');
    } else if (error.response?.status === 404) {
      throw new Error('The selected AI model is not available. Trying fallback models...');
    } else if (error.response?.data?.error) {
      throw new Error(error.response.data.error.message || 'OpenRouter API error');
    }
    
    throw new Error(error.message || 'Failed to generate business idea');
  }
};
