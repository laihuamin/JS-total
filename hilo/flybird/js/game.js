(function() {
    window.onload = function() {
        game.init();
    }
    var game = window.game = {
        width: 0,
        height: 0,
        scale: 0,
        init: function() {
            this.asset = new game.asset();
            this.asset.on('complete', function(e) {
                this.asset.off('complete');
                this.initStage();
                this.initBackground();
            }.bind(this));
            this.asset.load();
        },
        initStage: function() {
            this.width = 720;
            this.height = 1280;
            this.scale = 0.5;
            // 舞台
            this.stage = new Hilo.Stage({
                width: this.width,
                height: this.height,
                scaleX: this.scale,
                scaleY: this.scale
            })
            document.body.appendChild(this.stage.canvas);
            // 设置定时器
            this.tick = new Hilo.Ticker(60);
            // 将舞台元素加入到定时器队列
            this.tick.addTick(this.stage);
            // 启动定时器
            this.tick.start();

        },
        // 设置游戏背景
        initBackground: function() {
            var bgWidth = this.width * this.scale;
            var bgHeight = this.height * this.scale;
            document.body.insertBefore(Hilo.createElement('div', {
                id: 'bg',
                style: {
                    position: 'absolute',
                    background: 'url(images/bg.png) no-repeat',
                    backgroundSize: bgWidth + 'px, ' + bgHeight + 'px',
                    width: bgWidth + 'px',
                    height: bgHeight + 'px' 
                }
            }), this.stage.canvas)
            this.ground = new Hilo.Bitmap({
                id: 'ground',
                image: this.asset.ground
            })
            this.ground.y = this.height - this.ground.height;
            Hilo.Tween.to(this.ground, {x: -60}, {duration:300, loop:true})
            this.tick.addTick(Hilo.Tween)
        }
    }
})()