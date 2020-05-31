---
id: github-image
title: 解决GitHub图片不显示问题
author: Young.W
author_title: Front End Engineer @ HITsz
# author_url: https://github.com/wwwyyying
author_image_url: '../img/logo.png'
tags: [GitHub]
---

解决GitHub图片不显示的问题

<!--truncate-->
今天在提交GitHub项目时发现，README.md中的图片不显示，本以为是自己路径写的有问题，检查了很久也没看出来是哪里出了错，百度一下发现需要改一下电脑上的某个文件。如下：

打开路径C:\Windows\System32\driver\etc下的hosts文件，在最后加上

```
# GitHub Start 
192.30.253.112    github.com 
192.30.253.119    gist.github.com
151.101.184.133    assets-cdn.github.com
151.101.184.133    raw.githubusercontent.com
151.101.184.133    gist.githubusercontent.com
151.101.184.133    cloud.githubusercontent.com
151.101.184.133    camo.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com
 
 # GitHub End
```

保存文件后便可以查看图片了。如果没有修改权限，鼠标右键-属性-安全-修改权限；或将hosts文件复制一份，修改之后，复制到原文件夹替换。

发生此问题的主要原因是：
1. dns污染
2. host设置错误
3. 官方更新了dns，但是dns缓存没有被更新，导致错误解析

所以我们可以通过上面提到的，使用修改本地hosts文件对网站进行域名解析的方法，将域名解析直接指向IP地址来绕过DNS解析，以此解决污染问题。

关于此问题的详细介绍可以参考[优秀博客](https://blog.csdn.net/qq_38232598/article/details/91346392)。
