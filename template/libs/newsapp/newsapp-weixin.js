;(function (window) {
    window.NewsappWeixin = window.NewsappWeixin || {};
    window.NewsappWeixin.getUserInfo = getUserInfo;

    //可配置选项
    var config = window.NewsappWeixin.config || {};
    var appid = config.appid || 'wx48a26249513fd3a2';
    var product = config.product || 'newsapp_163';

    var isWeixin = /micromessenger/ig.test(navigator.userAgent);
    var username = getCookie('P_OINFO').split('|')[0] || getSearch('username');

    if (isWeixin && !username) {
        weixinOAuth();
    }

    function weixinOAuth() {
        var url = location.href.replace(/(\?|#).*/, '');
        var ursUrl = 'https://reg.163.com/outerLogin/oauth2/weixin_connect.do?product=' + product + '&url=' + encodeURIComponent(url);
        var redirectUri = 'https://c.m.163.com/nc/wechat/oauth/response.html?url=' + encodeURIComponent(ursUrl);

        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(redirectUri)
            + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
    }

    function getUserInfo(callback) {
        if (!isWeixin) {
            callback.call(this);
            return;
        }

        jsonp({
            url: 'https://c.m.163.com/nc/wechat/user/info.html',
            data: {username: username},
            success: function (data) {
                if (data.errcode) {
                    weixinOAuth();
                } else {
                    callback.call(this, data);
                }
            },
            fail: function () {
                callback.call(this);
            }
        });
    }

    //获取url参数
    function getSearch(name, url) {
        url = url || location.href;

        var search = /\?[^#]*/.exec(url);
        search = (search && search[0]) || '';

        var data = {};
        search.replace(/([^?=&]+)(=([^&]*))?/g, function ($0, $1, $2, $3) {
            data[$1] = decodeURIComponent($3);
            return undefined;
        })
        ;
        return name ? data[name] : data;
    }

    //获取cookies
    function getCookie(sKey) {
        var regexp = new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$");
        return decodeURIComponent(document.cookie.replace(regexp, "$1")) || '';
    }

    //jsonp请求
    function jsonp(options) {
        options = options || {};
        if (!options.url) {
            throw new Error("参数不合法");
        }

        options.callback = options.callback || 'callback';
        options.callbackName = options.callbackName || ('jsonp_' + Math.random()).replace(".", "");
        options.data = options.data || {};
        options.data[options.callback] = options.callbackName;

        var oHead = document.getElementsByTagName('head')[0];
        var oScript = document.createElement('script');
        oHead.appendChild(oScript);

        //创建jsonp回调函数
        window[options.callbackName] = function (json) {
            clearTimeout(timer);
            oHead.removeChild(oScript);
            window[options.callbackName] = null;
            options.success && options.success(json);
        };

        //超时处理
        var timer;
        if (options.timeout) {
            timer = setTimeout(function () {
                oHead.removeChild(oScript);
                window[options.callbackName] = null;
                options.fail && options.fail({message: "超时"});
            }, options.timeout);
        }

        //发送请求
        oScript.src = options.url + '?' + formatParams(options.data);

        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                if (data.hasOwnProperty(name)) {
                    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
                }
            }
            return arr.join('&');
        }
    }
}(window));