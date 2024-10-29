const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load .env variables

const envFilePath = path.join(__dirname, '.env');
const envVariables = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf-8') : '';

const envs = envVariables.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=').map(v => v.trim());
  if (key && value) {
    acc[key] = value;
  }
  return acc;
}, {});

// Set the environment variables
for (const key in envs) {
  if (envs.hasOwnProperty(key)) {
    process.env[key] = envs[key];
  }
}