import React, { useState, useEffect } from 'react';
import { Search, Calendar, AlertTriangle, Eye, Shield, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { getReports } from '../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const { user } = useAuth();

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
    .filter(report =>
      (report.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.content || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(report => filterType === 'all' || report.type === filterType)
    .filter(report => filterSeverity === 'all' || report.severity === filterSeverity)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'severity': {
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          const aSeverity = (a.severity || '').toLowerCase().trim();
          const bSeverity = (b.severity || '').toLowerCase().trim();
          return (severityOrder[bSeverity] || 0) - (severityOrder[aSeverity] || 0);
        }
        default:
          return 0;
      }
    });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-700 bg-red-100 border-red-300';
      case 'High': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'Medium': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'Low': return 'text-green-700 bg-green-100 border-green-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Scam Reports</h1>
          <p className="text-xl text-gray-600">
            Learn from reported scams and help protect others
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="severity">Sort by Severity</option>
              </select>
            </div>

            {/* Report Button */}
            {user && (
              <Link
                to="/report"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Report Scam</span>
              </Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{reports.length}</div>
            <div className="text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {reports.filter(r => r.severity === 'Critical').length}
            </div>
            <div className="text-gray-600">Critical</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">Verified</div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {report.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {report.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-sm border ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center space-x-1 mb-1">
                    <Eye className="h-4 w-4" />
                    <span>—</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-red-400">
                {report.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Reported by: {report.reportedBy || 'Anonymous'}</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No reports found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
