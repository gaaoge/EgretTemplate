/**
 *
 * Created by GG on 2016/08/11
 *
 */

module common {
    export class Utils {

        //获取url参数
        public static getSearch(name?: string, url?: string): any {
            url = url || location.href;

            var search: any = /\?[^#]*/.exec(url);
            search = (search && search[0]) || '';

            var data = {};
            search.replace(/([^?=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
                data[$1] = decodeURIComponent($3);
                return undefined;
            });
            return name ? data[name] : data;
        }

        //设置url参数
        public static setSearch(name: string, value: string, url?: string): string {
            url = url || location.href;

            var href = url.replace(/(\?|#).*/, '');

            var data: any = this.getSearch(null, url);
            data[name] = value;
            var search = '';
            for (var i in data) {
                search += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
            }
            search = search.replace(/&/, '?');

            var hash: any = /#.*/.exec(url);
            hash = (hash && hash[0]) || '';

            return href + search + hash;
        }

        //格式化时间
        public static formatDate(dateInput: number, format: string) {
            var date = new Date(dateInput);

            var o = {
                "M+": date.getMonth() + 1, //month
                "d+": date.getDate(), //day
                "h+": date.getHours(), //hour
                "m+": date.getMinutes(), //minute
                "s+": date.getSeconds(), //second
                "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                "S": date.getMilliseconds() //millisecond
            };

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }

        //将base64数据转换为blob二进制数据
        public static base64ToBlob(base64: string): Blob {
            var config: any = {};
            base64.replace(/^data:([^;]*);base64,(.*)/, ($0, $1, $2) => {
                config.type = $1;
                config.data = $2;
                return undefined;
            });

            var data = window.atob(config.data);
            var ia = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
            }

            return new Blob([ia], { type: config.type });
        }

        //截取字符串，中文计算为2个字符
        public static subString(str: string, len: number): string {
            var charLength = 0;
            for (var i = 0; i < str.length; i++) {
                var charCode = str.charCodeAt(i);
                if (charCode > 0 && charCode <= 128) {
                    charLength += 1;
                } else {
                    charLength += 2;
                }
                if (charLength >= len) {
                    return str.substr(0, i + 1) + "...";
                }
            }
            return str;
        }

        //克隆对象
        public static clone(object: any): any {
            return JSON.parse(JSON.stringify(object));
        }

        //判断时间范围
        public static betweenDates(startDate: string, endDate: string): boolean {
            var now = Date.now();
            var start = Date.parse(startDate.replace(/-/g, '/'));
            var end = Date.parse(endDate.replace(/-/g, '/'));

            return now >= start && now <= end;
        }

        //从列表中随机选择一部分
        public static randomList(list: any[], count: number): any[] {
            return list.sort(() => {
                return Math.random() > 0.5 ? -1 : 1;
            }).splice(Math.floor(Math.random() * (list.length - count)), count);
        }
    }
}
