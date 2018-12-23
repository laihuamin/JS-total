(function(game) {
    var OverScene = game.OverScene = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(protypes) {
            OverScene.superclass.constructor.call(this, protypes);
            this.init(protypes);
        },
        init: function(protypes) {
            //Game Over图片文字
            var gameover = this.gameover = new Hilo.Bitmap({
                id: 'gameover',
                image: protypes.image,
                rect: [0, 298, 508, 158]
            });

            //结束面板
            var board = this.board = new Hilo.Bitmap({
                id: 'board',
                image: protypes.image,
                rect: [0, 0, 590, 298]
            });

            //开始按钮
            var startBtn = this.startBtn = new Hilo.Bitmap({
                id: 'start',
                image: protypes.image,
                rect: [590, 0, 290, 176]
            });

            //等级按钮
            var gradeBtn = this.gradeBtn = new Hilo.Bitmap({
                id: 'grade',
                image: protypes.image,
                rect: [590, 176, 290, 176]
            });
            //白色的遮罩效果
            var whiteMask = this.whiteMask = new Hilo.View({
                id: 'mask',
                width: this.width,
                height: this.height,
                alpha: 0
            })
            board.x = this.width - board.width >> 1;
            board.y = this.height - board.height >> 1;
            gameover.x = this.width - gameover.width >> 1;
            gameover.y = board.y - gameover.height - 20;
            startBtn.x = board.x - 5;
            startBtn.y = board.y + board.height + 20 >> 0;
            gradeBtn.x = startBtn.x + startBtn.width + 20 >> 0;
            gradeBtn.y = startBtn.y;
            this.addChild(gameover, board, startBtn, gradeBtn, whiteMask);
        }
    })
})(window.game);