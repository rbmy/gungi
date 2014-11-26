function simpleCircle(x, y, radius){
	this. x = x;
	this. y = y;
	this.radius = radius;
	this.color = 'WHITE';
	this.highlight = 'BLACK';

	console.log('Circle created at: (' + this.x + ', ' + this.y + ') with radius: ' + this.radius);
}

simpleCircle.prototype.draw = function(ctx){
	ctx.save();

	ctx.fillStyle = this.color;
	ctx.shadowColor = this.highlight;
	ctx.shadowBlur = 20;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	
	
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.restore();
}

simpleCircle.prototype.move = function(newX, newY){
	this.x = newX; this.y = newY;
}

simpleCircle.prototype.setColor = function(color){
	this.color = color;
}

simpleCircle.prototype.hitTest = function(testX, testY){
	var dx = this.x - testX;
	var dy = this.y - testY;

	console.log('location: ' + testX + ', ' + testY);
	console.log('left: ' + (dx*dx + dy*dy)+ ' right: ' + (this.radius*this.radius));
	console.log((dx*dx + dy*dy < this.radius*this.radius));

	return ((dx*dx + dy*dy) < (this.radius*this.radius)); //this comes from the equation of a circle
}

simpleCircle.prototype.highLight = function(color){
	this.highlight = color;
}
/******************************************/

function simpleSquare(topX, topY, width, height){
	this.topX = topX;
	this.topY = topY;
	this.height = height;
	this.width = width;
	this.center = {x: this.topX + this.width/2, y: this.topY + this.height/2};

	this.innerColor = 'WHITE';
	this.lineColor = 'BLACK';
}

 simpleSquare.prototype.draw = function(context){

		context.save();

		context.strokeStyle = this.lineColor;
		context.fillStyle = this.innerColor;
		// console.log('Square: X: ' + this.topX + ', Y:' + this.topY);
		context.fillRect(this.topX, this.topY, this.width, this.height);
		// context.strokeText(Math.round(this.topX+this.width/2) + ',' + 
			// Math.round(this.topY+this.height/2), this.topX + 10, this.topY + 10);
					
		context.restore();
}

simpleSquare.prototype.hitTest = function(testX, testY){
	var withInWidth = testX <= this.topX + this.width && testX >= this.topX;
	var withInHeight = testY <= this.topY + this.height && testY >= this.topY;

	return withInHeight && withInWidth;
}

simpleSquare.prototype.setColor = function(color){
	// console.log('color changed to ' + color);
	this.innerColor = color;
}

simpleSquare.prototype.getCenter = function(){
	return this.center;
}

simpleSquare.prototype.move = function(newX, newY){
	this.topX = newX;
	this.topY = newY;
	this.center = {x: this.topX + this.width/2, y: this.topY + this.height/2};
}

/*****************************************/

function layeredCircle(x, y, radius){
	this.layer = [];
	
	if(Array.isArray(x)){
		this.layer = x;
	}else{
		this.layer.push(new simpleCircle(x,y,radius));
	}

	this.base = this.layer[0];
}

layeredCircle.prototype.countLayers = function(){
	console.log(this.layer.length);
	return this.layer.length;
}

layeredCircle.prototype.addLayer = function(radius){
	this.layer.push(new SimpleCircle(this.x, this.y, radius));
}

layeredCircle.prototype.draw = function(context){
	this.layer.forEach(function(element, index){
		// console.log('Drawing: ' +  element);
		element.draw(context);
	});
}

layeredCircle.prototype.hitTest = function(testX, testY){
	test = false;

	this.layer.some(function(element, index){
		test = element.hitTest(testX, testY);
		return test;
	});

	return test;
}

layeredCircle.prototype.move = function(newX, newY){
	this.layer.forEach(function(element, index){
		element.move(newX, newY);
	});
}

layeredCircle.prototype.highLight = function(color){
	this.base.highLight(color);
}