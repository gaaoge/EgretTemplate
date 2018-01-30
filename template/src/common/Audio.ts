/**
 * 通用音频组件
 * Created by GG on 2017/04/01
 *
 */

module common {
    export class Audio extends eui.Component {

        public static muted: boolean = false;

        public src: string = null;
        public autoplay: boolean = false;
        public control: boolean = false;
        public delayStop: number = 0;

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

            if (this.control) {
                this.currentState = Audio.muted ? 'off' : 'on';
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    Audio.muted = !Audio.muted;
                    if (Audio.muted) {
                        this.stop();
                        this.currentState = 'off';
                    } else {
                        this.play();
                        this.currentState = 'on';
                    }
                }, this);
            }

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                setTimeout(() => {
                    this.stop();
                }, this.delayStop);
            }, this);

            this.sound = RES.getRes(this.src);
            this.autoplay && this.play();
        }

        //播放音频
        public play(startTime?: number, loops?: number): void {
            if (Audio.muted) return;

            if (this.sound) {
                if (this.isWeixin && !this.isPlayed) {
                    window['wx'].config({});
                    window['wx'].ready(() => {
                        this.soundChannel = this.sound.play(startTime, loops);
                        this.isPlayed = true;
                    });
                } else {
                    this.soundChannel = this.sound.play(startTime, loops);
                }
            }
        }

        //停止音频
        public stop(): void {
            if (this.soundChannel) {
                this.soundChannel.stop();
                this.soundChannel = null;
            }
        }
    }
}

window['common']['Audio'] = common.Audio