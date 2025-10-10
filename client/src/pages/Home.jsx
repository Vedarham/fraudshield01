import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Scan, AlertTriangle, Users, Phone, Zap, Database, BarChart2, Clock, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import Herovideo from '../assets/videos/fraudshield-hero.mp4';
import getStartedImage from '../assets/images/getStartedBg.jpg'
const Home = () => {
  const features = [
    {
      icon: <Scan className="h-8 w-8" />,
      title: 'AI Scam Detection',
      description: 'Advanced AI models detect scams in text and URLs with high accuracy',
      color: 'blue'
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: 'Real-time Alerts',
      description: 'Instant notifications when suspicious content is detected',
      color: 'orange'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Reports',
      description: 'Help others by reporting scams and viewing community submissions',
      color: 'purple'
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Emergency Support',
      description: '24/7 emergency helpline for immediate assistance',
      color: 'red'
    }
  ];

const datasetStats = [
  { number: '549k+', label: 'Phishing Site URLs Samples', icon: <Database className="mx-auto mb-2 text-blue-500" size={32} /> },
  { number: '2.2k+', label: 'India Spam SMS Samples', icon: <Users className="mx-auto mb-2 text-blue-500" size={32} /> },
  { number: '5.5k+', label: 'SMS Spam Collection Samples', icon: <Users className="mx-auto mb-2 text-blue-500" size={32} /> },
];

const modelStats = [
  { number: '99.06%', label: 'Final Accuracy', icon: <BarChart2 className="mx-auto mb-2 text-indigo-500" size={32} /> },
  { number: '0.9858', label: 'Final F1 Score', icon: <BarChart2 className="mx-auto mb-2 text-indigo-500" size={32} /> },
  { number: '4 hrs', label: 'Training Duration (T4 GPU)', icon: <Clock className="mx-auto mb-2 text-yellow-500" size={32} /> },
  // { number: '3', label: 'Training Epochs', icon: <Repeat className="mx-auto mb-2 text-yellow-500" size={32} /> },
  { number: '2.0k+', label: 'Evaluation Samples', icon: <Database className="mx-auto mb-2 text-indigo-500" size={32} /> },
];

  return (
    <div className="min-h-screen">
    
      <section className="relative text-white h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={Herovideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 h-full flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="h-20 w-20 mx-auto mb-6 text-yellow-300" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Fraud Shield
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              AI-Driven Scam Detection & Awareness Platform protecting you from online fraud
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scan"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="h-5 w-5" />
                <span>Start Scanning</span>
              </Link>
              <Link
                to="/reports"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Reports
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-20" />
    </section>

  
     <section className="py-16 bg-#19183B text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Dataset Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {datasetStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center"
            >
              {stat.icon}
              <div className="text-4xl font-extrabold text-blue-600">{stat.number}</div>
              <div className="mt-2 text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Model Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {modelStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center"
            >
              {stat.icon}
              <div className="text-4xl font-extrabold text-indigo-600">{stat.number}</div>
              <div className="mt-2 text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Protection Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered tools keeps you safe from evolving online threats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 bg-${feature.color}-100 text-${feature.color}-600`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
        <section className="relative py-20 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={getStartedImage} 
          alt="Cyber protection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Stay Protected Today
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of users who trust Fraud Shield to keep them safe from online scams
        </p>
        <Link
          to="/scan"
          className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center space-x-2"
        >
          <Shield className="h-5 w-5" />
          <span>Get Started Now</span>
        </Link>
      </div>
    </section>
      <section className="py-10 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="h-8 w-8 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Emergency Assistance</h2>
          <p className="text-lg mb-6 opacity-90">
            If you've been targeted by a scam, get immediate help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1930-FRAUD-HELP"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Call: 1930-FRAUD-HELP
            </a>
            <Link
              to="/emergency"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Emergency Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;