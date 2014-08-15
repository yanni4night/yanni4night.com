##NODE 语义化版本解析

@2014-08-15

@keywords:npm,node,semser,语义化版本

`Node Packaged Modules`(NPM) 中使用的版本号系统遵循[语义化版本2.0.0](http://semver.org/lang/zh-CN)：

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

 1. 主版本号：当你做了不兼容的API 修改，
 2. 次版本号：当你做了向下兼容的功能性新增，
 3. 修订号：当你做了向下兼容的问题修正。

NPM中所依赖的其它模块可以指定为特定的版本，也可以指定一个版本号范围，为此 `Node-semver` 引擎提供了一套灵活的语法：



#####>
大于某版本，如 ">0.1.2"

#####<
小于某版本，如 "<0.2.1"

#####>=
大于等于某版本，如 ">=0.1.2"

#####<=
小于等于某版本，如 ">=0.1.2"

#####-
两个版本范围之内，包含边界，如 "0.1.2 - 0.1.9"，相当于 ">=0.1.2" and "<=0.1.9"

#####^
当前版本至下一个主版本，如 "^1.1.2"，相当于 ">=1.1.2" and "<2.0.0"

#####~
当前版本至下一个次版本，如 "^1.1.2"，相当于 ">=1.1.2" and "<1.2.0"

另外，`*`,`x`和空代表任意，下面几个的含义相同：
"1.2.x"，"1.2.*"，"1.2"

选用合适的版本范围选择符，避免依赖模块的小版本升级导致的连锁强迫升级。

######参考

 - <https://github.com/npm/node-semver>
 - <http://semver.org/lang/zh-CN/>