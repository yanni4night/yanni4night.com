##模拟submit、change事件冒泡

@2014-11-29

@keywords:bubble,event,jquery

IE8以下 form 表单的 `submit` 事件、checkbox/radio 的 `change` 都不会冒泡到 `document` 中，[jQuery](http://jquery.com/) 对它们进行了修复，使得在 `document` 上 `delegate` 这些事件得以实现。