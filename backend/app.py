from flask import Flask, request, jsonify
from flask_cors import CORS
from summarize import summarize
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
CORS(app, resources={r"/summarize": {"origins": "http://localhost:3000"}})

@app.route('/summarize', methods=['POST'])
def get_summary():
    app.logger.info("Received a request for summarization")
    data = request.json
    text = data.get('text', '')
    app.logger.info(f"Received text: {text[:50]}...")  # Log first 50 characters
    threshold = data.get('threshold', 1.2)  # Default to 1.2 if not provided
    print(f"Received threshold: {threshold}") 
    summary = summarize(text, threshold)
    app.logger.info(f"Generated summary: {summary[:50]}...")  # Log first 50 characters
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)