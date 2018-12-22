(function() {
    var game = window.game = {
        asset = null,
        width = 0,
        height = 0,
        scale = 0,
        init: function() {
            this.asset = new game.asset();
            this.asset.on('complete', function(e) {
                this.asset.off('complete');
                this.initStage();
            }.bind(this));
            this.asset.load();
        },
        initStage: function() {
            this.width = 720;
            this.height = 1280;
            this.scale = 0.5;
            // 舞台
            this.stage = new HTMLDialogElement.Stage({
                width: this.width,
                height: this.height,
                scaleX: this.scale,
                scaleY: this.scale
            })
            document.body.appendChild(this.stage.canvas);
        }
    }
    window.onload = function() {
        game.init();
    }
})()