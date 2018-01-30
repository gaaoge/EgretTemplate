/**
 *
 * Created by GG on 2017/10/19
 *
 */

class Router {

    private context: eui.UILayer;

    constructor(context) {
        this.context = context;

        window.addEventListener('popstate', (e: PopStateEvent) => {
            if (!e.state) return;

            this.changeScene(egret.getDefinitionByName(e.state.sceneClassName), e.state.params);
        }, false);
    }

    public push(sceneClass: any, params?: any): void {
        if (window.history) {
            window.history.pushState({
                sceneClassName: egret.getQualifiedClassName(sceneClass),
                params: params
            }, document.title, location.href);
        }
        this.changeScene(sceneClass, params);
    }

    public replace(sceneClass: any, params?: any): void {
        if (window.history) {
            window.history.replaceState({
                sceneClassName: egret.getQualifiedClassName(sceneClass),
                params: params
            }, document.title, location.href);
        }
        this.changeScene(sceneClass, params);
    }

    private changeScene(sceneClass: any, params?: any): void {
        var scene = new sceneClass(params);
        scene.$router = this;
        this.context.removeChildren();
        this.context.addChild(scene);
    }
}