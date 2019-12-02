+++
title = "Arrays"
date = "2018-07-19T14:49:54+02:00"
slug = "practical-javascript-arrays"
tags = ["JavaScript", "Coursenotes"]
description = "In programming, lists are called Arrays. Learn how to build an array and display items from the array in the console."
syndicate = "false"
+++

These are my notes from Gordon Zhu’s course [Practical JavaScript](https://watchandcode.com/p/practical-javascript).

JavaScript always been my weakest link so lately I’ve been taking the time to revisit many concepts I’ve otherwise skipped in the past.

I highly recommend the course if you’re just getting started or looking to brush up on your Javascript programming. It’s video based and 100% free! This first part looks at working with Arrays directly from the console in the browser.

For those new to this stuff; from any webpage _right click > Inspect Element_ to open the console.

## Project Requirements

Creating a requirement list will help you focus on one specific thing at a time. It’s easy to get side-tracked if you don’t do this.

This will help you debug and test your app and think in a more modular manner. Breaking large tasks into smaller pieces will make programming your app more manageable. The more specific you can make your requirements the better.

- It should have a place to store todos
- It should have a way to display todos
- It should have a way to add new todos
- It should have a way to change a todo
- It should have a way to delete a todo

## App Version 1.0 – Arrays

In programming, lists are called Arrays. From the console in Chrome:

```javascript
['item 1', 'item 2', 'item 3']
```

### Storing todos

Create a variable to store the array so we can call it again and reuse it.

```javascript
var todos = ['item 1', 'item 2', 'item 3'] 
```


### Displaying todos

Display the Array with `todos`.

Now pass the variable into the `Console.log` function.

```javascript
console.log(todos)
```

_Note: variables don’t require quotes. Surronding todos in quotes; ‘todos’ would print the string **todos**_

```javascript
console.log('My Todos:', todos)
```

### Add new todos

By binding the variable with the command `push` we can add new items to an Array.

```javascript
todos.push('item 4')
```

Console will display the number of items.

`todos` will now display `['item 1', 'item 2', 'item 3', 'item 4']`

### Change a todo

To change a todo we need to first get hold of the specific item we want to change.

`todos[0]` will get hold of `'item 1'`,
`todos[4]` will get hold of `'item 4'` and so on.

_Note: Unlike humans who start from 1, computers start counting from 0._

Add a new value in the specific todo item, use `=` followed baby the new value.

`todos[0] = 'item 1 updated'` will update `'item 1'` in the Array.

`todos` will now display the update Array showing the new value for `item 1`:

```javascript
['item 1 updated', 'item 2', 'item 3', 'item 4']
```


### Deleting a todo

To delete an item in an Array you can use the command `splice`, similar to how we used the `push` command to add an item.

`todos.splice()`

To delete the first item in the Array use `0` again.

`todos.splice(0)`

Then tell `splice` the number of items you want to delete. In this case it’s 1.

`todos.splice(0, 1)`


## v1.0 Review

- ~~It should have a place to store todos~~
- ~~It should have a way to display todos~~
- ~~It should have a way to add new todos~~
- ~~It should have a way to change a todo~~
- ~~It should have a way to delete a todo~~

What We’ve learnt so far:

- Store Arrays using Variables:

```javascript
var todos = ['item1', 'item 2', 'item 3', 'item 4']
```

- Display Array with `console.log`:

```javascript
console.log('My Todos:', todos)
```

- Add todos:

```javascript
todos.push('new todo item')
```

- Change a todo:

`todos[0] = ` changed todo!`

- Delete todos:

`todos.splice(0, 1)` Where `0` specifies the particular item and `1` specifies the number of items to delete.

## Next steps

[Part 2](notes/parctical-javascript-functions) looks at improving the app using Functions.

These notes are based on Practical Javascript by Gordo Zhu. head over to [Watchandcode.com](https://watchandcode.com/p/practical-javascript) to enroll for free.
