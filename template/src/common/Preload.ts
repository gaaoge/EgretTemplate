/**
 *
 * Created by GG on 2017/10/20
 *
 */

module common {
    export class Preload extends eui.Component {

        public groupName: string = 'preload';

        private progress: eui.Label;

        protected createChildren() {
            super.createChildren();

            if (this.groupName.indexOf('-') != -1) {
                this.createGroup(this.groupName);
            }

            this.start();
        }

        private createGroup(groupName: string): void {
            let groupKeys = [];
            let groupNames = groupName.split('-');
            groupNames.forEach((name: string) => {
                var resources = RES.getGroupByName(name);
                resources.forEach((item: RES.ResourceItem) => {
                    groupKeys.push(item.name);
                });
            });
            RES.createGroup(groupName, groupKeys, true);
        }

        private start(): void {
            this.currentState = 'loading';
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.loadGroup(this.groupName);
        }

        private onProgress(e: RES.ResourceEvent): void {
            if (e.groupName == this.groupName) {
                let progress = Math.floor((e.itemsLoaded / e.itemsTotal) * 100);
                this.progress && (this.progress.text = progress + "%");
                this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, progress);
            }
        }

        private onError(e: RES.ResourceEvent): void {
            console.warn("Group:" + e.groupName + " has failed to load");
            this.onComplete(e);
        }

        private onComplete(e: RES.ResourceEvent): void {
            if (e.groupName == this.groupName) {
                this.end();
            }
        }

        private end(): void {
            this.currentState = 'loaded';
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            this.dispatchEventWith(egret.Event.COMPLETE);
        }
    }
}

window['common']['Preload'] = common.Preload