# 🚀 Monitoring-as-Code Framework

**Student Name:** Rishika Agrawal
**Registration No:** 23FE10CSE00026
**Course:** CSE3253 DevOps (PE6)
**Semester:** VI (2025–2026)
**Project Type:** Monitoring & CI/CD Automation

---

# 📌 Project Overview

## 🔴 Problem Statement

Modern software systems require continuous monitoring to ensure reliability, performance, and availability. Traditional monitoring approaches rely on manual configuration, which is time-consuming, error-prone, and difficult to scale.

This project implements a **Monitoring-as-Code framework**, where monitoring configurations such as targets, dashboards, and infrastructure are defined as code and managed through version control.

---

## 🎯 Objectives

* Automate monitoring infrastructure setup using code
* Reduce manual configuration and human errors
* Enable real-time monitoring and visualization
* Integrate DevOps tools into a unified system
* Provide a user-friendly monitoring interface
* Ensure scalability and extensibility

---

# ⭐ Key Features

* ⚙️ Automated monitoring setup using Docker Compose
* 📊 Real-time monitoring using Prometheus & Grafana
* 🔁 CI/CD integration using Jenkins
* 🐳 Fully containerized architecture
* 🧩 Infrastructure automation using Puppet
* 🌐 User-friendly UI for monitoring control

---

# 🛠 Technology Stack

## Core Technologies

* **Language:** Python
* **Framework:** Flask
* **Frontend:** React
* **Backend:** Node.js

---

## DevOps Tools

* **Version Control:** Git
* **CI/CD:** Jenkins
* **Containerization:** Docker
* **Configuration Management:** Puppet
* **Monitoring:** Prometheus & Grafana

---

# 🏗 Project Architecture

```
User → Frontend UI → Backend API → Puppet Automation → Docker Containers
→ Prometheus (Metrics Collection) → Grafana (Visualization)
```

---

# ⚙️ Getting Started

## ✅ Prerequisites

* Docker Desktop (v20.10+)
* Git
* Node.js / Python
* Basic knowledge of Docker

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/rishikaagrawal123/devopsproject-monitoring-as-code.git
cd devopsproject-monitoring-as-code
```

---

### 2. Run the Monitoring Stack

```bash
docker-compose -f infrastructure/docker/docker-compose.yml up --build
```

---

### 3. Access Services

| Service     | URL                   |
| ----------- | --------------------- |
| Application | http://localhost:5000 |
| Frontend UI | http://localhost:5173 |
| Backend API | http://localhost:4000 |
| Prometheus  | http://localhost:9090 |
| Grafana     | http://localhost:3000 |

---

### 🔐 Grafana Login

```
Username: admin
Password: admin
```

---

# 📂 Project Structure

```
devopsproject-monitoring-as-code/
│
├── src/
│   ├── sample-app/
│   ├── backend/
│   └── frontend/
│
├── infrastructure/
│   ├── docker/
│   │   └── docker-compose.yml
│   └── puppet/
│
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   └── grafana/
│
├── pipelines/
│   └── Jenkinsfile
│
└── README.md
```

---

# 🔄 CI/CD Pipeline

## Pipeline Stages

1. Code Checkout
2. Build Docker Images
3. Deploy Monitoring Stack
4. Run Application
5. Activate Monitoring
6. Visualize Metrics

---

# 📊 Monitoring Setup

## Prometheus

* Collects metrics from application
* Uses `/metrics` endpoint
* Stores time-series data

## Grafana

* Visualizes metrics
* Provides dashboards
* Real-time monitoring

---

## 📈 Metrics Monitored

* CPU Usage
* Memory Usage
* Request Rate
* Application Performance

---

# 🐳 Docker Commands

Start system:

```bash
docker-compose up --build
```

Check containers:

```bash
docker ps
```

Stop system:

```bash
docker-compose down
```

---

# 🔍 Monitoring Commands

Generate traffic:

```bash
for ($i=1; $i -le 20; $i++) { curl http://localhost:5000 > $null }
```

Check metrics:

```bash
curl http://localhost:5000/metrics
```

Prometheus health:

```bash
curl http://localhost:9090/-/healthy
```

---

# 🧪 Testing

Run tests:

```bash
pytest
```

or

```bash
npm test
```

---

# ⚠️ Challenges

* Integrating Prometheus with Docker containers
* Automating monitoring setup
* Managing configuration as code

---

# 📚 Learnings

* Monitoring-as-Code implementation
* CI/CD automation
* Docker-based deployment
* DevOps tool integration

---

# 🔐 Security

* Input validation
* Secure configurations
* Container security scanning

---

# 🎥 Demo

* Local deployment using Docker Compose
* Prometheus + Grafana dashboards
* Real-time monitoring

---

# 🙏 Acknowledgment

Course Instructor: **Mr. Dibakar Sinha**

Open-source community and DevOps resources.

---

# 📬 Contact

**Rishika Agrawal**
GitHub: https://github.com/rishikaagrawal123

---
