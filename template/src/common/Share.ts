/**
 *
 * Created by GG on 2017/10/19
 *
 */

module common {
    export class Share extends Component {

        private notice: eui.Group;
        private panel: eui.Group;
        private weiboBtn: eui.Image;
        private qqBtn: eui.Image;
        private qzoneBtn: eui.Image;
        private yixinBtn: eui.Image;
        private closeBtn: eui.Image;

        public constructor() {
            super();
            this.visible = false;
        }

        protected createChildren() {
            super.createChildren();


            this.notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fadeOut, this);

            this.weiboBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                window.location.href = window['newsappShare'].getShareUrl('weibo');
            }, this);
            this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                window.location.href = window['newsappShare'].getShareUrl('qq');
            }, this);
            this.qzoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                window.location.href = window['newsappShare'].getShareUrl('qzone');
            }, this);
            this.yixinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                window.location.href = window['newsappShare'].getShareUrl('yixin');
            }, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fadeOut, this);
        }

        public show(): void {
            window['newsappShare'].show((isApp) => {
                if (isApp) {
                    this.notice.visible = true;
                    setTimeout(() => {
                        this.fadeOut()
                    }, 2000)
                } else {
                    this.panel.visible = true;
                }
                this.fadeIn()
            })
        }

        private fadeIn(): void {
            this.visible = true;
            this.alpha = 0;
            egret.Tween.get(this, null, null, true)
                .to({ alpha: 1 }, 300, egret.Ease.sineInOut);
        }

        private fadeOut(): void {
            egret.Tween.get(this, null, null, true)
                .to({ alpha: 0 }, 300, egret.Ease.sineInOut)
                .call(() => {
                    this.visible = false;
                })
        }
    }
}