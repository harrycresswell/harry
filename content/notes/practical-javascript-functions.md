+++
title = "Functions"
date = 2018-07-30T09:40:59+01:00
slug = "parctical-javascript-functions"
tags = ["JavaScript", "Coursenotes"]
description = "Functions are like recipes; a set of instructions which can be given to someone so they know exactly what to do or how to make something."
syndicate = "false"
+++

This is Part 2 of my notes on Gordon Zhu’s [Practical JavaScript](https://watchandcode.com/p/practical-javascript), in this part we focus on improving our Todo App by using Functions to make our commands easier to write. Here’s [Part 1](notes/practical-javascript-arrays/) incase you missed it.

## Building a todo app v2.0

{{< blockquote quote="“Functions are recipes”" cite="Gordon Zhu" >}}

Functions are like recipes; a set of instructions which can be given to someone so they know exactly what to do or how to make something.

The point of a Function is to save you time, by distilling a long list of instructions into a single command:

```
makeTurkeySandwich
  Get one slice of bread
  Add turkey
  Put slice of bread on top
```

In Javascript that would look something like:

```javascript
function makeTurkeySandwich(){
  Get one slice of bread;
  Add turkey;
  Put slice of bread on top;
};
```

To run every step within a function use:

```javascript
makeTurkeySandwich();
```

## Customising functions

Instead of writing several functions for each recipe (e.g turkey, ham, beef) we can use one function and customise the filling by using a variable.

```
makeSandwichWith ________
  Get one slice of bread;
  Add _______;
  Put slice of bread on top;
};
```

In JS:

```javascript
function makeTurkeySandwich(filling){
  Get one slice of bread;
  Add filling;
  Put slice of bread on top;
};
```

The `filling` variable is whats know as a **Parameter**.

```javascript
makeSandwichWith("ham");
```

When using the function the variable is what’s known as an **Argument**.

## Requirements

In this project we want to do the following:

- It should have a function to display todos
- It should have a function to add new todos
- It should have a function to change a todo
- It should have a function to delete a todo

Our functions will simplify complex tasks; turning a list of instructions into one simple command.

## Step 1: Display Todos

In the console:

```javascript
var todos = ["item1", "item2", "item3"];

function displayTodos() {
  console.log("My Todos:", todos);
}
```

_Tip: to create multiple lines in Console use `shift` + `enter`_
Then hit enter. Now the function is ready to use.

To display todos call the function with:

```javascript
displayTodos();
```

The function will now display:

```javascript
My todos: ['item1', 'item2', 'item3']
```

## Step 2: Add new Todos

To add new todos to the Array of todos, first create a new function called `addTodo` and use the `push` method from version 1:

```javascript
function addTodo() {
  todos.push("new todo");
}
```

`addTodo()`

This will add `new todo` to the array of todos. To see the updated Array use the `displayTodos` function:

```javascript
displayTodos();
```

Hit enter and you should see:

```
My todos: ['item1', 'item2', 'item3', 'new todo']
```

### Functions within functions

Now we can add the `displayTodos` function to the `addTodos` function. This way we can immediately see our updated todos Array right after we run `addTodos`.

Press the up arrow a few times to pull up the addTodo function. At the end of the first statement add the `displayTodos` function:

```javascript
function addTodo() {
  todos.push("new todo");
  displayTodos();
}
```

### Parameter in Functions

So we don’t keep adding `new todo` to the Array each time we use our `addTodo` function, create a new variable (parameter) to customise the todo.

We can call it `todo`:

```javascript
function addTodo(todo) {
  todos.push(todo);
  displayTodos();
}
```

Now when we run the function we need to parse an argument.

```javascript
addTodo("hello there");
```

Hit enter and you should see:

```
My todos: ['item1', 'item2', 'item3', 'new todo', 'hello there']
```

In this part we’ve learnt how to customise functions with parameters and how to use those parameters. And how to use functions within functions.

## Step 3: Change a Todo

Create a function to change our todo:

```javascript
function changeTodo() {
  //statement goes here
}
```

If we used the method from [Version 1], our function might look something like:

```javascript
function changeTodo() {
  todos[0] = "some new value";
}
```

But we will need more flexibility in order to target a specific todo item, as currently `0` will only target the first todo item.

We can use parameters again to customise the behaviour of our function.

The 2 parts we need to customise are:

- the item
- the value

Luckily functions can take multiple parameters:

```javascript
function changeTodo(position, newValue) {
  todos[position] = newValue;
}
```

Now hit enter to save the `changeTodo` function.

To change the first todo item we can use our function and parse the `position` parameter, in this case `0` and then the `newValue` parameter. In this case we’ll call it ‘changed‘.

```javascript
changeTodo(0, ‘changed’)
```

You should now see:

```
My todos: ['changed', 'item2', 'item3', 'new todo', 'hello there']
```

As before, we can automatically display the updated todo item Array by adding the `displayTodos` function after the first statement.

```javascript
function changeTodo(position, newValue) {
  todos[position] = newValue;
  displayTodos();
}
```

Run the function to display the changed Todo. this time call the first item `changed again`:

```javascript
changeTodo(0, ‘changed again’)
```

You should now see:

```
My todos: ['changed again', 'item2', 'item3', 'new todo', 'hello there']
```

To recap, we wrote a change todo function which takes 2 parameters, `position` and `newValue`. We used the `displayTodos` functions to see the changes.

## Step 4: Delete a todo

As before, create a new function to delete todos:

```javascript
function deleteTodo() {
  // statement goes here
}
```

Using the `splice` method/command from [Version 1] we can set the ‘position’ and the ‘number of items’ we want to delete.

```javascript
function deleteTodo() {
  todos.splice(0, 1);
}
```

Again, to make this flexible we can use custom parameters like we did last time:

```javascript
function deleteTodo(position) {
  todos.splice(position, 1);
  displayTodos();
}
```

Remember to add the `displayTodos` function so we can see what’s happened.

Now run the function and delete the first item from the item Array:

```javascript
deleteTodo(0);
```

You should now see:

```
My todos: ['item2', 'item3', 'new todo', 'hello there']
```

Now let’s delete `new todo`, the 3rd item in the todos Array.

Remember computers start counting from 0, so this will be item 2 in our Array.

Run `deleteTodo(2)`

You should now see:

```
My todos: ['item2', 'item3', 'hello there']
```

## v2.0 Review

- ~~It should have a function to display todos~~
- ~~It should have a function to add new todos~~
- ~~It should have a function to change a todo~~
- ~~It should have a function to delete a todo~~

What we’ve learnt so far:

First we created our Todos Array so we have some data to work with:

```javascript
var todos = ["item 1", "item 2", "item 3"];
```

Then we created a function to _display todos_:

```javascript
// It should have a function to display todos
function displayTodos() {
  console.log("My Todos:", todos);
}
```

This logged out the list of todos.

Then we created a function to _add todos_ which took a parameter, so we could provide a value for the new todo:

```javascript
// It should have a function to add todos
function addTodos(todo) {
  todos.push(todo);
  displayTodos();
}
```

This way we can write `addTodo('new todo')` to create a new todo called ‘new todo’. Adding the `displayTodos`function allows us to see our changes.

From here we crated a _change todo_ function, to allow us to make changes to existing todos in the Array. this function took 2 parameters, for position and value:

```javascript
// It should have a function to change todos
function changeTodo(postion, newValue) {
  todos[position] = newValue;
  displayTodos();
}
```

We displayed todos again so we can immediately see the changes.

Finally we create a simple function to delete todos which too 1 parameter:

```javascript
// It should have a function to delete todos
function deleteTodos(position) {
  todos.splice(position, 1);
  displayTodos();
}
```

Todo app v2.0 done!

## Next Steps

[Part 3](practical-javascript-objects) looks Objects, what they are and at how we can use them to improve our todo list app. We’ll turn the functions we’ve made so far into methods on an Object.

Head over to [Watchandcode.com](https://watchandcode.com/p/practical-javascript) to take the course. I highly recommend Gordon’s teaching style to anyone who has struggled to grasp common JS principles in the past. Gordon uses some of the best examples I’ve seen to explain JavaScript.
