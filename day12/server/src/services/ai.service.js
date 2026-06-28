const OpenAI = require('openai');

class AIService {
  constructor() {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        'HTTP-Referer': process.env.APP_URL || 'http://localhost:5000',
        'X-Title': 'Wedding Planner AI',
      },
    });
    
 this.model = 'meta-llama/llama-3.3-70b-instruct:free';
    // Alternative models:
    // - 'x-ai/grok-4.3:free' (newer)
    // - 'x-ai/grok-4.1:free' (older)
    // - 'google/gemini-2.0-flash-exp:free' (Google's free model)
    // - 'meta-llama/llama-4:free' (Meta's free model)
  }

  /**
   * Get vendor recommendations using Grok
   */
  async getVendorRecommendations(preferences, vendors) {
    try {
      const prompt = this.buildRecommendationPrompt(preferences, vendors);
      
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert wedding planner AI assistant specializing in Indian weddings. 
                      You help couples find the best vendors based on their preferences, budget, and location.
                      Always provide practical, personalized recommendations with specific reasoning.
                      Format your response as a JSON object with the following structure:
                      {
                        "recommendations": [
                          {
                            "vendorName": "Name",
                            "category": "Category",
                            "matchScore": 85,
                            "reasoning": "Why this vendor is a good match",
                            "estimatedPrice": 50000,
                            "whyItWorks": "Specific reason this vendor fits their needs"
                          }
                        ],
                        "summary": "Overall summary of recommendations",
                        "budgetAdvice": "Specific budget advice"
                      }`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      // Parse JSON response
      const content = response.choices[0].message.content;
      return this.parseAIResponse(content);
    } catch (error) {
      console.error('AI Recommendation Error:', error);
      // Fallback to rule-based recommendations
      return this.getFallbackRecommendations(preferences, vendors);
    }
  }

  /**
   * Build prompt for vendor recommendations
   */
  buildRecommendationPrompt(preferences, vendors) {
    const vendorList = vendors.map(v => ({
      name: v.businessName,
      category: v.category,
      city: v.city,
      startingPrice: v.pricing.startingPrice,
      rating: v.rating,
      description: v.description.substring(0, 100),
    }));

    return `
      Wedding Preferences:
      - Budget: ₹${preferences.budget || 'Not specified'}
      - Location: ${preferences.location || 'Not specified'}
      - Guests: ${preferences.guests || 'Not specified'}
      - Style: ${preferences.style || 'Not specified'}
      - Event Type: ${preferences.eventType || 'Not specified'}
      - Category: ${preferences.category || 'All'}

      Available Vendors:
      ${JSON.stringify(vendorList, null, 2)}

      Based on the preferences above, recommend the best vendors from the available list.
      Consider:
      1. Budget compatibility
      2. Location match
      3. Category match
      4. Rating and reputation
      5. Capacity for guests

      Provide specific reasoning for each recommendation.
    `;
  }

  /**
   * Parse AI response
   */
  parseAIResponse(content) {
    try {
      // Try to extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      // If no JSON, return plain text
      return { recommendations: [], summary: content, budgetAdvice: '' };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return { recommendations: [], summary: content, budgetAdvice: '' };
    }
  }

  /**
   * Fallback: Rule-based recommendations (if AI fails)
   */
  getFallbackRecommendations(preferences, vendors) {
    // Simple scoring algorithm
    const scored = vendors.map(vendor => {
      let score = 0;
      const reasons = [];

      // Budget match (30%)
      if (vendor.pricing.startingPrice <= preferences.budget) {
        score += 30;
        reasons.push('Within budget');
      }

      // Location match (20%)
      if (vendor.city.toLowerCase() === preferences.location?.toLowerCase()) {
        score += 20;
        reasons.push('Local vendor');
      }

      // Rating (20%)
      if (vendor.rating >= 4.5) score += 20;
      else if (vendor.rating >= 4.0) score += 15;
      else if (vendor.rating >= 3.5) score += 10;
      reasons.push(`${vendor.rating}★ rating`);

      // Availability (15%)
      if (vendor.available) {
        score += 15;
        reasons.push('Available');
      }

      // Category match (15%)
      if (vendor.category === preferences.category || preferences.category === 'All') {
        score += 15;
        reasons.push(`Specializes in ${vendor.category}`);
      }

      return {
        vendorName: vendor.businessName,
        category: vendor.category,
        matchScore: score,
        reasoning: reasons.join(', '),
        estimatedPrice: vendor.pricing.startingPrice,
        whyItWorks: `Matches your ${preferences.category} needs`,
        _vendor: vendor // Keep reference for display
      };
    });

    return {
      recommendations: scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10),
      summary: `Found ${scored.length} vendors matching your preferences.`,
      budgetAdvice: 'Consider comparing multiple vendors for the best deal.'
    };
  }

  /**
   * Budget optimization using Grok
   */
  async optimizeBudgetWithAI(preferences) {
    try {
      const prompt = `
        Wedding Budget Optimization:
        - Total Budget: ₹${preferences.totalBudget}
        - Guests: ${preferences.guests}
        - Events: ${preferences.events?.join(', ') || 'Not specified'}
        - Location: ${preferences.location || 'Not specified'}

        Provide a detailed budget breakdown for an Indian wedding with:
        1. Recommended allocation by category
        2. Estimated costs
        3. Tips to save money
        4. Where to splurge vs. save

        Format as JSON with the following structure:
        {
          "allocation": {
            "Venue": 200000,
            "Catering": 150000,
            "Photography": 100000,
            ...
          },
          "totalEstimated": 500000,
          "savingsTips": ["Tip 1", "Tip 2"],
          "splurgeRecommendations": ["Venue", "Photography"],
          "saveRecommendations": ["Decorations", "Invitations"]
        }
      `;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a wedding budget expert. Provide realistic cost breakdowns for Indian weddings.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 1500,
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return this.getFallbackBudgetOptimization(preferences);
    } catch (error) {
      console.error('AI Budget Optimization Error:', error);
      return this.getFallbackBudgetOptimization(preferences);
    }
  }

  /**
   * Fallback budget optimization
   */
  getFallbackBudgetOptimization(preferences) {
    const totalBudget = preferences.totalBudget || 500000;
    const guests = preferences.guests || 200;

    // Typical Indian wedding budget allocation (%)
    const allocation = {
      'Venue': Math.round(totalBudget * 0.25),
      'Catering': Math.round(totalBudget * 0.20),
      'Photography': Math.round(totalBudget * 0.15),
      'Decorations': Math.round(totalBudget * 0.10),
      'Music': Math.round(totalBudget * 0.05),
      'Attire': Math.round(totalBudget * 0.08),
      'Makeup': Math.round(totalBudget * 0.03),
      'Transport': Math.round(totalBudget * 0.04),
      'Invitations': Math.round(totalBudget * 0.02),
      'Contingency': Math.round(totalBudget * 0.08),
    };

    return {
      allocation,
      totalEstimated: Object.values(allocation).reduce((a, b) => a + b, 0),
      savingsTips: [
        'Book venues during off-season for 30-40% savings',
        'Consider a weekday wedding for better rates',
        'Negotiate package deals with vendors',
        'Use digital invitations to save on printing',
        'Start planning early to avoid rush charges'
      ],
      splurgeRecommendations: ['Venue', 'Photography', 'Catering'],
      saveRecommendations: ['Decorations', 'Invitations', 'Transport']
    };
  }

  /**
   * Get wedding timeline using Grok
   */
  async getWeddingTimeline(preferences) {
    try {
      const prompt = `
        Create a comprehensive wedding timeline for an Indian wedding with:
        - Wedding Date: ${preferences.weddingDate || 'Not specified'}
        - Events: ${preferences.events?.join(', ') || 'Mehendi, Sangeet, Wedding, Reception'}
        - Location: ${preferences.location || 'Not specified'}
        - Guests: ${preferences.guests || 200}

        Provide a detailed timeline with:
        1. Pre-wedding activities (6-12 months before)
        2. 3-month checklist
        3. 1-month checklist
        4. 1-week checklist
        5. Day-of timeline

        Format as a structured list with dates and tasks.
      `;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a wedding planning expert. Provide detailed, practical timelines for Indian weddings.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 2000,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI Timeline Error:', error);
      return 'Failed to generate timeline. Please try again.';
    }
  }

  /**
   * Get vendor matching with Grok
   */
  async getVendorMatching(weddingDetails, vendors) {
    try {
      const prompt = `
        Wedding Details:
        ${JSON.stringify(weddingDetails, null, 2)}

        Available Vendors:
        ${JSON.stringify(vendors.map(v => ({
          name: v.businessName,
          category: v.category,
          city: v.city,
          price: v.pricing.startingPrice,
          rating: v.rating,
          features: v.features
        })), null, 2)}

        Match each wedding event with the best vendor from the available list.
        Provide specific vendor recommendations for each event type.
      `;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a wedding vendor matching expert. Find the perfect vendors for each wedding event.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI Vendor Matching Error:', error);
      return 'Failed to match vendors. Please try again.';
    }
  }
}

module.exports = new AIService();