;(function (window) {
  window.NewsappShare = {
    shareData: {
      weibo: '',
      title: '',
      desc: '',
      img_url: '',
      link: ''
    },
    update: function (data, imgMode) {
      for (var i in data) {
        if (this.shareData.hasOwnProperty(i)) {
          this.shareData[i] = data[i]
        }
        if (i === 'img_url') {
          this.shareData[i] = window.NewsappShare.getAbsPath(data[i])
        }
      }

      var html = ''
      html += '<div id="__newsapp_sharetext">' + (this.shareData.weibo || this.shareData.title) + ' ' + this.shareData.link + '</div>'
      html += '<div id="__newsapp_sharephotourl">' + this.shareData.img_url + '</div>'
      html += '<div id="__newsapp_sharewxtitle">' + this.shareData.title + '</div>'
      html += '<div id="__newsapp_sharewxtext">' + this.shareData.desc + '</div>'
      html += '<div id="__newsapp_sharewxthumburl">' + this.shareData.img_url + '</div>'
      if (!imgMode) {
        html += '<div id="__newsapp_sharewxurl">' + this.shareData.link + '</div>'
      }

      document.getElementById('__newsapp_shareconfig').innerHTML = html
    },
    getAbsPath: function (url) {
      if (url) {
        var a = document.createElement('a')
        a.href = url
        return a.href
      } else {
        return window.location.href.replace(/(\?|#).*/, '')
      }
    },
    updateShareLink (url) {
      if (window.NTESAntAnalysis) {
        window.NewsappShare.update({
          link: window.NTESAntAnalysis.getShareLink(window.NewsappShare.getAbsPath(url))
        })
      } else {
        window.NewsappShare.update({
          link: window.NewsappShare.getAbsPath(url)
        })
        window.addEventListener('NTMReady', () => {
          window.NewsappShare.update({
            link: window.NTESAntAnalysis.getShareLink(window.NewsappShare.getAbsPath(url))
          })
        })
      }
    }
  }

  // 微信分享设置
  document.addEventListener('WeixinJSBridgeReady', function () {
    window.WeixinJSBridge.on('menu:share:timeline', function () {
      window.WeixinJSBridge.invoke('shareTimeline', window.NewsappShare.shareData, function () {
        window.__newsapp_share_done()
      })
    })
    window.WeixinJSBridge.on('menu:share:appmessage', function () {
      window.WeixinJSBridge.invoke('sendAppMessage', window.NewsappShare.shareData, function () {
        window.__newsapp_share_done()
      })
    })
  }, false)
})(window)
