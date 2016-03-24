title: CSSOM View Module
date: 2016-03-24 00:40:22
tags:
    - cssom
    - CSS
---

`CSSOM` 指 _CSS Object Model_，即 _CSS对象模型_。CSSOM 是 JavaScript 操纵 CSS 的一系列 API 集合，它属是 DOM 和 HTML API 的附属。

其中视图模型（View Model）中定义了一系列接口，包括多个关于窗体、文档和元素的位置尺寸信息，特别容易混淆。

## Window 接口

###### innerWidth/innerHeight

浏览器窗口可见区的高宽，包括滚动条。

###### outerWidth/outerHeight

浏览器窗口的外边沿宽高。

###### scrollX/scrollY

文档水平/垂直滚动量。

###### pageXOffset/pageYOffset

同上。

###### screenX/screenY

浏览器左上角距离屏幕左上角的距离。

## Screen 接口

###### availWidth/availHeight

屏幕可用区域的尺寸。

###### width/height

屏幕整体尺寸。

## Element 接口

###### scrollWidth/scrollHeight

元素的实际尺寸，包括不可见部分。

###### clientWidth/clientHeight

不包括滚动条的可见部分。

###### clientTop/clientLeft


###### offsetTop/offsetLeft
###### offsetWidth/offsetHeight