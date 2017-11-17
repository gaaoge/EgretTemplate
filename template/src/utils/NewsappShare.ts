/**
 *
 * Created by GG on 2017/10/19
 *
 */

declare class NewsappShare {

    static shareData: any;
    static update(data: any): void;
    static updateImg(imgUrl: string): void;
    static getAbsPath(url?: string): string;
    static getshareLink(url?: string): string;
}