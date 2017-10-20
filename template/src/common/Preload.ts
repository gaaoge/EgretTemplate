/**
 *
 * Created by GG on 2017/10/20
 *
 */

module common {
    export class Preload extends Component {

        public groupName: string = 'preload';
        private progress: eui.BitmapLabel;

        public constructor() {
            super();

            if (this.groupName.indexOf('-') != -1) {
                let groupNames = this.groupName.split('-');
                let groupKeys = [];
                groupNames.forEach((name: string) => {
                    var resources = RES.getGroupByName(name);
                    resources.forEach((item: RES.ResourceItem) => {
                        groupKeys.push(item.name);
                    });
                });
                RES.createGroup(this.groupName, groupKeys, true);
            }

            if (RES.getGroupByName(this.groupName).length > 0 && !RES.isGroupLoaded(this.groupName)) {
                this.visible = true;
                this.load();
            } else {
                this.visible = false;
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
        }

        private load(): void {
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.loadGroup(this.groupName);
        }

        private onProgress(e: RES.ResourceEvent): void {
            if (e.groupName == this.groupName) {
                let progress = Math.floor((e.itemsLoaded / e.itemsTotal) * 100);
                this.progress.text = 'loading... ' + progress + "%";
            }
        }

        private onError(e: RES.ResourceEvent): void {
            console.warn("Group:" + e.groupName + " has failed to load");
            this.onComplete(e);
        }

        private onComplete(e: RES.ResourceEvent): void {
            if (e.groupName == this.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);

                this.visible = false;
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
        }
    }
}