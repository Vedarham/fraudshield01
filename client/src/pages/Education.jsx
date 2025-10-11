import React from 'react'
function Education() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="hero-section relative bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce animate-glow"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping animate-wiggle"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-orange-400/30 rounded-full animate-bounce"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 animate-slide-in">
          <div className="mb-8 transform hover:scale-110 transition-transform duration-300 animate-float">
            <span className="text-8xl drop-shadow-2xl glow-text">🛡️</span>
          </div>
          <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-scale">
            Stay Safe from Scams & Phishing
          </h1>
          <p className="text-2xl text-red-100 max-w-4xl mx-auto leading-relaxed font-medium animate-slide-in">
            Learn how to identify and report online frauds targeting Indian citizens
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-shimmer"></div>
          </div>
        </div>
      </header>


      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            🚩 Common Signs of a Scam
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Too Good to be True</h3>
              <p className="text-gray-600">Offers like "Win ₹10 lakh FREE!" or unrealistic investment returns are red flags.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Urgent Language</h3>
              <p className="text-gray-600">"Your account will be blocked in 24 hours" - legitimate companies don't threaten customers.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Suspicious Senders</h3>
              <p className="text-gray-600">Check sender addresses for spelling errors or unusual domains.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fake Links</h3>
              <p className="text-gray-600">Watch for typos like "paypa1.com" instead of "paypal.com".</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Info Requests</h3>
              <p className="text-gray-600">Never share OTP, passwords, or banking details via SMS/email.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Unknown Numbers</h3>
              <p className="text-gray-600">Be cautious of calls from unknown numbers claiming to be from banks or government.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            📧 Spot the Difference: Fake vs Real
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">❌</span>
                <h3 className="text-2xl font-bold text-red-700">FAKE EMAIL</h3>
              </div>
              <div className="bg-white rounded p-4 border border-red-200">
                <div className="text-sm text-gray-500 mb-2">From: support@paypa1.com</div>
                <div className="text-sm text-gray-500 mb-4">Subject: URGENT: Verify Your Account Now!</div>
                <div className="text-gray-800">
                  <p className="mb-2">Dear Customer,</p>
                  <p className="mb-2">Your account will be suspended in 24 hours if you don't verify immediately.</p>
                  <p className="mb-4">Click here: <span className="text-red-600 underline">paypa1.com/verify-now</span></p>
                  <p className="text-sm text-red-600">⚠️ This is a SCAM - Notice the typos and urgent language!</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">✅</span>
                <h3 className="text-2xl font-bold text-green-700">REAL EMAIL</h3>
              </div>
              <div className="bg-white rounded p-4 border border-green-200">
                <div className="text-sm text-gray-500 mb-2">From: noreply@paypal.com</div>
                <div className="text-sm text-gray-500 mb-4">Subject: Your monthly statement is ready</div>
                <div className="text-gray-800">
                  <p className="mb-2">Hello [Your Name],</p>
                  <p className="mb-2">Your monthly PayPal statement is now available in your account.</p>
                  <p className="mb-4">Log in securely: <span className="text-green-600 underline">paypal.com/in/account</span></p>
                  <p className="text-sm text-green-600">✅ This is legitimate - Professional tone, correct domain</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            💡 Safety Tips
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Do's Card */}
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">✅</span>
                <h3 className="text-2xl font-bold text-green-700">Do's</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span>Always verify sender's email/phone number</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span>Check official websites directly (don't click links)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span>Enable two-factor authentication on all accounts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span>Keep your software and apps updated</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span>Report suspicious messages to authorities</span>
                </li>
              </ul>
            </div>

            {/* Don'ts Card */}
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">❌</span>
                <h3 className="text-2xl font-bold text-red-700">Don'ts</h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">✗</span>
                  <span>Never share OTP, PIN, or passwords with anyone</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">✗</span>
                  <span>Don't click on suspicious links or download attachments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">✗</span>
                  <span>Avoid making payments under pressure or urgency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">✗</span>
                  <span>Don't trust caller ID - scammers can fake numbers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">✗</span>
                  <span>Never provide personal details to unknown callers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            🚨 Reporting & Resources
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Emergency Helpline</h3>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 inline-block">
                <p className="text-3xl font-bold text-red-700">Dial 1930</p>
                <p className="text-gray-600">Madhya Pradesh Cyber Crime Helpline</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <a 
                href="https://cybercrime.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 rounded-lg p-6 text-center transition-colors duration-300"
              >
                <div className="text-4xl mb-3">🏛️</div>
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Cyber Crime Portal</h4>
                <p className="text-sm text-gray-600">Official Government of India portal</p>
              </a>

              <a 
                href="https://www.rbi.org.in/commonman/English/scripts/NotificationUser.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-50 hover:bg-green-100 border-2 border-green-300 rounded-lg p-6 text-center transition-colors duration-300"
              >
                <div className="text-4xl mb-3">🏦</div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">RBI Safe Banking</h4>
                <p className="text-sm text-gray-600">Reserve Bank of India guidelines</p>
              </a>

              <a 
                href="https://cybercrime.mppolice.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 rounded-lg p-6 text-center transition-colors duration-300"
              >
                <div className="text-4xl mb-3">👮</div>
                <h4 className="text-lg font-semibold text-purple-800 mb-2">MP Police Cyber Crime</h4>
                <p className="text-sm text-gray-600">Madhya Pradesh Police ADG Office</p>
              </a>
            </div>

            <div className="text-center">
              <a 
                href="https://cybercrime.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                🚨 Report a Scam Now
        </a>
      </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300 mb-2">
            Powered by Government of India resources & awareness data
          </p>
          <p className="text-sm text-gray-400">
            This is for awareness purposes only. Always verify information through official channels.
        </p>
      </div>
      </footer>
    </div>
  )
}

export default Education
