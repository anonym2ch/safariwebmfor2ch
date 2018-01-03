// ==UserScript==
// @name         Safari Webm viewer for 2ch.hk
// @namespace    safari-webm-viewer-for-2ch.hk
// @version      0.1
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

    $("a").each(function() {
        var a = "" + $(this).attr("href");
         if (a.includes('.webm')){
             $(this).click(function(){
                 if($(this).attr('href') !== ''){
                     var thumb = $(this).parent().find('img');
                     thumb.hide();
                     var vlc = createVLC($(this));
                     thumb.before(vlc);
                     $(this).attr('href', '');
                     $('#fullscreen-container').hide();
                 }
             });
         }
    });
})();
