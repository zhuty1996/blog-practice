# 简单的博客系统（基于Node.js和MongoDB）
 目前实现了注册、登录、退出登录、发新帖功能
## 项目结构
```
public 静态公共资源（css、img、js）
views 视图目录（模板引擎）
index.js 项目文件入口
routes 路由相关文件
models 数据模型
```

## 模板页
[art-template 子模板](http://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF)
[art-template 模板继承](http://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF)

## 路由设计
|路径|方法|参数|是否需要登录|用途
|----|----|----|----|----|
| / | GET |----|----|首页|
|/register|GET|----|----|渲染注册页面|
|/register|POST|email、name、password|----|发送注册请求|
|/login|GET|----|----|渲染登录页面|
|/login|POST|email、password|----|发送登录请求|
|/logout|GET|----|是|发送登出请求|