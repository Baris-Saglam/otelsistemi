const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Railway'in atadığı portu al, yoksa 3000'i kullan
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Ana sayfa
    if (pathname === '/' || pathname === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Sunucu Hatası: index.html bulunamadı.');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    }
    // Robots.txt
    else if (pathname === '/robots.txt') {
        fs.readFile(path.join(__dirname, 'robots.txt'), (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('Dosya bulunamadı');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(content);
            }
        });
    }
    // Sitemap.xml
    else if (pathname === '/sitemap.xml') {
        fs.readFile(path.join(__dirname, 'sitemap.xml'), (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('Dosya bulunamadı');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/xml' });
                res.end(content);
            }
        });
    }
    // Diğer dosyalar için 404
    else {
        res.writeHead(404);
        res.end('Sayfa Bulunamadı');
    }
});

server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
    console.log(`Ana sayfa: http://localhost:${PORT}`);
    console.log(`SEO dosyaları: http://localhost:${PORT}/robots.txt, http://localhost:${PORT}/sitemap.xml`);
});