import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'TalkThrough'
  }
});

// Evaluate behavioral response
export async function evaluateBehavioralResponse(question, transcript) {
  try {
    const prompt = `You are an expert interview coach. Evaluate this behavioral interview response.

Question: "${question}"

Candidate's Response: "${transcript}"

Provide evaluation in this EXACT format:
CONTENT_STRENGTHS: [2-3 specific things they did well in their answer]
CONTENT_IMPROVEMENTS: [2-3 specific things to improve in their answer]
DELIVERY_STRENGTHS: [1-2 things about how they communicated]
DELIVERY_IMPROVEMENTS: [1-2 things about communication to improve]
SCORE: [number from 1-10]
OVERALL: [1 sentence summary]

Be specific and constructive.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 400
    });

    const text = response.choices[0].message.content;
    return parseEvaluation(text);
  } catch (error) {
    console.error('OpenAI error:', error);
    throw error;
  }
}

// Evaluate technical response (code + explanation)
export async function evaluateTechnicalResponse(question, code, transcript, language) {
  try {
    const prompt = `You are an expert technical interviewer. Evaluate this coding interview response.

Question: "${question}"

Language: ${language}

Code Written:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Verbal Explanation: "${transcript}"

Provide evaluation in this EXACT format:
CODE_STRENGTHS: [2-3 things done well in the code]
CODE_IMPROVEMENTS: [2-3 things to improve in the code]
EXPLANATION_STRENGTHS: [1-2 things about their verbal explanation]
EXPLANATION_IMPROVEMENTS: [1-2 things about explanation to improve]
SCORE: [number from 1-10]
OVERALL: [1 sentence summary]

Be specific about code correctness, efficiency, and communication.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    const text = response.choices[0].message.content;
    return parseEvaluation(text);
  } catch (error) {
    console.error('OpenAI error:', error);
    throw error;
  }
}

// Generate conversational follow-up for behavioral
export async function generateFollowUp(question, transcript) {
  try {
    const prompt = `You are an interviewer. The candidate answered: "${transcript}" to the question: "${question}".

If the answer is too short or vague, ask them to elaborate on a specific part.
If the answer is good, acknowledge it briefly and move on.

Respond in 1-2 sentences maximum. Be conversational and natural.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 100
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error);
    return "Could you tell me more about that?";
  }
}

// Parse evaluation text into structured object
function parseEvaluation(text) {
  const evaluation = {
    contentStrengths: [],
    contentImprovements: [],
    deliveryStrengths: [],
    deliveryImprovements: [],
    score: 5,
    overall: ''
  };

  try {
    // Extract sections using regex
    const contentStrengthsMatch = text.match(/CONTENT_STRENGTHS?:\s*\[(.*?)\]/s);
    const contentImprovementsMatch = text.match(/CONTENT_IMPROVEMENTS?:\s*\[(.*?)\]/s);
    const deliveryStrengthsMatch = text.match(/DELIVERY_STRENGTHS?:\s*\[(.*?)\]/s);
    const deliveryImprovementsMatch = text.match(/DELIVERY_IMPROVEMENTS?:\s*\[(.*?)\]/s);
    const scoreMatch = text.match(/SCORE:\s*(\d+)/);
    const overallMatch = text.match(/OVERALL:\s*(.+?)(?:\n|$)/);

    // Also check for CODE_ and EXPLANATION_ variants for technical
    const codeStrengthsMatch = text.match(/CODE_STRENGTHS?:\s*\[(.*?)\]/s);
    const codeImprovementsMatch = text.match(/CODE_IMPROVEMENTS?:\s*\[(.*?)\]/s);
    const explanationStrengthsMatch = text.match(/EXPLANATION_STRENGTHS?:\s*\[(.*?)\]/s);
    const explanationImprovementsMatch = text.match(/EXPLANATION_IMPROVEMENTS?:\s*\[(.*?)\]/s);

    if (contentStrengthsMatch) {
      evaluation.contentStrengths = contentStrengthsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    } else if (codeStrengthsMatch) {
      evaluation.contentStrengths = codeStrengthsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    }

    if (contentImprovementsMatch) {
      evaluation.contentImprovements = contentImprovementsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    } else if (codeImprovementsMatch) {
      evaluation.contentImprovements = codeImprovementsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    }

    if (deliveryStrengthsMatch) {
      evaluation.deliveryStrengths = deliveryStrengthsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    } else if (explanationStrengthsMatch) {
      evaluation.deliveryStrengths = explanationStrengthsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    }

    if (deliveryImprovementsMatch) {
      evaluation.deliveryImprovements = deliveryImprovementsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    } else if (explanationImprovementsMatch) {
      evaluation.deliveryImprovements = explanationImprovementsMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean);
    }

    if (scoreMatch) {
      evaluation.score = parseInt(scoreMatch[1]);
    }

    if (overallMatch) {
      evaluation.overall = overallMatch[1].trim();
    }
  } catch (error) {
    console.error('Error parsing evaluation:', error);
  }

  return evaluation;
}
