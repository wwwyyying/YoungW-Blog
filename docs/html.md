---
id: html
title: HTML基础
sidebar_label: HTML基础
---

## 1. DOCTYPE 文档类型声明

- <\!DOCTYPE>声明必须放在HTML文档第一行<br/>
- <\!DOCTYPE>声明不是HTML标签

## 2. 网页编码设置
### Q. 当网页显示出现乱码时
在```<head></head>```标签之间添加
```html
<meta http-equiv="Content-Type" content="text/回头ml;charset=utf-8">
```

## 3. 文本和段落标签
- 标题标签：```<h1></h1>```---```<h6></h6```
- 段落标签：```<p></p>```,```<pre></pre>```<br/><br/>
align属性值：left, right, center, justify
- 修饰标签：文字斜体```<i></i>```,```<em></em>```;<br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;加粗```<b></b>```,```<strong></强>```;<br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;下标```<sub></sub>```;<br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;上标```<sup></sup>```

## 4. 列表标签
- 无序列表：```<ul></ul>```,```<li></闪电>```
type属性值：disc圆点，square正方形，circle空心圆
- 有序列表：```<ol></ol>```,```<li></闪电>```
type属性值：1数字，a小写字母，A大写字母，i小写罗马数字，I大写罗马数字
- 定义列表：```<dl></灯笼>```,定义列表项```<dt></dt>```,列表项描述```<dd></dd>```

## 5. 图像标签
```html
<img src="" alt="" />
```
<br />
src alt height width属性等

## 6. 超链接标签
```html
<a href="">内容</a>
```
属性：href target(_self, _blank, _top, _parent) title name

- 站内链接
- 外部链接
- 空链接 href="#"
- 锚链接 name属性
同一页面：#锚名
不同页面：网页名称#锚名
- 电子邮件链接 
```html
<a href="mailto:邮件地址">...</a>
```
- 文件下载
```html
<a href="下载文件的地址">...</a>
```

注：当href为空时，点击超链接会刷新页面

## 7. 表格
- 表格标题：```<caption></caption>```，紧随table标签。
- 表格结构标签：```<thead></thead> <tbody></tbody> <tfoot></tfoot>```
- ```<table></table>```属性：width align border bgcolor cellpadding cellspacing frame(外侧边框) rules(内侧边框)
- ```<tr></tr>```属性：align(left right center justify char) valign(top middle bottom baseline) bgcolor
- ```<th></th><td></td>```属性：align valign bgcolor width height
- ```<thead></thead><tbody></tbody><tfoot></tfoot>```属性：align valign
- 跨行 跨列属性：rowspan colspan

## 8. 表单
- ```<form></form>```标签构成表单元素
- 以下几种表单元素：```<input> <select> <option> <textarea> <optgroup>```
- 单行文本域```<input>```type属性值：text password radio checkbox submit reset button file hidden image; 单选框中name属性值要相同才能保证单选
- ```<select>```属性：name multiple size

### Q. post和get区别
<b>GET:</b> 使用url传递参数，对所发送信息的数量也有限制，一般用于信息获取<br />
<b>POST:</b> 表单数据作为http请求体的一部分，对所发送信息的数量无限制，一般用于修改服务器上的资源

## 9. 搭建网页结构
- ```<div>, <span>```
- 标签嵌套规则：
    （1）块级元素可包含行内元素和某些块级元素；（2）行内元素不能包含块级元素，只能包含其他行内元素；（3）p标签不能包含块级元素（4）特殊块级元素只能包含行内元素，不能再包含块级元素，如：h1-h6, p, dt；（5）块级元素与块级元素并列，行内元素与行内元素并列。
