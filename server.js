const express = require('express');
const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const validator = require('validator'); 
const simpleGit = require('simple-git');
const { execFile } = require('child_process');
const shellQuote = require('shell-quote');

const app = express();
const server = http.createServer(app);
const git = simpleGit();
let port = 1024;

const findFreePort = (startingPort) => {
    return new Promise((resolve) => {
        const server = http.createServer();
        server.listen(startingPort, () => {
            server.once('close', () => resolve(startingPort));
            server.close();
        });
        server.on('error', () => {
            resolve(findFreePort(startingPort + 1));
        });
    });
};

const startServer = async (plugins) => {
    port = await findFreePort(port);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

    // Basic route
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/windows/settings', (req, res) => {
        res.render('windows/settings');
    });

    // User home directory route
    app.get('/user-home-dir', (req, res) => {
        const homeDir = os.homedir();
        res.json({ homeDir });
    });

    // Apply server hooks from plugins
    if (plugins) {
        plugins.forEach(plugin => {
            if (typeof plugin.serverHook === 'function') {
                plugin.serverHook(app);  // Register plugin routes/functions
            }
        });
    }

    // Command execution limiter
    const commandLimiter = rateLimit({
        windowMs: 60 * 1000,
        max: 10,
        message: { success: false, message: 'Too many requests, please try again later.' }
    });

    // Clone project route
    app.post('/create-project', async (req, res) => {
        const { projectName, folderPath } = req.body;

        if (!projectName || !folderPath) {
            return res.status(400).json({ success: false, message: 'Missing project name or folder path.' });
        }

        const targetPath = path.join(folderPath, projectName);

        try {
            await git.clone('https://github.com/ScriptBlocks/example-project.git', targetPath);
            res.json({ success: true });
        } catch (error) {
            console.error('Git clone error:', error);
            res.status(500).json({ success: false, message: 'Failed to create project.' });
        }
    });

    // Command execution route
    app.post('/execute-command', commandLimiter, (req, res) => {
        let { command, currentDir } = req.body;

        // Restrict `currentDir` to the user's home directory
        let workingDir = currentDir === '~' ? os.homedir() : path.resolve(os.homedir(), currentDir);

        // Validate that workingDir is inside the home directory
        if (!workingDir.startsWith(os.homedir()) || !fs.existsSync(workingDir) || !fs.lstatSync(workingDir).isDirectory()) {
            return res.status(400).json({ success: false, message: 'Invalid working directory.' });
        }

        // Sanitize and validate the command
        command = command.trim();
        if (!validator.isAscii(command)) {
            return res.status(400).json({ success: false, message: 'Invalid command.' });
        }

        if (command.startsWith('cd ')) {
            const targetDir = path.resolve(workingDir, command.slice(3).trim());
            try {
                process.chdir(targetDir);
                workingDir = process.cwd();
                res.json({ success: true, currentDir: workingDir, output: '' });
            } catch (error) {
                res.json({ success: false, currentDir: workingDir, output: `cd: ${error.message}` });
            }
        } else {
            const parsedCommand = shellQuote.parse(command);
            const cmd = parsedCommand[0];
            const args = parsedCommand.slice(1);

            execFile(cmd, args, { cwd: workingDir }, (error, stdout, stderr) => {
                if (error) {
                    res.json({ success: false, currentDir: workingDir, output: stderr || error.message });
                } else {
                    res.json({ success: true, currentDir: workingDir, output: stdout || stderr });
                }
            });
        }
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    return { server, port };
};

module.exports = { startServer };