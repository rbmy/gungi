
function piece(x, y, radius, symbol){
		this.x = x;
		this.y = y;
		this.radius = radius;

		this.symbol = symbol;

		this.image = new layeredCircle([new simpleCircle(x,y,radius), new simpleCircle(x,y, radius * .80)]);
}

piece.prototype.draw = function(context){
	this.image.draw(context);

	context.save();

    context.strokeStyle = 'black';
	context.font = '30px Arial';
	context.fillText(this.symbol,  this.x - 10, this.y + 10 );

	context.restore();
}

piece.prototype.hitTest = function(testX, testY){
	return this.image.hitTest(testX, testY);
}

piece.prototype.setSymbol = function(symbol){
	this.symbol = symbol;
}

piece.prototype.highLight = function(color){
	this.image.highLight(color);
}

piece.prototype.move = function(newX, newY){
	this.x = newX;
	this.y = newY;
	this.image.move(newX, newY);
}