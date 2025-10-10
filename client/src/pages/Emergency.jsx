import React from 'react';
import { Phone, Shield, AlertTriangle, ExternalLink, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Emergency = () => {
  const emergencyContacts = [
    {
      name: 'Cyber Crime Helpline',
      number: '1930',
      description: 'National helpline for reporting financial cyber frauds like UPI, card, and online scams.',
      availability: '24/7',
      type: 'primary'
    },
    {
      name: 'National Cyber Crime Reporting Portal',
      number: 'https://cybercrime.gov.in/',
      description: 'Online portal for lodging complaints related to cybercrime, including women and child-related offenses.',
      availability: 'Online - 24/7',
      type: 'secondary'
    },
    {
      name: 'Cyber Police – Madhya Pradesh',
      number: '0755-2770248',
      description: 'ADG, State Cyber Police – Madhya Pradesh',
      availability: 'Office hours',
      type: 'secondary'
    },
    {
      name: 'Police Emergency (Nationwide)',
      number: '112',
      description: 'All-purpose emergency services including cyber threats, harassment, and fraud.',
      availability: '24/7',
      type: 'emergency'
    }
  ];

  const immediateSteps = [
    { step: 1, title: 'Stop Communication', description: 'Immediately stop all communication with the suspected scammer', icon: '🛑' },
    { step: 2, title: 'Document Everything', description: 'Take screenshots, save emails, and record phone numbers', icon: '📸' },
    { step: 3, title: 'Secure Your Accounts', description: 'Change passwords and contact your bank/credit card companies', icon: '🔒' },
    { step: 4, title: 'Report the Scam', description: 'File reports with appropriate authorities and our platform', icon: '📋' },
    { step: 5, title: 'Monitor Your Accounts', description: 'Check bank statements and credit reports regularly', icon: '👁️' }
  ];

  const resources = [
    {
      name: 'National Cyber Crime Reporting Portal',
      url: 'https://cybercrime.gov.in/',
      description: 'Government portal to report cyber crimes including financial fraud, phishing, and online harassment.'
    },
    {
      name: 'Cyber Dost (MHA Initiative)',
      url: 'https://twitter.com/Cyberdost',
      description: 'Official Twitter handle by the Ministry of Home Affairs for spreading cyber safety awareness.'
    },
    {
      name: 'CERT-In (Indian Computer Emergency Response Team)',
      url: 'https://www.cert-in.org.in/',
      description: 'Government agency dealing with cyber security threats and vulnerabilities in India.'
    },
    {
      name: 'Digital Police Portal',
      url: 'https://digitalpolice.gov.in/',
      description: 'Unified platform for citizen-centric police services including cybercrime reporting.'
    },
    {
      name: 'RBI Sachet Portal',
      url: 'https://sachet.rbi.org.in/',
      description: 'Reserve Bank of India’s portal to report financial fraud and unregistered financial entities.'
    }
  ];

  const getContactColor = (type) => {
    switch (type) {
      case 'primary': return 'bg-red-600 hover:bg-red-700 text-white';
      case 'emergency': return 'bg-orange-600 hover:bg-orange-700 text-white';
      case 'secondary': return 'bg-blue-600 hover:bg-blue-700 text-white';
      default: return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency Resources</h1>
          <p className="text-xl text-gray-600">Immediate help and resources for scam victims</p>
        </div>
        <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🚨 Been Scammed? Act Fast!</h2>
            <p className="text-lg mb-4">
              If you've fallen victim to a scam, time is critical. Take immediate action to protect yourself.
            </p>
            <a
              href="tel:1930"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-50 transition-colors inline-block"
            >
              📞 Call Now: 1930
            </a>
          </div>
        </div>


        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.name}</h3>
                    <p className="text-gray-600 mb-3">{contact.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{contact.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={contact.number.startsWith('http') ? contact.number : `tel:${contact.number}`}
                  target={contact.number.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${getContactColor(contact.type)}`}
                >
                  <Phone className="h-5 w-5" />
                  <span>{contact.number}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Immediate Steps to Take</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid gap-6">
              {immediateSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Step {item.step}: {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{resource.name}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Visit Website</span>
                </a>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
            <div className="text-center">
              <Shield className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-6">Prevention is Your Best Defense</h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold mb-2">🔍 Verify Everything</h3>
                  <p className="text-blue-100">Always verify suspicious communications through official channels</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🚫 Never Share Personal Info</h3>
                  <p className="text-blue-100">Legitimate organizations won't ask for sensitive data via email or phone</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">⏰ Take Your Time</h3>
                  <p className="text-blue-100">Scammers create urgency. Legitimate offers allow time to think</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <MapPin className="h-6 w-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">Local Law Enforcement</h3>
                <p className="text-yellow-700 mb-3">
                  For immediate physical threats or if you've lost a significant amount of money, 
                  contact your local police department. They can file a report and guide you to 
                  additional local resources.
                </p>
                <a
                  href="tel:112"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors inline-block font-semibold"
                >
                  Call 112 for Emergencies
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Emergency;
