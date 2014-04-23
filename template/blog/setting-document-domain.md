##浅谈document.domain

@2014-04-23

在需要主子域跨域技术的应用场景中，父frame和子frame设置相同的domain是一种特别常用的方式，我们可以看见[腾讯](http://www.qq.com)公司的页面中很多都会有一句：

    document.domain = "qq.com";

qq.com域的登录很多都是依赖这种方式实现的登录框iframe刷新父页面窗口的。


事实上，W3C的[DOM 2 HTML标准](http://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/html.html#ID-2250147)将`document.domain`定义为只读的，因为该标准并未关心任何DHTML或任何脚本的内容。但[HTML5 草案](http://www.whatwg.org/specs/web-apps/current-work/multipage/origin-0.html#relaxing-the-same-origin-restriction)有关于对`document.domain`赋值的部分。

在 [Webkit](http://www.webkit.org) 的`Document.idl`源码中有这样的内容：

>#if defined(LANGUAGE_JAVASCRIPT) && LANGUAGE_JAVASCRIPT
>    [TreatNullAs=NullString, SetterRaisesException] attribute DOMString domain;
>#else
>    readonly attribute DOMString domain;
>#endif

这也说明了`domain`可写仅用于脚本设置：即允许主子域脚本进行通信，但仍不允许localStorage、indexedDB和XMLHttpRequest的通信。目前市场上主流浏览器都支持 `domain`可写，可以满足几乎所有主子域脚本通信需求，但也有些许不同。

所有浏览器都不支持设置`domain`为当前域子域或不完整的超域，比如当前域为“abc.google.com”,那么设置`domain`为“www.abc.google.com”或"ogle.com"都是不允许的。





