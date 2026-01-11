import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [numQuestions, setNumQuestions] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">TalkThrough</h1>
          <p className="text-xl text-gray-600 mb-2">
            Real-Time AI Interview Practice with Voice
          </p>
          <p className="text-sm text-gray-500">
            Powered by Deepgram Streaming STT/TTS + OpenAI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Behavioral - with question selector inside */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Behavioral Interview</h2>
            <p className="text-gray-600 mb-4">
              Practice STAR method with conversational AI feedback
            </p>
            
            {/* Question selector */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Questions:</label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => setNumQuestions(num)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      numQuestions === num
                        ? 'bg-green-600 text-white shadow-lg scale-110'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => navigate(`/interview/behavioral?count=${numQuestions}`)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start ({numQuestions} question{numQuestions > 1 ? 's' : ''})
            </button>
          </div>

          {/* Technical */}
          <div 
            onClick={() => navigate('/interview/technical')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group transform hover:scale-105"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Technical Interview</h2>
            <p className="text-gray-600 mb-4">
              Solve coding problems and explain your approach
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              1 coding question
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-8">
          Built for SB Hacks XII • Deepgram Challenge Compliant
        </div>
      </div>
    </div>
  );
}