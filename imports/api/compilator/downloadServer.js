import { __DIR__  } from '../utils/functions';
import http from 'http';
import fs from 'fs';

class DownloadServer {
    constructor({ port, userId }){
        this.port   = port;
        this.userId = userId;
        this.server = null;
    }

    up(callback){
        console.log('levantando servidor al puerto ' + this.port + ' para el usuario ' + this.userId);

        this.server = http.createServer((request, response) => {
            const filename = __DIR__ + '.compiled_webs/' + this.userId + '.zip';
            
            fs.exists(filename, (exists) => {
                if(!exists) {
                    response.writeHead(404, {"Content-Type": "text/plain"});
                    response.write("404 Not Found\n");
                    response.end();
                    callback('File not found', 404);
                    return;
                } 

                fs.readFile(filename, "binary", (err, file) => {
                    if(err) {        
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write(err + "\n");
                        response.end(); 
                        callback("Can't open the file", 500);
                        return;
                    }
                    response.writeHead(200);
                    response.write(file, "binary");
                    response.end();

                    callback(null, 200);
                });
            });
        }); 

        this.server.listen(this.port);
    }

    close(){
        console.log('descarga realizada por ' + this.userId +', cerrando servidor...');
        this.server.close();
    }
}

export default DownloadServer;








