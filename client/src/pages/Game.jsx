import React, { useState, useEffect } from "react";

const QUESTIONS = [
  {
    question: "Which is the official Indian government portal to report cybercrime?",
    options: ["cybercrime.gov.in", "stopfraud.in", "gov-fraud.org", "fraudalert.com"],
    answer: "cybercrime.gov.in",
    explanation: "The Ministry of Home Affairs manages the official cybercrime reporting portal cybercrime.gov.in."
  },
  {
    question: "You get a call saying your KYC is expiring and you must share your OTP. What should you do?",
    options: ["Share OTP immediately", "Disconnect the call", "Send Aadhaar copy", "Call back later"],
    answer: "Disconnect the call",
    explanation: "Banks and government bodies never ask for OTPs on calls. It’s a scam."
  },
  {
    question: "Which Indian ministry is responsible for cyber security?",
    options: ["Ministry of Home Affairs", "Ministry of Electronics and IT", "Ministry of Finance", "Ministry of Defence"],
    answer: "Ministry of Electronics and IT",
    explanation: "Cyber security in India is overseen by the Ministry of Electronics and Information Technology (MeitY)."
  },
  {
    question: "You receive an email from 'support@rbi-secure.com' asking for your account details. What should you do?",
    options: ["Reply with details", "Report it as phishing", "Click the link", "Save it for later"],
    answer: "Report it as phishing",
    explanation: "RBI never sends emails asking for personal details. Such emails are phishing scams."
  },
  {
    question: "Which number is the Indian cybercrime helpline?",
    options: ["155260", "1098", "100", "181"],
    answer: "155260",
    explanation: "The Indian cybercrime helpline number 155260 helps report financial frauds quickly."
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

  if (questions.length === 0) return <div className="loading text-white">Loading...</div>;

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#021727] to-[#065b7c]">
        <div className="bg-[#0b2f47]/90 backdrop-blur-md p-6 rounded-lg shadow-lg text-center mt-5 max-w-md mx-auto text-white">
          <div className="bg-gradient-to-br from-[#021727] to-[#065b7c] text-white rounded-lg p-5 mb-5 shadow-md">
            <h1 className="text-4xl font-bold">{score}</h1>
            <p className="text-lg">Total Score</p>
          </div>

          <div>
            {score === questions.length * 10 && <h2 className="text-xl font-semibold">🎉 Excellent! You got everything correct!</h2>}
            {score >= (questions.length * 10) / 2 && score < questions.length * 10 && (
              <h2 className="text-xl font-semibold">👍 Good job! But there’s room to improve.</h2>
            )}
            {score < (questions.length * 10) / 2 && <h2 className="text-xl font-semibold">📚 Keep practicing! You’ll get better.</h2>}
          </div>

          {wrongAnswers.length > 0 && (
            <div className="mt-6 text-left">
              <h3 className="text-lg text-blue-200 font-semibold">Review Mistakes</h3>
              {wrongAnswers.map((w, i) => (
                <details key={i} className="bg-white/10 border border-white/20 rounded-lg mb-2 p-3 cursor-pointer text-blue-100">
                  <summary className="font-semibold">❌ {w.question}</summary>
                  <p><strong>Your Answer:</strong> {w.yourAnswer}</p>
                  <p><strong>Correct Answer:</strong> {w.correctAnswer}</p>
                  <p><em>{w.explanation}</em></p>
                </details>
              ))}
            </div>
          )}

          <button
            className="mt-6 bg-[#065b7c] text-white p-3 rounded-lg text-lg hover:bg-[#043a4d] transition duration-300"
            onClick={() => window.location.reload()}
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#021727] to-[#065b7c] p-5">
      <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-lg bg-[#0b2f47]/90 backdrop-blur-md text-white">
        <div className="flex justify-between text-sm text-blue-100 mb-3">
          <span className="font-bold text-blue-200">SCAM COACH</span>
          <span className="text-green-400">Score • {score}</span>
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-4 text-white">{q.question}</h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = opt === q.answer;
              const isWrong = selected === opt && opt !== q.answer;
              return (
                <button
                  key={i}
                  className={`w-full p-4 text-left border rounded-lg transition duration-300 
                    ${selected
                      ? isCorrect
                        ? "bg-green-100/20 border-green-500 text-green-200"
                        : isWrong
                        ? "bg-red-100/20 border-red-500 text-red-200"
                        : "bg-transparent border-gray-500 text-blue-100"
                      : "bg-transparent border-gray-500 hover:bg-white/10 text-blue-100"}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-4 text-sm text-blue-100">
              {selected === q.answer ? "✅ Correct!" : `❌ Incorrect. ${q.explanation}`}
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-2">
              {questions.map((_, i) => (
                <span key={i} className={`w-2.5 h-2.5 rounded-full ${i === current ? "bg-blue-400" : "bg-gray-500"}`} />
              ))}
            </div>
            <button
              className={`p-2.5 px-6 font-bold text-white rounded-lg ${
                !selected ? "bg-[#043a4d]/60 cursor-not-allowed" : "bg-[#065b7c] hover:bg-[#043a4d]"
              }`}
              onClick={handleNext}
              disabled={!selected}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
