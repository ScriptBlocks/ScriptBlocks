const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git');

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

    app.use

(express.json());
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

    app.post('/create-project', async (req, res) => {
        const { projectName, folderPath } = req.body;

        if (!projectName || !folderPath) {
            return res.status(400).json({ success: false, message: 'Missing project name or folder path.' });
        }

        const targetPath = path.join(folderPath, projectName);

        try {
            // Clone the repository to the target path
            await git.clone('https://github.com/ScriptBlocks/example-project.git', targetPath);
            res.json({ success: true });
        } catch (error) {
            console.error('Git clone error:', error);
            res.status(500).json({ success: false, message: 'Failed to create project.' });
        }
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    return { server, port };
};

module.exports = { startServer };