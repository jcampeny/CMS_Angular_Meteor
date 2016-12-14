import { __DIR__  } from '../utils/functions';

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = 2525;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = __DIR__ + '.compiled_webs/PnAQhSXs2bea4Ls5K/zzz';
  
   
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    } 

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end(); 
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(port);


