/**
 *
 * Created by GG on 2017/10/19
 *
 */

module common {
    export class Share extends Component {

        public constructor() {
            super();
            this.visible = false;
        }

        protected createChildren() {
            super.createChildren();

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        }

        public show(callback?: any): void {
            if (NewsappClient.isNewsapp) {
                NewsappClient.share(callback);
            } else {
                this.visible = true;
                egret.Tween.get(this)
                    .to({ alpha: 1 }, 300, egret.Ease.sineInOut)
                    .wait(2000)
                    .to({ alpha: 0 }, 300, egret.Ease.sineInOut)
                    .call(this.hide, this);
                NewsappClient.Callbacks.afterShare = [callback];
            }
        }

        public hide(): void {
            this.visible = false;
            egret.Tween.removeTweens(this);
        }
    }
}