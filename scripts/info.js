(function(){
    var app = angular.module('info', []);

    var canvas, ctx, pane;

    var draw = function(){
        pane.draw(ctx);
    }

    app.directive('infoPane', function($interval){
        return{
            link: function(scope, element){
                    //we are doing 2d drawing for this board. Get the canvas context
                    canvas = $(element[0]);
                    ctx = element[0].getContext('2d');

                    var canvasHeight = $(window).height();
                    var canvasWidth = $(window).width() * .15;

                    var sSqrX = $(window).width() - 500;
                    var sSqrY = 0;

                    //console.log("window height = " + $(window).height());
                    //console.log("window width = " + $(window).width());
                    //console.log("Info Pane Canvas height = " + canvasHeight);
                    //console.log("Info Pane Canvas width = " + canvasWidth);
                    //console.log("Draw X = " + sSqrX);
                    //console.log("Draw Y = " + sSqrY);

                    canvas.attr("height", canvasHeight);
                    canvas.attr("width", canvasWidth);
                                
                    pane = new simpleSquare(sSqrX, sSqrY, 100, 100);

                    canvas.css({
                        border: '2px solid black',
                        float: 'right',
                        margin: '2% 2% 2% 2%'

                    });

                    var gameLoop = $interval(function(){
					draw();
				}, 1000/60);
            }
        }
    });
})();