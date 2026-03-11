from flask import Flask
from prometheus_client import make_wsgi_app, Counter, Histogram
from werkzeug.middleware.dispatcher import DispatcherMiddleware
import random
import time

app = Flask(__name__)

# Prometheus metrics
REQUEST_COUNT = Counter('app_request_count', 'Application Request Count', ['method', 'endpoint', 'http_status'])
REQUEST_LATENCY = Histogram('app_request_latency_seconds', 'Application Request Latency', ['method', 'endpoint'])

@app.route("/")
def home():
    start_time = time.time()
    REQUEST_COUNT.labels('GET', '/', 200).inc()
    REQUEST_LATENCY.labels('GET', '/').observe(time.time() - start_time)
    return "Monitoring-as-Code Demo Running"

@app.route("/health")
def health():
    start_time = time.time()
    if random.randint(1, 10) > 8:
        REQUEST_COUNT.labels('GET', '/health', 500).inc()
        REQUEST_LATENCY.labels('GET', '/health').observe(time.time() - start_time)
        return "Error", 500
    REQUEST_COUNT.labels('GET', '/health', 200).inc()
    REQUEST_LATENCY.labels('GET', '/health').observe(time.time() - start_time)
    return "OK", 200

# Add prometheus wsgi middleware to route /metrics requests
app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
    '/metrics': make_wsgi_app()
})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)