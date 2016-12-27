import { __DIR__  } from '../utils/functions';
import http from 'http';

function compilateUtils({
        userId,
        hostname,
        port
    }) {
    function refreshExternalWeb(callback){

        //test post
        var querystring = require('querystring');
        var postData = querystring.stringify({
            'port' : port,
            'user' : userId
        });

        var options = {
            hostname,
            port: 80, 
            path: '/webcms/',  
            method: 'POST',   
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        }; 

        var req = http.request(options, (res) => {
            // console.log(`STATUS: ${res.statusCode}`);
            // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8'); 
            res.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`);
            });  
            res.on('end', () => {
            // console.log('No more data in response.');
            callback(200);
            });
        }); 

        req.on('error', (e) => {
            // console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(postData);
        req.end(); 
    }

    function compileToZip(callback){
        var file_system = require('fs');
        var archiver = require('archiver');

        var output = file_system.createWriteStream(__DIR__ + '.compiled_webs/' + userId +'.zip');
        var archive = archiver('zip', {
            store: true // Sets the compression method to STORE. 
        });

        output.on('close', function () {
            const bytes = archive.pointer();
            callback(bytes);
        });

        archive.on('error', function(err){
            throw err;
        });

        archive.pipe(output);
        archive.directory(__DIR__ + '/.compiled_webs/' + userId + '/', '/');
        archive.finalize();
    }

    return {
        refreshExternalWeb,
        compileToZip
    }
}

export default compilateUtils;


