import React, { useState } from 'react';
import { AlertTriangle, Send, User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { submitReport } from '../services/api';

const ReportScam = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: '',
    severity: '',
    additionalInfo: ''
  });

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.type || !formData.severity) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        ...formData,
        reportedBy: user.email,
        timestamp: new Date().toISOString(),
      };

      await submitReport(reportData);
      
      toast.success('Scam report submitted successfully! Thank you for helping protect others.');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        type: '',
        severity: '',
        additionalInfo: ''
      });

    } catch (error) {
      toast.error('Failed to submit report. Please try again.',error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const severityColors = {
    'Low': 'text-green-600 border-green-300 bg-green-50',
    'Medium': 'text-yellow-600 border-yellow-300 bg-yellow-50',
    'High': 'text-orange-600 border-orange-300 bg-orange-50',
    'Critical': 'text-red-600 border-red-300 bg-red-50'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Report a Scam</h1>
          <p className="text-xl text-gray-600">
            Help protect others by sharing your scam encounter
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <User className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800">Reporting as: <strong>{user.name}</strong> ({user.email})</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Fake Bank Security Alert"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Type and Severity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scam Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="Website">Website</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => handleInputChange('severity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select severity</option>
                  <option value="Low">Low - Suspicious but not immediately harmful</option>
                  <option value="Medium">Medium - Potential financial loss</option>
                  <option value="High">High - Significant financial or personal risk</option>
                  <option value="Critical">Critical - Immediate danger or large financial loss</option>
                </select>
              </div>
            </div>

            {/* Severity Indicator */}
            {formData.severity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border-2 ${severityColors[formData.severity]}`}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Severity: {formData.severity}</span>
                </div>
              </motion.div>
            )}

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scam Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Paste the exact message, email content, or describe the scam attempt in detail..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Include as much detail as possible to help others identify similar scams
              </p>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Any additional context, how you received it, what made you suspicious, etc."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Privacy Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">🔒 Privacy & Safety Notice</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Your report will be publicly visible to help others</li>
                <li>• Personal information (like your name) will be anonymized</li>
                <li>• Remove any personal details from the scam content before submitting</li>
                <li>• Reports are reviewed before publication</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting Report...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Scam Report</span>
                </>
              )}
            </button>
          </form>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Need Help or Immediate Assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1930-FRAUD-HELP"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <span>📞 Emergency: 1930-FRAUD-HELP</span>
              </a>
              <a
                href="/emergency"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>🆘 Emergency Resources</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportScam;
