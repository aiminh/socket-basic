

var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');

});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);


	var momentTimeStamp = moment.utc(message.timeStamp);

	jQuery('.messages').append('<p> <strong>' +  momentTimeStamp.local().format('h:mm a')  +'</strong>:  '  + message.text + '</p>' ) ;  //use . to target by class

});

//handles submitting of new messages

var $form = jQuery('#message-form'); //use $ because : just say its a variable that stores a jQuery instance of an element, meaning this variable has access to all methods that u could access any jQuery element 

$form.on('submit', function(event){
	event.preventDefault(); //no freshing entire page

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});