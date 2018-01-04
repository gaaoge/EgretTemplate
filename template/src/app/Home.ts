/**
 *
 * Created by GG on 2017/10/19
 *
 */

module app {
    export class Home extends Component {

        public label: eui.Label;
        public share: common.Share;

        protected createChildren() {
            super.createChildren();

            this.label.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                this.share.show();
            } ,this)
        }
    }
}