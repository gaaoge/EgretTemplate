/**
 *
 * Created by GG on 2016/11/21
 *
 */

module common {
    export class DragonBones extends eui.Component {

        public name: string = '';
        public armatureName: string = '';
        public animationName: string = '';
        public autoPlay: boolean = true;

        private factory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
        private display: dragonBones.EgretArmatureDisplay;

        protected createChildren() {
            super.createChildren();

            this.parseData();
            this.createDisplay();
        }

        private parseData(): void {
            if(this.factory.getDragonBonesData(this.name)) return;

            let skeJSON = RES.getRes(this.name + '_ske_json');
            this.factory.parseDragonBonesData(skeJSON, this.name);

            for (let i = 0; i < skeJSON.count; i++) {
                let texJSON = RES.getRes(this.name + '_tex_' + i + '_json');
                let texPNG = RES.getRes(this.name + '_tex_' + i + '_png');
                this.factory.parseTextureAtlasData(texJSON, texPNG, this.name);
            }
        }

        private createDisplay(): void {
            this.display = this.factory.buildArmatureDisplay(this.armatureName, this.name);
            this.display.addEventListener(dragonBones.EventObject.START, ()=>{
                this.dispatchEventWith(dragonBones.EventObject.START);
            }, this);
            this.display.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, ()=>{
                this.dispatchEventWith(dragonBones.EventObject.LOOP_COMPLETE);
            }, this);
            this.display.addEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                this.dispatchEventWith(dragonBones.EventObject.COMPLETE);
            }, this);
            this.addChild(this.display);

            this.autoPlay && this.display.animation.play(this.animationName);
        }

        public play(animationName?: string): void {
            this.display && this.display.animation.play(animationName || this.animationName);
        }
    }
}
