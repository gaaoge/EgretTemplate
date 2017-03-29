/**
 *
 * Created by GG on 2016/08/02
 *
 */

module common {
    export class StatisticUtils {

        //统计页面
        public static trackView(view: string): void {
            if (window['neteaseAnalysis']) {
                window['neteaseAnalysis']({
                    type: 'special',
                    spst: 5,
                    modelid: window['_ntes_sps_modelid'],
                    view: view
                });
            }
            if (window['_hmt']) {
                window['_hmt'].push(['_trackPageview', '/nc/qa/activity/' + window['_ntes_sps_modelid'] + '/' + view]);
            }
        }

        //统计事件
        public static trackEvent(event: string, view: string = 'main'): void {
            if (window['neteaseAnalysis']) {
                window['neteaseAnalysis']({
                    type: 'func',
                    spst: 5,
                    modelid: window['_ntes_sps_modelid'],
                    view: view,
                    event: event
                });
            }
            if (window['_hmt']) {
                window['_hmt'].push(['_trackEvent', view, event]);
            }
            if (window['ga']) {
                window['ga']('send', 'event', 'button', 'Click', event);
            }
        }
    }
}