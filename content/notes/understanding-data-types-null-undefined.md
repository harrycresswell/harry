---
title: "Understanding data types: null vs undefined"
date: 2020-01-14T20:44:38Z
draft: false
description: "There are two ways to express nothing in JavaScript; null and undefined. But how do they differ?"
slug: "js-data-types-null-undefined"
tags: ["Coursenotes", "JavaScript"]
syndicate: "false"
feature: "https://res.cloudinary.com/harrycresswell/image/upload/v1579251062/hc/null-undefined.png"
---

_These notes are taken from [Beginner JavaScript](https://beginnerjavascript.com/) by Wes Bos. Go buy it!_

There are two ways to express nothing in JavaScript; `null` and `undefined`. But how do they differ?

## Understanding undefined

If we create a variable but don’t set anything to it, the value returned will be `undefined`.

```javascript
let dog;
console.log(dog);
```

`undefined` is something that has been created, like a variable, but does not yet have a value set to it. In other words, _it is not yet defined_.

The browser sets this missing value to `undefined` because no value exists and so there is nothing to return.

If we then give the variable a value:

```javascript
dog = "snickers";
```

The browser will return the new value:

```javascript
dog;
("snickers");
```

And the value is no longer `undefined`.

## Understanding null

`null` is a value of nothing that has to be explicitly set before it can be returned as `null`.

```javascript
const somethingNull = null;
```

In this case the value is `null`, unlike our example above which is `undefined` because it literally has no value.

```javascript
let somethingUndefined;
```

This example returned `undefined` as we have yet to give it a value.

## A practical example

We can use the example of a mononymous person (someone known by a single name). In this case we’ll use the singer [Cher](https://en.wikipedia.org/wiki/Cher), who we know only as Cher.

```javascript
const cher = {
  first: "cher"
};
```

We don’t know Cher’s last name so `.last` will return `undefined`.

```javascript
cher.last;
undefined;
```

Now on to our example of `null`.

The comedian and illusionist [Teller](<https://en.wikipedia.org/wiki/Teller_(magician)>), the silent half of the duo Penn & Teller, legally changed his original polynym, Raymond Joseph Teller, to the mononym "Teller" and possesses a United States passport issued in that single name.

In JavaScript we can represent his original name like this:

```javascript
const teller = {
  first: "Raymond",
  last: "Teller"
};
```

To represent his legally changed polynym we might update the value of `last` to `null`.

```javascript
teller.first = "Teller";
teller.last = null;
```

That’s it.
