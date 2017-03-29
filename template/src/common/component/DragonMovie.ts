/**
 *
 * Created by GG on 2016/11/15
 *
 */

module common {
    export class DragonMovie extends eui.Component {

        private skeData: any;
        private texData: any;

        protected createChildren() {
            super.createChildren();

            RES.getResAsync(this.name + '_ske_dbmv', this.onSkeLoaded, this);
            RES.getResAsync(this.name + '_tex_png', this.onTexLoaded, this);
        }

        private onSkeLoaded(data: any): void {
            this.skeData = data;
            this.createMovie();
        }

        private onTexLoaded(texture: any): void {
            this.texData = texture;
            this.createMovie();
        }

        private createMovie(): void {
            if (!this.skeData || !this.texData) return;

            dragonBones.addMovieGroup(this.skeData, this.texData);
            var movie: dragonBones.Movie = dragonBones.buildMovie(this.name);
            this.addChild(movie);
            movie.play();
        }
    }
}
