var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'NOT SET';

console.log(name + ' wants to join ' + room);

//update h1 tag
jQuery('.room-title').text(room);

var socket = io();

socket.on('connect', function() {  
	console.log('Conncted to socket.io server!');

	socket.emit('joinRoom', {  //init an event, send to server with obj of my name and room name
		name:name,
		room:room
	});
});

socket.on('message', function(message) {  //when receive event from server, message is obj created in server.js

	// console.log('New message:');
	// console.log(message.text);


	var momentTimeStamp = moment.utc(message.timeStamp);

	var $messages = jQuery('.messages'); //$ means it is jQuery selector 
	var $message = jQuery('<li class="list-group-item"></li>');


	$message.append('<p><strong>' + message.name + ' ' + momentTimeStamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>'); //add <p></p> inside <li></li>

	$messages.append($message); //add <li>..</li> inside <ul>..</ul>
});

//handles submitting of new messages

var $form = jQuery('#message-form'); //use $ because : just say its a variable that stores a jQuery instance of an element, meaning this variable has access to all methods that u could access any jQuery element 

$form.on('submit', function(event) {
	event.preventDefault(); //no freshing entire page

	var $message = $form.find('input[name=message]');

	socket.emit('message', {  //init event, and send to server
		name: name,
		text: $message.val()
	});

	$message.val('');
});