// 该模块主要是资源的整合和加载
(function(game) {
    var Asset = game.asset = Hilo.Class.create({
        Mixes: Hilo.EventMixin,
        queue: null,
        bg: null,
        ground: null,
        birdAtils: null,
        load: function() {
            var resources = [{
                id: 'bg', src: 'images/bg.png'
            }, {
                id: 'bird', src: 'images/bird.png'
            }, {
                id: 'ground', src: 'images/ground.png'
            }, {
                id: 'holdback', src: 'images/holdback.png'
            }, {
                id: 'icon', src: 'images/icon.jpg'
            }, {
                id: 'number', src: 'images/number.png'
            }, {
                id: 'over', src: 'images/over.png'
            }, {
                id: 'ready', src: 'images/ready.png'
            }]
            this.queue = new Hilo.LoadQueue();
            this.queue.add(resources);
            this.queue.on('complete', this.onComplete.bind(this))
            this.queue.start();
        },
        onComplete: function(e) {
            this.bg = this.queue.get('bg').content;
            this.ground = this.queue.get('ground').content;
            this.birdAtils = new Hilo.TextureAtlas({
                image: this.queue.get('bird').content,
                frames: [
                    [0, 120, 86, 60],
                    [0, 60, 86, 60],
                    [0, 0, 86, 60]
                ],
                sprites: {
                    bird: [0, 1, 2]
                }
            })
            // 删除下载图片的监听
            this.queue.off('complete');
            // 发送complete事件
            this.fire('complete');
        }
    })
})(window.game)