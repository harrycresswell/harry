---
title: "Hoisting in Javascript"
date: 2020-05-19T07:42:58+01:00
draft: false
description: "What exactly is hoisting?  Hoisting allows you to access functions and variables before they have been created."
slug: "hoisting-javascript"
tags: ["JavaScript", "Coursenotes"]
syndicate: "false"
---

_What exactly is hoisting? These are my notes taken from [Beginner JavaScript by Wes Bos](https://beginnerjavascript.com/)_.

Hoisting allows you to access functions and variables before they have been created.

There are two things that are hoisted in JavaScript; Function declarations and variable declarations.

Consider the following code:

```
sayHi();

function sayHi() {
	console.log('hey!');
}
```

In the code above we’re running the function before we declare it, but the code still works and we see “hey!” in the console.

Why does this happen?

This is because when you run your JavaScript code, the JavaScript compiler takes all of your function declarations and moves them to the top of the file so they’re all available to use in the rest of your code. This is what’s called Hoisting.

So hoisting allows you to run functions before you declare them.

Now consider the following code:

```
sayHi();

function sayHi() {
	console.log('hey!');
	console.log(add(10,2)):
}

function add(a, b) {
	return 1 + b;
}
```

This will also work fine because the `sayHi` function is hoisted.
