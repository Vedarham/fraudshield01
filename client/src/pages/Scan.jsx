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
import { scanContent } from "../services/api.js";

const Scan = () => {
  const [inputText, setInputText] = useState("");
  const [inputType, setInputType] = useState("text");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!inputText.trim()) {
      toast.error("⚠️ Please enter text or URL to scan");
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      const res = await scanContent(inputText, inputType);
      setResult(res);

      if (res.label === "Scam") {
        toast.error(`🚨 Scam Detected! Confidence: ${res.confidence}%`, {
          autoClose: 8000,
          position: "top-center",
        });
      } else {
        toast.success(`✅ Safe Content! Confidence: ${res.confidence}%`, {
          autoClose: 5000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("❌ Scanning failed. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const isUrl = (text) => {
    try {
      new URL(text);
      return true;
    } catch {
      return text.includes(".") && text.includes("http");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021727] via-[#043b57] to-[#065b7c] py-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="text-center mb-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
           
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-[#1a2b3b] blur-2xl opacity-70"></div>
              <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-[#041c29] shadow-[0_0_40px_10px_rgba(76,201,240,0.25)]">
                <Shield className="h-12 w-12 text-[#4cc9f0]" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl font-extrabold tracking-wide text-white mt-6 mb-2">
            AI Scam Scanner
          </h1>
          <p className="text-lg text-gray-300 font-medium">
            Instantly analyze messages, emails, or URLs for possible scams using
            AI
          </p>
        </div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-xl border border-[#0a3d52]/50 rounded-2xl shadow-2xl p-8"
        >
         
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { type: "text", label: "Text", icon: <Type className="h-5 w-5" /> },
              { type: "url", label: "URL", icon: <LinkIcon className="h-5 w-5" /> },
              { type: "audio", label: "Call Audio", icon: <Mic className="h-5 w-5" /> },
            ].map((option) => (
              <button
                key={option.type}
                onClick={() => setInputType(option.type)}
                className={`flex items-center space-x-2 px-5 py-2 rounded-lg font-semibold transition-all ${
                  inputType === option.type
                    ? "bg-[#065b7c] text-white shadow-lg shadow-[#065b7c]/40"
                    : "bg-white/10 text-gray-300 hover:text-white hover:bg-[#043a4d]"
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>

         
          <div className="relative">
            {inputType === "audio" ? (
              <div className="border border-dashed border-[#4cc9f0] rounded-xl p-6 text-center text-gray-300 bg-[#021727]/40">
                <p className="text-lg font-semibold mb-2">🎤 Audio Upload Coming Soon</p>
                <p className="text-sm text-gray-400">
                  Soon you’ll be able to upload call recordings for scam analysis using AI speech recognition.
                </p>
              </div>
            ) : (
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    inputType === "text"
                      ? "Enter suspicious text or message here..."
                      : "Paste a suspicious URL (e.g., https://example.com)..."
                  }
                  className="w-full h-40 p-4 rounded-xl border border-[#065b7c] focus:ring-2 focus:ring-[#4cc9f0] focus:border-transparent bg-[#021727]/60 text-white placeholder-gray-400 text-lg font-medium shadow-inner"
                />
                {inputText && isUrl(inputText) && inputType === "text" && (
                  <div className="absolute top-2 right-2 bg-[#4cc9f0]/20 text-[#4cc9f0] text-xs px-2 py-1 rounded-lg font-semibold shadow-sm">
                    URL Detected
                  </div>
                )}
              </div>
            )}
          </div>

        
          <button
            onClick={handleScan}
            disabled={isScanning || !inputText.trim() || inputType === "audio"}
            className="w-full mt-6 bg-gradient-to-r from-[#043a4d] to-[#065b7c] text-white py-4 rounded-xl font-bold tracking-wide hover:from-[#065b7c] hover:to-[#0a7ba0] disabled:opacity-50 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-[#043a4d]/50 text-lg"
          >
            {isScanning ? (
              <>
                <Loader className="h-6 w-6 animate-spin" />
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Search className="h-6 w-6" />
                <span>Scan Now</span>
              </>
            )}
          </button>
        </motion.div>

        
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-10 rounded-2xl p-8 shadow-2xl border-2 ${
              result.label === "Scam"
                ? "bg-gradient-to-br from-red-950/60 via-red-900/30 to-red-800/20 border-red-600"
                : "bg-gradient-to-br from-emerald-950/60 via-emerald-900/30 to-emerald-800/20 border-emerald-500"
            }`}
          >
            <div className="flex items-center space-x-5 mb-6">
              {result.label === "Scam" ? (
                <AlertTriangle className="h-14 w-14 text-red-400" />
              ) : (
                <CheckCircle className="h-14 w-14 text-emerald-400" />
              )}
              <div>
                <h2
                  className={`text-3xl font-extrabold ${
                    result.label === "Scam" ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {result.label === "Scam"
                    ? "🚨 Scam Activity Detected!"
                    : "✅ Content Appears Safe"}
                </h2>
                <p
                  className={`text-lg font-semibold mt-1 ${
                    result.label === "Scam" ? "text-red-200" : "text-emerald-200"
                  }`}
                >
                  Confidence: <span className="font-bold">{result.confidence}%</span>
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-6">
              Scanned on: {new Date(result.scanned_on).toLocaleString()}
            </p>

            {result.label === "Scam" && (
              <div className="bg-red-900/40 border border-red-700 rounded-xl p-6">
                <h3 className="font-bold text-xl text-red-300 mb-3">
                  ⚠️ Safety Recommendations:
                </h3>
                <ul className="text-red-200 space-y-2 text-base leading-relaxed">
                  <li>• Never click suspicious links or attachments.</li>
                  <li>• Avoid sharing passwords or bank details.</li>
                  <li>• Report this message to authorities.</li>
                  <li>
                    • Emergency Helpline:{" "}
                    <a href="tel:1930" className="font-bold underline text-red-100">
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
