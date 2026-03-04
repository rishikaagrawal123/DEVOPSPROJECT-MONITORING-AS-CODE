from flask import Flask
import random

app = Flask(__name__)

@app.route("/")
def home():
    return "Monitoring-as-Code Demo Running"

@app.route("/health")
def health():
    if random.randint(1, 10) > 8:
        return "Error", 500
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)