// ==UserScript==
// @name         Safari webm viewer for 2ch.hk
// @namespace    safari-webm-viewer-for-2ch.hk
// @version      0.3
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
            target: video.attr("href")
        });
        return vlc;
    }

    function wf2ch_setclickfunction(object){
    	object.click(function(){
            console.log(object.attr('wf2ch'));

            if(object.attr('wf2ch') == 1){
                object.removeAttr("wf2ch");
                return;
            }

        	if(object.attr('wf2ch') === undefined){
                var thumb = object.parent().find('img');
                thumb.hide();

                var vlc = createVLC(object);
                thumb.before(vlc);
                $('#fullscreen-container').hide();

                var closeSpan = $("<span class='collapseWebm'>-[<a>close</a>]</span>");
                var closeLink = $("a", closeSpan);
                thumb.before(closeSpan);
                closeLink.click(function() {
                    closeSpan.remove();
                    vlc.remove();
                    thumb.show();
                    object.attr("wf2ch", 1);
                });

                object.attr("wf2ch", 0);
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
