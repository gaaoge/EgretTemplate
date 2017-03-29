/**
 *
 * Created by GG on 2016/08/26
 *
 */

class WidgetContainer extends eui.UILayer {

    private static _instance: WidgetContainer;

    public constructor() {
        if (WidgetContainer._instance) {
            throw new Error("WidgetContainer为单例模式，请使用 WidgetContainer.getInstance()获取实例！");
        }
        super();
    }

    public static getInstance(): WidgetContainer {
        if (this._instance == null) {
            this._instance = new WidgetContainer();
        }
        return this._instance;
    }

    public addChild(child: egret.DisplayObject): egret.DisplayObject {
        super.addChild(child);
        if (!this.parent) {
            egret.MainContext.instance.stage.addChild(this);
        }
        return child;
    }

    public removeChild(child: egret.DisplayObject): egret.DisplayObject {
        super.removeChild(child);
        if (this.numChildren == 0 && this.parent) {
            this.parent.removeChild(this);
        }
        return child;
    }

    public remove(): void {
        this.parent && this.parent.removeChild(this);
    }
}