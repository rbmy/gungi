(function(){
	var app = angular.module('board', []);

	var tileWidth = 0;
	var tileHeight = 0;
	var canvas, ctx, xtiles, ytiles;

	draw = function(){
		clearBoard();
		drawTiles();
		drawPieces();
	}

	drawPieces = function(){

	}

	drawTiles = function(){
		var topX = 0;
		var topY = 0;
		var isWhite = true;

		for(var i=0; i < xtiles; i++){
			for(var j=0; j < ytiles; j++){
				// console.log("Drawing: " + topX + ", " + topY + " {" + tileWidth + ", " + tileHeight + "}");
				if(isWhite){
					ctx.strokeStyle = 'black';
					ctx.strokeRect(topX, topY, tileWidth, tileHeight);
					ctx.strokeText("white tile", topX + 10, topY + 10);
				}else{
					ctx.strokeStyle = 'white';
					ctx.fillRect(topX, topY, tileWidth, tileHeight);
					ctx.strokeText("black tile", topX + 10, topY + 10);
				}

				topY += tileHeight;
				isWhite = !isWhite;
			}
			topY = 0;
			topX += tileWidth;
		}
	}

	setBoardSize = function(){
		tileWidth = Math.round($(window).width() * .10);
		tileHeight = Math.round($(window).height() * .15);

		canvas.attr("height", ytiles * tileHeight);
		canvas.attr("width", xtiles * tileWidth);
		// console.log("canvas height: " + canvas.attr('height'));
		// console.log("canvas width: " + canvas.attr('width'));

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
				var buttonDown = false;
				
				canvas.css({
					border: '2px solid black',
					float: 'left',
					margin: '2% 2% 2% 2%'

				});

				//set the canvas size based on the number of tiles
				setBoardSize();


				$(window).resize(function(){
					setBoardSize(scope.gXtiles, scope.gYtiles);
					draw();
				});

				canvas.on('$destroy', function(){
					$interval.cancle(gameLoop);
				});

				canvas.on('mousemove', function(event){
					if(buttonDown){
						console.log("x: " + event.pageX + ";y: " + event.pageY);
					}
				});

				canvas.on('mousedown', function(){
					console.log("button down.");
					buttonDown = true;
				});

				canvas.on('mouseup', function(){
					console.log("button up.");
					buttonDown = false;
				});

				var gameLoop = $interval(function(){
					draw();
				}, 1000);
			}
		}
	});
})();