import React, { useState } from "react";
import {
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader,
  Link as LinkIcon,
  Type,
  Mic,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Scan = () => {
  const [inputText, setInputText] = useState("");
  const [inputType, setInputType] = useState("text");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const isUrl = (text) => {
    try {
      const u = new URL(text);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleScan = async () => {
    if (inputType !== "audio" && !inputText.trim()) {
      toast.error("Please enter text or URL to scan");
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      let res;
      if (inputType === "audio") {
        if (!audioFile) {
          toast.error("Please upload an audio file first.");
          setIsScanning(false);
          return;
        }

        const formData = new FormData();
        formData.append("audio", audioFile);

        res = await axios.post(`${API_BASE}/api/upload-audio`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60_000,
        });
      } else {
        const payload = { text: inputText };
        res = await axios.post(`${API_BASE}/api/scan`, payload, {
          headers: { "Content-Type": "application/json" },
          timeout: 25_000,
        });
      }

      const data = res.data;
      const normalized = {
        label: data.label || data.raw_label || "Not Scam",
        confidence:
          typeof data.confidence === "number" ? data.confidence : Number(data.confidence) || 0,
        emergency: data.emergency || data.emergencyNumber || "1930-FRAUD-HELP",
        scanned_on: data.scanned_on ? new Date(data.scanned_on).toISOString() : new Date().toISOString(),
        ...data,
      };

      setResult(normalized);

      if (normalized.label === "Scam") {
        toast.error(
          `🚨 SCAM DETECTED! Confidence: ${normalized.confidence}% | Emergency: ${normalized.emergency}`,
          { autoClose: 8000, position: "top-center" }
        );
        toast.error(
          `🚨 धोखाधड़ी का पता चला! विश्वास स्तर: ${normalized.confidence}% | आपातकालीन: ${normalized.emergency}`,
          { autoClose: 8000, position: "top-center" }
        );
      } else {
        toast.success(`✅ Content appears safe! Confidence: ${normalized.confidence}%`);
        toast.success(`✅ सामग्री सुरक्षित प्रतीत होती है! विश्वास स्तर: ${normalized.confidence}%`);
      }
    } catch (error) {
      console.error("Scan error:", error?.response?.data || error.message || error);
      toast.error("Scanning failed. Please try again.");
      toast.error("स्कैनिंग विफल हो गई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021727] via-[#043b57] to-[#065b7c] py-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-4xl font-bold mb-2">AI Scam Scanner</h1>
          <p className="text-lg text-gray-300">Analyze text, links, or audio calls for potential scams</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { type: "text", label: "Text", icon: <Type className="h-5 w-5" /> },
              { type: "url", label: "URL", icon: <LinkIcon className="h-5 w-5" /> },
              { type: "audio", label: "Call Audio", icon: <Mic className="h-5 w-5" /> },
            ].map((option) => (
              <button
                key={option.type}
                onClick={() => {
                  setInputType(option.type);
                  setResult(null);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  inputType === option.type ? "bg-blue-600 text-white shadow-md" : "bg-white/10 text-gray-300 hover:bg-blue-500/20"
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          {inputType === "audio" ? (
            <div className="border border-dashed border-gray-500 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold mb-3">🎤 Upload Call Recording</p>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="mx-auto text-sm text-gray-200"
              />
              {audioFile && <p className="mt-2 text-green-400 text-sm">Uploaded: {audioFile.name}</p>}
            </div>
          ) : (
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  inputType === "text" ? "Enter suspicious message or email..." : "Enter URL (e.g., https://example.com)..."
                }
                className="w-full h-32 p-4 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
              {inputText && isUrl(inputText) && inputType === "text" && (
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">URL Detected</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleScan}
            disabled={isScanning || (inputType !== "audio" && !inputText.trim())}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isScanning ? (
              <>
                <Loader className="h-6 w-6 animate-spin" />
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Scan for Scams</span>
              </>
            )}
          </button>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl p-8 mt-8 ${result.label === "Scam" ? "bg-red-50 border border-red-200 text-red-700" : "bg-green-50 border border-green-200 text-green-700"}`}
          >
            <div className="flex items-center space-x-4 mb-6">
              {result.label === "Scam" ? <AlertTriangle className="h-12 w-12 text-red-500" /> : <CheckCircle className="h-12 w-12 text-green-500" />}
              <div>
                <h2 className="text-2xl font-bold">{result.label === "Scam" ? "🚨 SCAM DETECTED" : "✅ SAFE CONTENT"}</h2>
                <p>Confidence: {result.confidence}%</p>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">Scanned on: {new Date(result.scanned_on).toLocaleString()}</div>

            {result.label === "Scam" && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
                <h3 className="font-bold text-red-800 mb-2">⚠️ Important Safety Tips:</h3>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Do NOT click any links or download attachments</li>
                  <li>• Do NOT provide personal or financial information</li>
                  <li>• Report this scam to authorities</li>
                  <li>
                    • Emergency Help:{" "}
                    <a href={`tel:${result.emergency}`} className="font-bold underline">
                      {result.emergency}
                    </a>
                  </li>
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
