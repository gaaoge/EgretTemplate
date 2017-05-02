/**
 *
 * Created by GG on 2016/09/08
 *
 */

module common {
    export class Share {

        public static show(callback?: any): void {
            if (!NewsappClient.isNewsapp) {
                WidgetContainer.getInstance().addChild(new common.ShareUI());
                NewsappClient.Callbacks.afterShare = [callback];
            } else {
                NewsappClient.share(callback);
            }
        }
    }

    export class ShareUI extends common.Component {

        public constructor() {
            super();
            this.alpha = 0;
        }

        protected createChildren() {
            super.createChildren();

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);

            egret.Tween.get(this)
                .to({ alpha: 1 }, 300, egret.Ease.sineInOut)
                .wait(2000)
                .to({ alpha: 0 }, 300, egret.Ease.sineInOut)
                .call(this.hide, this);
        }

        private hide(): void {
            this.parent && this.parent.removeChild(this);
        }
    }
}