// Simple HTTP server to run the game
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Handle favicon requests
    if (req.url === '/favicon.ico') {
        res.statusCode = 204; // No content
        res.end();
        return;
    }
    
    // Get file path
    let filePath = req.url === '/' 
        ? path.join(__dirname, 'index.html') 
        : path.join(__dirname, req.url);
    
    // Get file extension
    const extname = path.extname(filePath);
    
    // Set content type based on file extension
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404);
                res.end('File not found');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Open your browser and navigate to http://localhost:${PORT}/ to play the game.`);
});
