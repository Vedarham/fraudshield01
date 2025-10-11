import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Scan,
  AlertTriangle,
  Users,
  Phone,
  Zap,
  Database,
  BarChart2,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Herovideo from '../assets/videos/fraudshield-hero.mp4';
import getStartedImage from '../assets/images/getStartedBg.jpg';

const Home = () => {
  const features = [
    {
      icon: <Scan className="h-8 w-8" />,
      title: 'AI Scam Detection',
      description: 'Advanced AI models detect scams in text and URLs with high accuracy',
      color: 'cyan',
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: 'Real-time Alerts',
      description: 'Instant notifications when suspicious content is detected',
      color: 'sky',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Reports',
      description: 'Help others by reporting scams and viewing community submissions',
      color: 'blue',
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Emergency Support',
      description: '24/7 emergency helpline for immediate assistance',
      color: 'teal',
    },
  ];

  const datasetStats = [
    {
      number: '549k+',
      label: 'Phishing Site URLs Samples',
      icon: <Database className="mx-auto mb-2 text-cyan-400" size={32} />,
    },
    {
      number: '2.2k+',
      label: 'India Spam SMS Samples',
      icon: <Users className="mx-auto mb-2 text-cyan-400" size={32} />,
    },
    {
      number: '5.5k+',
      label: 'SMS Spam Collection Samples',
      icon: <Users className="mx-auto mb-2 text-cyan-400" size={32} />,
    },
  ];

  const modelStats = [
    {
      number: '99.06%',
      label: 'Final Accuracy',
      icon: <BarChart2 className="mx-auto mb-2 text-blue-400" size={32} />,
    },
    {
      number: '0.9858',
      label: 'Final F1 Score',
      icon: <BarChart2 className="mx-auto mb-2 text-blue-400" size={32} />,
    },
    {
      number: '4 hrs',
      label: 'Training Duration (T4 GPU)',
      icon: <Clock className="mx-auto mb-2 text-cyan-300" size={32} />,
    },
    {
      number: '2.0k+',
      label: 'Evaluation Samples',
      icon: <Database className="mx-auto mb-2 text-blue-400" size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021727] to-[#065b7c] text-white">
  
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

        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 h-full flex items-center justify-center">
          <div className="text-center drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Shield className="h-20 w-20 mx-auto mb-6 text-cyan-300" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cyan-100">
                Fraud Shield
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-cyan-200 max-w-3xl mx-auto">
                AI-Driven Scam Detection & Awareness Platform protecting you from online fraud
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/scan"
                  className="bg-cyan-400 text-[#021727] px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-[0_0_15px_#00ffff]"
                >
                  <Zap className="h-5 w-5" />
                  <span>Start Scanning</span>
                </Link>
                <Link
                  to="/reports"
                  className="border-2 border-cyan-300 text-cyan-100 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 hover:text-[#021727] transition-all duration-300 hover:shadow-[0_0_15px_#00ffff]"
                >
                  View Reports
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

 
      <section className="py-16 bg-[#03263d] text-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-cyan-300">
            Dataset Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {datasetStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center hover:scale-105 transition-transform"
              >
                {stat.icon}
                <div className="text-4xl font-extrabold text-cyan-300">
                  {stat.number}
                </div>
                <div className="mt-2 text-cyan-100/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center mb-10 text-cyan-300">
            Model Performance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {modelStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center hover:scale-105 transition-transform"
              >
                {stat.icon}
                <div className="text-4xl font-extrabold text-cyan-300">
                  {stat.number}
                </div>
                <div className="mt-2 text-cyan-100/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-b from-[#03263d] to-[#065b7c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">
              Advanced Protection Features
            </h2>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
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
                className="bg-[#04334f] p-8 rounded-xl shadow-lg hover:shadow-[0_0_15px_#00ffff] transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`inline-flex p-3 rounded-lg mb-4 bg-${feature.color}-100/10 text-${feature.color}-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-cyan-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-cyan-200">{feature.description}</p>
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
          
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
          <h2 className="text-4xl font-bold mb-6 text-cyan-100">
            Stay Protected Today
          </h2>
          <p className="text-xl mb-8 text-cyan-200 opacity-90">
            Join thousands of users who trust Fraud Shield to keep them safe from online scams
          </p>
          <Link
            to="/scan"
            className="bg-cyan-400 text-[#021727] px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition-all duration-300 inline-flex items-center space-x-2 hover:shadow-[0_0_15px_#00ffff]"
          >
            <Shield className="h-5 w-5" />
            <span>Get Started Now</span>
          </Link>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-r from-[#04334f] to-[#065b7c] text-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="h-8 w-8 mx-auto mb-6 text-cyan-300" />
          <h2 className="text-2xl font-bold mb-4">Emergency Assistance</h2>
          <p className="text-lg mb-6 opacity-90">
            If you've been targeted by a scam, get immediate help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1930-FRAUD-HELP"
              className="bg-white text-[#04334f] px-8 py-4 rounded-lg font-semibold hover:bg-red-500 transition-all duration-300 hover:shadow-[0_0_50px_#fc265c]"
            >
              Call: 1930-FRAUD-HELP
            </a>
            <Link
              to="/emergency"
              className="border-2 border-cyan-300 text-cyan-100 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 hover:text-[#021727] transition-all duration-300 hover:shadow-[0_0_15px_#00ffff]"
            >
              Emergency Resources
            </Link>
          </div>
        </div>
      </section>
      <footer className="bg-[#021727] py-6 text-center text-gray-400 border-t border-white/10">
        <p className="text-sm">
          © 2025 FraudShield | Awareness by Govt. of India | Stay Vigilant Online
        </p>
      </footer>
    </div>
  );
};

export default Home;
