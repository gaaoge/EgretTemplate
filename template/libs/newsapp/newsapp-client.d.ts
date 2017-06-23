/**
 *
 * Created by GG on 2016/05/11
 *
 */

declare module NewsappClient {

    var isNewsapp: boolean;
    function protocol(action: string): void;
    function login(callback?: any): void;
    function userInfo(callback: any): void;
    function device(callback: any): void;
    function share(callback?: any, type?: any): void;
    function encrypt(data: any, callback: any): void;
    function modifyTitle(title: string): void;
    function trashId(callback: any): void;
    function copy(text: string): void;
    function pushView(text: string): void;
    function open(path?: string): void;
    var Callbacks: any;
}
