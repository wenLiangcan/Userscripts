// ==UserScript==
// @name         PinBoard Notes Filter
// @description  Add a link to your PinBoard notes
// @author       wenLiangcan
// @version      0.2
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3
// @updateURL    http://userscripts.org/scripts/source/399525.user.js
// @downloadURL  http://userscripts.org/scripts/source/399525.user.js
// @include      http://pinboard.in/*
// @include      https://pinboard.in/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    var user = document.getElementsByClassName('banner_username')[0].getAttribute('href')
    var notes = '/from:notes'
    if(document.URL.indexOf(user) != -1 && document.URL.indexOf(notes) == -1) {
        var a = document.getElementsByClassName('rss_linkbox')[0]
        a.insertAdjacentHTML('beforeBegin', '‧  <a href="' + user + notes + '" class="filter ">notes</a>')
    }
})()
