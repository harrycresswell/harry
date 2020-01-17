---
title: "Understanding data types: boolean and equality"
date: 2020-01-17T08:46:12Z
draft: false
description: "A boolean value is either true or false. Like a light switch it’s either on or off."
slug: "js-data-types-boolean-equality"
tags: ["Coursenotes", "JavaScript"]
syndicate: "false"
feature: "https://res.cloudinary.com/harrycresswell/image/upload/v1579251062/hc/boolean-equality.png"
---

_These notes are taken from [Beginner JavaScript](https://beginnerjavascript.com/) by Wes Bos. Go buy it!_

A boolean value is either `true` or `false`. Like a light switch it’s either on or off.

Booleans are used for logic, such as if statements. They can be calculated or manually set.

```javascript
let isDrawing = false;
```

In this case we have a manually set flag variable which might describe the users actions on a page.

We can also calculate booleans:

```javascript
// set the age
let age = 18;
// age is greater than 19
const ofAge = age > 19;
// returns boolean value of false
console.log(ofAge);
```

## Understanding equality

We use one equal sign operator (=) to set a variable.

```javascript
const age = 100;
```

We also have double equals (==) and triple equals (===).
But, what’s the difference? And which one should we use?

Double equals (==) checks the value of the left and right are the same. However it will ignore differences in type.

Take this example. Both left and right values equal 10, however even though the left value is of type string and the right is a number it still returns `true`.

```javascript
"10" == 10;
true;
```

In contrast, triple equals (===) will always check that both the value _and_ the type of the left and right equal the same

The example below returns `true` as the value of the left and right is 10. And both data types are the same. In this case they are both numbers.

```javascript
10 === 10;
true;
```

Next take the following example:

```javascript
"10" === 10;
false;
```

Here the values are the same, but the types differ. The left is a string and the right is a number. So `false` is returned.

You should almost always use triple equals.
