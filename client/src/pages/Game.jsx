import React, { useState, useEffect } from "react";
const QUESTIONS = [
  {
    question: "Which is the official Indian government portal to report cybercrime?",
    options: ["cybercrime.gov.in", "stopfraud.in", "gov-fraud.org", "fraudalert.com"],
    answer: "cybercrime.gov.in",
    explanation:
      "The Ministry of Home Affairs manages the official cybercrime reporting portal cybercrime.gov.in.",
  },
  {
    question:
      "You get a call saying your KYC is expiring and you must share your OTP. What should you do?",
    options: ["Share OTP immediately", "Disconnect the call", "Send Aadhaar copy", "Call back later"],
    answer: "Disconnect the call",
    explanation: "Banks and government bodies never ask for OTPs on calls. It’s a scam.",
  },
  {
    question: "Which Indian ministry is responsible for cyber security?",
    options: [
      "Ministry of Home Affairs",
      "Ministry of Electronics and IT",
      "Ministry of Finance",
      "Ministry of Defence",
    ],
    answer: "Ministry of Electronics and IT",
    explanation:
      "Cyber security in India is overseen by the Ministry of Electronics and Information Technology (MeitY).",
  },
  {
    question:
      "You receive an email from 'support@rbi-secure.com' asking for your account details. What should you do?",
    options: ["Reply with details", "Report it as phishing", "Click the link", "Save it for later"],
    answer: "Report it as phishing",
    explanation:
      "RBI never sends emails asking for personal details. Such emails are phishing scams.",
  },
  {
    question: "Which number is the Indian cybercrime helpline?",
    options: ["155260", "1098", "100", "181"],
    answer: "155260",
    explanation: "The Indian cybercrime helpline number 155260 helps report financial frauds quickly.",
  },
  {
    question: "A website asks you to pay ₹500 to update your Aadhaar. Is this genuine?",
    options: [
      "Yes, Aadhaar updates are paid online",
      "No, it’s a scam",
      "Only in some states",
      "Maybe if UIDAI approves",
    ],
    answer: "No, it’s a scam",
    explanation:
      "Aadhaar updates online are managed only at uidai.gov.in. Third-party payment requests are fraud.",
  },
  {
    question: "Which government body regulates banks and warns about fraud messages?",
    options: ["RBI", "SEBI", "IRDAI", "NITI Aayog"],
    answer: "RBI",
    explanation:
      "The Reserve Bank of India regulates banks and issues warnings about fraud calls and SMS.",
  },
  {
    question: "What is the safest way to check if a government email is genuine?",
    options: [
      "Look for .gov.in domain",
      "See if it has a logo",
      "Check spelling only",
      "Forward to friends",
    ],
    answer: "Look for .gov.in domain",
    explanation:
      "Genuine government emails in India always end with .gov.in or nic.in.",
  },
  {
    question:
      "You get an SMS from an unknown number claiming to be from Income Tax Dept with a link. What should you do?",
    options: [
      "Click it to file taxes",
      "Ignore/Delete the SMS",
      "Share PAN number",
      "Send bank details",
    ],
    answer: "Ignore/Delete the SMS",
    explanation:
      "Income Tax Dept communicates only through official portals and never via random SMS links.",
  },
  {
    question: "Which nodal agency in India handles cyber security incidents?",
    options: ["CERT-In", "CBI", "NIA", "RAW"],
    answer: "CERT-In",
    explanation:
      "CERT-In (Indian Computer Emergency Response Team) is the national nodal agency for cyber security.",
  },
];

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  
  useEffect(() => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
  }, []);

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    setShowExplanation(true);

    const correct = questions[current].answer;
    if (option === correct) {
      setScore((s) => s + 10);
    } else {
      setWrongAnswers((w) => [
        ...w,
        {
          question: questions[current].question,
          yourAnswer: option,
          correctAnswer: correct,
          explanation: questions[current].explanation,
        },
      ]);
    }
  };

  const handleNext = () => {
    if (!selected) return;
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <div className="loading">Loading...</div>;

  if (finished) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center mt-5 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white rounded-lg p-5 mb-5 shadow-md">
          <h1 className="text-4xl">{score}</h1>
          <p className="text-lg">Total Score</p>
        </div>

        <div className="text-gray-800">
          {score === questions.length * 10 && (
            <h2 className="text-xl font-semibold">
              🎉 Excellent! You got everything correct!
            </h2>
          )}
          {score >= (questions.length * 10) / 2 &&
            score < questions.length * 10 && (
              <h2 className="text-xl font-semibold">
                👍 Good job! But there’s room to improve.
              </h2>
            )}
          {score < (questions.length * 10) / 2 && (
            <h2 className="text-xl font-semibold">
              📚 Keep practicing! You’ll get better.
            </h2>
          )}
        </div>

        {wrongAnswers.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="text-lg text-blue-600 font-semibold">
              Review Mistakes
            </h3>
            {wrongAnswers.map((w, i) => (
              <details
                key={i}
                className="bg-gray-100 border border-gray-200 rounded-lg mb-2 p-3 cursor-pointer"
              >
                <summary className="font-semibold">❌ {w.question}</summary>
                <p>
                  <strong>Your Answer:</strong> {w.yourAnswer}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {w.correctAnswer}
                </p>
                <p>
                  <em>{w.explanation}</em>
                </p>
              </details>
            ))}
          </div>
        )}

        <button
          className="mt-6 bg-green-600 text-white p-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
          onClick={() => window.location.reload()}
        >
          🔄 Play Again
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="w-full max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="font-bold">SCAM COACH</span>
        <span className="text-green-600">Score • {score}</span>
      </div>

      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-4">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isCorrect = opt === q.answer;
            const isWrong = selected === opt && opt !== q.answer;
            return (
              <button
                key={i}
                className={`w-full p-4 text-left border rounded-lg transition duration-300 
                  ${
                    selected
                      ? isCorrect
                        ? "bg-green-100 border-green-500"
                        : isWrong
                        ? "bg-red-100 border-red-500"
                        : ""
                      : "bg-white border-gray-300"
                  }
                  hover:bg-gray-100`}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-4 text-sm text-gray-600">
            {selected === q.answer
              ? "✅ Correct!"
              : `❌ Incorrect. ${q.explanation}`}
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            {questions.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i === current ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            className={`p-2.5 px-6 font-bold text-white rounded-lg ${
              !selected
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleNext}
            disabled={!selected}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
