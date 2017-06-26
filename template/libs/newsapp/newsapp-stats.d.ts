/**
 *
 * Created by GG on 2017/06/26
 *
 */

declare module NewsappStats {

    function trackView(view: string): void;
    function trackEvent(event: string, view?: string): string;
}
