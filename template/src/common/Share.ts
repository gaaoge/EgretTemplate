/**
 *
 * Created by GG on 2017/10/19
 *
 */

module common {
    export class Share extends Component {

        private notice: eui.Image;
        private panel: eui.Group;
        private weiboBtn: eui.Image;
        private qzoneBtn: eui.Image;
        private yixinBtn: eui.Image;
        private closeBtn: eui.Image;

        private isInApp: boolean;

        public constructor() {
            super();
            this.visible = false;
            this.isInApp = /micromessenger|weibo|qq|yixin/ig.test(navigator.userAgent);
        }

        protected createChildren() {
            super.createChildren();

            if (this.isInApp) {
                this.notice.visible = true;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            } else {
                this.panel.visible = true;
                this.weiboBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    window.location.href = NewsappShare.getShareUrl('weibo');
                }, this);
                this.qzoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    window.location.href = NewsappShare.getShareUrl('qzone');
                }, this);
                this.yixinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    window.location.href = NewsappShare.getShareUrl('yixin');
                }, this);
                this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            }
        }

        public show(): void {
            if (NewsappClient.isNewsapp) {
                NewsappClient.share();
                return;
            }

            egret.Tween.get(this)
                .call(() => {
                    this.visible = true;
                    this.alpha = 0;
                })
                .to({ alpha: 1 }, 300, egret.Ease.sineInOut);

            this.isInApp && setTimeout(() => {
                egret.Tween.get(this)
                    .to({ alpha: 0 }, 300, egret.Ease.sineInOut)
                    .call(() => {
                        this.visible = false;
                    })
            }, 2000);
        }

        public hide(): void {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this)
                .to({ alpha: 0 }, 300, egret.Ease.sineInOut)
                .call(() => {
                    this.visible = false;
                })
        }
    }
}