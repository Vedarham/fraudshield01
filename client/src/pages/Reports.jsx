import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  AlertTriangle,
  Eye,
  Shield,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { getReports } from "../services/api.js";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(Array.isArray(data.items) ? data.items : []);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports
    .filter(
      (report) =>
        (report.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (report.content || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .filter((report) => filterType === "all" || report.type === filterType)
    .filter(
      (report) => filterSeverity === "all" || report.severity === filterSeverity
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "severity": {
          const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return (
            (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0)
          );
        }
        default:
          return 0;
      }
    });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "text-red-400 border-red-500 bg-red-900/30";
      case "High":
        return "text-orange-400 border-orange-500 bg-orange-900/30";
      case "Medium":
        return "text-yellow-400 border-yellow-500 bg-yellow-900/30";
      case "Low":
        return "text-green-400 border-green-500 bg-green-900/30";
      default:
        return "text-gray-300 border-gray-500 bg-gray-800/40";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021727] to-[#065b7c] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <div className="w-40 h-40 bg-[#065b7c]/30 rounded-full blur-3xl"></div>
          </motion.div>

         
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative z-10 mx-auto bg-[#021727]/70 backdrop-blur-xl border border-[#4cc9f0]/60 shadow-[0_0_40px_#4cc9f0aa] rounded-full w-32 h-32 flex items-center justify-center mb-6"
          >
            <Shield className="h-16 w-16 text-[#4cc9f0]" strokeWidth={2.5} />
          </motion.div>

          
          <motion.h1
            className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#4cc9f0] to-[#82fff9] bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Community Scam Reports
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Track, learn, and spread awareness against digital frauds across India 🛡️
          </motion.p>
        </div>

       
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-[#043a4d] p-6 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4cc9f0]"
              />
            </div>

            
            <div className="flex flex-wrap gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white focus:ring-2 focus:ring-[#4cc9f0]"
              >
                <option value="all">All Types</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Website">Website</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Social Media">Social Media</option>
              </select>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white focus:ring-2 focus:ring-[#4cc9f0]"
              >
                <option value="all">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-[#065b7c] rounded-lg bg-[#021727]/70 text-white focus:ring-2 focus:ring-[#4cc9f0]"
              >
                <option value="date">Sort by Date</option>
                <option value="severity">Sort by Severity</option>
              </select>
            </div>

            
            <a
              href="/report"
              className="bg-gradient-to-r from-[#043a4d] to-[#065b7c] text-white px-6 py-2 rounded-lg hover:from-[#065b7c] hover:to-[#0a7ba0] transition flex items-center space-x-2 shadow-lg shadow-[#043a4d]/50 font-semibold"
            >
              <Plus className="h-4 w-4" />
              <span>Report Scam</span>
            </a>
          </div>
        </div>

        
        <div className="flex flex-wrap justify-center gap-8 mb-14 text-center">
          {[
            {
              label: "Total Reports",
              value: reports.length,
              color: "#4cc9f0",
              glow: "from-[#00b4d8] to-[#0077b6]",
            },
            {
              label: "Critical",
              value: reports.filter((r) => r.severity === "Critical").length,
              color: "#ff4d6d",
              glow: "from-[#ff758f] to-[#c9184a]",
            },
            {
              label: "Verified",
              value: 0,
              color: "#4ef037",
              glow: "from-[#52b788] to-[#2d6a4f]",
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative w-64 p-[2px] rounded-3xl bg-gradient-to-r ${box.glow} shadow-lg`}
            >
              <div className="bg-[#021727]/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center justify-center">
                <h2
                  className="text-4xl font-extrabold mb-2"
                  style={{ color: box.color }}
                >
                  {box.value}
                </h2>
                <p className="text-white/90 font-semibold tracking-wide">
                  {box.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        
        <div className="space-y-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#021727]/60 border border-[#043a4d] rounded-xl shadow-md p-6 backdrop-blur-md hover:shadow-lg hover:scale-[1.01] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-6 w-6 text-red-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {report.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-[#043a4d]/70 text-[#4cc9f0] rounded-full text-sm font-semibold">
                        {report.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm border font-semibold ${getSeverityColor(
                          report.severity
                        )}`}
                      >
                        {report.severity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-sm text-gray-400">
                  <div className="flex items-center space-x-1 mb-1">
                    <Eye className="h-4 w-4" />
                    <span>—</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-200 mb-4 bg-[#043a4d]/50 p-4 rounded-lg border-l-4 border-[#4cc9f0] font-medium">
                {report.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Reported by: {report.reportedBy || "Anonymous"}</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-16">
              <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No reports found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filters 🔍
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
