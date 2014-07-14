'use strict';

module.exports = {

	createPlayer: function(){
		var player = {
			'name': '',
			'setName': function(name){
				this.name = name;
			}
		};
		return player;
	},

	createBall: function(x, y, vX, vY, radius, color){
		var newBall = {
			'radius': (radius)?(radius):(0), // px
			'color': (color)?(color):(0),
			'pX': (x)?(x):(0),
			'pY': (y)?(y):(0),
			'vX': (vX)?(vX):(0),
			'vY': (vY)?(vY):(0),
			'getPosition': function(){
				return [this.pX, this.pY];
			},
			'setPosition': function(cords){
				this.pX = cords[0];
				this.pY = cords[1];
				return true;
			},
			'getVelocity': function(){
				return [this.vX, this.vY];
			},
			'setVelocity': function(cords){
				this.vX = cords[0];
				this.vY = cords[1];
				return true;
			},
			'move': function(timePassed, maxX, maxY, minX, minY){
				var newpX = this.pX + this.vX*(timePassed/1000);
				var newpY = this.pY + this.vY*(timePassed/1000);

				if(newpX < minX){
					newpX = minX + (minX - newpX);
					this.vX = -this.vX;				
				}
				if(newpX > maxX){
					newpX = maxX - (newpX - maxX);
					this.vX = -this.vX;
				}
				if(newpY < minY){
					newpY = minY + (minY - newpY);
					this.vY = -this.vY;				
				}
				if(newpY > maxY){
					newpY = maxY - (newpY - maxY);
					this.vY = -this.vY;
				}
				this.pX = newpX;
				this.pY = newpY;
				return true;
			}
		};
		return newBall;
	},

	createPadle: function(x, y, vX, vY, width, height, color){
		var newPadle = {
			'width': (width)?(width):(0), // px
			'height': (height)?(height):(0), // px
			'color': (color)?(color):(0),
			'pX': (x)?(x):(0),
			'pY': (y)?(y):(0),
			'vX': (vX)?(vX):(0),
			'vY': (vY)?(vY):(0),
			'getPosition': function(){
				return [this.pX, this.pY];
			},
			'setPosition': function(cords){
				this.pX = cords[0];
				this.pY = cords[1];
				return true;
			},
			'getVelocity': function(){
				return [this.vX, this.vY];
			},
			'setVelocity': function(cords){
				this.vX = cords[0];
				this.vY = cords[1];
				return true;
			},
			'move': function(timePassed, maxX, maxY, minX, minY){
				var newpX = this.pX + this.vX*(timePassed/1000);
				var newpY = this.pY + this.vY*(timePassed/1000);
				this.pX = newpX;
				this.pY = newpY;
				return true;
			}
		};
		return newPadle;
	}


}






