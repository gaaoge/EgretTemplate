/**
 *
 * 通用模态弹窗, 约定唯一子元素，默认半透明黑色背景
 * Created by GG on 2016/11/1
 *
 */

module common {
    export class ModelDialog extends eui.Group {

        public backdropColor: number = 0x000000;
        public backdropAlpha: number = 0.75;
        private backdrop: eui.Rect;
        private dialog: eui.Component;

        constructor() {
            super();
            this.percentWidth = this.percentHeight = 100;
            this.visible = false;
            this.alpha = 0;
        }

        protected createChildren(): void {
            super.createChildren();

            this.backdrop = new eui.Rect();
            this.backdrop.percentWidth = this.backdrop.percentHeight = 100;
            this.backdrop.fillColor = this.backdropColor;
            this.backdrop.fillAlpha = this.backdropAlpha;
            this.backdrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this.addChildAt(this.backdrop, 0);

            this.dialog = <eui.Component>this.getChildAt(1);
            if (isNaN(this.dialog.horizontalCenter)) {
                this.dialog.horizontalCenter = 0;
            }
            if (isNaN(this.dialog.verticalCenter)) {
                this.dialog.verticalCenter = 0;
            }

            var closeBtn = this.dialog.getChildByName && this.dialog.getChildByName('close');
            closeBtn && closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        }

        public show(animate?: egret.tween.TweenGroup): void {
            this.visible = true;
            egret.Tween.get(this)
                .to({ alpha: 1 }, 300, egret.Ease.sineInOut);
            animate && animate.play(0);
        }

        public hide(): void {
            this.visible = false;
            this.alpha = 0;
        }

    }
}