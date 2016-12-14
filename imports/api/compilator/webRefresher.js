import { __DIR__  } from '../utils/functions';


const http = require("http");
const userId = 'PnAQhSXs2bea4Ls5K';
//test post
var querystring = require('querystring');
var postData = querystring.stringify({
  'port' : '2525',
  'user' : userId
});

var options = {
  hostname: '192.168.33.10',
  port: 80, 
  path: '/webcms/',  
  method: 'POST',   
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}; 

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8'); 
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });  
  res.on('end', () => {
    console.log('No more data in response.');
  });
}); 

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();







