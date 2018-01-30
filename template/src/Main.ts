/**
 *
 * Created by GG on 2017/10/19
 *
 */

class Main extends eui.UILayer {

    private scaleMode: string;
    private isConfigLoadEnd: boolean = false;
    private isThemeLoadEnd: boolean = false;

    protected createChildren() {
        super.createChildren();

        //舞台适配模式
        this.scaleMode = this.stage.scaleMode;
        this.updateScaleMode();
        window.addEventListener('resize', () => {
            this.updateScaleMode();
        });

        //注入素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        //加载资源配置
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

        //加载主题
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private updateScaleMode(): void {
        if (window.innerWidth < window.innerHeight) {
            this.stage.scaleMode = this.scaleMode;
        } else if (window.orientation === 0 || window.orientation === 180) {
            this.stage.scaleMode = this.scaleMode;
        } else {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    };

    private onConfigComplete(): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        this.isConfigLoadEnd = true;
        this.createScene();
    }

    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }

    private createScene(): void {
        if (!this.isConfigLoadEnd || !this.isThemeLoadEnd) return;

        new Router(this).replace(app.Home);

        if (window['newsappShare']) {
            window['newsappShare'].config({
                title: '分享标题',
                desc: '分享描述',
                imgUrl: 'resource/statics/share-icon.png',
                link: ''
            });
        }
    }
}