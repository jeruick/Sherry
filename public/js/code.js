var user_error;
var avatar_position;

$(window).load(function() {
	$(".pre-loader").fadeOut("slow");
});

$(document).ready(function() {
	window.io = io.connect();

	io.on('connect', function  (socket) {
		console.log('server are you ready?');
		io.emit('ready?');
	});

	io.on('ready', function (data){
		console.log(data.mensaje);
	});

	io.on('user-exist', function  (data) {
		var controller = false;
		
		if (data)
		{
			if (!data.username)
			{
				$('.username-error').html('');
			}
			else
			{
				$('.username-error').html(data.username);
				controller = true;
			}
			if (!data.email) 
			{
				$('.email-error').html('');
			}
			else
			{
				$('.email-error').html(data.email);
				controller = true;
			}

		}
		else
		{
			$('.username-error').html('');
			$('.email-error').html('');
		}
		user_error = controller;
		
		
	})

	$('#username, #email').on('keyup', function (event) {
		
		var username = $('#username').val();
		var email = $('#email').val();
		io.emit('check-user', {username: username, email: email});
	});


	$('.btn-registrate').click(function(event) {
		$(this).hide();
		$('.btn-login').addClass('float').show();
		$('.login').addClass('ocultar').removeClass('bounce');
		$('.registro').removeClass('ocultar').addClass('bounce');

	});

	$('.btn-login').click(function(){
		$(this).hide();
		$('.btn-registrate').show();
		$('.registro').addClass('ocultar').removeClass('bounce');
		$('.login').removeClass('ocultar').addClass('bounce');

	});

	$('.registro button')
						.on('mouseover',  function(event) {
							event.preventDefault();

							$(this).children('i').removeClass('fa-check');
							$(this).children('i').addClass('fa-check-circle');
						})
						.on('mouseout',  function(event) {
							event.preventDefault();

							$(this).children('i').removeClass('fa-check-circle');
							$(this).children('i').addClass('fa-check');
						})
						.click(function(event) {
							if (user_error)
							{
								event.preventDefault();
							}
							
						});


});
