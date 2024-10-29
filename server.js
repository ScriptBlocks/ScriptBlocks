const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git');
const { execFile } = require('child_process');
const shellQuote = require('shell-quote');
const os = require('os');

const app = express();
const server = http.createServer(app);
const git = simpleGit();

let port = 1024; // Starting port
const findFreePort = (startingPort) => {
    return new Promise((resolve, reject) => {
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

const startServer = async () => {
    port = await findFreePort(port);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/settings-window', (req, res) => {
        res.render('partials/window', {
            filename: 'settings.ejs',
            windowName: 'Settings',
            width: 450,
            height: 500,
            resizable: true
        });
    });

    app.get('/user-home-dir', (req, res) => {
        const homeDir = os.homedir();
        res.json({ homeDir });
    });

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

    app.post('/execute-command', (req, res) => {
        const { command, currentDir } = req.body;
        let workingDir = currentDir === '~' ? process.env.HOME || process.cwd() : currentDir;
    
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