import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DeepgramSTT, deepgramTTS } from '../utils/deepgram';
import { evaluateTechnicalResponse } from '../utils/openai';
import { TECHNICAL_TOPICS } from '../data/questions';

const LANGUAGES = ['Python', 'JavaScript', 'Java', 'C++', 'C', 'Go', 'Ruby'];

export default function TechnicalInterview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Setup phase
  const [setupComplete, setSetupComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('Arrays & Strings');
  const [language, setLanguage] = useState('Python');
  
  // Interview phase
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [status, setStatus] = useState('Select your preferences');
  const [submitted, setSubmitted] = useState(false);
  
  const deepgramRef = useRef(null);
  const currentAudioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (deepgramRef.current) deepgramRef.current.disconnect();
      if (currentAudioRef.current) currentAudioRef.current.pause();
    };
  }, []);

  const startInterview = async () => {
    // Select random question from chosen difficulty/topic
    const questions = TECHNICAL_TOPICS[topic][difficulty];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
    setSetupComplete(true);
    
    // Set initial code template with function signature
    const signature = randomQuestion.signatures[language];
    setCode(signature + '\n    // Your code here\n}');
    
    // Speak the question
    setAiSpeaking(true);
    setStatus('AI is reading the question...');
    
    try {
      const text = `Here's your ${difficulty} ${topic} question: ${randomQuestion.title}. ${randomQuestion.description}. Take a moment to read the examples and constraints, then start coding.`;
      const audio = await deepgramTTS(text, import.meta.env.VITE_DEEPGRAM_API_KEY);
      currentAudioRef.current = audio;
      
      audio.onended = () => {
        setAiSpeaking(false);
        setStatus('Read the question, write your code, then click mic to explain');
      };
    } catch (error) {
      setAiSpeaking(false);
      setStatus('Read the question, write your code, then click mic to explain');
    }
  };

  const startListening = async () => {
    try {
      setStatus('Connecting...');
      setTranscript('');
      setInterimTranscript('');
      
      deepgramRef.current = new DeepgramSTT(
        import.meta.env.VITE_DEEPGRAM_API_KEY,
        (text, isFinal) => {
          if (isFinal) {
            setTranscript(prev => prev + ' ' + text);
            setInterimTranscript('');
          } else {
            setInterimTranscript(text);
          }
        },
        (error) => {
          console.error('Deepgram error:', error);
          setStatus('Microphone error');
          setIsListening(false);
        }
      );
      
      await deepgramRef.current.connect();
      setIsListening(true);
      setStatus('Listening... Explain your code. Click again to stop.');
    } catch (error) {
      setStatus('Failed to start microphone');
    }
  };

  const stopListening = () => {
    if (deepgramRef.current) {
      deepgramRef.current.disconnect();
      deepgramRef.current = null;
    }
    setIsListening(false);
    setStatus('You can continue coding or click Submit when done');
  };

  const submitSolution = async () => {
    if (code.trim().length < 10) {
      setStatus('Please write some code first');
      return;
    }
    
    if (transcript.trim().length < 20) {
      setStatus('Please explain your approach using the microphone');
      return;
    }
    
    setSubmitted(true);
    setStatus('Evaluating your solution...');
    
    try {
      const evaluation = await evaluateTechnicalResponse(
        `${question.title}: ${question.description}`,
        code,
        transcript,
        language
      );
      
      navigate('/results', {
        state: {
          evaluations: [{
            question: question.title,
            fullQuestion: question.description,
            code: code,
            explanation: transcript,
            language: language,
            evaluation: evaluation
          }],
          type: 'technical'
        }
      });
    } catch (error) {
      console.error('Error evaluating:', error);
      setStatus('Error evaluating solution. Try again.');
      setSubmitted(false);
    }
  };

  // Setup screen
  if (!setupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Technical Interview Setup</h1>
          
          {/* Difficulty Selector */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['easy', 'medium', 'hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`py-4 px-6 rounded-lg font-bold capitalize transition-all ${
                    difficulty === diff
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Selector */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
            >
              {Object.keys(TECHNICAL_TOPICS).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Programming Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Start Button */}
          <button
            onClick={startInterview}
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Interview
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Interview screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Technical Interview</h1>
              <div className="text-right">
                <span className="text-sm text-gray-600 block">{difficulty} • {topic}</span>
                <span className="text-sm text-blue-600 font-semibold">{language}</span>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h3>
            <p className="text-gray-800 mb-4 leading-relaxed">
              {question.description}
            </p>
            
            {/* Examples */}
            <div className="mb-4">
              <p className="font-semibold text-gray-900 mb-2">Examples:</p>
              {question.examples.map((ex, i) => (
                <div key={i} className="bg-white rounded-lg p-3 mb-2">
                  <p className="text-sm"><strong>Input:</strong> {ex.input}</p>
                  <p className="text-sm"><strong>Output:</strong> {ex.output}</p>
                  {ex.explanation && <p className="text-sm text-gray-600 mt-1"><strong>Explanation:</strong> {ex.explanation}</p>}
                </div>
              ))}
            </div>
            
            {/* Constraints */}
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="font-semibold text-gray-900 mb-1">Constraints:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {question.constraints.map((constraint, i) => (
                  <li key={i}>• {constraint}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6 text-center">
            <p className={`text-lg font-semibold ${
              aiSpeaking ? 'text-purple-600' : 
              isListening ? 'text-green-600' : 'text-gray-700'
            }`}>
              {status}
            </p>
          </div>

          {/* Code Editor */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Your Code ({language})
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Write your ${language} solution here...\n\nFunction signature, logic, etc.`}
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-blue-500 focus:outline-none resize-none"
              disabled={submitted}
            />
          </div>

          {/* Voice Explanation Section */}
          <div className="mb-6 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Explain Your Approach</h3>
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={aiSpeaking || submitted}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  aiSpeaking || submitted ? 'bg-gray-300 cursor-not-allowed' :
                  isListening ? 'bg-green-500 text-white hover:bg-green-600' : 
                  'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isListening ? '⏹ Stop Recording' : '🎤 Start Recording'}
              </button>
            </div>

            {(transcript || interimTranscript) && (
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">Your Explanation:</p>
                <p className="text-gray-800">
                  {transcript}
                  {interimTranscript && (
                    <span className="text-gray-400 italic"> {interimTranscript}</span>
                  )}
                </p>
              </div>
            )}

            {!transcript && !interimTranscript && (
              <p className="text-gray-500 text-center py-4">
                Click the microphone to explain your approach, time complexity, and reasoning
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              onClick={submitSolution}
              disabled={submitted || aiSpeaking}
              className={`flex-1 py-4 rounded-lg text-xl font-bold transition-all ${
                submitted || aiSpeaking
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
              }`}
            >
              {submitted ? 'Evaluating...' : 'Submit Solution'}
            </button>
            
            <button
              onClick={() => navigate('/')}
              disabled={submitted}
              className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Exit
            </button>
          </div>

          {/* Helper Text */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Tips:</strong> Write your code, then use the microphone to explain your approach, 
              discuss time/space complexity, and walk through your solution step by step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
