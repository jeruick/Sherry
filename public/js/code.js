var user_error, sel_avatar = false;
var avatar_position;

$(window).load(function() {
	$(".pre-loader").fadeOut("slow");;
});

$(document).ready(function() {
	window.io = io.connect();

	io.on('connect', function  (socket) {
		console.log('server are you ready?');
		io.emit('ready?');
	});

	io.on('user-exist', function  (data) {
		var controller = false;
		if (data)
		{
			if (!data.nickname)
			{
				$('.nickname-error').html('');
			}
			else
			{
				$('.nickname-error').html(data.nickname);
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
			$('.nickname-error').html('');
			$('.email-error').html('');
		}
		user_error = controller;
		
		
	})

	$('#nickname, #email').on('keyup', function (event) {
		
		var nickname = $('#nickname').val();
		var email = $('#email').val();
		console.log('entre');
		io.emit('check-user', {nickname: nickname, email: email});
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

	$('.avatars li').on('click',function(event) {
		event.preventDefault();
		var self = this;
		$('.avatars li i').each(function(index, el) {
			$(el).removeClass('fa-check-circle');
		});
		$(self).children('i').addClass('fa-check-circle');
		sel_avatar = true;
		avatar_position = $(self).attr('class');
	});

	$('.next').click(function(event) {
		if (!sel_avatar)
		{
			event.preventDefault();
		}
		else
		{
			var id = $('#user-id').val();
			$(location).attr('href', '/avatar-selected/' + avatar_position);
		}
	});

});
