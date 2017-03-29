/**
 *
 * Created by GG on 2016/11/21
 *
 */

module common {
    export class DragonBones extends eui.Component {

        public animation: string = '';

        private skeJSON: any;
        private texJSON: any;
        private texPNG: any;

        protected createChildren() {
            super.createChildren();

            RES.getResAsync(this.name + '_ske_json', this.onSkeLoaded, this);
            RES.getResAsync(this.name + '_tex_json', this.onTexJSONLoaded, this);
            RES.getResAsync(this.name + '_tex_png', this.onTexPNGLoaded, this);
        }

        private onSkeLoaded(data: any): void {
            this.skeJSON = data;
            this.createBones();
        }

        private onTexJSONLoaded(data: any): void {
            this.texJSON = data;
            this.createBones();
        }

        private onTexPNGLoaded(data: any): void {
            this.texPNG = data;
            this.createBones();
        }

        private createBones(): void {
            if (!this.skeJSON || !this.texJSON || !this.texPNG) return;

            var factory = dragonBones.EgretFactory.factory;
            factory.parseDragonBonesData(this.skeJSON, this.name);
            factory.parseTextureAtlasData(this.texJSON, this.texPNG, this.name);

            var display: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay(this.name);
            display.animation.play(this.animation);
            this.addChild(display);
        }
    }
}
