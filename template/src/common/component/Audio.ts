/**
 * 通用音频组件
 * Created by GG on 2017/04/01
 *
 */

module common {
    export class Audio extends eui.Component {

        public src: string = null;
        public autoplay: boolean = false;

        private sound: egret.Sound;
        private soundChannel: egret.SoundChannel;
        private isWeixin: boolean;
        private isPlayed: boolean = false;

        constructor() {
            super();

            this.isWeixin = /micromessenger/ig.test(navigator.userAgent);
            //微信兼容
            if (this.isWeixin && !window['wx']) {
                var script = document.createElement('script');
                script.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
                document.body.appendChild(script);
            }
        }

        protected createChildren(): void {
            super.createChildren();

            this.init();
        }

        private init(): void {
            if (!this.src) return;

            RES.getResAsync(this.src, (sound: egret.Sound) => {
                this.sound = sound;
                this.autoplay && this.play();
            }, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.stop, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.soundChannel ? this.stop() : this.play();
            }, this);
        }


        //播放音频
        public play(): void {
            if (this.sound) {
                if (this.isWeixin && !this.isPlayed) {
                    window['wx'].config({});
                    window['wx'].ready(() => {
                        this.soundChannel = this.sound.play();
                        this.isPlayed = true;
                    });
                } else {
                    this.soundChannel = this.sound.play();
                }
                this.currentState = 'on';
            }
        }

        //停止音频
        public stop(): void {
            if (this.soundChannel) {
                this.soundChannel.stop();
                this.soundChannel = null;
                this.currentState = 'off';
            }
        }
    }
}