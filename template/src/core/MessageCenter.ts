/**
 * 通用事件派发器
 * Created by GG on 2016/03/12
 *
 */

class MessageCenter extends egret.EventDispatcher {

    private static _instance: MessageCenter;

    public constructor() {
        if (MessageCenter._instance) {
            throw new Error("MessageCenter为单例模式，请使用 MessageCenter.getInstance()获取实例！");
        }
        super();
    }

    public static getInstance(): MessageCenter {
        if (this._instance == null) {
            this._instance = new MessageCenter();
        }
        return this._instance;
    }

    public sendMessage(message: string, data?: any): void {
        var event = new egret.Event(message);
        event.data = data;
        this.dispatchEvent(event);
    }
}

class Messages {
    public static CHANGE_SCENE = 'change-scene';
}