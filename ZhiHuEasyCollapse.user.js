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
// @require      http://cdn.staticfile.org/jquery/2.1.1-rc2/jquery.min.js
// @include      http://www.zhihu.com/
// @include      http://www.zhihu.com/explore
// @run-at       document-end
// @grant        GM_log
// ==/UserScript==

(function() {
    function main() {
        function addFloatingCollapseButtons(feeds) {
            feeds.forEach(function(feed) {
                var collapseButton = feed.find('.collapse').eq(0);
                var newButton = collapseButton.clone()
                    .on('click', function() {
                        $('html body').animate({
                            scrollTop: feed.offset().top - 50
                        }, 300, function() {
                            collapseButton.trigger('click');
                        });
                    })
                    .css({
                        position: "relative",
                        marginTop: "1px",
                        marginLeft: "0px"
                    });
                try {
                    feed.find('.zm-votebar').append(newButton);
                } catch (e) {
                    GM_log(e);
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
                    addFloatingCollapseButtons($.makeArray(mutation.addedNodes).map($));
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

        addFloatingCollapseButtons((function() {
            var feeds = [];
            var feedList = $('.feed-item');
            for (var i = 0; i < feedList.length; i++) {
                feeds.push(feedList.eq(i));
            }
            return feeds;
        })());
    }

    // http://skratchdot.com/2013/05/userscripts-and-content-security-policy/
    var injectViaIframe = function(fn) {
        var fnName = 'dynamic_fn_' + (new Date()).getTime(),
            iframe = document.createElement('iframe');
        iframe.onload = function() {
            /* jshint evil: true */
            parent.window[fnName] = new Function('(' + fn.toString() + '());');
            parent.window[fnName]();
            parent.document.body.removeChild(iframe);
        };
        document.body.appendChild(iframe);
    };

    injectViaIframe(main);
})();
