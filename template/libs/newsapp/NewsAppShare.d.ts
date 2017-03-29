/**
 *
 * Created by GG on 2016/05/11
 *
 */

declare module NewsAppShare {

    var shareData: any;
    function update(data: any): void;
    function updateImg(imgUrl: string): void;
    function getAbsPath(url?: string): string;
}
