import React, { useState, useEffect } from 'react';
import { AlertTriangle, Globe, Volume2, RefreshCw, Clock, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getAlerts } from '../services/api';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await getAlerts();
      setAlerts(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      toast.error('Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical': return '🚨';
      case 'High': return '⚠️';
      case 'Medium': return '⚡';
      case 'Low': return 'ℹ️';
      default: return '📢';
    }
  };

  const speakAlert = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
      toast.info('Reading alert aloud...');
    } else {
      toast.error('Text-to-speech not supported in your browser');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="text-center mb-8">
          <Bell className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Scam Alerts</h1>
          <p className="text-xl text-gray-600">
            Real-time alerts about active scams and fraud attempts
          </p>
        </div>

        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
             
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Language:</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    language === 'en' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    language === 'hi' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Updated: {lastUpdated}</span>
                </div>
              )}
              <button
                onClick={fetchAlerts}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        
        <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-4">
            <AlertTriangle className="h-8 w-8" />
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">
                {language === 'en' ? 'Emergency Contact' : 'आपातकालीन संपर्क'}
              </div>
              <div className="text-lg">
                {language === 'en' ? 
                  'If you\'ve been targeted by a scam: ' : 
                  'यदि आप किसी घोटाले के शिकार हुए हैं: '
                }
                <a href="tel:1930-FRAUD-HELP" className="font-bold underline">
                  1930-FRAUD-HELP
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {(Array.isArray(alerts) ? alerts : []).filter(a => a.severity === 'Critical').length}
            </div>
            <div className="text-gray-600">
              {language === 'en' ? 'Critical' : 'गंभीर'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {(Array.isArray(alerts) ? alerts : []).filter(a => a.severity === 'High').length}
            </div>
            <div className="text-gray-600">
              {language === 'en' ? 'High' : 'उच्च'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {(Array.isArray(alerts) ? alerts : []).filter(a => a.severity === 'Medium').length}
            </div>
            <div className="text-gray-600">
              {language === 'en' ? 'Medium' : 'मध्यम'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {alerts.length}
            </div>
            <div className="text-gray-600">
              {language === 'en' ? 'Total' : 'कुल'}
            </div>
          </div>
        </div>

        
        <div className="space-y-6">
          {(Array.isArray(alerts) ? alerts : []).map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {alert.translations[language].title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {alert.translations[language].content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {alert.category}
                        </span>
                        {alert.location && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            📍 {alert.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => speakAlert(alert.translations[language].title + '. ' + alert.translations[language].content)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Read aloud"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading alerts...</p>
          </div>
        )}

        {alerts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'en' ? 'No active alerts' : 'कोई सक्रिय अलर्ट नहीं'}
            </h3>
            <p className="text-gray-500">
              {language === 'en' ? 
                'Check back later for the latest scam alerts' : 
                'नवीनतम घोटाला अलर्ट के लिए बाद में जांचें'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
