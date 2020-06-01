---
id: css
title: CSS基础
sidebar_label: CSS基础
---

## 1. CSS使用方法优先级

行内样式>内部样式>外部样式

**注**：

① 链入外部样式表与内部样式表之间的优先级取决于所处位置的先后

② 最后定义的优先级最高（就近原则）

## 2. 样式表中优先级
① 权值相同，就近原则

② 权值不同，哪种CSS样式权值高，就使用哪种样式

**注**

① 选择器权值：
- 通配符选择器：0
- 标签选择器：1
- 类选择器和伪类：10
- ID选择器：100
- 行内样式：1000

② !important声明优先级最高，添加在样式规则之后

## 3. 链接伪类
链接的4种状态：未访问状态（link）、已访问状态（visited）、鼠标悬停状态（hover）和激活状态（active）

链接伪类的顺序：:link>visited>hover>active

**注**

① a:hover必须置于a:link和a:visited之后才有效

② a:active必须置于a:hover之后才有效

③ 伪类名称对大小写不敏感

## 4. 文本样式
- text-align：对块级元素设置有效，设置元素内文本的水平对齐方式
- vertical-align：对行内元素设置有效，设置元素内容的垂直对齐方式

## 5. 盒模型
<img alt='' src={useBaseUrl("img/css/box.PNG")} />

### 外边距属性
- 水平方向上，margin值为auto，实现居中显示效果
- 垂直方向上，两个相邻元素都设置外边距，外边距会发生合并。**合并后**外边距高度=两个发生合并外边距的高度中最大值。

### 盒子模型计算
<img alt='' src={useBaseUrl("img/css/standard.PNG")} />

<img alt='' src={useBaseUrl("img/css/ie.PNG")} />

## 6. 清除浮动
① 在浮动元素后使用一个空元素
```html
<div class="clear"></div>
```
② 给浮动元素的父容器添加 ```overflow:hidden```，使其触发BFC规范

③ 使用CSS3的:after伪元素

```css
:after{
  content:"";
  display:block;
  clear:both;
}
```
④ 父级元素定义height，只适合高度固定的布局

⑤ 父级元素也一起浮动。（不推荐，会产生新的浮动问题）

### 7. 定位
- static:使元素定位于常规流中
- relative:不会离开常规流，它的绝对定位的后代都可以相对于它进行绝对定位
- absolute:使元素脱离常规流，百分比比的是最近定位祖先元素
- fixed:与absolute的区别是相对于谁做绝对定位，fixed不会随着视口滚动而滚动
- sticky：relative和fixed的结合，制造出吸附效果。

### 8. 布局

① 行布局
```css
margin:0 auto;  //上下为0，左右居中
width:100%;   //页面自适应
```

```css
position:absolute;
left:50%;
top:50%;
margin-left:-50%width;
margin-top:-50%height; //垂直水平都居中

```

① 圣杯布局
- 三列布局，中间宽度自适应，两边顶宽
- 中间栏要在浏览器中优先展示渲染
- 核心前提：为middle、left和right设置```positive:relative;float:left;```
- 利用margin-left负值使left和right定位到相应位置上

② 双飞翼布局

去掉相对布局,中间栏增加一层div，只需浮动和负边距

## 9.用CSS画三角形
① 利用渐变，根据三角形方向设置25% 75%的值及渐变角度
② 利用border，当div的width和height设为0时，只设置三个方向border值时，就会出现三角形