var Game = {
	player1: {
		name: null,
		token: null
	},
	player2: {
		name: null,
		token: null
	},
	currentPlayer: null,
	setup: function(){
		jQuery('.tokens').on('click','div', function(){
			if(!jQuery(this).hasClass('disabled') && !jQuery(this).hasClass('selected')){
				var token = jQuery(this).attr('class');
				jQuery(this).parent().find('.selected').removeClass('selected');
				jQuery(this).addClass('selected');

				if(jQuery(this).parent().data('player') == 1){
					jQuery('.player-2').find('.tokens .disabled').removeClass('disabled');
					jQuery('.player-2').find('.tokens .'+token).addClass('disabled');
				} else {
					jQuery('.player-1').find('.tokens .disabled').removeClass('disabled');
					jQuery('.player-1').find('.tokens .'+token).addClass('disabled');
				}
			}
		});

		jQuery('.enter-game').on('submit', function(e){
			e.preventDefault();
			Game.player1.name = jQuery('.player1-name').val();
			Game.player1.token = jQuery('.player-1 .tokens .selected').data('token');

			Game.player2.name = jQuery('.player2-name').val();
			Game.player2.token = jQuery('.player-2 .tokens .selected').data('token');

			jQuery('.enter-game').fadeOut(function(){
				jQuery(this).remove();
				jQuery('body').html(Game.gameTemplate);
				Game.start();
			});
		});
	},
	start: function() {
		Game.currentPlayer = Game.player1;
		jQuery('.player-name').text(Game.currentPlayer.name);
		jQuery('.game').on('click', '.blank', function() {
			jQuery(this).removeClass('blank').addClass(Game.currentPlayer.token);
			if(Game.checkWin()){
				alert(Game.currentPlayer.name + " ganhou!");
				Game.resetGame();
			} else {
				Game.changeRound();
			}
		})
	},
	changeRound: function() {
		if(jQuery('.blank').length == 0){
			alert('Ninguem ganhou!');
			Game.resetGame();
		} else if(Game.currentPlayer.token == Game.player1.token){
			Game.currentPlayer = Game.player2;
			jQuery('.player-name').text(Game.currentPlayer.name);
		} else if(Game.currentPlayer.token == Game.player2.token){
			Game.currentPlayer = Game.player1;
			jQuery('.player-name').text(Game.currentPlayer.name);
		}
	},
	checkWin: function(){
		if(jQuery('#1').hasClass(Game.currentPlayer.token) &&
			jQuery('#2').hasClass(Game.currentPlayer.token) &&
			jQuery('#3').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na horizontal 1');
			return true;
		} else if(jQuery('#4').hasClass(Game.currentPlayer.token) &&
			jQuery('#5').hasClass(Game.currentPlayer.token) &&
			jQuery('#6').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na horizontal 2');
			return true;
		} else if(jQuery('#7').hasClass(Game.currentPlayer.token) &&
			jQuery('#8').hasClass(Game.currentPlayer.token) &&
			jQuery('#9').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na horizontal 3');
			return true;
		} else if(jQuery('#1').hasClass(Game.currentPlayer.token) &&
			jQuery('#4').hasClass(Game.currentPlayer.token) &&
			jQuery('#7').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na vertical coluna 1');
			return true;
		} else if(jQuery('#2').hasClass(Game.currentPlayer.token) &&
			jQuery('#5').hasClass(Game.currentPlayer.token) &&
			jQuery('#8').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na vertical coluna 2');
			return true;
		} else if(jQuery('#3').hasClass(Game.currentPlayer.token) &&
			jQuery('#6').hasClass(Game.currentPlayer.token) &&
			jQuery('#9').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na vertical coluna 3');
			return true;
		} else if(jQuery('#1').hasClass(Game.currentPlayer.token) &&
			jQuery('#5').hasClass(Game.currentPlayer.token) &&
			jQuery('#9').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na diagonal 1');
			return true;
		} else if(jQuery('#3').hasClass(Game.currentPlayer.token) &&
			jQuery('#5').hasClass(Game.currentPlayer.token) &&
			jQuery('#7').hasClass(Game.currentPlayer.token)){
			//console.log('Ganhou na diagonal 2');
			return true;
		}
	},
	resetGame: function(){
		Game.currentPlayer = Game.player1;
		jQuery('.square').attr('class','square blank');
		jQuery('.player-name').text(Game.currentPlayer.name);
	},
	gameTemplate: ''+
	'<h1>Vez de <span class="player-name"></span></h1>'+
	'<div class="game">'+
		'<div id="1" class="square blank"></div>'+
		'<div id="2" class="square blank"></div>'+
		'<div id="3" class="square blank"></div>'+
		'<div id="4" class="square blank"></div>'+
		'<div id="5" class="square blank"></div>'+
		'<div id="6" class="square blank"></div>'+
		'<div id="7" class="square blank"></div>'+
		'<div id="8" class="square blank"></div>'+
		'<div id="9" class="square blank"></div>'+
	'</div>'
}

Game.setup();