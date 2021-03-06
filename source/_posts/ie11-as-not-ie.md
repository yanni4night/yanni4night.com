title: 不是IE的IE11
date: 2014-05-02
tags:
    - IE
    - Internet-Explorer
    - Microsoft
    - userAgent
    - ActiveXobject
    - Trident
    - cors
    - spdy
    - flex
    - document.all
---

`Internet Explorer 11`(IE11) 自去年六月份发布以来虽然据说也取得了不错的成绩，但在中国好像还看不到其占有率。获取 IE11 可以从两种方式：安装 `Win8`，自带 IE11；从 `Win7` 的 IE9/10 升级，但 `XP` 在中国仍然有超过[60%](http://tongji.baidu.com/data/browser)的占有率，而 `XP` 最高也只能升级到 `IE8`。

前端测试仍在徘徊在 IE6 ~ IE10 之间，但在开发过程中偶然间发现了 IE11 与众 IE 不同之处。

前端开发一直将浏览器分为 W3C 和 IE 两种，特别是将 IE 众版本当做异类对待。微软这次决定洗心革面，将 IE11 打造成一款不是 ‘IE’ 的浏览器，拥有与其它 ‘W3C’ 浏览器一样的特性。


###### 重要变动

IE11 支持了完整的 `flex` 能力（参见[利用flexbox构建可伸缩布局](/blog/flexbox-layout.html)），于 Firefox 之后第二个拥有无前缀 CSS 属性名。

支持了 [SPDY](www.chromium.org/spdy‎) 协议。

`ActiveXObject` 对象不再存在了，这使得许多依靠检测该对象来嗅探浏览器类型的代码失效。

同样，`document.all` 的布尔值也会返回 false 。许多浏览器拥有该对象但是在转成布尔值时故意返回 false 用以兼容之前无数使用该对象判断浏览器类型的代码。现在，只有 IE6~9 会返回 true。

UA中一直存在的 `MSIE` 被删除，依赖于此获取浏览器类型和版本号的代码将失效。要判断其类型和版本，必须 `MSIE` 和 `Trident` 共用了。

移除了 `attachEvent` ，以 `addEventListener` 取代之，这也会破坏使用该方法判断浏览器类型的代码。

IE8 引入的 [XDomainRequest](http://msdn.microsoft.com/en-us/library/ie/cc288060.aspx) 被删除，取而代之的是支持跨域资源共享（[CORS](http://www.w3.org/TR/cors/)）的 `XMLHttpRequest`。


###### 总结

显然 IE11 的改进破坏了几乎所有用于区分 `W3C` 和 `IE` 浏览器的方法，使得无数现存代码无法取得其是 IE 浏览器的事实。或许这就是微软的目的：IE11 不再是 ‘IE’ 了，你不需要在判断出来它了。

下面给出使用 UA 获取 IE 版本的代码：
    
    /**
     * Get version if it's a microsoft internet explorer.
     *
     * @return version code or else null if it's not a IE.
     */
    function getIEVersion(){
        var ua = navigator.userAgent matches tridentMap={'4':8 '5':9 '6':10 '7':11};
        
        matches = ua.match(/MSIE (\d+)/i);

        if(matches&&matches[1])
        {   
            //find by msie
            return +matches[1];
        }

        matches = ua.match(/Trident\/(\d+)/i);
        if(matches&&matches[1])
        {   
            //find by trident
            return tridentMap[matches[1]]||null;
        }
        
        //we did what we could
        return null;
    }

 由于 UA 可以随意伪造，所以并没有合适的方法能够保证检测出真正的浏览器环境，因此代码都不应依赖于具体的环境和版本。

###### 参考

 - <http://msdn.microsoft.com/en-us/library/ie/bg182625(v=vs.85).aspx>