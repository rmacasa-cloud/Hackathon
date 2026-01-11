import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { evaluations, type } = location.state || {};
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    if (!evaluations || evaluations.length === 0) {
      navigate('/');
      return;
    }

    const total = evaluations.reduce((sum, e) => sum + (e.evaluation?.score || 0), 0);
    setOverallScore(Math.round(total / evaluations.length));
  }, [evaluations, navigate]);

  if (!evaluations || evaluations.length === 0) {
    return null;
  }

  const isTechnical = type === 'technical';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Overall Summary */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {isTechnical ? 'Technical' : 'Behavioral'} Interview Complete! 🎉
          </h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Overall Score</p>
              <p className="text-5xl font-bold text-blue-600">{overallScore}/10</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Questions Answered</p>
              <p className="text-5xl font-bold text-green-600">{evaluations.length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Interview Type</p>
              <p className="text-2xl font-bold text-purple-600 capitalize">{type}</p>
            </div>
          </div>
        </div>

        {/* Individual Evaluations */}
        {evaluations.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            {/* Question Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex-1">
                  {isTechnical ? 'Coding Question' : `Question ${index + 1}`}
                </h2>
                <div className="flex items-center ml-4">
                  <span className="text-5xl font-bold text-blue-600">
                    {item.evaluation?.score || 0}/10
                  </span>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 italic mb-4">
                "{item.question}"
              </p>
            </div>

            {/* Overall Feedback */}
            {item.evaluation?.overall && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">📝 Overall Assessment:</p>
                <p className="text-blue-800 text-lg">{item.evaluation.overall}</p>
              </div>
            )}

            {/* Technical: Show Code */}
            {isTechnical && item.code && (
              <div className="mb-6 bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <p className="text-sm font-semibold text-gray-400 mb-2">Your Code ({item.language}):</p>
                <pre className="text-sm font-mono whitespace-pre-wrap">{item.code}</pre>
              </div>
            )}

            {/* Response/Explanation */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                {isTechnical ? 'Your Explanation:' : 'Your Response:'}
              </p>
              <p className="text-gray-800">{isTechnical ? item.explanation : item.response}</p>
            </div>

            {/* Detailed Feedback Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Strengths - Content/Code */}
              {item.evaluation?.contentStrengths && item.evaluation.contentStrengths.length > 0 && (
                <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center text-lg">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {isTechnical ? 'Code Strengths' : 'Content Strengths'}
                  </h3>
                  <ul className="space-y-3">
                    {item.evaluation.contentStrengths.map((strength, i) => (
                      <li key={i} className="flex items-start text-green-800">
                        <span className="text-green-600 font-bold mr-2 mt-1">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements - Content/Code */}
              {item.evaluation?.contentImprovements && item.evaluation.contentImprovements.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-4 flex items-center text-lg">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {isTechnical ? 'Code Improvements' : 'Content Improvements'}
                  </h3>
                  <ul className="space-y-3">
                    {item.evaluation.contentImprovements.map((improvement, i) => (
                      <li key={i} className="flex items-start text-orange-800">
                        <span className="text-orange-600 font-bold mr-2 mt-1">→</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths - Delivery/Explanation */}
              {item.evaluation?.deliveryStrengths && item.evaluation.deliveryStrengths.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center text-lg">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    {isTechnical ? 'Explanation Strengths' : 'Delivery Strengths'}
                  </h3>
                  <ul className="space-y-3">
                    {item.evaluation.deliveryStrengths.map((strength, i) => (
                      <li key={i} className="flex items-start text-blue-800">
                        <span className="text-blue-600 font-bold mr-2 mt-1">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements - Delivery/Explanation */}
              {item.evaluation?.deliveryImprovements && item.evaluation.deliveryImprovements.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-4 flex items-center text-lg">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {isTechnical ? 'Explanation Improvements' : 'Delivery Improvements'}
                  </h3>
                  <ul className="space-y-3">
                    {item.evaluation.deliveryImprovements.map((improvement, i) => (
                      <li key={i} className="flex items-start text-purple-800">
                        <span className="text-purple-600 font-bold mr-2 mt-1">→</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start New Interview
          </button>
          <button
            onClick={() => navigate(`/interview/${type}?count=${evaluations.length}`)}
            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Retry Same Type
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Built for SB Hacks XII • Deepgram Challenge
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Streaming STT (Nova-2) • OpenAI GPT-3.5 • Deepgram TTS
          </p>
        </div>
      </div>
    </div>
  );
}
