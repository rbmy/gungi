(function(){
	var app = angular.module('board', []);

	var tileWidth = 0;
	var tileHeight = 0;

	drawTiles = function(ctx, xtiles, ytiles){
		var topX = 0;
		var topY = 0;
		var isWhite = true;

		for(var i=0; i < xtiles; i++){
			for(var j=0; j < ytiles; j++){
				console.log("Drawing: " + topX + ", " + topY + " {" + tileWidth + ", " + tileHeight + "}");
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

	setBoardSize = function(canvas, xtiles, ytiles){
		tileWidth = Math.round($(window).width() * .10);
		tileHeight = Math.round($(window).height() * .15);

		canvas.attr("height", ytiles * tileHeight);
		canvas.attr("width", xtiles * tileWidth);
		console.log("canvas height: " + canvas.attr('height'));
		console.log("canvas width: " + canvas.attr('width'));

	}

	app.directive('myGameBoard',  function(){
		return{
			restrict: "A",
			scope: {
				'gXtiles' : '=',
				'gYtiles' : '='
			},
			link: function(scope, element){
				//we are doing 2d drawing for this board. Get the canvas context
				var canvas = $(element[0]);
				var ctx = element[0].getContext('2d');
				
				canvas.css({
					border: '2px solid black',
					float: 'left',
					margin: '2% 2% 2% 2%'

				});

				//set the canvas size based on the number of tiles
				setBoardSize(canvas, scope.gXtiles, scope.gYtiles);


				$(window).resize(function(){
					setBoardSize(canvas, scope.gXtiles, scope.gYtiles);
					drawTiles(ctx, scope.gXtiles, scope.gYtiles);
				});

				//draw the tiles
				drawTiles(ctx, scope.gXtiles, scope.gYtiles);
			}
		}
	});
})();