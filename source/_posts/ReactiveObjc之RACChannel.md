---
title: ReactiveObjC之RACChannel
date: 2019-10-21 14:19:13
tags:
---

在学习RACChannel之前，什么是RACChannel？、RACChannel的作用场景以及ReactiveObjc是如何实现的？

	1. 什么是RACChannel？
	2. RACChannel的作用场景？
	3. ReactiveObjc是如何实现的？

### 什么是RACChannel?
	
从概念上讲，RACChannel看作是双向连接的，并且由两个并行工作的可控信号组成。
	
	例如:
		
	Model               	  View
	
	`leadingTerminal` ---->  `followingTerminal`
	`leadingTerminal` <----  `followingTerminal`

model的初始值和所有更改都将由`leadingTerminal`发送,并且由`followingTerminal`订阅者接收。同样，每当用户更改View的值时，该值就会在`followingTerminal`上发送，并在model中从`leadingTerminal`接收。但是view的初始值不是从`leadingTerminal`接收的(仅在将来更改)。