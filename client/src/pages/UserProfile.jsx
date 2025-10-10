import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const user = {
    uid: 'demo123',
    displayName: 'Guest User',
    photoURL: null
  };

  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);


  useEffect(() => {
    const mockReports = [
      {
        id: '1',
        title: 'Fake Job Offer',
        description: 'Received a WhatsApp message offering fake job with advance fee.',
        scamType: 'Employment Scam',
        amount: '2000',
        location: 'Mumbai',
        contactInfo: 'fraud@example.com',
        evidence: ['screenshot1.png', 'screenshot2.png'],
        status: 'Pending',
        submissionDate: new Date()
      },
      {
        id: '2',
        title: 'Phishing Email',
        description: 'Email pretending to be from a bank asking for OTP.',
        scamType: 'Phishing',
        amount: '0',
        location: 'Online',
        contactInfo: 'support@fakebank.com',
        evidence: ['email.png'],
        status: 'Verified',
        submissionDate: new Date()
      }
    ];

    setReports(mockReports);
    setBio('Cybersecurity enthusiast, helping others stay safe online.');
  }, []);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleCreateReport = () => {
    setShowCreateModal(true);
  };

  const handleReportCreated = (reportData) => {
    setReports([reportData, ...reports]);
    setShowCreateModal(false);
  };

  const handleBioChange = (e) => setBio(e.target.value);

  const handleBioSubmit = (e) => {
    e.preventDefault();
    setIsEditingBio(false);
  };

  const SummaryWidgets = ({ reports }) => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'Pending').length;
    const lastDate = reports.length
      ? new Date(reports[0].submissionDate).toLocaleDateString()
      : 'No reports';

    const widgets = [
      { title: 'Total Reports', value: total, color: 'bg-blue-500', icon: '📊' },
      { title: 'Pending Reports', value: pending, color: 'bg-yellow-500', icon: '⏳' },
      { title: 'Last Report', value: lastDate, color: 'bg-green-500', icon: '📅' }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {widgets.map((w, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">{w.title}</p>
              <p className="text-2xl font-bold">{w.value}</p>
            </div>
            <div className={`${w.color} rounded-full p-3 text-white text-xl`}>
              {w.icon}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const UserProfileCard = ({ user }) => (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500">
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            '👤'
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user ? user.displayName : 'Guest'}</h2>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            {isEditingBio ? (
              <form onSubmit={handleBioSubmit}>
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-700">{bio || 'No bio added'}</p>
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-blue-500 hover:underline"
                >
                  Edit Bio
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
          <h2 className="text-2xl font-bold">Scam Reports</h2>
          <button
            onClick={handleCreateReport}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Submit New Report
          </button>
        </div>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {['all', 'pending', 'verified', 'rejected'].map(key => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-md text-sm ${filter === key
                ? 'bg-white shadow text-blue-600'
                : 'text-gray-600'}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {pendingCount > 0 && filter === 'all' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            ⚠️ You have {pendingCount} pending report{pendingCount > 1 ? 's' : ''}.
          </div>
        )}

        {filtered.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(report => (
              <div key={report.id} className="bg-white rounded shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{report.title}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                <button
                  onClick={() => handleViewDetails(report)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">No reports found.</div>
        )}
      </div>
    );
  };

  const ReportDetailsModal = ({ report, onClose }) => {
    if (!report) return null;
    const formatDate = (date) => new Date(date).toLocaleString();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-white max-w-xl w-full rounded-lg overflow-auto max-h-[90vh] p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{report.title}</h2>
            <button onClick={onClose} className="text-gray-500 text-xl">×</button>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Submitted: {formatDate(report.submissionDate)}
          </p>
          <p className="mb-4">{report.description}</p>
          <div className="space-y-2">
            <p><strong>Type:</strong> {report.scamType}</p>
            <p><strong>Amount:</strong> ₹{report.amount}</p>
            <p><strong>Location:</strong> {report.location}</p>
            <p><strong>Contact:</strong> {report.contactInfo}</p>
            <p><strong>Evidence:</strong> {report.evidence.join(', ')}</p>
            <p><strong>Status:</strong> {report.status}</p>
          </div>
        </div>
      </div>
    );
  };

  const CreateReportModal = ({ isOpen, onClose, onReportCreated }) => {
    const [form, setForm] = useState({
      title: '',
      description: '',
      scamType: '',
      amount: '',
      location: '',
      contactInfo: '',
      evidence: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newReport = {
        ...form,
        id: Date.now().toString(),
        evidence: form.evidence.split(',').map(e => e.trim()),
        submissionDate: new Date(),
        status: 'Pending'
      };
      onReportCreated(newReport);
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-white w-full max-w-lg rounded-lg p-6 overflow-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Submit Scam Report</h2>
            <button onClick={onClose} className="text-gray-500 text-xl">×</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['title', 'description', 'scamType', 'amount', 'location', 'contactInfo', 'evidence'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your profile and scam reports</p>
        </div>

        <SummaryWidgets reports={reports} />
        <UserProfileCard user={user} />
        <ReportsSection reports={reports} />
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
        <CreateReportModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onReportCreated={handleReportCreated}
        />
      </div>
    </div>
  );
};

export default UserProfile;
