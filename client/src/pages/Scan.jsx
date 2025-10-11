import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, Loader, Link as LinkIcon, Type } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { scanContent } from '../services/api.js';

const Scan = () => {
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState('text');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter text or URL to scan');
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      const res = await scanContent(inputText, inputType);
      setResult(res);

      // Show toast notification
      if (res.label === 'Scam') {
        toast.error(`🚨 धोखाधड़ी का पता चला! विश्वास स्तर: ${res.confidence}% | आपातकालीन: ${res.emergency}`, {
        autoClose: 8000,
        position: 'top-center'
      })
        toast.error(`🚨 SCAM DETECTED! Confidence: ${res.confidence}% | Emergency: ${res.emergency}`, {
          autoClose: 8000,
          position: 'top-center'
        });
      } else {
        toast.success(`✅ सामग्री सुरक्षित प्रतीत होती है! विश्वास स्तर: ${res.confidence}%`);
        toast.success(`✅ Content appears safe! Confidence: ${res.confidence}%`);
      }

    } catch (error) {
      toast.error('Scanning failed. Please try again.',error);
       toast.error('स्कैनिंग विफल हो गई। कृपया पुनः प्रयास करें। ');
    } finally {
      setIsScanning(false);
    }
  };

  const isUrl = (text) => {
    try {
      new URL(text);
      return true;
    } catch {
      return text.includes('.') && text.includes('http');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Scam Scanner</h1>
          <p className="text-xl text-gray-600">
            Analyze text messages, emails, or URLs for potential scams
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4 flex-wrap">
              <button
                onClick={() => setInputType('text')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${inputType === 'text' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
              >
                <Type className="h-5 w-5" />
                <span>Text</span>
              </button>
              <button
                onClick={() => setInputType('url')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${inputType === 'url' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
              >
                <LinkIcon className="h-5 w-5" />
                <span>URL</span>
              </button>
              <button
                onClick={() => setInputType('audio')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${inputType === 'audio' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
              >
                <Shield className="h-5 w-5" />
                <span>Call Recording</span>
              </button>
            </div>


            <div className="relative">
              {inputType === 'audio' ? (
                <div className="border border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-500">
                  <p className="text-lg font-semibold mb-2">🎤 Call Recording Upload</p>
                  <p className="text-sm">This feature is <span className="text-blue-600 font-semibold">coming soon</span>. You’ll be able to upload recorded calls for scam detection via speech-to-text AI.</p>
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      inputType === 'text'
                        ? 'Enter text message, email content, or any suspicious text...'
                        : 'Enter URL to check (e.g., https://example.com)...'
                    }
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  {inputText && isUrl(inputText) && inputType === 'text' && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">URL Detected</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning || !inputText.trim() || inputType === 'audio'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isScanning ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>
                  {inputType === 'audio' ? 'Coming Soon' : 'Scan for Scams'}
                </span>
              </>
            )}
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl p-8 ${result.label === 'Scam' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
              }`}
          >
            <div className="flex items-center space-x-4 mb-6">
              {result.label === 'Scam' ? (
                <AlertTriangle className="h-12 w-12 text-red-500" />
              ) : (
                <CheckCircle className="h-12 w-12 text-green-500" />
              )}
              <div>
                <h2 className={`text-2xl font-bold ${result.label === 'Scam' ? 'text-red-700' : 'text-green-700'}`}>
                  {result.label === 'Scam' ? '🚨 SCAM DETECTED' : '✅ APPEARS SAFE'}
                </h2>
                <p className={`text-lg ${result.label === 'Scam' ? 'text-red-600' : 'text-green-600'}`}>
                  Confidence: {result.confidence}%
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Scanned on: {new Date(result.scanned_on).toLocaleString()}
            </div>

            {result.label === 'Scam' && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
                <h3 className="font-bold text-red-800 mb-2">⚠️ Important Safety Tips:</h3>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Do NOT click any links or download attachments</li>
                  <li>• Do NOT provide personal or financial information</li>
                  <li>• Report this scam to authorities</li>
                  <li>• Emergency Help: <a href="tel:1930" className="font-bold underline">{result.emergency}</a></li>
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Scan;
