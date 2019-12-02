+++
title = "Thinking in Code"
date = "2018-11-15T11:24:19+01:00"
description = "Build a toggleAll method."
slug = "practical-javascript-thinking-in-code"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

This is Part 6 of my notes on Gordon Zhu’s [Practical JavaScript](https://watchandcode.com/p/practical-javascript).

## Building a todo app v.6.0

In version 6 we’ll work on 1 feature which toggles todos as complete or incomplete.

You can see how this works in the finished app [here](http://todomvc.com/examples/vanillajs/).

In the example, use the chevron to the left of the input box to toggle the todos you create.

You’ll notice a few cases, if everything is `false` (items are incomplete) and you click toggle, everything will be `true`. If some of the items are `true` (complete), toggle will make the rest `true` too.

The only case it will make every todo `false` (incomplete) is when all items are `true` (complete). In every other case, clicking the toggle button will make all todo items `true`.

We can represent this in our requirements.

## Requirements

- `.toggleAll`: If everything’s true, make everything false.
- `.toggleAll`: Otherwise, make everything true.

## Step 1: If everything’s true, make everything false

Our first step is to work on a solution where if everything is `true` make everything `false`.

We want to do this in a new method called `toggleAll`.

```javascript
toggleAll: function() {
  // If everything’s true, make everything false
}
```

### Comparing completedTodos to totalTodos

To make this happen we could use an `if` statement and count the the number of `completedTodos`, to see if it equals the number of `totalTodos`.

If that returns `true`, we’d know we we’d met the first condition.

```javascript
toggleAll: function() {
  // If everything’s true  
  if (completedTodos === totalTodos) {  
    // Make everything false  
  }
}
```

### Setting the required variables

The problem now is that the variables `completedTodos` and `totalTodos` don’t exist yet, so we need to create those next.

```javascript
toggleAll: function() {  
  var totalTodos = this.todos.length;
  var completedTodos = 0;
  // If everything’s true
  if (completedTodos === totalTodos) {   
    // Make everything false  
  }
}
```

For our `totalTodos` variable, we can use `this.todos.length` to check the number of items in our todo list, so this works great.

`completedTodos` is harder to get. So it’s a safe assumption to start with 0, meaning we have zero completed todos. Then we can look through all the items in our todo list to see how many are completed. If we see a todo is completed we can increase the value of `completedTodos` by 1. To make this happen we can use a `for` loop, which loops through all our items.

### Looping through todos

In the first part of our `for` loop we can use a variable  `i = 0` again as a counter. We want to keep going whilst `i` is less than the `totalTodos`, then increment `i`  by 1 using `i++`. This will loop through our todos.

```javascript
toggleAll: function() {
  var totalTodos = this.todos.length;
  var completedTodos = 0;  
  // Count number of completed todos
  for (var i = 0; i < totalTodos; i++ ) {

  }  
  // If everything’s true 
  if (completedTodos === totalTodos) {   
    // Make everything false 
  }
}
```

### Check if todo is completed, update completedTodos variable

Then we want to look at each todo item in our array. Using `if` we can check to see if a specific todo is completed with `this.todos[i].completed === true`.

And then with `completedTodos++`, increment completedTodos by 1 if the statement is `true`.

```javascript
toggleAll: function() {  
  var totalTodos = this.todos.length;  
  var completedTodos = 0; 
  // Count number of completed todos  
  for (var i = 0; i < totalTodos; i++ ) {    
    if (this.todos[i].completed === true) {     
      completedTodos++  
    } 
  }  
  // If everything’s true 
  if (completedTodos === totalTodos) {   
    // Make everything false  
  }
}
```

This code will go through and return the number of todos that are completed, updating the value in our `completedTodos` variable with the number of completed todos.

### Make false if all todos are true

To make everything `false` if all our todos are set to `true`, we can use the exact same `for` loop as before.

This time using `this.todos[i].completed = false;` to set all todos to `false`, if the number of `completedTodos` is equal to the number of `totalTodos`.

```javascript
toggleAll: function() { 
  var totalTodos = this.todos.length;  
  var completedTodos = 0; 
  // Count number of completed todos  
  for (var i = 0; i < totalTodos; i++ ) {    
    if (this.todos[i].completed === true) {    
      completedTodos++    
    }  
  }  
  // Case 1: If everything’s true, make everything false  
  if (completedTodos === totalTodos) {    
    for (var i = 0; i < totalTodos; i++) {      
      this.todos[i].completed = false;  
    }  
  }
}
```

### Understanding the code

So first we check to see if the number of completedTodos is the same as the number of totalTodos. If that returns `true`, then we’ll go through and make all the items false.

In order to get the number of completedTodos in the first place, we use a `for` loop to count through our todos and check to see if completed is set to `true`, in which case we would update the number in our `completedTodos` variable.

### Test the code in the console

Now we can test the code to see if it’s working correctly. In the console add 2 new todos.

```javascript
todoList.addTodo('first');
todoList.addTodo('second');
```

This will return:

```javascript
My Todos:
( ) first
( ) second
```

Now toggle those 2 todos to completed with `todoList.toggleCompleted(0);` and `todoList.toggleCompleted(1);` to return:

```javascript
My Todos:
(x) first
(x) second
```

Finally, use `todoList.toggleAll();` to toggle both todos to `false`, in other words back to incompleted:

```javascript
My Todos:
( ) first
( ) second
```

That wraps up the first requirement of our v.6.0 app.

## Step 2: Otherwise, make everything true

The last requirement of version 6 is pretty simple as we’ve done most of the work already.

A big tip here; if you ever find yourself saying “Otherwise”, it’s the perfect time to use an `else` statement.

```javascript
toggleAll: function() {  
  var totalTodos = this.todos.length;  
  var completedTodos = 0;  
  // Count number of completed todos  
  for (var i = 0; i < totalTodos; i++ ) {    
    if (this.todos[i].completed === true) {      
      completedTodos++   
    } 
  } 
  // Case 1: If everything’s true, make everything false 
  if (completedTodos === totalTodos) {    
    for (var i = 0; i < totalTodos; i++) {      
      this.todos[i].completed = false;   
    }
    // Case 2: Otherwise, make everything true
  } else {    
    for (var i = 0; i < totalTodos; i++) {      
      this.todos[i].completed = true;   
    } 
  }
}
```

You’ll notice our `else` statement is almost identical to our `if` statement, except in this case we’re making everything `true` instead of `false`.

First we use the `for` loop to count through the todos, and then `this.todos[i].completed = true;` to set the todos to `true`.

### Test the code in the console

As we did before, add some todo items:

```javascript
todoList.addTodo('first');
todoList.addTodo('second');
```

Then run `todoList.toggleAll();`. This should make everything `true`.

```javascript
My Todos:
(x) first
(x) second
```

Run `todoList.toggleAll();` again and it should make everything `false`.

```javascript
My Todos:
( ) first
( ) second
```

Now test the final case, where some are `true` and some `false` to see if `toggleAll` sets all items to `true`.

So use `todoList.toggleCompleted(0);` to toggle the first item to `true`.

```javascript
My Todos:
(x) first
( ) second
```

Now, run `todoList.toggleAll();` again to toggle all to `true`:

```javascript
My Todos:
(x) first
(x) second
```

Great, our code is working as expected.

### v.6.0 Review

In this version we’ve had practice with `for` loops, accessing different properties on an object, going through items in an array. And linking functions together with `this.displayTodos();`.

We’ve also looked at keeping track of different variables we need inside `for` loops. This pulls a lot of the programming concepts we’ve learnt already together into one method.

This version should have given you a better idea of how you think about a program, think like a programer and figure out a feature to systematically write your code.

As we’ve done here you might start by writing out comments, then cases to help guide you as you’re coding.

Commenting your code will help you and others understand it better when you go back to it at a later date.
