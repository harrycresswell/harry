---
title: "Understanding JavaScript Arrow Function syntax"
date: 2020-02-10T15:06:08+01:00
draft: false
description: "To understand the arrow function syntax, you need to get an understanding of a few different ways of expressing a function."
slug: "javascript-es6-arrow-function-syntax"
tags: ["JavaScript"]
syndicate: "false"
---

_Notes based on [Beginner JavaScript by Wes Bos](https://beginnerjavascript.com/)._

To get a good grasp of the arrow function syntax, first you need to get an understanding of a few different ways of expressing a function in JavaScript.

## A few ways to make a function

Understanding these different methods of expressing a function will help you get your head around the newer ES6 Arrow Function syntax.

### Method 1: Using the function keyword

Use the `function` keyword, followed by the name of the function. In this case the function name is _doctorize_.

Next set a parameter. That’s the placeholder for whatever data you want to pass into your function. In this case _firstname_.

Finally use a `return` statement to return the data however you wish.

```javascript
function doctorize(firstname) {
  return `Dr. ${firstname}`;
}
```

That’s using the function keyword.

### Method 2: Anonymous functions

An anonymous function is simple a function without a name.

An anonymous functions isn’t valid JavaScript in it’s own right. However, there are certain ways of using anonymous functions which makes them valid. Such as in callback functions.

```javascript
function (firstname) {
  return `Dr. ${firstname}`;
}
```

That’s declaring an anonymous function.

### Method 3: Function expressions

A function expression is when you store a function as a value in a variable.

```javascript
const doctorize = function(firstname) {
  return `Dr. ${firstname}`;
};
```

All we’re doing here is taking an anonymous function and sticking it into a variable. Although this is technically still an anonymous function, the browser will use the variable name as the name of the function.

When you hear someone say “functions are first class citizens”, what they really mean is that you can store functions as variables.

Function expressions differ from functions created with the function keyword in that the aren’t hoisted.

Functions created with the function keyword are ‘hoisted’ to the top of the document, which allows you to call the function from anywhere in your document. This isn’ true for function expressions which are _not_ hoisted.

Now let’s look at arrow functions.

## Arrow functions

Arrow functions offer a concise syntax. They also don’t have their own scope, in reference to the `this` keyword. Arrow functions are anonymous functions.

These are the steps to create an arrow function:

### Step 1: Take a regular function

Here’s a regular function.

```javascript
function inchToCM(inches) {
  const cm = inches * 2.54;
  return cm;
}
```

4 lines of code?! Bit lengthy.

### Step 2: Return the value itself

To make the function shorter you can return the value instead.

```javascript
function inchToCM(inches) {
  return inches * 2.54;
}
```

### Step 3: Convert it to an anonymous function

To convert the function to an anonymous function we remove the function name and store it in a variable. Now we have a function expression.

```javascript
const inchToCM = function(inches) {
  return inches * 2.54;
};
```

### Step 4: Convert to an arrow function

Now delete the function keyword, because it’s long and we don’t like that. Then add a fat arrow.

```javascript
const inchToCM = inches => {
  return inches * 2.54;
};
```

### Step 5: Switch from explicit to implicit return

Move the function to 1 line.

```javascript
const inchToCM = inches => {
  return inches * 2.54;
};
```

Delete the curly brackets.

```javascript
const inchToCM = (inches) => return inches * 2.54;
```

Then remove the `return` keyword.

```javascript
const inchToCM = inches => inches * 2.54;
```

Now we’ve totally removed the function block. However this is optional.

If there is only one parameter, you can also remove the parentheses.

```javascript
const inchToCM = inches => inches * 2.54;
```

Now we have an arrow function.

Keep in mind, you will have to keep the parentheses if you have more than one parameter.

```javascript
// ✅ will work!
const add = (a, b = 3) => a + b;
// ⛔️ won’t work!
const add = a, b = 3 => a + b;
```
