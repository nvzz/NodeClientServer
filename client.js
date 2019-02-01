const net = require('net');

let newClient = net.connect(8080, 'localhost', () =>{

    console.log('Enter your name');

    process.stdin.on('data', data => {
        newClient.write(data)
    });

    newClient.on('data', data => {
        process.stdout.write(data);
    });
});