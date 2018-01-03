// ==UserScript==
// @name         Safari Webm viewer for 2ch.hk
// @namespace    safari-webm-viewer-for-2ch.hk
// @version      0.2
// @description  Thanks for the idea to https://github.com/C9HDN
// @author       Anonym
// @match        https://2ch.hk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createVLC(video) {
        var vlc = $('<embed loop="true">');
        vlc.attr({
            type: "application/x-vlc-plugin",
            pluginspage: "http://www.videolan.org",
            width: "640",
            height: "360",
            target: video.attr("href"),
        });
        return vlc;
    }

    function wf2ch_setclickfunction(object){
    	object.click(function(){
        	if(object.attr('href') !== ''){
                var thumb = object.parent().find('img');
                thumb.hide();
                var vlc = createVLC(object);
                thumb.before(vlc);
                object.attr('href', '');
                $('#fullscreen-container').hide();
            }
        });	
    }

    $('a[href$=".webm"]').each(function() {
    	wf2ch_setclickfunction($(this));	    
    });

    $('a[href$=".mp4"]').each(function() {
    	wf2ch_setclickfunction($(this));	    
    });
})();
