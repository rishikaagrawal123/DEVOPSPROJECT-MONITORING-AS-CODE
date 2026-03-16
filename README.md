 DevOps Monitoring-as-Code Framework

Student Name: Rishika Agrawal
Registration No: 23FE10CSE00026
Course: CSE3253 DevOps [PE6]
Semester: VI (2025–2026)
Project Type: Monitoring & CI/CD Automation


 Project Overview

Problem Statement

Modern software systems require continuous monitoring to ensure reliability, performance, and availability. Traditional monitoring systems are often configured manually, which makes them difficult to maintain, reproduce, and version control.

This project implements a **Monitoring-as-Code framework** where monitoring configurations such as alerts, dashboards, and monitoring rules are defined using code and managed through a version-controlled repository.

 Objectives

* [ ] Implement monitoring configurations using code
* [ ] Automate monitoring deployment through CI/CD pipelines
* [ ] Integrate monitoring with containerized infrastructure
* [ ] Demonstrate infrastructure and monitoring automation using DevOps practices

---

 Key Features

* Automated monitoring setup using configuration files
* CI/CD pipeline integration for automated deployments
* Docker-based containerized environment
* Alert rules and dashboard configurations stored in code

---

Technology Stack

## Core Technologies

**Programming Language:** Python 
**Framework:** Flask 
**Database:**  None

---

## DevOps Tools

**Version Control:** Git

**CI/CD:** Jenkins / GitHub Actions

**Containerization:** Docker

**Orchestration:** Kubernetes (if applicable)

**Configuration Management:** Puppet / Ansible (if applicable)

**Monitoring:** Prometheus

---

# Getting Started

## Prerequisites

* [ ] Docker Desktop v20.10+
* [ ] Git 2.30+
* [ ] Python 3.8+ / Node.js 16+ / Java 11+
* [ ] Basic understanding of Docker and CI/CD pipelines

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/[username]/devopsproject-monitoring-as-code.git
cd devopsproject-monitoring-as-code
```

### 2. Run the Application using Docker

```bash
docker-compose up --build
```

### 3. Access the Application

Web Interface:
http://localhost:8080

Monitoring Dashboard:
http://localhost:8081

---

# Project Structure

```
devopsproject-monitoring-as-code/
│
├── README.md
├── .gitignore
├── LICENSE
│
├── src/
│   ├── main/
│   ├── config/
│   └── scripts/
│
├── docs/
│   ├── projectplan.md
│   ├── designdocument.md
│   └── userguide.md
│
├── infrastructure/
│   ├── docker/
│   ├── kubernetes/
│   ├── puppet/
│   └── terraform/
│
├── pipelines/
│   ├── Jenkinsfile
│   └── .github/workflows/
│
├── monitoring/
│   ├── alerts/
│   └── dashboards/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── presentations/
└── deliverables/
```

---

# CI/CD Pipeline

The CI/CD pipeline automates the software lifecycle using Jenkins or GitHub Actions.

### Pipeline Stages

1. Code Quality Check
2. Build Application
3. Run Unit Tests
4. Security Scan
5. Deploy to Staging
6. Deploy to Production

---

# Monitoring Setup

The project implements **Monitoring-as-Code** using configuration files.

### Monitoring Tools

* Alert rules defined in configuration files
* Monitoring dashboards stored in version control

Alerts can be configured for:

* High CPU usage
* High memory usage
* Service downtime

---

# Docker Deployment

Build Docker image:

```bash
docker build -t devopsproject-monitoring .
```

Run container:

```bash
docker run -p 8080:8080 devopsproject-monitoring
```

---

# Testing

### Test Types

Unit Tests
Integration Tests
End-to-End Tests

Run tests:

```bash
npm test
```

or

```bash
pytest
```

---

# Security

Security measures implemented:

* Input validation
* Secure environment variables
* Dependency vulnerability scanning
* Container security scanning

Example security scan:

```bash
trivy image devopsproject-monitoring
```

---

# Demo

Demo video is available in the **deliverables/** folder.

---

# Challenges

1. Integrating monitoring tools with containerized environments
2. Automating monitoring deployment using CI/CD
3. Managing monitoring configurations as code

---

# Learnings

* Implementation of Monitoring-as-Code
* CI/CD automation using Jenkins
* Containerization using Docker
* Infrastructure automation practices

---

# Acknowledgments

Course Instructor: **Mr. Jay Shankar Sharma**

Open-source tools and DevOps community resources.

---

# Contact

**Student:** Rishika Agrawal

**Email:** Rishika.23fe10cse00026@muj.manipal.edu

**GitHub:** https://github.com/rishikaagrawal123
