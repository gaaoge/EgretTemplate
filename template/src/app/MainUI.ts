/**
 *
 * Created by GG on 2016/08/01
 *
 */

module app {
    export class MainUI extends common.Component {

        protected createChildren(): void {
            super.createChildren();

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                MessageCenter.getInstance().sendMessage(Messages.CHANGE_SCENE, { sceneClass: app.OtherUI });
            }, this);
        }
    }
}