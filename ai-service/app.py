from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from datetime import datetime
from urllib.parse import urlparse
import requests, os
from dotenv import load_dotenv

# -----------------------------
# CONFIGURATION
# -----------------------------
MODEL_NAME = "vedastra/scam-phish-multilingual-model"
EMERGENCY_NUMBER = "1930-FRAUD-HELP"

load_dotenv()
app = Flask(__name__)
CORS(app)

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
AI_LABEL_MAP = {"LABEL_0": "Not Scam", "LABEL_1": "Scam"}

# -----------------------------
# LOAD MODEL
# -----------------------------
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    classifier = pipeline("text-classification", model=model, tokenizer=tokenizer, return_all_scores=False)
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
    text_lower = text.lower()
    found = [kw for kw in SCAM_KEYWORDS if kw in text_lower]
    return found

# -----------------------------
# HELPERS
# -----------------------------
def is_url(text: str) -> bool:
    try:
        result = urlparse(text)
        return all([result.scheme in ["http", "https"], result.netloc])
    except Exception:
        return False

def classify_text(text: str) -> dict:
    out = classifier(text)
    if isinstance(out, list):
        out = out[0]

    label_key = out.get("label")
    score = float(out.get("score", 0.0))
    mapped = AI_LABEL_MAP.get(label_key, "Not Scam")
    confidence = round(score * 100, 2)

    flags = keyword_flags(text)
    if flags and mapped != "Scam":
        mapped = "Suspicious"
        confidence = min(confidence + 10, 95)

    return {
        "label": mapped,
        "confidence": confidence,
        "raw_label": label_key,
        "all_scores": None,
        "flags": flags
    }

# -----------------------------
# ROUTES
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
        "scanned_on": datetime.utcnow().isoformat() + "Z"
    }

    return jsonify(response), 200

@app.route('/scanpage', methods=['POST'])
def scan_text():
    data = request.json or {}
    text = data.get("text", "")
    classification = classify_text(text)
    prediction = classification["label"]
    confidence = classification["confidence"]

    return jsonify({
        "is_scam": prediction == "Scam",
        "is_suspicious": prediction == "Suspicious",
        "confidence": confidence
    }), 200

@app.route("/scan-audio", methods=["POST"])
def scan_audio():
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 415

    data = request.get_json()
    audio_url = data.get("audioUrl")
    if not audio_url:
        return jsonify({"error": "No audioUrl provided"}), 400

    try:
        print(f"🎧 Received audio URL: {audio_url}")
        headers = {"Authorization": f"Token {DEEPGRAM_API_KEY}", "Content-Type": "application/json"}
        payload = {"url": audio_url, "model": "nova-2", "smart_format": True}

        deepgram_res = requests.post("https://api.deepgram.com/v1/listen", headers=headers, json=payload, timeout=60)
        deepgram_res.raise_for_status()
        dg_data = deepgram_res.json()

        transcript = ""
        try:
            transcript = dg_data.get("results", {}).get("channels", [{}])[0].get("alternatives", [{}])[0].get("transcript", "")
        except Exception:
            transcript = ""

        if not transcript:
            return jsonify({"error": "No speech detected or transcription empty"}), 400

        print("Transcript:", (transcript[:120] + "...") if len(transcript) > 120 else transcript)

        classification = classify_text(transcript)

        response = {
            "transcript": transcript,
            **classification,
            "scanned_on": datetime.utcnow().isoformat() + "Z"
        }

        return jsonify(response), 200

    except requests.exceptions.RequestException as e:
        print("❌ Deepgram request error:", e)
        return jsonify({"error": f"Deepgram request failed: {str(e)}"}), 500
    except Exception as e:
        print("❌ Audio scan error:", e)
        return jsonify({"error": str(e)}), 500

# -----------------------------
# ENTRY POINT
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860, debug=True)
