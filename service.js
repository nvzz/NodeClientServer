'use strict'

const server = require('net').createServer();
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

server.on('connection', socket => {
    console.log('client connected');
    let username = false;
    
    socket.on('data', data => {

        let msg = decoder.write(data).trim();

        if(!username){

            username = msg;

            if(username.toLowerCase() === 'admin'){
                socket.write('Invalid name.\n');
                socket.end();
            } 
            if(username === 'Maria'){
                socket.write('Maria you cannot be here, bye \n');
                socket.end();
            }

            process.stdout.write(`${username} joined\n`);

        } else {
            process.stdout.write(`${username} says: ${msg}\n`);
        }

        if(msg === 'logout'){
            socket.end();
        } 

    });

    socket.on('end', () => {
        //process.stdout.write();
        console.log(`El usuario ${username} se ha desconectado`);
    });
   
});

server.listen(8080, () => {
    console.log(`Server listening on port ${8080}`);
});
