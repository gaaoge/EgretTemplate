/**
 *
 * Created by GG on 2017/10/19
 *
 */

declare class NewsappStats {

    static trackView(view: string): void;
    static trackEvent(event: string, action?: string): string;
}