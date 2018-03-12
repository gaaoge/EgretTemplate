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

        //微信兼容
        private isWeixin: boolean = /micromessenger/ig.test(navigator.userAgent);
        private isMiniGame: boolean = /MiniGame/ig.test(navigator.userAgent);
        private isWeixinHandled: boolean = false;

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
                if (this.isWeixin && !this.isMiniGame) {
                    this.weixinHandler(() => {
                        this.soundChannel = this.sound.play(startTime, loops);
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

        private loadScript(url, callback): void {
            let script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                callback && callback.call(this);
                script.parentNode.removeChild(script);
            }
            let target = document.getElementsByTagName('script')[0];
            target.parentNode.insertBefore(script, target);
        }

        private weixinHandler(play: any): void {
            if (!this.isWeixinHandled) {
                let callback = () => {
                    window['wx'].config({
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
                    window['wx'].ready(() => {
                        this.isWeixinHandled = true;
                        play.call(this);
                    });
                }

                if (!window['wx']) {
                    this.loadScript('//res.wx.qq.com/open/js/jweixin-1.3.0.js', callback);
                } else {
                    callback();
                }
            } else {
                play.call(this);
            }
        }
    }
}

window['common']['Audio'] = common.Audio