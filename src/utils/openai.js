import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5174',
    'X-Title': 'TalkThrough'
  }
});

// Evaluate behavioral response
export async function evaluateBehavioralResponse(question, transcript) {
  try {
    const prompt = `You are an expert behavioral interview coach. Evaluate this WRITTEN TRANSCRIPT of a spoken response. You ONLY have access to the words they said - you CANNOT assess tone, confidence, body language, or eye contact.

Question: "${question}"

Candidate's Transcript: "${transcript}"

Provide feedback in this EXACT format:

CONTENT_STRENGTHS:
- [First specific strength about WHAT they said - reference the STAR method if relevant]
- [Second specific strength about their answer content]
- [Third specific strength about their answer content]

CONTENT_IMPROVEMENTS:
- [First specific improvement about WHAT they should say differently]
- [Second specific improvement with exact suggestion]
- [Third specific improvement with exact suggestion]

DELIVERY_STRENGTHS:
- [First strength about their VERBAL COMMUNICATION based on transcript - clarity, structure, word choice]
- [Second strength about verbal communication]

DELIVERY_IMPROVEMENTS:
- [First improvement about VERBAL COMMUNICATION only - e.g., "Be more specific with numbers", "Use stronger action verbs", "Organize answer in STAR format"]
- [Second improvement about verbal communication]

SCORE: [number 1-10]

OVERALL: [2-3 sentences summarizing content quality and verbal communication]

CRITICAL RULES:
- DO NOT mention: tone, confidence, body language, eye contact, nervousness, posture
- ONLY evaluate: what they said (content) and how they structured their words (verbal organization)
- Each point must be 15+ words
- Be specific and reference their actual words
- Focus on STAR method: Situation, Task, Action, Result`;

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600
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
    const prompt = `You are a senior software engineer evaluating a coding interview. You have the CODE and a TRANSCRIPT of their verbal explanation. You CANNOT assess tone, confidence, or body language - only the words they said.

Question: "${question}"
Language: ${language}

Code:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Verbal Explanation Transcript: "${transcript}"

Provide feedback in this EXACT format:

CODE_STRENGTHS:
- [Strength 1: what they did well in code with specific example]
- [Strength 2: another code strength]
- [Strength 3: another code strength]

CODE_IMPROVEMENTS:
- [Improvement 1: specific bug/issue, why it's wrong, exact fix]
- [Improvement 2: specific improvement with exact fix]
- [Improvement 3: specific improvement with exact fix]

CODE_CORRECTNESS_SCORE: [number 1-10]

EXPLANATION_STRENGTHS:
- [Strength 1: what they explained well in their WORDS]
- [Strength 2: another explanation strength]

EXPLANATION_IMPROVEMENTS:
- [Improvement 1: what they should have SAID, with exact phrase they should use]
- [Improvement 2: what they missed saying, with exact technical phrase]
- [Improvement 3: how to verbally explain better]

EXPLANATION_SCORE: [number 1-10]

SCORE: [Overall: (CODE_CORRECTNESS_SCORE × 0.7) + (EXPLANATION_SCORE × 0.3)]

OVERALL: [3-4 sentences: Does code work? What's complexity? Was explanation clear? What to improve?]

CRITICAL RULES:
- DO NOT mention: tone, confidence, nervousness, body language
- ONLY evaluate: code correctness and what they SAID in words
- Each bullet 20+ words
- Specify exact line numbers or logic errors for code
- Give exact technical phrases for explanation improvements
- Always discuss time/space complexity`;

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 900
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
      model: 'openai/gpt-3.5-turbo',
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
    const extractBullets = (section) => {
      const bullets = section.split('\n')
        .filter(line => line.trim().startsWith('-') || line.trim().match(/^\d+\./))
        .map(line => line.replace(/^[-\d.]\s*/, '').trim())
        .filter(line => line.length > 0);
      return bullets;
    };

    const contentStrengthsMatch = text.match(/CONTENT_STRENGTHS?:([\s\S]*?)(?=CONTENT_IMPROVEMENTS?:|CODE_IMPROVEMENTS?:|$)/i);
    const contentImprovementsMatch = text.match(/CONTENT_IMPROVEMENTS?:([\s\S]*?)(?=DELIVERY_STRENGTHS?:|EXPLANATION_STRENGTHS?:|CODE_CORRECTNESS_SCORE:|$)/i);
    const deliveryStrengthsMatch = text.match(/DELIVERY_STRENGTHS?:([\s\S]*?)(?=DELIVERY_IMPROVEMENTS?:|EXPLANATION_IMPROVEMENTS?:|$)/i);
    const deliveryImprovementsMatch = text.match(/DELIVERY_IMPROVEMENTS?:([\s\S]*?)(?=SCORE:|EXPLANATION_SCORE:|$)/i);
    
    const codeStrengthsMatch = text.match(/CODE_STRENGTHS?:([\s\S]*?)(?=CODE_IMPROVEMENTS?:|$)/i);
    const codeImprovementsMatch = text.match(/CODE_IMPROVEMENTS?:([\s\S]*?)(?=CODE_CORRECTNESS_SCORE:|$)/i);
    const explanationStrengthsMatch = text.match(/EXPLANATION_STRENGTHS?:([\s\S]*?)(?=EXPLANATION_IMPROVEMENTS?:|$)/i);
    const explanationImprovementsMatch = text.match(/EXPLANATION_IMPROVEMENTS?:([\s\S]*?)(?=EXPLANATION_SCORE:|$)/i);

    if (contentStrengthsMatch) {
      evaluation.contentStrengths = extractBullets(contentStrengthsMatch[1]);
    } else if (codeStrengthsMatch) {
      evaluation.contentStrengths = extractBullets(codeStrengthsMatch[1]);
    }

    if (contentImprovementsMatch) {
      evaluation.contentImprovements = extractBullets(contentImprovementsMatch[1]);
    } else if (codeImprovementsMatch) {
      evaluation.contentImprovements = extractBullets(codeImprovementsMatch[1]);
    }

    if (deliveryStrengthsMatch) {
      evaluation.deliveryStrengths = extractBullets(deliveryStrengthsMatch[1]);
    } else if (explanationStrengthsMatch) {
      evaluation.deliveryStrengths = extractBullets(explanationStrengthsMatch[1]);
    }

    if (deliveryImprovementsMatch) {
      evaluation.deliveryImprovements = extractBullets(deliveryImprovementsMatch[1]);
    } else if (explanationImprovementsMatch) {
      evaluation.deliveryImprovements = extractBullets(explanationImprovementsMatch[1]);
    }

    const scoreMatch = text.match(/(?:^|\n)SCORE:\s*(\d+)/i);
    if (scoreMatch) {
      evaluation.score = parseInt(scoreMatch[1]);
    }

    const overallMatch = text.match(/OVERALL:\s*([\s\S]+?)(?:\n\n|$)/i);
    if (overallMatch) {
      evaluation.overall = overallMatch[1].trim();
    }

    if (evaluation.contentStrengths.length === 0 && evaluation.deliveryStrengths.length === 0) {
      evaluation.overall = "Unable to parse detailed feedback. Please try again.";
    }

  } catch (error) {
    console.error('Error parsing evaluation:', error);
    evaluation.overall = "Error parsing feedback.";
  }

  return evaluation;
}