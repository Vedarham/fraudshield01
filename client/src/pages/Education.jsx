import React from "react";
import { Shield, AlertTriangle, CheckCircle, XCircle, Phone, Globe, Banknote, Lock } from "lucide-react";

function Education() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021727] to-[#065b7c] text-white font-sans">
      
      
      <header className="bg-gradient-to-r from-[#021727] via-[#043a4d] to-[#065b7c] py-20 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-[#4cc9f0]" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 leading-snug">
            Cyber Awareness: Protect Yourself Online
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Learn to identify scams, avoid frauds, and stay safe in the digital world.
          </p>
        </div>
      </header>

      
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">

       
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-[#4cc9f0]">⚠️ Recognize a Scam</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Banknote className="h-8 w-8 text-yellow-400" />, title: "Too Good to Be True", text: "If an offer sounds unrealistic or promises huge rewards for little effort, it’s a scam." },
              { icon: <AlertTriangle className="h-8 w-8 text-orange-400" />, title: "Urgent Warnings", text: "Scammers use fear or urgency — like 'Your account will be blocked in 24 hours!'" },
              { icon: <Globe className="h-8 w-8 text-blue-300" />, title: "Fake Links", text: "Links like paypa1.com or icici-verification.net are phishing attempts." },
              { icon: <Lock className="h-8 w-8 text-green-300" />, title: "OTP or PIN Requests", text: "Legitimate services never ask for OTPs or passwords through calls or SMS." },
              { icon: <Phone className="h-8 w-8 text-purple-300" />, title: "Unknown Calls", text: "Avoid answering unknown calls claiming to be from your bank or government." },
              { icon: <Shield className="h-8 w-8 text-cyan-400" />, title: "Unverified Apps", text: "Download apps only from official stores — not random links or forwarded APKs." },
            ].map(({ icon, title, text }, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  {icon}
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-[#4cc9f0]">📧 Spot the Difference</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#021727]/70 rounded-2xl p-6 border border-red-600">
              <div className="flex items-center space-x-3 mb-4">
                <XCircle className="h-7 w-7 text-red-400" />
                <h3 className="text-xl font-bold text-red-400">Fake Email Example</h3>
              </div>
              <div className="bg-[#043a4d]/60 rounded-xl p-4 border border-red-500">
                <p className="text-sm text-gray-300 mb-2">From: support@paypa1.com</p>
                <p className="text-sm text-gray-300 mb-3">Subject: URGENT - Verify Now!</p>
                <p className="text-red-300 font-medium">
                  ⚠️ Urgent tone, fake spelling, and request for sensitive info = SCAM.
                </p>
              </div>
            </div>

            
            <div className="bg-[#021727]/70 rounded-2xl p-6 border border-green-600">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-7 w-7 text-green-400" />
                <h3 className="text-xl font-bold text-green-400">Real Email Example</h3>
              </div>
              <div className="bg-[#043a4d]/60 rounded-xl p-4 border border-green-500">
                <p className="text-sm text-gray-300 mb-2">From: noreply@paypal.com</p>
                <p className="text-sm text-gray-300 mb-3">Subject: Monthly Statement Available</p>
                <p className="text-green-300 font-medium">
                  ✅ Neutral tone, no urgency, correct domain — safe communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-[#4cc9f0]">🧠 Smart Safety Practices</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-[#043a4d]/50 border border-green-500 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">✅ Do’s</h3>
              <ul className="space-y-3 text-blue-100 text-sm font-medium">
                <li>✔ Verify every sender’s identity.</li>
                <li>✔ Use official websites, not forwarded links.</li>
                <li>✔ Enable two-factor authentication everywhere.</li>
                <li>✔ Keep your apps and OS updated regularly.</li>
                <li>✔ Report all suspicious messages immediately.</li>
              </ul>
            </div>

            
            <div className="bg-[#043a4d]/50 border border-red-500 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-400 mb-4">🚫 Don’ts</h3>
              <ul className="space-y-3 text-blue-100 text-sm font-medium">
                <li>✗ Never share OTP, passwords, or PINs.</li>
                <li>✗ Don’t click on unknown or suspicious links.</li>
                <li>✗ Avoid payments under pressure or urgency.</li>
                <li>✗ Don’t trust random messages with prizes or jobs.</li>
                <li>✗ Never install apps from unknown sources.</li>
              </ul>
            </div>
          </div>
        </section>

        
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-[#4cc9f0]">🚨 Report a Scam</h2>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-lg text-center">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-2xl font-bold mb-3">National Cyber Crime Helpline</h3>
            <div className="inline-block bg-red-700/40 border border-red-600 rounded-xl px-8 py-4 mb-6">
              <p className="text-3xl font-bold text-red-300">1930</p>
              <p className="text-blue-100 text-sm">24x7 Emergency Assistance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <a href="https://cybercrime.gov.in" className="bg-[#043a4d]/50 hover:bg-[#065b7c] rounded-xl border border-blue-500 p-6 transition">
                🏛️ <h4 className="font-semibold mt-2">Cyber Crime Portal</h4>
                <p className="text-sm text-blue-100">Report cyber frauds online</p>
              </a>
              <a href="https://sachet.rbi.org.in/" className="bg-[#043a4d]/50 hover:bg-[#065b7c] rounded-xl border border-green-500 p-6 transition">
                🏦 <h4 className="font-semibold mt-2">RBI Sachet Portal</h4>
                <p className="text-sm text-blue-100">Report financial frauds</p>
              </a>
              <a href="https://cybercrime.mppolice.gov.in" className="bg-[#043a4d]/50 hover:bg-[#065b7c] rounded-xl border border-purple-500 p-6 transition">
                👮 <h4 className="font-semibold mt-2">MP Cyber Police</h4>
                <p className="text-sm text-blue-100">Report scams locally</p>
              </a>
            </div>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg"
            >
              🚨 File a Complaint Now
            </a>
          </div>
        </section>
      </main>

      
      <footer className="bg-[#021727] py-6 text-center text-gray-400 border-t border-white/10">
        <p className="text-sm">
          © 2025 FraudShield | Awareness by Govt. of India | Stay Vigilant Online
        </p>
      </footer>
    </div>
  );
}

export default Education;
