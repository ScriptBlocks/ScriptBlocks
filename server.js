const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

let port = 5769; // Starting port
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

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.get('/', (req, res) => {
        res.render('index'); // Ensure index.ejs exists in the 'views' folder
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

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    return { server, port };
};

module.exports = { startServer };
