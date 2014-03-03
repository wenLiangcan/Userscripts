// ==UserScript==
// @name         PinBoard Notes Filter
// @description  Add a link to your PinBoard notes
// @author       wenLiangcan
// @version      0.3
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
    var user = document.getElementsByClassName('banner_username')[0].getAttribute('href');
    var filters = document.getElementsByClassName('filter');
    if (filters.length !== 0) {
        var lastFilter = filters[filters.length - 1];
        lastFilter.insertAdjacentHTML('afterend', ' ‧  <a href="' + user + '/from:notes " class="filter ">notes</a>');
    }
})()
