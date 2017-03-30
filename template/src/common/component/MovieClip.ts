/**
 *
 * 通用MovieClip组件，用于在皮肤里直接添加MoveClip动画
 * Created by GG on 2016/09/05
 *
 */

module common {
    export class MovieClip extends eui.Component {

        public mc: egret.MovieClip;
        public mcName: string = '';
        public playTimes: number = -1;
        public stopFrame: number = 0;
        public autoPlay: boolean = true;

        private mcData: any;
        private mcTexture: any;

        protected createChildren():void {
            super.createChildren();
            RES.getResAsync(this.name + '_json', this.onMCDataLoaded, this);
            RES.getResAsync(this.name + '_png', this.onMCTextureLoaded, this);
        }

        private onMCDataLoaded(data: any): void {
            this.mcData = data;
            this.createMC();
        }

        private onMCTextureLoaded(texture: any): void {
            this.mcTexture = texture;
            this.createMC();
        }

        private createMC(): void {
            if (!this.mcData || !this.mcTexture) return;

            var mcFactory = new egret.MovieClipDataFactory(this.mcData, this.mcTexture);
            this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.mcName));
            this.addChild(this.mc);

            if (this.autoPlay) {
                this.mc.gotoAndPlay(0, this.playTimes);
            } else {
                this.mc.gotoAndStop(this.stopFrame);
            }
        }
    }
}
