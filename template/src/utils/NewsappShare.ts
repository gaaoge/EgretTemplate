/**
 *
 * Created by GG on 2017/10/19
 *
 */

declare class NewsappShare {

    static shareData: any;
    static update(data: any, onlyImg?: boolean): void;
    static getAbsPath(url?: string): string;
    static updateShareLink(url?: string): string;
}