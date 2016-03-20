// var socket = io();

// socket.on('connect', function(){
// 	console.log('connected to socket.io server!');
// 		console.log('2');


// });


// socket.on('message', function(message){
// 	console.log('new message: ');
// 	console.log(message.text);

// });

var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');

});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);
});