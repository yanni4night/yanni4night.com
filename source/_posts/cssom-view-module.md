title: CSSOM View Module
date: 2016-03-24 00:40:22
tags:
    - cssom
    - CSS
---

`CSSOM` 指 _CSS Object Model_，即 _CSS对象模型_。CSSOM 是 JavaScript 操纵 CSS 的一系列 API 集合，它属是 DOM 和 HTML API 的附属。

其中视图模型（View Model）中定义了一系列接口，包括多个关于窗体、文档和元素的位置尺寸信息，特别容易混淆。

## Window 接口

##### innerWidth/innerHeight

浏览器窗口可见区的高宽，包括滚动条。

##### outerWidth/outerHeight

浏览器窗口的外边沿宽高。

##### scrollX/scrollY

文档水平/垂直滚动量。

##### pageXOffset/pageYOffset

同上。

##### screenX/screenY

浏览器左上角距离屏幕左上角的距离。

## Screen 接口

##### availWidth/availHeight

屏幕可用区域的尺寸。

##### width/height

屏幕整体尺寸。

## Element 接口


##### clientWidth/clientHeight

元素本身尺寸，包括 padding，但不包括 border、margin 和 scroll。

##### scrollWidth/scrollHeight

元素的内容区域尺寸，包括隐藏的部分。如果没有隐藏部分，则等于 `clientWidth/clientHeight`。

这一对值与该元素的后代元素相关，不管后代元素是否被隐藏(overflow 或  visibility)。

##### clientTop/clientLeft

元素内容与整个元素的位置偏移，理论上包括边框宽度与滚动条，由于一般滚动条都位于右下侧，因此这一对值基本上就是左侧和顶部边框的值。

##### scrollTop/scrollLeft

滚动条滚动的位移。


## HTMLElement 接口

##### offsetWidth/offsetHeight

元素本身尺寸，包括 padding、border，但不包括 margin 和 scroll。

即：

>offsetWidth = leftBorderWidth + clientWidth + rightBorderWidth
>offsetHeight = leftBorderWidth + clientHeight + rightBorderWidth


##### offsetTop/offsetLeft

元素外边沿(border)与最近一个定位祖先元素外边沿的距离。


------------

## 图例

![Legend](/images/cssom/legend.jpg)

详见[这里](/example/cssom.html)。