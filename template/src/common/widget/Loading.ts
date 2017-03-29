/**
 *
 * Created by GG on 2016/08/26
 *
 */

module common {
    export class Loading {

        public static priority: number = 0; //全局加载优先级

        private config: any;
        private complete: any;
        private thisObject: any;
        private display: common.LoadingUI;

        public constructor(config: any, complete: any, thisObject: any) {
            this.config = config;
            this.complete = complete;
            this.thisObject = thisObject;
            this.display = new common.LoadingUI();

            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

            this.display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            }, this);
        }

        public start(): void {
            WidgetContainer.getInstance().addChild(this.display);
            RES.loadGroup(this.config.groupName, common.Loading.priority++);
        }

        private onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == this.config.groupName) {
                this.display.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        }

        private onItemLoadError(event: RES.ResourceEvent): void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }

        private onResourceLoadError(event: RES.ResourceEvent): void {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.onResourceLoadComplete(event);
        }

        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (event.groupName == this.config.groupName) {
                WidgetContainer.getInstance().removeChild(this.display);
                this.complete.call(this.thisObject);
            }
        }
    }

    export class LoadingUI extends common.Component {

        private progress: eui.BitmapLabel;

        public setProgress(current, total): void {
            this.progress.text = Math.floor((current / total) * 100) + "%";
        }
    }
}
