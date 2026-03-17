const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

const PROMETHEUS_CONFIG_PATH = path.join(
  __dirname,
  "../../monitoring/prometheus/prometheus.yml"
);

app.get("/api/applications", (req, res) => {
  try {
    if (!fs.existsSync(PROMETHEUS_CONFIG_PATH)) {
      return res.json([]);
    }

    const config = yaml.parse(
      fs.readFileSync(PROMETHEUS_CONFIG_PATH, "utf8")
    );

    const apps = [];

    config.scrape_configs?.forEach((job) => {
      job.static_configs?.forEach((s) => {
        s.targets?.forEach((target) => {
          apps.push({
            jobName: job.job_name,
            target,
            status: "Monitored",
          });
        });
      });
    });

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: "Failed reading prometheus config" });
  }
});

app.post("/api/monitor", (req, res) => {
  const { appName, appUrl, appPort } = req.body;

  if (!appName || !appUrl || !appPort) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const target = `${appUrl}:${appPort}`;

  try {
    const config = yaml.parse(
      fs.readFileSync(PROMETHEUS_CONFIG_PATH, "utf8")
    );

    config.scrape_configs.push({
      job_name: appName,
      static_configs: [{ targets: [target] }],
    });

    fs.writeFileSync(PROMETHEUS_CONFIG_PATH, yaml.stringify(config));

    exec("docker compose restart prometheus");

    res.json({ message: "Monitoring added", target });
  } catch (err) {
    res.status(500).json({ error: "Failed updating config" });
  }
});

app.listen(PORT, () => {
  console.log(`Monitoring backend running on ${PORT}`);
});
