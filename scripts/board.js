(function(){
	var board =
		{
			length: 0,
			width: 0
		};

	var app = angular.module('board', []);

	app.controller('boardController', function(){
		
		this.getLength = function(){
			return board.length;
		};

		this.getWidth = function(){
			return board.width;
		};

		this.setLength = function(length){
			board.length = length;
		};

		this.setWidth = function(height){
			board.height = height;
		}
	});
})();