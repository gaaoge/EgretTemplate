
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/newsapp/newsapp-client.js",
	"libs/newsapp/newsapp-share.js",
	"libs/polyfill/promise.js",
	"bin-debug/common/component/Component.js",
	"bin-debug/common/utils/StatisticUtils.js",
	"bin-debug/common/component/Audio.js",
	"bin-debug/app/MainUI.js",
	"bin-debug/common/component/DragonBones.js",
	"bin-debug/common/component/DragonMovie.js",
	"bin-debug/common/component/MaskGroup.js",
	"bin-debug/common/component/ModelDialog.js",
	"bin-debug/common/component/MovieClip.js",
	"bin-debug/common/component/Swiper.js",
	"bin-debug/app/OtherUI.js",
	"bin-debug/common/utils/Utils.js",
	"bin-debug/common/widget/Loading.js",
	"bin-debug/common/widget/Request.js",
	"bin-debug/common/widget/Share.js",
	"bin-debug/core/AssetAdapter.js",
	"bin-debug/core/MessageCenter.js",
	"bin-debug/core/ThemeAdapter.js",
	"bin-debug/core/WidgetContainer.js",
	"bin-debug/Main.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 750,
		contentHeight: 1206,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};