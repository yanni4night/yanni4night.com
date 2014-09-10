##WEB语义化

@2014-09-10

@keywords:semantic,web

####全局属性

#####id

标示符 (用于引用)，不应依赖其语义处理相应元素

#####class

_authors are encouraged to use values that describe the nature of the content_

#####title

 - 链接 - 描述目标信息
 - 图片 - 版权 / 描述
 - 引用 - 来源信息
 - 交互元素 - 操作指南

#####lang

内容的语言

####元数据 (metadata)

#####meta

 - 元数据
 - name 属性决定种类，content 属性表示内容
 - 标准元数据名 (application-name, author, description, generator, keywords)
 - 已注册的扩展元数据名 ([WHATWG Wiki MetaExtensions](http://wiki.whatwg.org/wiki/MetaExtensions))

#####链接（links）

######链接类型

 - 外部资源链接
指向用来组成当前文档的外部资源，通常由 UA 自动处理
 - 超链接
用来「导航」到其他资源 (可以在 UA 中打开, 下载, ...)


######元素：link, a, area

######link

 - 元数据，用来描述文档本身与其他资源的关系
 - 必须包含 rel 及 href 属性

    
    <link rel="author license" href="/about">

link + rel + author, link + rel + license 都有预定义的语义


######link + rel

 - rel="stylesheet" 链接到样式表 (外部资源)
 - rel="alternate" 链接到当前文档的其他形式 (超链接)

    
    <link rel="alternate" type="application/rss+xml" title="Matt Mullenweg » Feed" href="http://ma.tt/feed/" />

 - rel="prev", rel="next" 链接到文档的前一篇 / 后一篇 / 前一页 / 后一页 (超链接) 在生成站点目录、归档视图时很有帮助。
 - rel="icon" 当前文档的 favicon (外部资源)


######a元素

 - 存在 href 属性时为超链接
 - 缺少 href 属性时为链接占位符

    
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/news">News</a></li>
            <li><a>Examples</a></li>
    </ul>
    </nav>

与 link 元素不同，a 元素代表的超链接都是显式的。


######a + rel

 - rel="prev", rel="next" 链接到文档的前一篇 / 后一篇 / 前一页 / 后一页 (超链接)
 - rel="nofollow"

当前文档的作者并不推荐超链接指向的文档 (超链接标注)
由 Google 引入，他们认为适用场景有 (via)：
 1. 不可信赖的内容
 2. 付费链接
 3. 按优先级别进行抓取 (比如通知 Googlebot 不要抓取「注册」或「登陆」页面)

######rel 属性

其他在 HTML 规范中预定义的 rel 属性值及其含义参见 [HTML5 草案中 Link types 一节](http://www.w3.org/html/wg/drafts/html/master/links.html#linkTypes)。


####区块 (sections)

#####section 元素

 - 按主题将内容分组，通常会有标题 (heading)
 - 并非「语义化的 div」

何时使用？

一个简单的评判标准：当你希望这个元素的内容体现在文档的_提纲 (outline)_ 中时，用 section 是合适的。


#####nav 元素

 - _a section with navigation links_

    
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/news">News</a></li>
            <li><a>Examples</a></li>
        </ul>
    </nav>

可以帮助 UA 迅速获得导航内容，例如读屏器可以省去很多渲染直接跳到导航位置。

不一定要包含 ul，也可用自然文本进行导航。

#####article 元素

 + 独立的文档、页面、应用、站点
 + 可以单独发布、重用
 + 可以是...
  - 一篇帖子
  - 一篇报刊文章
  - 一则用户评论
  - 一个可交互的 widget
  - ...

#####aside 元素

 + 表示与周围内容关系不太密切的内容 (eg. 广告)
 + 通常表现为侧边栏内容 (eg. 相关背景内容)、引述内容

#####h1–h6 元素

    
    <body>
        <h1>Let's call it a draw(ing surface)</h1>
        <h2>Diving in</h2>
        <h2>Simple shapes</h2>
    </body>

语义上等价于：

    <body>
      <h1>Let's call it a draw(ing surface)</h1>
      <section>
        <h1>Diving in</h1>
      </section>
      <section>
        <h1>Simple shapes</h1>
      </section>
    </body>

#####hgroup 元素

 - 标题的组合
 - 用于副标题、标语 (tagline) 等

    <hgroup>
      <h1>The Lord of the Rings</h1>
      <h2>The Return of the King</h2>
    </hgroup>
    <hgroup>
      <h1>The Lord of the Rings</h1>
      <h2>"One ring to rule them all."</h2>
    </hgroup>

hgroup 中级别最高的标题才出现在提纲中

#####header 元素

 - 一组介绍性描述或导航信息 (目录 / 搜索框 / logo / ...)
 - 通常包含 h1–h6, hgroup
 - 不影响文档提纲的生成

    <header>
      <p>Welcome to...</p>
      <h1>Voidwars!</h1>
    </header>

#####footer 元素

 - 代表最近的父级区块内容的页脚
 - 作者信息 / 相关文档 / 版权信息
 - 不影响文档提纲的生成

    <footer><!-- site footer -->
      <nav>
        <p>
          <a href="/credits.html">Credits</a> —
          <a href="/tos.html">Terms of Service</a> —
          <a href="/index.html">Blog Index</a>
        </p>
      </nav>
      <p>Copyright © 2009 Gordon Freeman</p>
    </footer>

#####address 元素

代表与最近的父级 article 或 body 关联的联系人信息

    <address>
      <a href="../People/Raggett/">Dave Raggett</a>,
      <a href="../People/Arnaud/">Arnaud Le Hors</a>,
      contact persons for the <a href="Activity">W3C HTML Activity</a>
    </address>

####分组内容 (grouping content)

#####p 元素

 - 「段落」的显式表述
_段落是主题接近的若干句子组成的文本块 (via)_
 -非优先考虑的选择
_例如 address 的内容也是一个段落，但有更准确的语义_

#####hr 元素

 - 原意为「horizontal rule」(水平分隔线)
 - HTML5 中重定义为不同主题内容间的分隔符
 - 区块内容之间不需要用 hr 元素分隔

#####pre 元素

 - 表示已排版的内容
 - 代码片段 / ASCII art / ...

#####blockquote 元素

 - 引用的来自其他来源的内容
 - cite 属性表示该来源的 URL
 - 署名必须放在 blockquote 外

    
    <p>His next piece was the aptly named <cite>Sonnet 130</cite>:</p>
    <blockquote cite="http://quotes.example.org/s/sonnet130.html">
      <p>My mistress' eyes are nothing like the sun,<br>
      Coral is far more red, than her lips red,<br>
      [...]</p>
    </blockquote>

#####ol, ul, li 元素

 - 有序 / 无序列表
 - 改变列表项顺序是否影响表达
 - ol 下 li 元素的 value 属性代表该列表项的序号值

    
    <p>Relegation zone:</p>
    <ol>
        <li value="18">Bolton Wanderers</li>
        <li>Blackburn Rovers</li>
        <li>Wolverhampton Wanderers</li>
    </ol>