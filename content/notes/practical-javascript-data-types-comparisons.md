+++
title = "Data Types and Comparisons"
date = "2018-11-22T11:54:12+01:00"
description = "Learn about the difference between objects and primatives in JavaScript."
slug = "practical-javascript-data-types-comparisons"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

In JavaScript there are 2 categories of data types:

- Objects
- Primitives

## Objects

Objects can be as complicated as you want. Objects use curly braces.

- `{} // todoList, arrays, functions`

## Primitives

Primitives are the simple building blocks of JavaScript, they only have 1 form. You can’t make them complicated.

- String (formal name for text, in between quotes, very limited data type) // ‘This is a string!’
- Number (same as in math) // 1, 2, 3, 4 …
- Boolean (super limited data type) // true, false
- Undefined // Value that hasn’t yet been set
- Null // ‘Nothing’

### Difference between 'undefined' and 'null'

Undefined is simply a value which hasn’t yet been set, whereas null literally means nothing. For example if you have a variable but haven’t given it a value yet it will be `undefined`.

Null can be used to represent say a variable for someones test score, where the score is marked from 0-100, but they haven’t yet taken the test. In this case the test score would be equal to `null`. Null means explicitly nothing.

## Is it a primitive or an object?

If you’re unsure if something is an Object or a Primitive, ask yourself it it fits into one of the primitive categories above. If it doesn’t then it’s an Object.

## Comparisons with primitive data types

Primitive comparisons work just like in Math. General rule, if they look the same they probably are the same.

### Comparisons with Strings

For example:

- `'harry' === 'harry'` would return `true` they are the same thing
- `'harry1' === 'harry'` would return `false`, they are different

### Comparisons with Numbers

For example:

- `0 < 10` is `true`.
- `0 = 0` is the same thing so it’s also `true`
- `1 === 1` is `true`
- Whereas `1 === 2` would return `false`.
- `100 === 100` would return `true`

Number comparisons work as you would expect.

### Comparisons with Booleans

For example:

- `true === true` returns `true`
- `true === false` returns `false`
- `false === false` returns `true`

### Comparisons of Undefined and Null

For example:

- `undefined === undefined` will return `true`
- `null === null` will also return `true`

To summarise, primitive comparisons work exactly as you would expect.

## Comparisons with Object data types

Comparisons with Objects works completely different from primitive comparisons, the behaviour is unexpected.

For example, the comparison between 2 empty objects returns false:

`{} === {}` returns `false`

As does the comparison of 2 arrays which appear the same:

`[1, 2, 3] === [1, 2, 3]` returns `false`.

### Understanding why Object comparisons behave differently

In object comparisons JavaScript is actually comparing the addresses it assigns to the objects.

In our example from before, imagine our 2 empty objects are actually houses:

`{} === {}`

JavaScript sees these as 2 separate houses in 2 different locations; `house1` and `house2`. Much like houses in the real world have different addresses, these are actuallu 2 separate objects, with 2 separate addresses. Although they might look the same they in fact different.

When you create an object in JavaScript, it saves that object at unique location in memory.

In this case, 3 objects – all identical in the fact they are empty – are saved at different memory addresses.

```
{}  // Memory Address 1
{}  // Memory Address 2
{}  // Memory Address 3
```

When JavaScript is comparing the first object to the second, it’s actually comparing the memory addresses. It’s doing this to understand if we’re looking at the exact same object or 2 separate objects.

A general rule of thumb, if you’re comparing 2 objects it will be `false`. The only time you can have an object comparison equal is if you assign the object to a variable and compare those variables.

'' var houseA = {}; houseA === houseA true

As you see in the example above, this comparison returns `true`.

## Comparisons review

Primitive comparisons work just as you expect.

`2 == 2` returns `true`, because 2 is 2. JavaScript is comparing the value of the data. It doesn’t care about the memory address or location of where its stored.

Objects are references, memory addresses of where an object is saved. When you save an Object, Javascript is not looking at the values between the curly brackets, it’s actually saving a reference so it can refer to the value.

So although the value might appear the same, JavaScript is actually looking at the memory address which is different.

So remember, when you’re comparing objects you’re actually comparing 2 memory addresses.

## Code example 1

```javascript
var myPrimitive = 10;
var myObject = {name: 'harry'};
```

Let’s try and understand what’s going on in the example above. In line 1, JavaScript creates the variable `myPrimitive`, then stores the number `10` as the value inside the variable.

In line 2, first we’re telling JavaScript creates the variable `myObject`. Then we tell JavaScript to create a new object with the name property `harry`. JavaScript creates the new object and gives it a memory address. It’s that memory address thats actually stored inside the `myObject` variable.

The diagram below should help illustrate how this works.

{{< mp4 src="v1542885381/hc/practical-javascript-data-types-comparisons-harry-cresswell-example-1" caption="Understanding how data is stored in objects example 1" >}}

## Code example 2

```javascript
var myHouse = {color: 'blue'};
myHouse.color = 'red';
```

In line 1 of the example above, JavaScript starts by creating a variable called `myHouse`. Then it creates an object which has the color property equal to `blue`. Once it’s created it’ll have a memory address which is stored inside the variable.

In line 2, we’re modifying the color property on the `myHouse` object.

First JavaScript looks at `myHouse`, it sees there’s a memory address, so it travels to that memory address and finds the `myHouse` object. The next thing we’re doing is telling JavaScript to look at the `color` property. That completes the left hand side of line 2.

On the right hand side of line 2, we’re telling JavaScript to change the value of the color property on the `myHouse` object to `'red'`.

The diagram below should help illustrate how this works.

{{< mp4 src="v1542887659/hc/practical-javascript-data-types-comparisons-harry-cresswell-example-2" caption="Understanding how data is stored in objects example 2" >}}

## Code example 3

```javascript
var myHouse = {color: 'blue'};
var color = myHouse.color;
color = 'red';
```

Here in line 1, we’re telling JavaScript to create a variable called `myHouse`. Then we’re creating an object with the color property value of blue. Next JavaScript will create a memory address and store that in the variable.

In line 2, we’re creating another variable, this time called `color`, and telling JavaScript to look at the color property on the `myHouse` object. JavaScript sees the memory address stored in the `myHouse` variable, travels to the object, and finds the color property. JavaScript then stores the value of the color property; in this case `'blue`, inside the `color` variable.

In line 3, all we’re doing is telling JavaScript to change the value store in the `color` variable to `'red'`.

The diagram below should help illustrate how this works.

{{< mp4 src="v1542888475/hc/practical-javascript-data-types-comparisons-harry-cresswell-example-3" caption="Understanding how data is stored in objects example 3" >}}

## Code example 4

```javascript
var myHouse1 = {color: 'blue'};
var myHouse2 = myHouse1;
myHouse2.color = 'red';
```

In this example, on the left of line 1 JavaScript creates a variable called `myHouse1`. On the right side JavaScript creates an object that has the color property blue. JavaScript then saves a memory address pointing to the object inside the variable `myHouse1`.

In line 2, we create a new variable called `myHouse2`, and set the value to the same value stored in the `myHouse1` variable. In this case; the same memory address which leads to the object created in line 1.

In line 3, on the left side we’re telling JavaScript to go to the `myHouse2` variable. In the `myHouse2` variable JavaScript finds the memory address, follows the memory address to the object associated with that memory address.

On the right side, we’re telling JavaScript to update the value it finds in the object to `red`.

The diagram below should help illustrate how this works.

{{< mp4 src="v1542888888/hc/practical-javascript-data-types-comparisons-harry-cresswell-example-4" caption="Understanding how data is stored in objects example 4" >}}

### Code example 5

```javascript
var myHouse1 = {color: 'blue'};
var myHouse2 = {color: 'blue'};
myHouse2.color = 'red';
```

In this final example, line 1 creates a variable called `myHouse1`. Then we create an object with the color property `‘blue’`. Then JavaScript creates a memory address associated with this object and stores it in the variable `myHouse1`.

In line 2, we create a new variable called `myHouse2`. Then we create another object with the color property `blue`. Javascript then stores a new memory address inside `myHouse2`. This time leading to the second object.

We now have 2 objects and 2 memory addresses.

In line 3, on the left side we’re telling JavaScript to look at the value stored inside `myHouse2`. In this case that’s the memory address leading to our second object.
JavaScript follows this memory address and finds the color property `blue`. In the right side of line 3 we’re telling JavaScript to change the value of this color property to `red`.

The diagram below should help illustrate how this works.

{{< mp4 src="v1542889069/hc/practical-javascript-data-types-comparisons-harry-cresswell-example-5" caption="Understanding how data is stored in objects example 4" >}}
