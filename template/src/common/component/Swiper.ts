/**
 *
 * 通用滑动组件，需要设置slideCount参数，同时横向的设置slideWidth参数，纵向的设置slideHeight参数
 * Created by GG on 2016/08/29
 *
 */

module common {
    export class Swiper extends eui.Scroller {

        public static SLIDE_END = 'slide-end';

        public slideWidth: number = 0;
        public slideHeight: number = 0;
        public slideCount: number = 0;
        public activeIndex: number = 0;
        public autoPlayDuration: number = 0;
        public autoPlaySpeed: number = 500;
        public autoPlayNoEnd: boolean = false;

        private slideAnimation: eui.sys.Animation;
        private startScrollH: number = 0;
        private startScrollV: number = 0;

        public constructor() {
            super();

            this.throwSpeed = 0;  //禁用滑动结束时缓动滚动

            this.addEventListener(eui.UIEvent.CHANGE_START, () => {
                this.startScrollH = this.viewport.scrollH;
                this.startScrollV = this.viewport.scrollV;
            }, this);

            this.addEventListener(eui.UIEvent.CHANGE_END, () => {
                if (this.slideWidth > 0) {
                    var endScrollH = this.viewport.scrollH;
                    var index = Math.floor(endScrollH / this.slideWidth);
                    if (endScrollH - this.startScrollH > 0) {
                        this.slideTo(index + 1, 500);
                    } else {
                        this.slideTo(index, 500);
                    }
                } else if (this.slideHeight > 0) {
                    var endScrollV = this.viewport.scrollV;
                    var index = Math.floor(endScrollV / this.slideHeight);
                    if (endScrollV - this.startScrollV > 0) {
                        this.slideTo(index + 1, 500);
                    } else {
                        this.slideTo(index, 500);
                    }
                }
            }, this);

            //初始化缓动动画
            this.slideAnimation = new eui.sys.Animation((animation: eui.sys.Animation) => {
                if (this.slideWidth > 0) {
                    this.viewport.scrollH = animation.currentValue;
                } else if (this.slideHeight > 0) {
                    this.viewport.scrollV = animation.currentValue;
                }
                this.dispatchEventWith(egret.Event.CHANGE);
            }, this);

            this.slideAnimation.endFunction = (animation: eui.sys.Animation) => {
                if (this.slideWidth > 0) {
                    this.activeIndex = animation.to / this.slideWidth;
                } else if (this.slideHeight > 0) {
                    this.activeIndex = animation.to / this.slideHeight;
                }
                this.dispatchEventWith(common.Swiper.SLIDE_END);
            };

            //连续滑动时取消动画
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                this.slideAnimation.stop();
            }, this);
        }

        protected createChildren(): void {
            //自动播放
            if (this.autoPlayDuration > 0) {
                this.autoPlay();
            }
        }

        public slideTo(index: number, speed?: number) {
            this.slideAnimation.duration = speed || 1; //默认设置为1，保证endFunction只执行一次

            index = Math.max(0, Math.min(index, this.slideCount - 1));
            if (this.slideWidth > 0) {
                this.slideAnimation.from = this.viewport.scrollH;
                this.slideAnimation.to = index * this.slideWidth;
            } else if (this.slideHeight > 0) {
                this.slideAnimation.from = this.viewport.scrollV;
                this.slideAnimation.to = index * this.slideHeight;
            }
            this.slideAnimation.play();
        }

        private autoPlay(): void {
            //自动播放相关
            var timer: egret.Timer = new egret.Timer(this.autoPlayDuration, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, () => {
                var index = this.activeIndex + 1;
                if (index < this.slideCount) {
                    this.slideTo(index, this.autoPlaySpeed);
                } else {
                    this.slideTo(0, this.autoPlayNoEnd ? null : this.autoPlaySpeed);
                }
            }, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                timer.stop();
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, () => {
                timer.stop();
                this.once(common.Swiper.SLIDE_END, () => {
                    timer.start();
                }, this);
            }, this);

            timer.start();
        }
    }
}
