(function(game) {
    var ReadyScene = game.ReadyScene = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties) {
            ReadyScene.superclass.constructor.call(this, properties);
            this.init(properties);
        },
        init: function(properties) {
            var getReady = new Hilo.Bitmap({
                image: properties.image,
                rect: [0, 0, 508, 158]
            })
            var tap = new Hilo.Bitmap({
                image: properties.image,
                rect: [0, 158, 286, 246]
            })
            // 定位提示
            tap.x = this.width - tap.width >> 1
            tap.y = this.height - tap.height + 40 >> 1
            getReady.x = this.width - getReady.width >> 1
            getReady.y = tap.y - getReady.height >> 0
            this.addChild(tap, getReady)
        }
    })
})(window.game)