---
id: string
title: 详解JavaScript中字符串API
sidebar_label: 字符串
---

## String构造器方法

##### fromCharCode
fromCharCode() 方法返回使用指定的Unicode序列创建的字符串，也就是说传入Unicode序列，返回基于此创建的字符串。

语法：_fromCharCode(num1, num2,…)_，传入的参数均为数字。

```javascript
String.fromCharCode(65, 66, 67); // "ABC"
String.fromCharCode(97, 98, 99); // "abc"
String.fromCharCode(42); // "*"
String.fromCharCode(43); // "+"
String.fromCharCode(45); // "-"
String.fromCharCode(47); // "/"
```
---
##### fromCodePoint(ES6)
fromCodePoint() 方法基于ECMAScript 2015（ES6）规范，作用和语法同fromCharCode方法，该方法主要扩展了对4字节字符的支持。

```javascript
// "𝌆" 是一个4字节字符，我们先看下它的数字形式
"𝌆".codePointAt(); // 119558
//调用fromCharCode解析之，返回乱码
String.fromCharCode(119558); // "팆"
//调用fromCodePoint解析之，正常解析
String.fromCodePoint(119558); // "𝌆"
```

除了扩展对4字节的支持外，fromCodePoint还规范了错误处理，只要是无效的Unicode编码，就会抛出错误RangeError: Invalid code point...，这就意味着，只要不是符合Unicode字符范围的正整数（Unicode最多可容纳1114112个码位），均会抛出错误。

```javascript
String.fromCodePoint('abc'); // RangeError: Invalid code point NaN
String.fromCodePoint(Infinity); // RangeError: Invalid code point Infinity
String.fromCodePoint(-1.23); // RangeError: Invalid code point -1.23
```
---
##### raw(ES6)
raw() 方法基于ECMAScript 2015（ES6）规范，它是一个模板字符串的标签函数，作用类似于Python的r和C#的@字符串前缀，都是用来获取一个模板字符串的原始字面量。

语法： _String.raw(callSite, …substitutions)_，callSite即模板字符串的『调用点对象』，…substitutions表示任意个内插表达式对应的值，这里理解起来相当拗口，下面我将通俗的讲解它。

如下是python的字符串前缀r：
```python
# 防止特殊字符串被转义
print r'a\nb\tc' # 打印出来依然是 "a\nb\tc"
# python中常用于正则表达式
regExp = r'(?<=123)[a-z]+'
```

如下是String.raw作为前缀的用法：
```javascript
// 防止特殊字符串被转义
String.raw`a\nb\tc`; // 输出为 "a\nb\tc"
// 支持内插表达式
let name = "louis";
String.raw`Hello \n ${name}`;  // "Hello \n louis"
// 内插表达式还可以运算
String.raw`1+2=${1+2},2*3=${2*3}`; // "1+2=3,2*3=6"
```
String.raw作为函数来调用的场景不太多，如下是用法：
```javascript
// 对象的raw属性值为字符串时，从第二个参数起，它们分别被插入到下标为0，1，2，...n的元素后面
String.raw({raw: 'abcd'}, 1, 2, 3); // "a1b2c3d"
// 对象的raw属性值为数组时，从第二个参数起，它们分别被插入到数组下标为0，1，2，...n的元素后面
String.raw({raw: ['a', 'b', 'c', 'd']}, 1, 2, 3); // "a1b2c3d"
```
---
## String.prototype
和其他所有对象一样，字符串实例的所有方法均来自String.prototype。以下是它的属性特性：writable(false), enumerable(false), configurable(false)。可见，字符串属性不可编辑，任何试图改变它属性的行为都将抛出错误。

### 属性
String.prototype共有两个属性，如下：

- String.prototype.constructor 指向构造器(String())
- String.prototype.length 表示字符串长度
### 方法
字符串原型方法分为两种，一种是html无关的方法，一种是html有关的方法。我们先看第一种。但是无论字符串方法如何厉害，都**不可以改变原字符串**。
#### HTML无关的方法
##### charAt
charAt() 方法返回字符串中指定位置的字符。

语法：str.charAt(index)

index 为字符串索引（取值从0至length-1），如果超出该范围，则返回空串。
```javascript
console.log("Hello, World".charAt(8)); // o, 返回下标为8的字符串o
```
---
##### charCodeAt
charCodeAt() 返回指定索引处字符的 Unicode 数值。

语法：_str.charCodeAt(index)_

index 为一个从0至length-1的整数。如果不是一个数值，则默认为 0，如果小于0或者大于字符串长度，则返回 NaN。

Unicode 编码单元（code points）的范围从 0 到 1,114,111。开头的 128 个 Unicode 编码单元和 ASCII 字符编码一样.

charCodeAt() 总是返回一个小于 65,536 的值。因为高位编码单元需要由一对字符来表示，为了查看其编码的完成字符，需要查看 charCodeAt(i) 以及 charCodeAt(i+1) 的值。

```javascript
console.log("Hello, World".charCodeAt(8)); // 111
console.log("前端工程师".charCodeAt(2)); // 24037, 可见也可以查看中文Unicode编码
```
---
##### concat
concat() 方法将一个或多个字符串拼接在一起，组成新的字符串并返回。

语法：_str.concat(string2, string3, …)_

```javascript
console.log("早".concat("上","好")); // 早上好
```

但是 concat 的性能表现不佳，强烈推荐使用赋值操作符（+或+=）代替 concat。”+” 操作符大概快了 concat 几十倍。

---
##### indexOf

indexOf() 方法用于查找子字符串在字符串中首次出现的位置，没有则返回 -1。该方法严格区分大小写，并且从左往右查找。

语法：_str.indexOf(searchValue [, fromIndex=0])_

searchValue 表示被查找的字符串，fromIndex 表示开始查找的位置，默认为0，如果小于0，则查找整个字符串，若超过字符串长度，则该方法返回-1，除非被查找的是空字符串，此时返回字符串长度。

```javascript
console.log("".indexOf("",100)); // 0
console.log("IT改变世界".indexOf("世界")); // 4
```
---
##### lastIndexOf

lastIndexOf 则从右往左查找，其它与前者一致。

语法：_str.lastIndexOf(searchValue [, fromIndex=0])_
```javascript
console.log("IT改变世界".lastIndexOf("世界")); // 4
```
---
##### localeCompare

localeCompare() 方法用来比较字符串，如果指定字符串在原字符串的前面则返回负数，否则返回正数或0，其中0 表示两个字符串相同。该方法实现依赖具体的本地实现，不同的语言下可能有不同的返回。

语法：_str.localeCompare(str2 [, locales [, options]])_

```javascript
var str = "apple";
var str2 = "orange";
console.log(str.localeCompare(str2)); // -1
console.log(str.localeCompare("123")); // 1
```
---
##### match
match() 方法用于测试字符串是否支持指定正则表达式的规则，即使传入的是非正则表达式对象，它也会隐式地使用new RegExp(obj)将其转换为正则表达式对象。

语法：_str.match(regexp)_

该方法返回包含匹配结果的数组，如果没有匹配项，则返回 null。
**描述**

- 若正则表达式没有 g 标志，则返回同 RegExp.exec(str) 相同的结果。而且返回的数组拥有一个额外的 input 属性，该属性包含原始字符串，另外该数组还拥有一个 index 属性，该属性表示匹配字符串在原字符串中索引（从0开始）。
- 若正则表达式包含 g 标志，则该方法返回一个包含所有匹配结果的数组，没有匹配到则返回 null。

**相关RegExp方法**
- 若需测试字符串是否匹配正则，请参考 RegExp.test(str)。
- 若只需第一个匹配结果，请参考 RegExp.exec(str)。
```javascript
var str = "World Internet Conference";
console.log(str.match(/[a-d]/i)); // ["d", index: 4, input: "World Internet Conference"]
console.log(str.match(/[a-d]/gi)); // ["d", "C", "c"]
// RegExp 方法如下
console.log(/[a-d]/gi.test(str)); // true
console.log(/[a-d]/gi.exec(str)); // ["d", index: 4, input: "World Internet Conference"]

```
由上可知，RegExp.test(str) 方法只要匹配到了一个字符也返回true。而RegExp.exec(str) 方法无论正则中有没有包含 g 标志，RegExp.exec将直接返回第一个匹配结果，且该结果同 str.match(regexp) 方法不包含 g 标志时的返回一致。

---
##### replace
replace() 方法用另一个值替换在字符串中指定的值。

语法：_str.replace( regexp | substr, newSubStr | function[, flags] )_

参数：
- regexp: 一个 RegExp 对象. 该正则所匹配的内容会被第二个参数的返回值替换掉。
- substr: 一个要被 newSubStr 替换的字符串。
- newSubStr: 替换掉第一个参数在原字符串中的匹配部分。该字符串中可以内插一些特殊的变量名。
- function: 一个用来创建新子字符串的函数, 该函数的返回值将替换掉第一个参数匹配到的结果。
- flags: 注意：flags 参数在 v8 内核（Chrome and NodeJs）中不起作用。方法中使用 flags 参数不是符合标准的并且不赞成这样做。

**简单概括,replace拥有两个参数,第一个是需要替换的字符串或者正则表达式;第二个是新的字符串或者一个function,这样参数便有四种组合。**

(1) match1: String–>String
  
```javascript
var a = "what is this? before";
var b = a.replace("before","after");
console.log(b);    // "what is this? after"
```
仅仅用到了文本替换为文本的功能。

(2) match2: Regexp–>String

```javascript
var a = "what is this? before";
var b = a.replace(/(^\w+).*?(\w+)$/,"$2 $1");//括号分割的部分依次为子串1....n
console.log(b); // "before what"
```

如果第一个参数是正则表达式,新的字符串中可以用$符号取正则中匹配的子串(也就是正则中被括号包裹的部分)。

(3) match3: Regexp–>Function

依照语法,第二个参数其实可为一个function,最终字符串将以function的返回值作为replace的返回值,以下是该function的形参:
function(match,p1…,offset,string),可见至少包含三个形参(即arguments.length>=3)
- match表示第一个参数(整个正则表达式)匹配的字符串
- p1至pn表示第1..n个括号匹配的字符串,如果没有括号则不存在该项
- offset表示匹配的起点在原字符串中的偏移
- string表示原字符串
```javascript
function replacer(match,p1,p2,offset,string){
    //此时p1=" is",p2=" this"
    return p1+" that";//如果返回为空串,则匹配内容替换为空,如果不返回,则匹配内容替换为undefined
}
var a = "what is this? before";
var b = a.replace(/(\s\w+)(\s\w+)/,replacer);
console.log(b); // "what is that? before"
```

(4) match4: String–>Function
```javascript
function replacer(match,offset,string){
    //由于字符串中不会有括号进行分组,此时没有子串
    return offset+" that";//偏移为4
}
var a = "what is this? before";
var b = a.replace(" is this",replacer);
console.log(b); // "what4 that? before"
```
---
##### search
search() 方法用于测试字符串对象是否包含某个正则匹配，相当于正则表达式的 test 方法，且该方法比 match() 方法更快。如果匹配成功，search() 返回正则表达式在字符串中首次匹配项的索引，否则返回-1。

**注意**：search方法与indexOf方法作用基本一致，都是查询到了就返回子串第一次出现的下标，否则返回-1，唯一的区别就在于search默认会将子串转化为正则表达式形式，而indexOf不做此处理，也不能处理正则。

语法：_str.search(regexp)_
```javascript
var str = "abcdefg";
console.log(str.search(/[d-g]/)); // 3, 匹配到子串"defg",而d在原字符串中的索引为3
```

search() 方法不支持全局匹配（正则中包含g参数），如下：
```javascript
console.log(str.search(/[d-g]/g)); // 3, 与无g参数时,返回相同
```
---
##### slice
slice() 方法提取字符串的一部分，并返回新的字符串。该方法有些类似 Array.prototype.slice 方法。

语法：_str.slice(start, end)_

首先 end 参数可选，start可取正值，也可取负值。

取正值时表示从索引为start的位置截取到end的位置（不包括end所在位置的字符，如果end省略则截取到字符串末尾）。

取负值时表示从索引为 length+start 位置截取到end所在位置的字符。
```javascript
var str = "It is our choices that show what we truly are, far more than our abilities.";
console.log(str.slice(0,-30)); // It is our choices that show what we truly are
console.log(str.slice(-30)); // , far more than our abilities.
```
---
##### split
split() 方法把原字符串分割成子字符串组成数组，并返回该数组。

语法：_str.split(separator, limit)_

两个参数均是可选的，其中 separator 表示分隔符，它可以是字符串也可以是正则表达式。如果忽略 separator，则返回的数组包含一个由原字符串组成的元素。如果 separator 是一个空串，则 str 将会被分割成一个由原字符串中字符组成的数组。limit 表示从返回的数组中截取前 limit 个元素，从而限定返回的数组长度。
```javascript
var str = "today is a sunny day";
console.log(str.split()); // ["today is a sunny day"]
console.log(str.split("")); // ["t", "o", "d", "a", "y", " ", "i", "s", " ", "a", " ", "s", "u", "n", "n", "y", " ", "d", "a", "y"]
console.log(str.split(" ")); // ["today", "is", "a", "sunny", "day"]
```
使用limit限定返回的数组大小，如下：

```javascript
console.log(str.split(" ")); // ["today"]
```

使用正则分隔符（RegExp separator）， 如下：
```javascript
console.log(str.split(/\s*is\s*/)); // ["today", "a sunny day"]
```

若正则分隔符里包含捕获括号，则括号匹配的结果将会包含在返回的数组中。
```javascript
console.log(str.split(/(\s*is\s*)/)); // ["today", " is ", "a sunny day"]
```
---
##### substr
substr() 方法返回字符串指定位置开始的指定数量的字符。

语法：_str.substr(start[, length])_

start 表示开始截取字符的位置，可取正值或负值。取正值时表示start位置的索引，取负值时表示 length+start位置的索引。

length 表示截取的字符长度。
```javascript
var str = "Yesterday is history. Tomorrow is mystery. But today is a gift.";
console.log(str.substr(47)); // today is a gift.
console.log(str.substr(-16)); // today is a gift.
```
---
##### substring
substring() 方法返回字符串两个索引之间的子串。

语法：_str.substring(indexA[, indexB])_

indexA、indexB 表示字符串索引，其中 indexB 可选，如果省略，则表示返回从 indexA 到字符串末尾的子串。

**描述**

substring 要截取的是从 indexA 到 indexB（不包含）之间的字符，符合以下规律：
- 若 indexA == indexB，则返回一个空字符串；
- 若 省略 indexB，则提取字符一直到字符串末尾；
- 若 任一参数小于 0 或 NaN，则被当作 0；
- 若 任一参数大于 length，则被当作 length。

而 如果 indexA > indexB，则 substring 的执行效果就像是两个参数调换一般。比如：str.substring(0, 1) == str.substring(1, 0)

```javascript
var str = "Get outside every day. Miracles are waiting everywhere.";
console.log(str.substring(1,1)); // ""
console.log(str.substring(0)); // Get outside every day. Miracles are waiting everywhere.
console.log(str.substring(-1)); // Get outside every day. Miracles are waiting everywhere.
console.log(str.substring(0,100)); // Get outside every day. Miracles are waiting everywhere.
console.log(str.substring(22,NaN)); // Get outside every day.
```
##### toLocaleLowerCase
##### toLocaleUpperCase
toLocaleLowerCase() 方法返回调用该方法的字符串被转换成小写的值，转换规则根据本地化的大小写映射。而toLocaleUpperCase() 方法则是转换成大写的值。

语法：_str.toLocaleLowerCase(), str.toLocaleUpperCase()_
```javascript
console.log('ABCDEFG'.toLocaleLowerCase()); // abcdefg
console.log('abcdefg'.toLocaleUpperCase()); // ABCDEFG
```
---
##### toLowerCase
##### toUpperCase
这两个方法分别表示将字符串转换为相应的小写，大写形式，并返回。如下：
```javascript
console.log('ABCDEFG'.toLowerCase()); // abcdefg
console.log('abcdefg'.toUpperCase()); // ABCDEFG
```
---
##### toString
##### valueOf
这两个方法都是返回字符串本身。

语法：_str.toString(), str.valueOf()_

```javascript
var str = "abc";
console.log(str.toString()); // abc
console.log(str.toString()==str.valueOf()); // true
```

对于对象而言，toString和valueOf也是非常的相似，它们之间有着细微的差别，请尝试运行以下一段代码：

```javascript
var x = {
    toString: function () { return "test"; },
    valueOf: function () { return 123; }
};

console.log(x); // test
console.log("x=" + x); // "x=123"
console.log(x + "=x"); // "123=x"
console.log(x + "1"); // 1231
console.log(x + 1); // 124
console.log(["x=", x].join("")); // "x=test"
```

当 “+” 操作符一边为数字时，对象x趋向于转换为数字，表达式会优先调用 valueOf 方法，如果调用数组的 join 方法，对象x趋向于转换为字符串，表达式会优先调用 toString 方法。

---

##### trim

trim() 方法清除字符串首尾的空白并返回。

语法：_str.trim()_

```javascript
console.log(" a b c ".trim()); // "a b c"
```

trim() 方法是 ECMAScript 5.1 标准加入的，它并不支持IE9以下的低版本IE浏览器，如需支持，请参考以下兼容写法：

```javascript
if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}
```
---
##### codePointAt(ES6)

codePointAt() 方法基于ECMAScript 2015（ES6）规范，返回使用UTF-16编码的给定位置的值的非负整数。

语法：_str.codePointAt(position)_
```javascript
console.log("a".codePointAt(0)); // 97
console.log("\u4f60\u597d".codePointAt(0)); // 20320
```
---
##### includes(ES6)

includes() 方法基于ECMAScript 2015（ES6）规范，它用来判断一个字符串是否属于另一个字符。如果是，则返回true，否则返回false。

语法：_str.includes(subString [, position])_

subString 表示要搜索的字符串，position 表示从当前字符串的哪个位置开始搜索字符串，默认值为0。
```javascript
var str = "Practice makes perfect.";
console.log(str.includes("perfect")); // true
console.log(str.includes("perfect",100)); // false
```

实际上，Firefox 18~39中该方法的名称为contains，由于bug 1102219的存在，它被重命名为includes()。

---

##### endsWith(ES6)
endsWith() 方法基于ECMAScript 2015（ES6）规范，它基本与 contains() 功能相同，不同的是，它用来判断一个字符串是否是原字符串的结尾。若是则返回true，否则返回false。

语法：_str.endsWith(substring [, position])_

与contains 方法不同，position 参数的默认值为字符串长度。
```javascript
var str = "Learn and live.";
console.log(str.endsWith("live.")); // true
console.log(str.endsWith("Learn",5)); // true
```
---
##### normalize(ES6)
normalize() 方法基于ECMAScript 2015（ES6）规范，它会按照指定的 Unicode 正规形式将原字符串正规化。

语法：_str.normalize([form])_

form 参数可省略，目前有四种 Unicode 正规形式，即 “NFC”、”NFD”、”NFKC” 以及 “NFKD”，form的默认值为 “NFC”。如果form 传入了非法的参数值，则会抛出 RangeError 错误。
```javascript
var str = "\u4f60\u597d";
console.log(str.normalize()); // 你好
console.log(str.normalize("NFC")); // 你好
console.log(str.normalize("NFD")); // 你好
console.log(str.normalize("NFKC")); // 你好
console.log(str.normalize("NFKD")); // 你好
```
---
##### repeat(ES6)
repeat() 方法基于ECMAScript 2015（ES6）规范，它返回重复原字符串多次的新字符串。

语法：_str.repeat(count)_

count 参数只能取大于等于0 的数字。若该数字不为整数，将自动转换为整数形式，若为负数或者其他值将报错。
```javascript
var str = "A still tongue makes a wise head.";
console.log(str.repeat(0)); // ""
console.log(str.repeat(1)); // A still tongue makes a wise head.
console.log(str.repeat(1.5)); // A still tongue makes a wise head.
console.log(str.repeat(-1)); // RangeError:Invalid count value
```
---
##### startsWith(ES6)
startsWith() 方法基于ECMAScript 2015（ES6）规范，它用来判断当前字符串是否是以给定字符串开始的，若是则返回true，否则返回false。

语法：_str.startsWith(subString [, position])_
```javascript
var str = "Where there is a will, there is a way.";
console.log(str.startsWith("Where")); // true
console.log(str.startsWith("there",6)); // true
```
---
#### HTML有关的方法
##### anchor

anchor() 方法创建一个锚标签。

语法：_str.anchor(name)_

name 指定被创建的a标签的name属性，使用该方法创建的锚点，将会成为 document.anchors 数组的元素。

```javascript
var str = "this is a anchor tag";
document.body.innerHTML = document.body.innerHTML + str.anchor("anchor1"); // body末尾将会追加这些内容 <a name="anchor1">this is a anchor tag</a>
```
---
##### link
link() 方法同样创建一个a标签。

语法：_str.link(url)_

url 指定被创建的a标签的href属性，如果url中包含特殊字符，将自动进行编码。例如 " 会被转义为 &\quot。 使用该方法创建的a标签，将会成为 document.links 数组中的元素。
```javascript
var str = "百度";
document.write(str.link("https://www.baidu.com")); // <a href="https://www.baidu.com">百度</a>
```
---

## 总结
部分字符串方法之间存在很大的相似性，要注意区分他们的功能和使用场景。如：
- substr 和 substring，都是两个参数，作用基本相同，两者第一个参数含义相同，但用法不同，前者可为负数，后者值为负数或者非整数时将隐式转换为0。前者第二个参数表示截取字符串的长度，后者第二个参数表示截取字符串的下标；同时substring第一个参数大于第二个参数时，执行结果同位置调换后的结果。
- search方法与indexOf方法作用基本一致，都是查询到了就返回子串第一次出现的下标，否则返回-1，唯一的区别就在于search默认会将子串转化为正则表达式形式，而indexOf不做此处理，也不能处理正则。

另外，还记得吗？concat方法由于效率问题，不推荐使用。

通常，字符串中，常用的方法就charAt、indexOf、lastIndexOf、match、replace、search、slice、split、substr、substring、toLowerCase、toUpperCase、trim、valueof 等这些。熟悉它们的语法规则就能熟练地驾驭字符串。

