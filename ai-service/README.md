# AI Service for Scam and Phishing Detection

This is a Flask-based AI service for detecting scam and phishing attempts in text and audio.

## Features

- **Text Analysis**: Scans text for scam-related keywords and uses a Hugging Face model for classification.
- **Audio Analysis**: Transcribes audio files and analyzes the transcript for scams.
- **URL Check**: Verifies if a given string is a valid URL.

## API Endpoints

- `POST /scan`: Analyzes input text and returns a scam/not-scam classification with a confidence score.
- `POST /scanpage`: A simplified endpoint for text analysis, returning a boolean `is_scam` and confidence.
- `POST /scan-audio`: Takes an audio file, transcribes it, and runs the scam analysis on the transcription.

## Model

This service uses the `vedastra/scam-phish-multilingual-model` from the Hugging Face Hub.

### Model Architecture

The model is a fine-tuned version of `distilbert-base-multilingual-cased`, a lighter and faster variant of the original BERT model. BERT's (Bidirectional Encoder Representations from Transformers) key innovation is its ability to understand the full context of a word by examining the words that come both before and after it.

The fine-tuning process adapted this general-purpose language model for the specific task of fraud detection. It was trained on a specialized dataset of scam, phishing, and legitimate messages, teaching it to recognize the unique patterns and keywords associated with fraudulent content across multiple languages.

## Setup and Running

1.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the application**:
    ```bash
    python app.py
    ```
    The service will be available at `http://localhost:8000`.
