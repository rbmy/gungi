(function(){
	var app = angular.module('board', []);

	var tileWidth = 0;
	var tileHeight = 0;
	var canvas, ctx, xtiles, ytiles, board = [];

	var whitePieces = [], blackPieces = [];

	draw = function(){
		clearBoard();
		drawBoard();
		drawPieces();
	}

	drawPieces = function(){
		pieces.forEach(function(element, index){
			element.draw(ctx);
		});
	}

	drawBoard = function(){
		board.forEach(function(element, index){
			element.draw(ctx);
		});
	}

	setBoardSize = function(){
		tileWidth = Math.round($(window).width() * .08);
		tileHeight = Math.round($(window).height() * .12);

		//canvas.attr("height", 900);
		//canvas.attr("width", 900);
		canvas.attr("height", ytiles * tileHeight);
		canvas.attr("width", xtiles * tileWidth);
		// console.log("canvas height: " + canvas.attr('height'));
		// console.log("canvas width: " + canvas.attr('width'));

		var tileCount = 1, isWhite = true;

		for(var h = 0; h < ytiles; h++){
			for(var l = 0; l < xtiles; l++){
				board[tileCount] = new simpleSquare(tileWidth*l, tileHeight*h, tileWidth, tileHeight);
				if(!isWhite){board[tileCount].setColor('BLACK');}
				isWhite = !isWhite;
				tileCount += 1;
			}
		}

	}

	clearBoard = function(){
		ctx.clearRect(0,0,canvas.attr('width'), canvas.attr('height'));
	}


	app.directive('myGameBoard', function($interval){
		return{
			restrict: "A",
			scope: {
				'gXtiles' : '=',
				'gYtiles' : '=',
			//	'gColored' : '='
			},
			link: function(scope, element){
				//we are doing 2d drawing for this board. Get the canvas context
				canvas = $(element[0]);
				ctx = element[0].getContext('2d');
				xtiles = scope.gXtiles;
				ytiles = scope.gYtiles;
				var selectedPiece;

				canvas.css({
					border: '2px solid black',
					float: 'left',
					margin: '2% 2% 2% 2%'

				});

				//set the canvas size based on the number of tiles
				setBoardSize();

				pieces = [
					new piece(board[1].getCenter().x, board[1].getCenter().y, tileWidth/3, 'P')
				];


				$(window).resize(function(){
					setBoardSize(scope.gXtiles, scope.gYtiles);
					draw();
				});

				canvas.on('$destroy', function(){
					$interval.cancle(gameLoop);
				});

				canvas.on('mousemove', function(event){
					if(selectedPiece){
						selectedPiece.move(event.pageX-this.offsetLeft, event.pageY - this.offsetTop);	
					}
				});

				canvas.on('mousedown', function(event){
					offLeft = this.offsetLeft;
					offTop = this.offsetTop;

					pieces.forEach( function(element, index){
						if(element.hitTest(Math.round(event.pageX-offLeft), Math.round(event.pageY - offTop))){
							selectedPiece = element;
							selectedPiece.highLight('GREEN');
						}
					})
				});

				canvas.on('mouseup', function(event){
					if(selectedPiece){
						board.forEach(function(element, index){
							if(element.hitTest(Math.round(event.pageX-offLeft), Math.round(event.pageY - offTop))){
								selectedPiece.highLight('BLACK');
								selectedPiece.move(element.getCenter().x, element.getCenter().y);
								selectedPiece = null;
							}
						})
					}
				});

				var gameLoop = $interval(function(){
					draw();
				}, 1000/60);
			}
		}
	});
})();