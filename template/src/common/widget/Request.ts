/**
 *
 * Created by GG on 2016/11/08
 * config配置参数如下：
 * type: 请求类型
 * url: 请求地址
 * params: 请求参数
 * encrypt: 是否加密，若为值"trashId",则额外调用杭研防刷接口
 * hide: 是否隐藏请求loading图标显示
 * complete：请求完成回调函数
 */

module common {
    export class Request {

        public static requestCount = 0; //用于同时进行多个请求时图标的显示处理

        private config: any;
        private thisObject: any;
        private display: common.RequestUI;
        private request: egret.HttpRequest;
        private retryCount: number = 0; //接口请求错误重试次数

        public constructor(config: any, thisObject: any) {
            this.config = config;
            this.thisObject = thisObject;
            this.display = common.RequestUI.getInstance();

            this.request = new egret.HttpRequest();
            this.request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            this.request.responseType = egret.HttpResponseType.TEXT;
            this.request.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
            this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        }

        public send(): void {
            this.addDisplay();

            //测试请求
            if (common.Utils.getSearch('debug')) {
                this.request.open(this.config.url, egret.HttpMethod.GET);
                this.request.send();
                return;
            }

            if (!this.config.encrypt) {
                if (this.config.type == egret.HttpMethod.GET) {
                    this.config.url = common.Utils.setSearch('d', Date.now().toString(), this.config.url);
                } else if (this.config.type == egret.HttpMethod.POST) {
                    this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }

                this.request.open(this.config.url, this.config.type);
                this.request.send(this.config.params);
                return;
            } else if (this.config.encrypt == 'trashId') {
                NewsappClient.trashId((data: any) => {
                    this.config.params = this.config.params || {};
                    this.config.params.deviceId = JSON.stringify(data);
                    this.config.params.deviceType = data.id_ver.replace(/_.*/g, '').toLowerCase();

                    NewsappClient.encrypt(JSON.stringify(this.config.params), (params: string) => {
                        this.request.open(this.config.url, egret.HttpMethod.POST);
                        this.request.send(params);
                    });
                });
            } else {
                NewsappClient.encrypt(JSON.stringify(this.config.params), (params: string) => {
                    this.request.open(this.config.url, egret.HttpMethod.POST);
                    this.request.send(params);
                });
            }
        }

        private onComplete(): void {
            this.removeDisplay();

            var data = JSON.parse(this.request.response);
            this.config.complete.call(this.thisObject, data);
        }

        private onError(): void {
            this.removeDisplay();
            if (this.retryCount < 3) {
                this.retryCount++;
                this.send();
            } else if (!this.config.hide) {
                console.error('网络连接失败');
            }
        }

        private addDisplay() {
            if (this.config.hide) return;

            common.Request.requestCount++;
            if (common.Request.requestCount == 1) {
                WidgetContainer.getInstance().addChild(this.display);
            }
        }

        private removeDisplay() {
            if (this.config.hide) return;

            common.Request.requestCount--;
            if (common.Request.requestCount == 0) {
                WidgetContainer.getInstance().removeChild(this.display);
            }
        }
    }

    export class RequestUI extends common.Component {

        private static _instance: RequestUI;

        private icon: eui.Image;

        public constructor() {
            super();

            var timer = new egret.Timer(80);
            timer.addEventListener(egret.TimerEvent.TIMER, this.animate, this);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                timer.start();
            }, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                timer.stop();
            }, this);
        }

        public static getInstance(): RequestUI {
            if (this._instance == null) {
                this._instance = new RequestUI();
            }
            return this._instance;
        }

        private animate(): void {
            if (!this.icon) return;

            this.icon.rotation += 30;
            if (this.icon.rotation == 360) {
                this.icon.rotation = 0;
            }
        }

    }
}
