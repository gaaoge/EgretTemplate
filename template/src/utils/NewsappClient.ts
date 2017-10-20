/**
 *
 * Created by GG on 2017/10/19
 *
 */

declare class NewsappClient {

    static isNewsapp: boolean;
    static isAndroid: boolean;
    static isIos: boolean;
    static login(callback?: any): void;
    static userInfo(callback: any): void;
    static device(callback: any): void;
    static share(callback?: any, type?: any): void;
    static encrypt(data: any, callback: any): void;
    static modifyTitle(title: string): void;
    static trashId(callback: any): void;
    static copy(text: string): void;
    static pushView(text: string): void;
    static open(path?: string): void;
    static protocol(action: string): void;
    static Callbacks: any;
}