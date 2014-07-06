(function(){
	var tileWidth = Math.round($(window).width() * .10);
	var tileHeight = Math.round($(window).height() * .15);

	var app = angular.module('board', []);

	drawTiles = function(canvas){
		var topLeft
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
				var height = scope.gYtiles * tileHeight;
				var width = scope.gXtiles * tileWidth;

				//set the canvas size based on the number of tiles
				canvas.attr("height", height);
				canvas.attr("width", width);

				console.log("canvas height: " + canvas.attr('height'));
				console.log("canvas width: " + canvas.attr('width'));

				canvas.css({
					border: '2px solid black',
					float: 'left',
					margin: '10pct 10 10 10'
				});

				//draw the tiles

			}
		}
	});
})();