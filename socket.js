var server = require('http').Server();

var io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('new ws connection from socket io')
})

server.listen(3000, function(){
    console.log('server is running on port 3000')
})