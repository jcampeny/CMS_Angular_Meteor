const http = require('http');

let server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Download Server\n');
});

server.listen(2525);
