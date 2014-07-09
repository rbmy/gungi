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
		var pieces = {28: 'P', 29: 'P',30: 'P',31: 'P',32: 'P',33: 'P',34: 'P',35: 'P',36: 'P'};

		drawPiece(2, 'P');
		// $.each(pieces, function(key, value){
		// 	drawPiece(key, value);
		// });
	}

	drawPiece = function(tile, name){
		//the board is numbered from 1 to 
		var offset = 10;
		var origin = {x: tileWidth/2, y: tileHeight/2};

		var center;
		if(tile == 1){ center = origin;}
		else{center = {x: origin.x + (tileWidth * (tile-1)), y: origin.y + (tileHeight * (tile-1))}};
		drawCircle(center.x , center.y , tileWidth/3, "white");
		drawCircle(center.x , center.y , tileWidth/3 * .80, "white");

		ctx.save();
		ctx.strokeStyle = 'black';
		ctx.font = '30px Arial'
		ctx.strokeText(name, center.x - offset, center.y + offset );
		ctx.restore();
	}

	drawTiles = function(){
		var topX = 0;
		var topY = 0;
		var isWhite = true;

		ctx.save();

		ctx.font= '12px Arial';
		for(var i=0; i < xtiles; i++){
			counter = i + 1;
			for(var j=0; j < ytiles; j++){
				// console.log("Drawing: " + topX + ", " + topY + " {" + tileWidth + ", " + tileHeight + "}");
				if(isWhite){
					ctx.strokeStyle = 'black';
					ctx.strokeRect(topX, topY, tileWidth, tileHeight);
					ctx.strokeText(topX+tileWidth/2 + ',' + Math.round(topY+tileHeight/2), topX + 10, topY + 10);
					
				}else{
					ctx.strokeStyle = 'white';
					ctx.fillRect(topX, topY, tileWidth, tileHeight);
					ctx.strokeText(topX+tileWidth/2 + ',' + Math.round(topY+tileHeight/2), topX + 10, topY + 10);
					
				}

				topY += tileHeight;
				isWhite = !isWhite;
			}
			topY = 0;
			topX += tileWidth;
		}

		ctx.restore();
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

	drawCircle = function(x, y, radius, color){
		ctx.save();

		
		ctx.fillStyle = color;
		ctx.shadowColor = 'black';
		ctx.shadowBlur = 20;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		
		
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		ctx.restore();
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