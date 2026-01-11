import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { DeepgramSTT, deepgramTTS } from '../utils/deepgram';
import { evaluateBehavioralResponse } from '../utils/openai';
import { BEHAVIORAL_QUESTIONS } from '../data/questions';

export default function BehavioralInterview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const numQuestions = parseInt(searchParams.get('count')) || 3;
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [aiSpeaking, setAiSpeaking] = useState(true);
  const [status, setStatus] = useState('AI is asking first question...');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const deepgramRef = useRef(null);
  const currentAudioRef = useRef(null);

  useEffect(() => {
    if (hasInitialized) return; // Only run once
    
    setHasInitialized(true);
    
    const shuffled = [...BEHAVIORAL_QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numQuestions);
    setQuestions(selected);
    
    const timer = setTimeout(() => {
      if (selected.length > 0) {
        speakQuestion(selected[0], 0);
      }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if (deepgramRef.current) deepgramRef.current.disconnect();
      if (currentAudioRef.current) currentAudioRef.current.pause();
    };
  }, []);

  const speakQuestion = async (question, index) => {
    try {
      setAiSpeaking(true);
      setStatus('AI is speaking...');
      
      const text = `Question ${index + 1}: ${question}`;
      const audio = await deepgramTTS(text, import.meta.env.VITE_DEEPGRAM_API_KEY);
      currentAudioRef.current = audio;
      
      audio.onended = () => {
        setAiSpeaking(false);
        setStatus('Your turn to speak. Click mic when ready.');
      };
    } catch (error) {
      console.error('TTS error:', error);
      setAiSpeaking(false);
      setStatus('Your turn to speak. Click mic when ready.');
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
      setStatus('Listening... Click again to stop');
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
    
    const finalTranscript = transcript.trim();
    if (finalTranscript.length < 20) {
      setStatus('Response too short. Try again.');
      setTranscript('');
      return;
    }
    
    setStatus('Processing...');
    handleResponse(finalTranscript);
  };

  const handleResponse = async (response) => {
    try {
      const newHistory = [...conversationHistory, {
        question: questions[currentQuestionIndex],
        response: response
      }];
      setConversationHistory(newHistory);
      
      if (currentQuestionIndex < questions.length - 1) {
        await speakText("Great. Let's move to the next question.");
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTranscript('');
        setTimeout(() => {
          speakQuestion(questions[currentQuestionIndex + 1], currentQuestionIndex + 1);
        }, 2000);
      } else {
        await speakText("Great job! Let's review your responses.");
        setTimeout(() => {
          generateAllFeedback(newHistory);
        }, 2000);
      }
    } catch (error) {
      console.error('Error processing response:', error);
      setStatus('Error processing. Try again.');
    }
  };

  const speakText = async (text) => {
    try {
      setAiSpeaking(true);
      setStatus('AI is responding...');
      const audio = await deepgramTTS(text, import.meta.env.VITE_DEEPGRAM_API_KEY);
      currentAudioRef.current = audio;
      
      return new Promise(resolve => {
        audio.onended = () => {
          setAiSpeaking(false);
          setStatus('Your turn to speak. Click mic when ready.');
          resolve();
        };
      });
    } catch (error) {
      setAiSpeaking(false);
      setStatus('Your turn to speak.');
    }
  };

  const generateAllFeedback = async (history) => {
    setStatus('Generating feedback...');
    
    try {
      const evaluations = [];
      
      for (const item of history) {
        const evaluation = await evaluateBehavioralResponse(item.question, item.response);
        evaluations.push({
          question: item.question,
          response: item.response,
          evaluation
        });
      }
      
      navigate('/results', { 
        state: { 
          evaluations,
          type: 'behavioral'
        } 
      });
    } catch (error) {
      console.error('Error generating feedback:', error);
      setStatus('Error generating feedback');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Behavioral Interview</h1>
              <span className="text-lg font-semibold text-blue-600">
                Question {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-6 border-2 border-green-200">
            <p className="text-xl text-gray-800 font-medium">
              {questions[currentQuestionIndex]}
            </p>
          </div>

          <div className="mb-6 text-center">
            <p className={`text-lg font-semibold ${
              aiSpeaking ? 'text-purple-600' : 
              isListening ? 'text-green-600' : 'text-gray-700'
            }`}>
              {status}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="relative">
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse"></div>
              )}
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={aiSpeaking}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                  aiSpeaking ? 'bg-purple-400 cursor-not-allowed' :
                  isListening ? 'bg-green-500 hover:bg-green-600' : 
                  'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {(transcript || interimTranscript) && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 min-h-[100px]">
              <p className="text-sm font-semibold text-gray-600 mb-2">You're saying:</p>
              <p className="text-gray-800">
                {transcript}
                {interimTranscript && (
                  <span className="text-gray-400 italic"> {interimTranscript}</span>
                )}
              </p>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Exit Interview
          </button>
        </div>
      </div>
    </div>
  );
}