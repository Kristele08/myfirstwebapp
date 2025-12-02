const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (req.url === "/") filePath = "./index.html";

    const ext = path.extname(filePath);

    const type = {
        ".html": "text/html",
        ".css": "text/css",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png"
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not found");
        } else {
            res.writeHead(200, { "Content-Type": type[ext] || "text/plain" });
            res.end(data);
        }
    });
});

server.listen(PORT, () => console.log("Server running on " + PORT));
