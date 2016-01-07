title: Webcomponents
date: 2016-01-07 16:44:15
tags:
    - webcomponents
---

`Webcomponents` 草案包含四个特性：

 - [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/)
 - [HTML Imports](http://w3c.github.io/webcomponents/spec/imports/)
 - [Templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
 - [Shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/)

具体每个特性的意义不再冗述，网上到处都有，但对四个特性之间的联系及应用普遍缺少更深入的解释。

## 关联

`Webcomponents` 的名字立即会让人想起组件化，有观点认为 `Custom Elements` 与 `HTML Imports` 是主要部分，`Templates` 与 `Shadow DOM` 是次要部分，毕竟，传统的组件系统就是由组件依赖以及组件内容构成的。甚至有人经常把 `Custom Elements` 与 `HTML Imports` 绑定在一起，认为 `Custom Elements` 都是 _import_ 进来的。

以上观点肯定是错误的，可能由于 `Webcomponents` 还在草案之中，文档不全，造成误解也难怪。

先来看 `Custom Elements`，如何注册一个自定义元素？是这样么：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Demo</title>
        <link rel="import" href="wc-rank.html">
    </head>
    <body>
        <wc-rank></wc-rank>
    </body>
</html>
```

不是，如果是，就证明了 `Custom Elements` 都是 _import_ 进来的观点了。

自定义元素需要通过 JavaScript 脚本来注册：

```javascript
document.registerElement('x-rank', options)
```

使用没有注册过的自定义元素通常也不会有问题，不过它只能代表其后代元素的意义，本身并没有语义。一般地，我们会通过定义 __options__ 参数来扩展 DOM 元素的方法：

```javascript

var RankElement = document.registerElement('x-rank', {
    prototype: {
        next: function () {
        
        }
    }
});

var $fooRank = document.querySelector('#foo-rank');

$fooRank.next();

```

在这种场景下，`registerElement` 就是必须的了。因此,

>在不支持 `Custom Elements` 的浏览器上，polyfill 是不可能完全实现的。

好了，现在我们实现的 `Custom Elements` 已经有了自定义方法，但还可能需要在内部添加一些固定的后代元素，比如，对于一个 Article 来讲，Header，Footer 就是固定的后代元素，而 Summary 则非。这时候，我们一般使用模板引擎，渲染后直接将 HTML 片段插入到 DOM 中进行解析和展现。`Webcomponents` 提供了原生的 _template_ 元素，预先解析了这部分 DOM，但并不展现，需要时，取出其后代元素的集合（DocumentFragment）：

```html
<wc-rank id="rank"></wc-rank>
<template>
    <header>yanni4night.com</header>
    <h1>Hello</h1>
    <footer>&copy;copyright yanni4night.com 2014~2016</footer>
</template>

<script>
    var template = document.querySelector('template');
    console.log(template.content instanceof DocumentFragment) //true
    document.querySelector('#rank').appendChild(template.content);
</script>
```

显然，
>template可以进行 polyfill

如果自定义元素在创建时就已经拥有了固定的后代元素呢，该如何实现？

```html
<wc-rank id="rank">
    <header>yanni4night.com</header>
    <footer>&copy;copyright yanni4night.com 2014~2016</footer>
</wc-rank>
<template>
    <h1>Hello</h1>
</template>

<script>
    var template = document.querySelector('template');
    console.log(template.content instanceof DocumentFragment) //true
    document.querySelector('#rank').insertBefore(template.content, document.querySelector('#rank').lastChild);
</script>
```

可见，template 数量增多后会使操作十分麻烦，`Shadow DOM` 可以解决这个问题：

```html
<wc-rank id="rank">
    <h1>Hello</h1>
</wc-rank>
<template>
    <header>yanni4night.com</header>
    <content select="h1"></content>
    <footer>&copy;copyright yanni4night.com 2014~2016</footer>
</template>

<script>
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  var root = this.createShadowRoot();
  var template = document.querySelector('template');
  var clone = document.importNode(template.content, true);
  root.appendChild(clone);
};
document.registerElement('wc-rank', {
    prototype: proto
});
</script>
```

除了 scope 外，
> Shadow DOM 可以部分 polyfill

这样，便以优雅的方式达到了定义自定义元素以及高效重用的目的。现在，将自定义元素的定义分离出去，维护在单独的文档中，这就是 `HTML Imports` 的用处之一。

```html
<!-- wc-rank.html -->
<template>
    <header>yanni4night.com</header>
    <content select="h1"></content>
    <footer>&copy;copyright yanni4night.com 2014~2016</footer>
</template>

<script>
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  var root = this.createShadowRoot();
  var template = document.querySelector('template');
  var clone = document.importNode(template.content, true);
  root.appendChild(clone);
};
document.registerElement('wc-rank', {
    prototype: proto
});
</script>
```

```html
<!-- index.html -->
<link rel="import" href="wc-rank.html">
<wc-rank>
    <h1>Hello</h1>
</wc-rank>
```
如果将 wc-rank.html 内容注入 index.html，
> HTML Imports 可以 polyfill

如此，四个 `Webcomponents` 的特性全部有了用武之地。它们都可以独立使用，但相互组合，才能实现优雅高效的组件化。

组件化的思路：

```
(语义化)->
Custom Elements 
()-> 
Templates
->
Shadow DOM
->
HTML Imports
```

## Polyfill

 由于目前仅 Chrome（Opera）实现了全部特性，因此 Polyfill 仍有存在的价值。

### Polymer
### X-tag
### Bosonic
### Rosetta
## 参考
 - <http://webcomponents.org/>