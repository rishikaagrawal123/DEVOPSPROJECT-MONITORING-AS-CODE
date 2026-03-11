# Monitoring-as-Code Framework

**Student Name:** Rishika Agrawal
**Registration No:** 23FE10CSE00026
**Course:** CSE3253 DevOps (PE6)
**Semester:** VI (2025–2026)
**Project Type:** Monitoring & CI/CD Automation
**Difficulty:** Intermediate

---

# Project Overview

## Problem Statement

Modern applications require continuous monitoring to ensure reliability, performance, and availability. Manual monitoring setup is time-consuming and error-prone. This project introduces a **Monitoring-as-Code framework** where monitoring infrastructure and configurations are defined in code and automatically deployed using DevOps tools.

## Objectives

* Automate monitoring infrastructure deployment using Infrastructure as Code.
* Implement CI/CD pipeline for automated deployment.
* Integrate monitoring tools such as Prometheus and Grafana for system metrics visualization.

## Key Features

* Automated monitoring deployment using **Docker Compose**
* Infrastructure automation using **Puppet**
* Metrics collection using **Prometheus**
* Visualization dashboards using **Grafana**
* CI/CD automation using **Jenkins**

---

# Technology Stack

## Core Technologies

Programming Language: Python
Framework: Flask
Database: None (Sample Application)

## DevOps Tools

Version Control: Git
CI/CD: Jenkins
Containerization: Docker
Configuration Management: Puppet
Monitoring: Prometheus & Grafana

---

# Getting Started

## Prerequisites

* Docker Desktop v20.10+
* Git 2.30+
* Python 3.8+
* Jenkins (for pipeline execution)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/rishikaagrawal123/devopsproject-monitoring-as-code.git
cd devopsproject-monitoring-as-code
```

### 2. Start the monitoring infrastructure

```bash
docker-compose -f infrastructure/docker/docker-compose.yml up -d --build
```

### 3. Access services

Application:
http://localhost:5000

Prometheus:
http://localhost:9090

Grafana Dashboard:
http://localhost:3000

Default Login
Username: admin
Password: admin

---

# Project Structure

```
devopsproject-monitoring-as-code
│
├── README.md
├── src
│   └── sample-app
│       ├── app.py
│       ├── Dockerfile
│       └── requirements.txt
│
├── infrastructure
│   ├── docker
│   │   └── docker-compose.yml
│   └── puppet
│       └── manifests
│           ├── monitoring.pp
│           └── site.pp
│
├── pipelines
│   └── Jenkinsfile
│
├── monitoring
│   ├── prometheus
│   │   └── prometheus.yml
│   ├── grafana
│   │   ├── dashboards
│   │   └── provisioning
│   └── nagios
│
└── details.csv
```

---

# CI/CD Pipeline

## Pipeline Stages

1. **Checkout Code** – Pull latest source code from GitHub
2. **Build Infrastructure** – Build Docker containers
3. **Deploy Monitoring Stack** – Deploy Prometheus, Grafana and sample application
4. **Monitoring Activation** – Prometheus collects metrics and Grafana visualizes them

---

# Monitoring & Logging

## Monitoring Setup

Prometheus collects system and application metrics.

Grafana visualizes these metrics using dashboards.

### Metrics Monitored

* CPU Usage
* Memory Usage
* Container Health
* Application Performance Metrics

---

# Docker Deployment

## Build Docker Images

```
docker build -t monitoring-app .
```

## Run Containers

```
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

---

# Performance Metrics

| Metric               | Target  | Current |
| -------------------- | ------- | ------- |
| Build Time           | < 5 min | 2 min   |
| Monitoring Latency   | < 5 sec | 3 sec   |
| Deployment Frequency | Daily   | Manual  |

---

# Development Workflow

## Git Branching Strategy

```
main
 ├── develop
 │   ├── feature/monitoring
 │   ├── feature/dashboard
 │   └── hotfix/bugfix
```

## Commit Convention

* feat: New feature
* fix: Bug fix
* docs: Documentation
* refactor: Code improvement
* chore: Maintenance

---

# Security

## Security Measures

* Environment-based configuration
* Secure container deployment
* Dependency updates
* Access control for monitoring dashboards

---

# Documentation

Technical Documentation:

* System architecture
* Monitoring configuration
* CI/CD pipeline setup

---

# Demo

Demo Video:
(To be added in deliverables folder)

Live Demo:
Local deployment via Docker Compose

---

# Project Challenges

1. Integrating Prometheus monitoring with Docker containers
2. Automating infrastructure deployment using Puppet
3. Configuring Grafana dashboards for real-time visualization

---

# Learnings

* Practical implementation of Monitoring-as-Code
* CI/CD pipeline automation using Jenkins
* Containerized monitoring infrastructure
* Infrastructure as Code using Puppet

---

# Acknowledgments

Course Instructor: **Mr. Jay Shankar Sharma**
Reference materials and open-source documentation.

---

# Contact

Student: **Rishika Agrawal**
GitHub: https://github.com/rishikaagrawal123
