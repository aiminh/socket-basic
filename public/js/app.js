

var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');

});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);
});

//handles submitting of new messages

var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault(); //no freshing entire page

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});