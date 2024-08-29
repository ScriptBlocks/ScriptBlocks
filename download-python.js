const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');
const { promisify } = require('util');
const extract = require('extract-zip');  // Required for .zip files

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const execPromise = promisify(exec);

const tempDir = path.join(__dirname, 'temp');
const pythonDir = path.join(__dirname, 'Python311');
const scriptBlocksWheelUrl = 'https://github.com/ScriptBlocks/ScriptBlocks.py/releases/download/test/scriptblocks-0.0.0-py3-none-any.whl'; // Adjust this URL to the latest wheel URL

const ensureDir = async (dir) => {
  if (!fs.existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
};

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

const installPython = async (url) => {
  await ensureDir(tempDir);
  await ensureDir(pythonDir);

  // Download and extract Python
  const pythonZip = path.join(tempDir, 'python-3.11.9-embed-amd64.zip');
  await downloadFile('https://www.python.org/ftp/python/3.11.9/python-3.11.9-embed-amd64.zip', pythonZip);
  await extract(pythonZip, pythonDir);
  console.log('Python embedded package downloaded and extracted successfully');

  // Download ScriptBlocks wheel file
  const wheelFile = path.join(tempDir, 'ScriptBlocks-latest.whl');
  await downloadFile(scriptBlocksWheelUrl, wheelFile);
  console.log('ScriptBlocks wheel file downloaded successfully');

  // Install ScriptBlocks wheel file
  const pythonPath = path.join(pythonDir, 'python.exe');
  await execPromise(`${pythonPath} -m pip install ${wheelFile}`);
  console.log('ScriptBlocks package installed successfully');
};

const main = async () => {
  await installPython();
};

main().catch(err => {
  console.error('Failed to download and install Python and ScriptBlocks:', err);
});
