// var BBCoin = (function () {
    
//     var BBCoin = function (game,x,y) {
//         Phaser.Particle.call(this,game,x,y,'extras');
//         this.animations.add('rotate', Phaser.Animation.generateFrameNames("coinRot.",  1, 23, ".png", 4));
//     };
    
//     BBCoin.prototype = Object.create(Phaser.Particle.prototype);
//     BBCoin.prototype.constructor = CoinParticle;
//     BBCoin.prototype.onEmit = function () {
        
//         this.animations.stop("rotate",true);
//         this.animations.play("rotate",24,true);
//         this.animations.getAnimation('rotate').frame = Math.floor(Math.random() * this.animations.getAnimation('rotate').frameTotal);
//     }
    
//     return BBCoin;
// }());