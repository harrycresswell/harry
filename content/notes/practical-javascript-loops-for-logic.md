+++
title = "Loops for Logic"
date = "2018-11-08T11:29:03+01:00"
description = "Build a todo app with Javascript, learn about using for loops for logic"
slug = "practical-javascript-for-loops"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

This is Part 5 of my notes on Gordon Zhu’s [Practical JavaScript](https://watchandcode.com/p/practical-javascript). In this part we changed the structure of an array from a text value to an object, modify a method to work with a text property and learn about Booleans.

## Building a todo app v.5.0

Using `for` loops and `if else` statements.

## Understanding the for loop

The `for` loop allows you to repeat a certain amount of code, any number of times. For example, if you wanted to tell a computer in english to say “hey” 3 times, this is how you might do it in 3 steps:

```javascript
i = 0
Say "hey" if i < 3
Increase i by 1
```

So whats going on here?

- Keep track of variable called `i`, which is zero first
- say “hey” if `i` is less than 3
- After that, increase `i` by 1

This might result in the following:

```javascript
0 "hey"
1 "hey"
2 "hey"
3
```

### Whats going on here?

- “hey” because zero is less than 3
- Then it would increase `i` by 1, and return 1 followed by “hey”, because 1 is still less than 3
- Then `i` would increase again by 1 and return 2, followed by “hey”, as 2 is still less than 3
- When `i` is increased by 1 and the value is 3, the computer stops returning “hey”, as `i` is no longer less than 3, it’s now equal to 3

### In Javascript these steps have specific names

In Javascript, the 3 steps outlined above have specific names.

```javascript
i = 0                  // Initialization
Say "hey" if i < 3     // Condition
Increase i by 1        // Final-expression
```

The first step is the **Initialization**, this is essentially a variable we create to keep track of how many times we want to do something. In this case we use zero to keep track of how many times we want to print “hey”.

The second step is known as the **Condition**. For example, if this is true, then keep going, otherwise stop. In the code above, the condition is “if `i` is less than 3”.

The third step is the **Final Expression**, this is what happens after each round. So after saying “hey” the first time, we’ll increase `i` by 1, after we increase `i` the second time, increase `i` by 1 and so on.

### Structuring in code

We can use the `for` loop to make this work in code:

```javascript
for (initialization; condition; final expression) {  
  console.log("hey");
}
```

With our steps from before, this looks something like:

```javascript
for (var i = 0; i < 3; i = i + 1) { 
  console.log("hey");
}
```

As it’s a common occurrence in Javascript, we can shorthand the final expression to `i++`, meaning `i = i + 1`.

```javascript
for (var i = 0; i < 3; i++) {
  console.log("hey");
}
```

## Looping over Arrays

Carrying on with the example from the last video, instead of printing “hey”, with `console.log`, we can actually just `console.log` our variable. In this case, `i`:

```javascript
for (var i = 0; i < 3; i++) {
  console.log(i);
}
```

Now our code will return the following:

```javascript
0
1
2
```

Next, let’s create a new array:

```javascript
var testArray = ['item 1', 'item 2', 'item 3']
```

Remember, you can access specific items in an array using the square brackets:

`testArray[0]`, for the first item, `testArray[1]` for the second, and so on. We can use this inside our `for` loop.

```javascript
for (var i = 0; i < 3; i++) {  
  console.log(testArray[i]);
}
```

By console logging our `testArray` with `i` as the parameter, we can loop through the 3 items in the array:

```javascript
item 1
item 2
item 3
```

The problem now is that using 3 in our `for` loop condition will only return the first 3 items.

It would be better to make the condition dynamic and return as many items as are in our array. We can do this with the `.length` property. `Length` will tell us how many items are in the array.

```javascript
for (var i = 0; i < testArray.length; i++) {
  console.log(testArray[i]);
}
```

Now if we add an item to `testArray`, so there’s 4 items in the array, it will be returned. If we kept using 3 as the condition, the fourth item wouldn’t be returned.

For example, add a new item with `testArray.push('extra item');`. Then run the original code and `extra item` will not be returned.

However run the updated code with `testArray.length` instead of the value 3 and `length` will check the number of items then return those items.

```javascript
item 1
item 2
item 3
extra item
```

Now, our code will work with `testArray` no matter how many items are in the array.

## Requirements

Version 5 will put into practice what we’ve learnt about `for` loops to fix our `displayTodos` method and make it a lot better.

- `.displayTodos` should show `.todoText`
- `.displayTodos` should tell you if `.todos` is empty
- `.displayTodos` should show `.completed`

## Step 1: displayTodods should show .todoText

The first requirement is that our `displayTodos` todos method should show the `todoText` property on each object in the `todos` array.

As we have to do some processing on each object in the array, we can use the `for` loop, as we want to repeat some code for every item in the array.

### Adding the for loop to our code

We can write the structure the `for` loop inside the `displayTodos` method, as we learnt before:

```javascript
displayTodos: function() { 
  console.log('My Todos', this.todos);  
  for (initialization; condition; final-expression) {
  }
}
```

This time, instead of using `testArray` which doesn’t make much sense now, we can use our `todos` array.

```javascript
displayTodos: function() {
  console.log('My Todos', this.todos);
  for (var i = 0; i < this.todos.length; i++) {
  }
}
```

### Making the for loop work

Say for example, `this.todos` has 3 items, in that case, the first time `i = 0`, the second `i = 1`, the third `i = 2`, then it will stop as `i` will equal 3 and the condition is no longer true. 3 is not less than 3 so the loop will end.

```javascript
displayTodos: function() {
  console.log('My Todos', this.todos);
  for (var i = 0; i < this.todos.length; i++) {
    // this.todos.length has 3 items
    // i = 0
    // i = 1
    // i = 2
  }
}
```

We can use the values of `i` to access specific items in the array. Remember, when you have an array you can get to a specific item using brackets, like this `this.todo[]`.

We can use `i` as the value inside the brackets to loop through the items.

```javascript
displayTodos: function() {
  console.log('My Todos', this.todos);
  for (var i = 0; i < this.todos.length; i++) {
    // this.todos.length has 3 items
    // i = 0
    // i = 1
    // i = 2
    this.todos[i];
  }
}
```

In our app we want to access the `todoText` property, which we can do using dot notation:

`this.todos[i].todoText`

By putting our code inside a `console.log` statement, we can display the items on the console:

```javascript
displayTodos: function() {
  console.log('My Todos', this.todos);
  for (var i = 0; i < this.todos.length; i++) {
    // this.todos.length has 3 items
    // i = 0
    // i = 1
    // i = 2
    console.log(this.todos[i].todoText);
  }
}
```

Finally we can remove `this.todos` from the first `console.log` statement, as this prints out objects to the console, which isn’t particularly useful.

Our final code (with comments removed) will look like this:

```javascript
displayTodos: function() {
  console.log('My Todos:');
  for (var i = 0; i < this.todos.length; i++) {
    console.log(this.todos[i].todoText);
  }
}
```

Before moving on, try adding a couple of todo items to see how these new changes work.

Add `todoList.addTodo('first');`, then `todoList.addTodo('second');`

This will return:

```
My Todos:
first
second
```

## Step 2: displayTodos should tell you if .todos is empty

Next we want `displayTodos` to tell us if the todos array is empty.

We can do this by adding some logic using an `if else` statement. This might work something like this:

```
// if there are no todos
  // console.log('Your todo list is empty!');
// else 
  // print todos as normal
```

We can make this more specific:


```
// if there are no todos
// if this.todos.length is equal to 0
  // console.log('Your todo list is empty!');
// else
  // print todos as normal
```

And more specific still:

```
// if there are no todos
// if this.todos.length is equal to 0
// if this.todos.length === 0  
  // console.log('Your todo list is empty!');
// else  
  // print todos as normal
```

Notice we’re using triple equals (`===`). This is the strictest form of comparison in Javascript. It’s the most consistent way of comparing values and the recommended way. You’ll sometimes see double equals (`==`) but it’s not that consistent so avoid using it for now.

### Translating this logic into Javascript

We can use the `if` keyword and then test a condition:

```javascript
if (condition) {  
  // run code here if the statement is true
}
```

For our purposes, that would look like this:

```javascript
if (this.todos.length === 0) { 
  console.log('Your todo list is empty!');
}
```

Then we can add the `else` statement if the condition is `false`:


```javascript
if (this.todos.length === 0) {  
  console.log('Your todo list is empty!');
} else {
  // print todos as normal
}
```

For our `else` statement we can use the code we wrote in step 1:

```javascript
if (this.todos.length === 0) { 
  console.log('Your todo list is empty!');
} else {
  console.log('My Todos:');
  for (var i = 0; i < this.todos.length; i++) {
    console.log(this.todos[i].todoText);  
  }
}
```

So now our `displayTodos` method should look like this:

```javascript
displayTodos : function() {
  if (this.todos.length === 0) {  
    console.log('Your todo list is empty!');
  } else {
    console.log('My Todos:');
    for (var i = 0; i < this.todos.length; i++) {
      console.log(this.todos[i].todoText); 
    }
  }
}
```

### Testing our work in the console

Next, head to the console to test everything is working correctly.

`todoList.displayTodos();` should now return `Your todo list is empty!`

Try adding a new todo, `todoList.addTodo('an item')` will return:

```
My Todos:
an item
```

Next, delete the todo with `todoList.deleteTodo(0);` to return `Your todo list is empty!` once again.

### Understanding the code

By adding some logic to our program we can check to see if this case is `true`, then run some code, otherwise run this code. with can do this with an `if` statement. The `if` statement uses the keyword `if` followed by a condition.

In our case, we’re using `if` to check to see if `this.todos.length` is equal to 0, which will be the case if there are no items in our todo list. If the case is true we will run the code `Your todo list is empty!`.
If the length is not 0, we will print our todos as normal. We can achieve this with the `else` statement using the `for` loop we wrote in Step 1.

### More on if statements and else

You can use `if` without else:

```javascript
if (condition) {
  // code that runs if condition is true
}
```

But with `else` it looks like this:

```javascript
if (condition) {
  // code that runs if condition is true
} else {
  // code that runs if condition is false
}
```

You can have as many `if` statements as you like.

## Step 3: displayTodos should show .completed

The final requirement for v5 is for `displayTodos` to show whether a todo has been completed or not.

We could represent that like this:

```
( ) item 1
(x) item 2
( ) item 3
```

Where a parentheses containing an x; `(x)` represents a complete todo item and an empty parentheses; `( )` represents a todo which is incomplete.

We can do this inside our `for` loop:

```javascript
for (var i = 0; i < this.todos.length; i++) {
  console.log(this.todos[i].todoText);
  // check if .completed is true       
    // print with (x)   
  // else      
    // print with ( )
}
```

### Translating this to Javascript

We can translate our notes into JavaScript like this:

```javascript
for (var i = 0; i < this.todos.length; i++) {      
  console.log(this.todos[i].todoText);     
  // check if .completed is true     
  if (this.todos[i].completed === true) {       
    // print with (x)   
  } else {       
    // print with ( )  
  }
} 
```

In the first part we check if `this.todos`.

Using `i`, we can look at the specific todo in this iteration of the loop.  

Then, we check the completed property, to see if it’s `true`. We can use the triple equals to do this.

### Representing complete and incomplete todos  

Lastly we need to print out the todo text for the specific object, with an `(x)` if completed is `true` and `( )` when completed is `false`.


```javascript
for (var i = 0; i < this.todos.length; i++) {
  if (this.todos[i].completed === true) {
    console.log('(x)', this.todos[i].todoText);
  } else {
    console.log('( )', this.todos[i].todoText);
  }
}
```

To do this we can `console.log(this.todos[i].todotext)`, just like we did at the top of the `for` loop.

We’ll just need to add the string values before hand. `(x)` for the first instance and the empty parenthesises; `( )`, in the `else` statement.

Now we can get rid of `console.log(this.todos[i].todotext)` at the top of the `for` loop as we’re now doing this work inside the `if else` statement.

### Testing our work in the console

Now we can add a few todos.

```javascript
todoList.addTodo('first');
todoList.addTodo('second');
todoList.addTodo('third');
```

You should see these print out with an empty parenthesises as none of them have been completed.

```
My Todos:
( ) first
( ) second
( ) third
```

Now we can use `toggleCompleted` to see if we can change some of our todo items to complex.

To toggle our second todo we can use:

`todoList.toggleCompleted(1);`

Which will return:

```
My Todos:
( ) first
(x) second
( ) third
```

We can toggle it again by repeating the same step.

`todoList.toggleCompleted(1);` will now return:

```
My Todos:
( ) first
( ) second
( ) third
```

### Interesting observations

This step combined `for` loops with `if else` statements.

For each `for` loop we used logic to check if `todo.completed` is `true` – in which case we do one thing – or if it’s `false`, in which case we do something else.

## v.5.0 Review

`.displayTodos` now shows `todoText` and not just the objects like before. It also tells us if our todo list is empty with a helpful message. And whether or not a todo has been completed.  

We wrote all our code in this version inside one method, `displayTodos`.

We combined `for` loops with `if` statements, so we can use logic in our program.

## Next Steps

Head over to [Watchandcode.com](https://watchandcode.com/) to take the course that these notes are based on.
