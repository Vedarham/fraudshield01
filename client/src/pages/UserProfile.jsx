import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getUserProfile, updateUserProfile } from '../services/api';

const UserProfile = () => {
  const Navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      if (user) {
        const q = query(collection(db, 'reports'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userReports = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(userReports);
      }
    };

    const fetchUserProfile = async () => {
      if (user) {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile && userProfile.bio) {
          setBio(userProfile.bio);
        }
      }
    };

    fetchReports();
    fetchUserProfile();
  }, [user]);

  const handleViewDetails = (report) => setSelectedReport(report);
  const handleCreateReport = () => Navigate('/reports');
  const handleReportCreated = (reportData) => {
    setReports([reportData, ...reports]);
    setShowCreateModal(false);
  };

  const handleBioChange = (e) => setBio(e.target.value);

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await updateUserProfile(user.uid, { bio });
      setIsEditingBio(false);
    }
  };

  
  const SummaryWidgets = ({ reports }) => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'Pending').length;
    const lastDate = reports.length
      ? new Date(reports[0].submissionDate.toDate()).toLocaleDateString()
      : 'No reports';

    const widgets = [
      { title: 'Total Reports', value: total, color: 'from-sky-600 to-cyan-600', icon: '📘' },
      { title: 'Pending Reports', value: pending, color: 'from-blue-500 to-sky-500', icon: '🕓' },
      { title: 'Last Report', value: lastDate, color: 'from-cyan-500 to-teal-500', icon: '📅' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {widgets.map((w, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center border border-gray-200 hover:shadow-xl transition"
          >
            <div>
              <p className="text-sm text-gray-600">{w.title}</p>
              <p className="text-2xl font-bold text-gray-800">{w.value}</p>
            </div>
            <div className={`bg-gradient-to-br ${w.color} rounded-full p-3 text-white text-xl shadow-md`}>
              {w.icon}
            </div>
          </div>
        ))}
      </div>
    );
  };

  
  const UserProfileCard = ({ user }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 text-gray-800">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl border border-gray-300">
          {user && user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="rounded-full w-full h-full object-cover" />
          ) : (
            '🧑‍💻'
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{user ? user.displayName : 'Guest'}</h2>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-600">💬 Bio</label>
            {isEditingBio ? (
              <form onSubmit={handleBioSubmit}>
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  className="w-full border border-gray-300 bg-gray-50 text-gray-800 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-400"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-700">{bio || 'No bio added'}</p>
                <button onClick={() => setIsEditingBio(true)} className="text-cyan-600 hover:underline mt-1">
                  ✏️ Edit Bio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  
  const ReportsSection = ({ reports }) => {
    const [filter, setFilter] = useState('all');
    const filtered = filter === 'all' ? reports : reports.filter(r => r.status.toLowerCase() === filter);
    const pendingCount = reports.filter(r => r.status === 'Pending').length;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">🧾 Scam Reports</h2>
          <button
            onClick={handleCreateReport}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90"
          >
            ➕ Submit New Report
          </button>
        </div>

        
        <div className="flex space-x-2 bg-white p-2 rounded-lg border border-gray-200">
          {['all', 'pending', 'verified', 'rejected'].map(key => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === key
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {key === 'all' && '🌐 All'}
              {key === 'pending' && '🕓 Pending'}
              {key === 'verified' && '✅ Verified'}
              {key === 'rejected' && '🚫 Rejected'}
            </button>
          ))}
        </div>

        {pendingCount > 0 && filter === 'all' && (
          <div className="bg-white border-l-4 border-cyan-400 p-4 rounded text-gray-700 shadow">
            ⚠️ You have {pendingCount} pending report{pendingCount > 1 ? 's' : ''}.
          </div>
        )}

        {filtered.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(report => (
              <div key={report.id} className="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">🗂️ {report.title}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{report.status}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{report.description}</p>
                <button
                  onClick={() => handleViewDetails(report)}
                  className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 rounded-lg hover:opacity-90"
                >
                  🔍 View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-200 py-8">🌊 No reports found.</div>
        )}
      </div>
    );
  };

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-900 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">🌊 Dashboard</h1>
          <p className="text-cyan-300 mt-2">Manage your profile and scam reports efficiently</p>
        </div>

        <SummaryWidgets reports={reports} />
        <UserProfileCard user={user} />
        <ReportsSection reports={reports} />
      </div>
    </div>
  );
};

export default UserProfile;
