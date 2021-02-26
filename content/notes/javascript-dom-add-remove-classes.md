---
title: "JavaScript and the DOM: Adding and removing classes"
date: 2021-02-26T08:33:54Z
draft: false
description: "This is a quick look at JavaScript interaction based on my notes from Beginner JavaScript by Wes Bos"
slug: "javascript-dom-add-remove-classes"
tags: ["JavaScript", "Coursenotes"]
syndicate: "false"
---

_This is a quick look at JavaScript interaction based on my notes from Beginner JavaScript by Wes Bos_

In our html we have an image element with a class attached to it. This could be any element but for the sake of this demonstration we’ll use an image.

```html
<img class="picture" src="https://picsum.photos/600" />
```

In our JavaScript file we can get hold of the image by the class name using the `querySelector` method on our document.

```JavaScript
const pic = document.querySelector('.picture');
```

Next we can log a DOM token list to the console with:

```JavaScript
console.log(pic.classList);
```

Open up the console and you should see the DOMTokenList:

```JavaScript
DOMTokenList ["picture", value: "picture"]
0: "picture"
length: 1
value: "picture"
__proto__: DOMTokenList
```

The DOMTokenList is essentially just an array of all the classes on the element.

Let’s add one more class called 600:

```html
<img class="picture 600" src="https://picsum.photos/600" />
```

Now the DOMTokenList is updated to include our new class:

```JavaScript
DOMTokenList(2) ["picture", "600", value: "picture 600"]
0: "picture"
1: "600"
length: 2
value: "picture 600"
__proto__: DOMTokenList
```

If you look inside `__proto__` you will see all the methods we can use on the DOMTokenList.

```JavaScript
__proto__: DOMTokenList
add: ƒ add()
contains: ƒ contains()
entries: ƒ entries()
forEach: ƒ forEach()
item: ƒ item()
keys: ƒ keys()
length: (...)
remove: ƒ remove()
replace: ƒ replace()
supports: ƒ supports()
toString: ƒ toString()
toggle: ƒ toggle()
value: (...)
values: ƒ values()
constructor: ƒ DOMTokenList()
Symbol(Symbol.iterator): ƒ values()
Symbol(Symbol.toStringTag): "DOMTokenList"
get length: ƒ length()
get value: ƒ value()
set value: ƒ value()
__proto__: Object
```

Two of which are `add` and `remove`, which we can use to add and remove classes from our elements.

Let’s add a class called “open”.

```JavaScript
const pic = document.querySelector('.picture');
pic.classList.add('open');
console.log(pic.classList);
```

Then remove the class called “600” which we added manually:

```JavaScript
const pic = document.querySelector('.picture');
pic.classList.add('open');
pic.classList.remove('600');
console.log(pic.classList);
```

Now let’s add some CSS so we can visually see what’s going on when we add or remove a class.

```css
.round {
  border-radius: 50%;
}
```

Now back in our JavaScript:

```JavaScript
const pic = document.querySelector('.picture');
pic.classList.add('open');
pic.classList.remove('600');
pic.classList.add('round');
console.log(pic.classList);
```

Now when we run our code the new round class is added and we can see the image change to round.

Next we can add some animation:

```css
img {
  transition: all 0.2s;
}
```

Add try the toggle method instead:

```JavaScript
const pic = document.querySelector('.picture');
pic.classList.add('open');
pic.classList.remove('600');
pic.classList.toggle('round');
console.log(pic.classList);
```

Now whenever we run the code the class is removed if it exists and it is added if it doesn't.

We could improve on this still by listening for a click event, and toggling the class when that happens.

First create a function for our toggle:

```JavaScript
function toggleRound() {
	pic.classList.toggle('round');
}
```

Then add the event listener and pass in the function:

```JavaScript
pic.addEventListener('click', toggleRound);
```

Our final code will look like this:

```JavaScript
const pic = document.querySelector('.picture');

function toggleRound() {
	pic.classList.toggle('round');
}

pic.addEventListener('click', toggleRound);
```

Now anytime we click the image, our function will run.

## Summary

A lot of interaction in JavaScript is simply adding and removing classes, then using CSS to create various styles and transitions.

If you haven’t taken Wes Bos’s Beginner JavaScript course go take it!
