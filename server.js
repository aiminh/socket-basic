var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);
var moment = require('moment');

var clientInfo = {}; //global container to store user name and room

//Sends current users to provided socket
function sendCurrentUsers(socket) {
	var info = clientInfo[socket.id];
	var users = [];

	if (typeof info === "undefined") {
		return;
	}

	Object.keys(clientInfo).forEach(function(socketId) { //object.keys get all the attribute(obj) of the  provided  Obj
		var userInfo = clientInfo[socketId]; //get the attribute(Obj) with the attribute name

		if (info.room === userInfo.room) {
			users.push(userInfo.name);
		}
	});


	socket.emit('message', {
		name: 'System',
		text: 'Current Users: ' + users.join(', '), //join puts all elements of array togeter to form a string
		timeStamp: moment().valueOf()
	});

}



app.use(express.static(__dirname + '/public'));

var now = moment();

var momentTimeStamp = now.valueOf();


io.on('connection', function(socket) { //built-in method

	console.log('User connected via socket.io!');

	socket.on('disconnect', function() { //built-in method

		var userData = clientInfo[socket.id];

		if (typeof userData !== 'undefined') {

			socket.leave(userData.room);

			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timeStamp: moment().valueOf()
			});

			delete clientInfo[socket.id];
		}
	});



	socket.on('joinRoom', function(req) { //req is the obj {name, room} created in joinRoom event in app.js

		clientInfo[socket.id] = req; //socket.id is where socket.io store unique identifier, store info(current user, room) in socket.id, ex: { Ep1vCniyg7If93wsAAAA: { name: '1', room: '2' } }

		socket.join(req.room); //join is built-in method, tells socket.io libaray to add this socket to this room

		socket.broadcast.to(req.room).emit('message', { //send the message obj to browser with this 'room'
			name: 'System',
			text: req.name + ' has joined!',
			timeStamp: moment().valueOf()
		}); //'to' send to specific room

	});

	socket.on('message', function(message) { //when receive event from browser
		console.log('Messaged received:' + message.text);

		if (message.text === "@currentUsers") {
			sendCurrentUsers(socket);
		} else {
			//socket.broadcast.emit('message', message)   //send to every browser connected to server except myself
			message.timeStamp = moment().valueOf();
			//io.emit('message', message) //send to every browser connected to server
			io.to(clientInfo[socket.id].room).emit('message', message); //only send to the browers with the room which current user is in
		}



	});

	socket.emit('message', { //init event and send to browser connected to this server
		name: 'System',
		text: 'Welcome to the chat application!',
		timeStamp: moment().valueOf()
	});

});

http.listen(PORT, function() {
	console.log('Server started');
});