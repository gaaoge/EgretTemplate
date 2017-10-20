/**
 * 
 * 通用组件基类，宽高默认100%，同时设置默认皮肤
 * Created by GG on 2017/10/19
 *
 */

class Component extends eui.Component {

    public $router: Router;

    public constructor() {
        super();
        this.percentWidth = this.percentHeight = 100;
        this.skinName = this.getDefaultSkinName();
    }

    private getDefaultSkinName(): string {
        var className: string = egret.getQualifiedClassName(this);
        return 'resource/skins/' + className.replace('.', '/') + 'Skin.exml';
    }
}
