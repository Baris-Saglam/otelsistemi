const http = require('http');
const fs = require('fs');
const path = require('path');

// Railway'in atadığı portu al, yoksa 3000'i kullan
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // index.html dosyasını oku ve gönder
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Sunucu Hatası: index.html bulunamadı.');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Sayfa Bulunamadı');
    }
});

server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});