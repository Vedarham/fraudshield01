import React, { useState } from "react";
import { AlertTriangle, Send, User, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { submitReport } from "../services/api.js";

const ReportScam = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    severity: "",
    additionalInfo: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.type || !formData.severity) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        ...formData,
        reportedBy: "Anonymous User",
        timestamp: new Date().toISOString(),
      };

      await submitReport(reportData);
      toast.success("✅ Scam report submitted successfully!");

      setFormData({
        title: "",
        content: "",
        type: "",
        severity: "",
        additionalInfo: "",
      });
    } catch (error) {
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const severityColors = {
    Low: "text-green-400 border-green-400 bg-green-900/20",
    Medium: "text-yellow-400 border-yellow-400 bg-yellow-900/20",
    High: "text-orange-400 border-orange-400 bg-orange-900/20",
    Critical: "text-red-400 border-red-400 bg-red-900/20",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021727] to-[#065b7c] text-white py-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-[#4cc9f0]" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-3">Report a Scam</h1>
          <p className="text-lg text-gray-300">
            Help protect others by reporting suspicious activity 🕵️‍♂️
          </p>
        </div>

        
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-[#043a4d] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">
                Report Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Fake Bank Security Alert"
                className="w-full px-4 py-3 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4cc9f0] focus:border-transparent"
                required
              />
            </div>

            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-200">
                  Scam Type <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-4 py-3 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white focus:ring-2 focus:ring-[#4cc9f0]"
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
                <label className="block text-sm font-semibold mb-2 text-gray-200">
                  Severity Level <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => handleInputChange("severity", e.target.value)}
                  className="w-full px-4 py-3 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white focus:ring-2 focus:ring-[#4cc9f0]"
                  required
                >
                  <option value="">Select severity</option>
                  <option value="Low">Low - Mildly suspicious</option>
                  <option value="Medium">Medium - Possible financial risk</option>
                  <option value="High">High - Strong evidence of fraud</option>
                  <option value="Critical">Critical - Confirmed scam</option>
                </select>
              </div>
            </div>

            
            {formData.severity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${severityColors[formData.severity]}`}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">
                    Severity: {formData.severity}
                  </span>
                </div>
              </motion.div>
            )}

           
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">
                Scam Content <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Describe the scam message, website, or suspicious activity..."
                rows={6}
                className="w-full px-4 py-3 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4cc9f0] resize-none"
                required
              />
            </div>

            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-200">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Add more details if any..."
                rows={4}
                className="w-full px-4 py-3 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4cc9f0] resize-none"
              />
            </div>

           
            <div className="bg-[#043a4d]/60 border border-[#065b7c] rounded-lg p-4">
              <h3 className="font-semibold text-[#4cc9f0] mb-2">
                🔒 Privacy & Safety Notice
              </h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Reports are reviewed before publication</li>
                <li>• Do not share personal details in scam text</li>
                <li>• Your report may help protect other users</li>
                <li>• Emergency contact: 1930 (Cyber Helpline)</li>
              </ul>
            </div>

            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#043a4d] to-[#065b7c] py-4 rounded-lg font-semibold text-white hover:from-[#065b7c] hover:to-[#0a7ba0] transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-md shadow-[#043a4d]/50"
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

          
          <div className="mt-10 p-6 bg-[#021727]/60 border border-[#043a4d] rounded-lg text-center">
            <h3 className="font-bold text-[#4cc9f0] mb-3">
              Need Help or Immediate Assistance?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1930"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                📞 Call 1930 - Cyber Helpline
              </a>
              <a
                href="/emergency"
                className="px-4 py-2 bg-[#065b7c] text-white rounded-lg hover:bg-[#0a7ba0] transition"
              >
                🆘 View Emergency Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportScam;
