// ==UserScript==
// @name         DoubanX
// @description  Download Douban Movies
// @author       wenLiangcan
// @version      0.1
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3 (http://www.gnu.org/licenses/gpl.txt)
// @copyright    Copyright © 2015 wenLiangcan
// @updateURL
// @downloadURL
// @include      http://movie.douban.com/subject/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
//

(function() {
    var div = document.createElement('div');

    var span = document.createElement('span');
    span.className = 'pl';
    span.textContent = 'DoubanX: ';

    var a = document.createElement('a');
    a.href = document.URL.replace('douban', 'doubanx');
    a.target = '_blank';
    a.text = 'X';

    div.appendChild(span);
    div.appendChild(a);

    var info = document.getElementById('info');
    info.appendChild(div);
})();
