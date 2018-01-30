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

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fadeOut, this);
        }

        public show(): void {
            if (window['newsappShare']) {
                window['newsappShare'].show(() => {
                    this.fadeIn();
                    setTimeout(() => {
                        this.fadeOut();
                    }, 2000);
                })
            } else {
                this.fadeIn();
                setTimeout(() => {
                    this.fadeOut();
                }, 2000);
            }
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

window['common']['Share'] = common.Share