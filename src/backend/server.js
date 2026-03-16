const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Path to prometheus config relative to backend directory
const PROMETHEUS_CONFIG_PATH = path.join(__dirname, '../../monitoring/prometheus/prometheus.yml');
const PUPPET_MANIFEST_PATH = path.join(__dirname, '../../infrastructure/puppet/manifests/monitoring.pp');
const DOCKER_COMPOSE_PATH = path.join(__dirname, '../../infrastructure/docker/docker-compose.yml');

// Endpoint to get currently monitored applications
app.get('/api/applications', (req, res) => {
    try {
        if (!fs.existsSync(PROMETHEUS_CONFIG_PATH)) {
            return res.status(404).json({ error: 'prometheus.yml not found' });
        }
        
        const fileContents = fs.readFileSync(PROMETHEUS_CONFIG_PATH, 'utf8');
        const parsedYaml = yaml.parse(fileContents);
        
        const applications = [];
        if (parsedYaml && parsedYaml.scrape_configs) {
            parsedYaml.scrape_configs.forEach(config => {
                if (config.static_configs) {
                    config.static_configs.forEach(staticConf => {
                        if (staticConf.targets) {
                            staticConf.targets.forEach(target => {
                                applications.push({
                                    jobName: config.job_name,
                                    target: target,
                                    status: 'Monitored'
                                });
                            });
                        }
                    });
                }
            });
        }
        res.json(applications);
    } catch (error) {
        console.error('Error reading Prometheus config:', error);
        res.status(500).json({ error: 'Failed to read applications' });
    }
});

// Endpoint to add a new application to monitoring
app.post('/api/monitor', (req, res) => {
    const { appName, appUrl, appPort } = req.body;

    if (!appName || !appUrl || !appPort) {
        return res.status(400).json({ error: 'appName, appUrl, and appPort are required' });
    }

    try {
        let parsedYaml = { global: { scrape_interval: '15s' }, scrape_configs: [] };
        
        if (fs.existsSync(PROMETHEUS_CONFIG_PATH)) {
            const fileContents = fs.readFileSync(PROMETHEUS_CONFIG_PATH, 'utf8');
            parsedYaml = yaml.parse(fileContents) || parsedYaml;
        }

        if (!parsedYaml.scrape_configs) {
            parsedYaml.scrape_configs = [];
        }

        // Check if job already exists
        const existingJob = parsedYaml.scrape_configs.find(config => config.job_name === appName);
        const newTarget = `${appUrl}:${appPort}`;

        if (existingJob) {
            // Append to existing job targets if not already present
            let targetExists = false;
            existingJob.static_configs.forEach(staticConf => {
                if (!staticConf.targets) staticConf.targets = [];
                if (staticConf.targets.includes(newTarget)) {
                    targetExists = true;
                } else {
                    staticConf.targets.push(newTarget);
                }
            });
            if (targetExists) {
                 return res.status(400).json({ error: 'Application already monitored.' });
            }
        } else {
            // Add new job
            parsedYaml.scrape_configs.push({
                job_name: appName,
                static_configs: [{
                    targets: [newTarget]
                }]
            });
        }

        const newYamlData = yaml.stringify(parsedYaml);
        fs.writeFileSync(PROMETHEUS_CONFIG_PATH, newYamlData, 'utf8');

        // Apply puppet manifest (which should technically run docker compose up -d)
        // If puppet fails, we fall back to just restarting docker compose.
        console.log('Running puppet apply...');
        exec(`puppet apply ${PUPPET_MANIFEST_PATH}`, (puppetErr, puppetStdout, puppetStderr) => {
            console.log('Puppet stdout:', puppetStdout);
            if (puppetErr) {
                console.error('Puppet apply failed (is puppet installed?). Falling back to docker compose:', puppetStderr);
            }
            // Execute docker compose restart for prometheus to pick up new config
            const dockerCmd = `docker compose -f ${DOCKER_COMPOSE_PATH} restart prometheus`;
            console.log(`Running docker compose restart: ${dockerCmd}`);
            exec(dockerCmd, (dockerErr, dockerStdout, dockerStderr) => {
                if (dockerErr) {
                    console.error('Docker compose restart failed:', dockerStderr);
                    return res.status(500).json({ error: 'Failed to restart monitoring stack', details: dockerStderr });
                }
                res.json({ message: 'Application monitoring started successfully', appName, target: newTarget });
            });
        });

    } catch (error) {
        console.error('Error updating config:', error);
        res.status(500).json({ error: 'Failed to add application' });
    }
});

app.listen(PORT, () => {
    console.log(`Monitoring backend listening on port ${PORT}`);
});
