title: 数学方法解释dpr/scale/rem三者的关系
date: 2015-12-30 16:59:04
tags:
    - dpr
    - scale
    - rem
---

开发过移动端页面的同学一定听过 `dpr`、`scale`、`rem` 三个概念。最起码，也会用过 `scale`，如
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

因为如果你不设置这一样，几乎所有的移动端浏览器都会把宽度设置为 `980px`，页面上的文字变得太小而难以阅读。

那么，这三者究竟有着怎样的关系呢？

## 需求

首先从需求讲起。

移动端设备的屏幕尺寸千差万别，即便设计师能够提供每一种尺寸下的UE图，工程师也无法做到针对每种场景的适配。一般地，作为近似，在技术上可以使用媒体查询（media query）的方式将屏幕尺寸划分为几个等级，不同等级下使用不用的CSS样式。

但这显然不够精确，在不同设备上很难做到体验一致，不但代码难以维护，同时存在着被设计师吐槽的风险。

如何在不同的屏幕上完美还原设计图，同时兼顾有限的人力时间？

答案是：
 - 设计师只输出一套基准尺寸的UE图；
 - 通过页面缩放还原UE图的设计比例

因此我们可以看到业界的大致方案是：将 `scale` 设置为 `1/dpr`，`<html>` 的 `font-size` 计算为 `document.documentElement.clientWidth * 10 / dpr`，然后在以 `less` 将UE图上得到的尺寸透明转换为对应的 `rem` 值，由于 `rem` 值都是比例值，因此能做到最终每个元素的尺寸相对于UE图的比例都和UE图一致。

那么，问题是，上面的公式是怎么得到的？

## 分析

我们来用最基本的数据公式推导一下。

设基准UE的图宽为 `ue_w`，`<html>` 的 `font-size` 值为 `ue_fs px`。

在 PSD 上量得一个元素的宽度为 `psd_w px`，等于 `psd_rem`，即：

    psd_rem * ue_fs = psd_w -----------(1)

在一个宽度为 `foo_w` 的设备上，该元素应该给定的宽度为 `x_w px`。

根据 `rem` 单位的意义可知：

    foo_rem * foo_fs / foo_w = psd_rem * ue_fs / ue_w -----------(2)

即：

    foo_rem = psd_rem * (ue_fs / foo_fs) * (foo_w / ue_w) -----------(3)

其中 `psd_rem`、`ue_fs`、`foo_w`、`ue_w` 皆为已知，而 `foo_fs` 可给定一个具体值，相当于已知。

```css
.px2rem(px){
    px * (foo_w) / (foo_fs * ue_w) rem
}
```

例如，以iPhone6的尺寸为基准，即：

    ue_fs=75px（任取值）
    ue_w=375px

一个宽度为屏幕宽度一般的元素，即：

    psd_rem = 375px / 2 / 75px = 2.5rem

在一台 iPhone6 plus 上，则：
    
    foo_w = 414px
    foo_fs = 69px（任取值）

代入(3)，得
    
    foo_rem = 2.5 * (75 / 69) * (414 / 375) = 3rem = 3 * 69px = 414px / 2

刚好也为屏幕的一半。因此，上面的 `LESS` 可以这样写：

```css
.px2rem(px){
    px * 0.016 rem
}
```

可见，实现与UE图等比的效果，只要取一个基准的宽度，一个基准的 `ue_fs`，并任取一个当前设备的 `foo_fs` 就可以了，跟什么 `dpr`、`scale` 根本没关系。

## 事实

如何根据屏幕宽度取一个合适的 `foo_fs` 呢？

再来看上面的(3)式，为了更精确的还原UE图，我们一定希望 `foo_rem` 和 `psd_rem` 都是有限小数，那么：

    (ue_fs / foo_fs) * (foo_w / ue_w)

就也一定是有限小数。分解：

    ue_fs / ue_w 

和

    foo_fs / foo_w

都是有限小数。因此，只要取屏幕宽度的约数做 `foo_fs` 就可以了。

极端地，可以设置:
    
    foo_fs = foo_w
    ue_fs = ue_w

但 `foo_rem` 与 `ue_rem` 数量级差距过大，因此一般选择一个不等于 `foo_w`  和 `ue_w` 的 `foo_fs` 和 `ue_fs`。

我们知道，在设置 `scale`  后，`foo_w` 会变为原来的 `1 / scale` 倍。有了这个思路，我们设置：

    scale = 1 / dpr

而：

    foo_w / dpr

一定是有限小数。于是：

    foo_fs = foo_w * n / dpr

`n` 一定是有限小数。一般地，`n` 取 `1`，`foo_fs` 取值为大于320，仍然过大，除以10，则得：

    foo_fs = foo_w * 0.1 / dpr

在 iPhone6 上，

    foo_fs = 750 * 0.1 / 2 = 37.5px
在 iPhone6 plus 上，

    foo_fs = 1242 * 0.1 / 3 = 41.4px