from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from datetime import datetime
from urllib.parse import urlparse
from pydub import AudioSegment
import speech_recognition as sr

# -----------------------------
# CONFIGURATION
# -----------------------------
MODEL_NAME = "vedastra/scam-phish-multilingual-model"
EMERGENCY_NUMBER = "1930-FRAUD-HELP"

app = Flask(__name__)
CORS(app)

# -----------------------------
# LOAD MODEL
# -----------------------------
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    classifier = pipeline(
        "text-classification",
        model=model,
        tokenizer=tokenizer,
        return_all_scores=True
    )
    print("AI model loaded successfully from Hugging Face Hub")
except Exception as e:
    print("Failed to load AI model:", e)
    raise e

# -----------------------------
# HEURISTIC KEYWORDS
# -----------------------------
SCAM_KEYWORDS = [
    "lottery", "won", "prize", "jackpot", "winner",
    "verify account", "login urgently", "update your password",
    "click link", "click here", "confirm now", "reset password",
    "bank details", "card number", "pin code", "ssn", "aadhaar",
    "urgent action", "limited time", "act fast",
    "investment opportunity", "double your money",
    "free gift", "exclusive offer", "congratulations",
    "selected customer", "claim reward", "risk free",
]

def keyword_flags(text: str) -> list:
    """Return list of scam-related keywords found in text."""
    text_lower = text.lower()
    found = [kw for kw in SCAM_KEYWORDS if kw in text_lower]
    return found

# -----------------------------
# HELPER FUNCTIONS
# -----------------------------
def is_url(text: str) -> bool:
    """Check if input is a valid URL (http/https)."""
    try:
        result = urlparse(text)
        return all([result.scheme in ["http", "https"], result.netloc])
    except Exception:
        return False

def classify_text(text: str) -> dict:
    """Run AI model on input text only + add heuristic keywords."""
    results = classifier(text)
    top = max(results[0], key=lambda x: x["score"])
    
    label_map = {"LABEL_0": "Not Scam", "LABEL_1": "Scam"}
    final_label = label_map.get(top["label"], "Not Scam")
    confidence = round(top["score"] * 100, 2)

    flags = keyword_flags(text)
    if flags and final_label == "Not Scam":
        final_label = "Suspicious"
        confidence = min(confidence + 10, 95)

    return {
        "label": final_label,
        "confidence": confidence,
        "raw_label": top["label"],
        "all_scores": results[0],
        "flags": flags
    }

# -----------------------------
# API ROUTE
# -----------------------------
@app.route("/scan", methods=["POST"])
def scan():
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 415

    data = request.get_json()
    user_input = data.get("text") or data.get("input")
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    classification = classify_text(user_input)

    response = {
        "input": user_input,
        "is_url": is_url(user_input),
        "label": classification["label"],
        "confidence": classification["confidence"],
        "raw_label": classification["raw_label"],
        "all_scores": classification["all_scores"],
        "keyword_flags": classification["flags"],  
        "emergency": EMERGENCY_NUMBER,
        "scanned_on": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    return jsonify(response), 200

@app.route('/scanpage', methods=['POST'])
def scan_text():
    data = request.json
    text = data.get("text", "")
    classification = classify_text(text)
    prediction = classification["label"]
    confidence = classification["confidence"]

    return jsonify({
        "is_scam": bool(prediction),
        "confidence": confidence
    })


@app.route("/scan-audio", methods=["POST"])
def scan_audio():
    try:
        file = request.files['audio']
        audio_path = f'uploads/{file.filename}'
        file.save(audio_path)

        recognizer = sr.Recognizer()
        with sr.AudioFile(audio_path) as source:
            audio = recognizer.record(source)
        transcript = recognizer.recognize_google(audio)

        classification = classify_text(transcript)

        return jsonify(classification)

    except Exception as e:
        return jsonify({"error": str(e)}), 400
# -----------------------------
# ENTRY POINT
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
