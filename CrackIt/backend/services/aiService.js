import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Check if OpenAI API key is available
const hasValidAPIKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 20;

const openai = hasValidAPIKey ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

export const analyzeResume = async (resumeText) => {
  // If no API key or quota exceeded, return mock data immediately
  if (!hasValidAPIKey || !openai) {
    console.log('OpenAI unavailable, using fallback resume analysis');
    return generateMockResumeAnalysis(resumeText);
  }

  try {
    const prompt = `Analyze this resume and extract the following information in JSON format:
{
  "skills": ["skill1", "skill2", ...],
  "experience": ["experience1", "experience2", ...],
  "projects": ["project1", "project2", ...],
  "summary": "A brief summary of the candidate's profile",
  "readinessScore": number between 0-100
}

Resume:
${resumeText}

Provide structured JSON output only.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert resume analyzer. Always respond with valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content);

    return {
      skills: parsed.skills || [],
      experience: parsed.experience || [],
      projects: parsed.projects || [],
      summary: parsed.summary || 'No summary available',
      readinessScore: parsed.readinessScore || 50
    };
  } catch (error) {
    console.log('AI Resume Analysis Error, using fallback:', error.message);
    return generateMockResumeAnalysis(resumeText);
  }
};

// Generate mock resume analysis
const generateMockResumeAnalysis = (resumeText) => {
  const skills = extractBasicSkills(resumeText);
  const experienceMatches = resumeText.match(/\d+\+?\s*(years?|months?)\s*(of)?\s*(experience|work)/gi) || [];
  const projectMatches = resumeText.match(/project[s]?[:\s]+([^\n]+)/gi) || [];
  
  return {
    skills: skills,
    experience: experienceMatches.length > 0 
      ? experienceMatches.slice(0, 3).map(exp => exp.trim())
      : [
          'Professional experience detected in resume',
          'Multiple roles and responsibilities identified',
          'Demonstrates progressive career growth'
        ],
    projects: projectMatches.length > 0
      ? projectMatches.slice(0, 3).map(proj => proj.replace(/project[s]?[:\s]+/i, '').trim())
      : [
          'Portfolio projects mentioned in resume',
          'Technical implementation experience',
          'Problem-solving capabilities demonstrated'
        ],
    summary: skills.length > 0 
      ? `Experienced professional with expertise in ${skills.slice(0, 3).join(', ')}. Strong technical background with proven project delivery capabilities.`
      : 'Resume analyzed successfully. Candidate shows promise with relevant background and skills.',
    readinessScore: Math.min(50 + (skills.length * 5), 85)
  };
};

export const generateInterviewQuestions = async (role, skills, count = 5) => {
  // Use fallback if no API key
  if (!hasValidAPIKey || !openai) {
    console.log('OpenAI unavailable, using fallback questions');
    return getDefaultQuestions(role);
  }

  try {
    const prompt = `Generate ${count} interview questions for a ${role} position.
${skills.length > 0 ? `Candidate has these skills: ${skills.join(', ')}` : ''}

Requirements:
- Mix technical and behavioral questions
- Appropriate difficulty for the role
- Clear and specific
- Return as JSON array: ["question1", "question2", ...]`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert technical interviewer. Always respond with valid JSON array.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const content = response.choices[0].message.content;
    const questions = JSON.parse(content);

    return Array.isArray(questions) ? questions : getDefaultQuestions(role);
  } catch (error) {
    console.error('AI Question Generation Error:', error);
    return getDefaultQuestions(role);
  }
};

export const evaluateAnswer = async (question, answer, role) => {
  if (!answer || answer.trim().length === 0) {
    return {
      score: 0,
      feedback: 'No answer provided.',
      relevance: 0,
      clarity: 0,
      technicalDepth: 0,
      missingKeywords: []
    };
  }

  // Use fallback if no API key
  if (!hasValidAPIKey || !openai) {
    console.log('OpenAI unavailable, using fallback evaluation');
    return generateMockEvaluation(question, answer);
  }

  try {
    const prompt = `Evaluate this interview answer for a ${role} position.

Question: ${question}
Answer: ${answer}

Provide evaluation in JSON format:
{
  "score": number (0-10),
  "feedback": "Detailed feedback string",
  "relevance": number (0-10),
  "clarity": number (0-10),
  "technicalDepth": number (0-10),
  "missingKeywords": ["keyword1", "keyword2"]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert interviewer evaluating candidate answers. Always respond with valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    const evaluation = JSON.parse(content);

    return {
      score: evaluation.score || 5,
      feedback: evaluation.feedback || 'Answer received.',
      relevance: evaluation.relevance || 5,
      clarity: evaluation.clarity || 5,
      technicalDepth: evaluation.technicalDepth || 5,
      missingKeywords: evaluation.missingKeywords || []
    };
  } catch (error) {
    console.log('AI Answer Evaluation Error, using fallback:', error.message);
    return generateMockEvaluation(question, answer);
  }
};

// Generate mock answer evaluation
const generateMockEvaluation = (question, answer) => {
  const wordCount = answer.split(/\s+/).length;
  const hasCodeExample = /```|function|const|let|var|class|import/i.test(answer);
  const hasTechnicalTerms = /algorithm|optimization|performance|scalability|architecture/i.test(answer);
  
  let score = 5;
  if (wordCount > 100) score += 1;
  if (wordCount > 200) score += 1;
  if (hasCodeExample) score += 1;
  if (hasTechnicalTerms) score += 1;
  
  const clarity = wordCount > 50 ? Math.min(8, 5 + Math.floor(wordCount / 50)) : 5;
  const technicalDepth = hasCodeExample ? 8 : (hasTechnicalTerms ? 7 : 5);
  const relevance = answer.length > 100 ? 7 : 6;
  
  let feedback = 'Good answer! ';
  if (wordCount < 50) {
    feedback += 'Consider providing more detail and examples. ';
  } else if (wordCount > 150) {
    feedback += 'Excellent level of detail. ';
  }
  
  if (hasCodeExample) {
    feedback += 'Great job including code examples. ';
  } else if (question.toLowerCase().includes('code') || question.toLowerCase().includes('implement')) {
    feedback += 'Consider adding code examples to strengthen your answer. ';
  }
  
  return {
    score: Math.min(score, 10),
    feedback,
    relevance,
    clarity,
    technicalDepth,
    missingKeywords: []
  };
};

const extractBasicSkills = (text) => {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'PHP',
    'React', 'Vue', 'Angular', 'Next.js', 'Svelte',
    'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQL', 'NoSQL', 'Firebase',
    'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS', 'LESS',
    'Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'REST API', 'GraphQL', 'Microservices', 'CI/CD', 'Testing', 'Jest', 'Mocha',
    'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science', 'Pandas', 'NumPy'
  ];
  const foundSkills = [];
  
  commonSkills.forEach(skill => {
    if (text.toLowerCase().includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });
  
  return foundSkills.length > 0 ? foundSkills : ['Programming'];
};

const getDefaultQuestions = (role) => {
  const defaultQuestions = {
    'Frontend Developer': [
      'Explain the virtual DOM and how React uses it.',
      'What is the difference between state and props in React?',
      'How do you optimize the performance of a React application?',
      'Describe your approach to responsive design.',
      'Tell me about a challenging frontend project you worked on.'
    ],
    'Backend Developer': [
      'Explain RESTful API design principles.',
      'How do you handle authentication and authorization?',
      'What is database indexing and why is it important?',
      'Describe your experience with scalable backend architectures.',
      'How do you handle errors in a Node.js application?'
    ],
    'Full Stack Developer': [
      'Explain the difference between SQL and NoSQL databases.',
      'How do you ensure security in a full-stack application?',
      'Describe your approach to API design.',
      'What is your experience with deployment and DevOps?',
      'Tell me about a full-stack project you are proud of.'
    ],
    'Data Analyst': [
      'How do you approach data cleaning and preprocessing?',
      'Explain the difference between correlation and causation.',
      'What visualization tools are you familiar with?',
      'Describe a complex analysis you performed.',
      'How do you communicate technical findings to non-technical stakeholders?'
    ]
  };

  return defaultQuestions[role] || [
    'Tell me about yourself.',
    'What are your strengths?',
    'Describe a challenging project.',
    'How do you handle tight deadlines?',
    'Why are you interested in this role?'
  ];
};
