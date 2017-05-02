/**
 *
 * Created by GG on 2016/08/01
 *
 */

class Main extends eui.UILayer {

    protected createChildren(): void {
        super.createChildren();

        //舞台适配模式
        if (!egret.Capabilities.isMobile || this.stage.stageHeight / this.stage.stageWidth < 1) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }

        //注入素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        //监听场景切换事件
        MessageCenter.getInstance().addEventListener(Messages.CHANGE_SCENE, this.onChangeScene, this);
        //监听浏览器前进、后退操作事件
        window.addEventListener('popstate', (e: PopStateEvent) => {
            if (e.state) {
                this.changeScene(egret.getDefinitionByName(e.state.sceneClassName), e.state.params);
            }
        }, false);

        this.createScene();
    }

    private onChangeScene(e: egret.Event): void {
        var sceneClassName = egret.getQualifiedClassName(e.data.sceneClass);

        //处理资源预加载
        if (RES.getGroupByName(sceneClassName).length > 0 && !RES.isGroupLoaded(sceneClassName)) {
            new common.Loading({ groupName: sceneClassName }, () => {
                this.changeScene(e.data.sceneClass, e.data.params);
            }, this).start();
        } else {
            this.changeScene(e.data.sceneClass, e.data.params);
        }

        //处理历史堆栈
        if (e.data.isHistoryReplace) {
            history.replaceState({ sceneClassName: sceneClassName, params: e.data.params }, document.title, location.href);
        } else {
            history.pushState({ sceneClassName: sceneClassName, params: e.data.params }, document.title, location.href);
        }
    }

    private changeScene(sceneClass: any, params?: any): void {
        WidgetContainer.getInstance().remove();
        this.removeChildren();
        this.addChild(new sceneClass(params));
    }

    private createScene(): void {
        MessageCenter.getInstance().sendMessage(Messages.CHANGE_SCENE, { sceneClass: app.MainUI, isHistoryReplace: true });
        
        NewsappShare.update({
            title: '',
            desc: '',
            img_url: NewsappShare.getAbsPath('resource/assets/share-icon.png'),
            link: NewsappShare.getAbsPath()
        })
}
}
