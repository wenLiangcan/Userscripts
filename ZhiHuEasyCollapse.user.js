// ==UserScript==
// @name         Zhihu Easy Collapse
// @description  快捷地收起知乎首页的长答案
// @author       wenLiangcan
// @version      0.1
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3
// @copyright    Copyright © 2015 wenLiangcan
// @updateURL
// @downloadURL
// @include      http://www.zhihu.com/
// @include      http://www.zhihu.com/explore
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    function getLastItem(arr) {
        return arr[arr.length - 1];
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj);
    }

    function addFloatingCollapseButtons(feeds) {
        feeds.forEach(function(feed) {
            var collapseButton = getLastItem(feed.getElementsByClassName('collapse'));
            if (collapseButton !== undefined) {
                var newButton = collapseButton.cloneNode(true);
                newButton.onclick = function() {
                    feed.scrollIntoView(true);
                    collapseButton.click();
                };
                newButton.style.position = 'relative';
                newButton.style.marginTop = '1px';
                newButton.style.marginLeft = '0px';
                try {
                    var votebar = getLastItem(feed.getElementsByClassName('zm-votebar'));
                    votebar.appendChild(newButton);
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }

    function getSelectorsBasedOnUrl() {
        if (/^http:\/\/www\.zhihu\.com\/explore.*?$/.test(document.URL)) {
            return [
                '#js-explore-tab > div:nth-child(4) > div',
                '#js-explore-tab > div:nth-child(5) > div'
            ];
        } else {
            return ['#js-home-feed-list'];
        }
    }

    function observeFeedList(feedList) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                addFloatingCollapseButtons(toArray(mutation.addedNodes));
            });
        });
        var observerConfig = {
            childList: true
        };
        observer.observe(feedList, observerConfig);
    }

    getSelectorsBasedOnUrl().forEach(function(selector) {
        var feedList = document.querySelector(selector);
        observeFeedList(feedList);
    });

    addFloatingCollapseButtons(
        toArray(document.getElementsByClassName('feed-item')));
})();
