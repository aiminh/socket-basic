var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);
var moment = require('moment');



app.use(express.static(__dirname + '/public') );

	var now = moment();

	var momentTimeStamp =  now.valueOf();


io.on('connection', function(socket){
	console.log('User connected via socket.io!');

	socket.on('message', function(message){
		console.log('Messaged received:'+ message.text);
		//console.log('Messaged received:'+ message.timeStamp);

		//socket.broadcast.emit('message', message)   //send to every browser connected to server except myself
		
		message.timeStamp = moment().valueOf();

		io.emit('message', message)   //send to every browser connected to server

	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application!',
		timeStamp: moment().valueOf()
	});

});

http.listen(PORT, function(){
	console.log('Server started');
});
