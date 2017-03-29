/**
 *
 * 通用遮罩Group, 约定第一个子元素为遮罩，第二个子元素为原始显示对象
 * Created by GG on 2016/11/1
 *
 */

module common {
    export class MaskGroup extends eui.Group {

        protected createChildren(): void {
            super.createChildren();

            var mask = <eui.Component>this.getChildAt(0);
            var origin = <eui.Component>this.getChildAt(1);

            if (mask && origin) {
                origin.mask = mask;
                origin.horizontalCenter = origin.verticalCenter = 0;
            }

            mask.addEventListener(eui.UIEvent.COMPLETE, () => {
                this.width = mask.width;
                this.height = mask.height;
            }, this);

            origin.addEventListener(eui.UIEvent.COMPLETE, () => {
                var scaleW = this.width / origin.width;
                var scaleH = this.height / origin.height;
                origin.scaleX = origin.scaleY = Math.max(scaleW, scaleH);
            }, this);
        }
    }
}