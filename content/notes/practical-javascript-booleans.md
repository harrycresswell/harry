+++
title = "Booleans"
date = "2018-11-03T19:42:02+01:00"
description = "Build a todo app with Javascript, learn about Boolean values."
slug = "practical-javascript-booleans"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

This is Part 4 of my notes on Gordon Zhu’s [Practical JavaScript](https://watchandcode.com/p/practical-javascript). In this part we changed the structure of an array from a text value to an object, modify a method to work with a text property and learn about Booleans.

## Building a todo app v4.0 - Understanding Booleans

Booleans are a representation of `true` or `false`.

## Requirements

- `todoList.addTodo` should add objects
- `todoList.changeTodo` should change the todoText property
- `todoList.toggleCompleted` should change the completed property

## Step 1: todoList.addTodo should add objects

First we need to change the addTodo method from adding text items like this:

```javascript
['item 1', 'item 2', 'item 3']
```

…to adding objects like this:

```javascript
{ todoText: 'item 1', completed: false // Boolean true or false}
```

We want to do this so we can add as many properties as we like. The first property we want is a text value, for example the text we want to add.

The second property is our Boolean value. This will tell us whether the todo has been completed on not. When you first add a todo it most likely won’t be done yet so we can use `false` as the default stated of `completed`.

Later when we go through our todos and mark as completed this value will change to `true`. As this data requires a `true` or `false` value, representing it with a Boolean is the way to go.

### Updating our code from v.3.0

This is where we left off in our version 3 app.

```javascript
var todoList = {
  todos: ['item 1', 'item 2', 'item 3'], 
  displayTodos: function() {   
    console.log('My Todos', this.todos);
  }, 
  addTodo: function(todo) { 
    this.todos.push(todo);  
    this.displayTodos();  
  }, 
  changeTodo: function(position, newValue) {   
    this.todos[position] = newValue;   
    this.displayTodos();
  },
  deleteTodo: function(position) { 
    this.todos.splice(position, 1);   
    this.displayTodos();
  }
};
```

First step is to remove the items in our existing array, as we now want to use an object instead.

In the code above, change:

```javascript
todos: ['item 1', 'item 2', 'item 3'],
```

to the following:

```javascript
todos: [],
```

Next we need to modify our `addTodo` function. Find the code which reads:

```javascript
addTodo: function(todo) {   
  this.todos.push(todo);   
  this.displayTodos(); 
},
```

And change it to:

```javascript
addTodo: function(todoText) {  
  this.todos.push({   
    todoText: todoText,    
    completed: false
  });
this.displayTodos();
},
```

A few things to note in our new code:

- We’re now using `todoText` as our parameter instead of `todo`. This will will also be a text value but more representative of the data in our object, which is next.
- Now instead of using the `push` method to add `todo`, we’re adding the object with 2 properties; `todoText` and `completed` which is our Boolean value.
- Remember; first `todoText` is the name of the property, whereas the second `todoText` is referring to the `todoText` parameter, which will change depending on what we parse in when we use the method.  

For example if we write `addTodo('hi');` the value of `todoText` will be `'hi'`:

```javascript
this.todos.push({   
  todoText: ''hi,    
  completed: false
});
```

### Using todoList.addTodo

Typing `todoList.addTodo('this is an object')` will now represent the data in an object. Where `todoText` is given the value `'this is an object'` and `completed` has the value of `false`.

### Why are we doing this?

We want our todos to show more data, we want to have a text description; the `todoText` property and also another property to show whether the todo has be done or not; `completed`. We’re using a Boolean value to represent that.

## Step 2: todoList.changeTodo should change to todoText property

Now we need to make sure the `changeTodo` method only changes the `todoText` property on each todo object.

This is because `addTodo` now adds objects to our array, and those objects have 2 properties; `todoText` and `completed` – the boolean true or false value.

### Updating the newValue parameter

First, we need to update the `newValue` parameter to something more descriptive, so its more clear whats happening. As we just want to change the todoText property, we can call it `todotext`.

So, find the `newValue` parameter in the code and change it to `todoText`.

```javascript
changeTodo: function(position, newValue) {
  this.todos[position] = newValue;   
  this.displayTodos();
},
```

Your code should now look like this:

```javascript
changeTodo: function(position, todoText) {
  this.todos[position] = newValue;   
  this.displayTodos();
},
```

### update this.todo position to reference the todoText property in the object

Next we need to modify `this.todo[position] = newValue`.

This is because `newValue` is no longer the parameter parsed in, it’s now `todoText`.

As `todoText` is now a property on the object (in addTodo), we can get at it using the dot notation:

`this.todo[postion].todoText = todoText`

In our changes above, `.todoText` grabs the `todoText` property on the object, and assigns it to the new value which is parsed in; `todoText`.

Our new code should look like this:

```javascript
changeTodo: function(position, todoText) {  
  this.todos[position].todoText = todoText;   
  this.displayTodos();
},
```

So to recap, the reason we’re doing this is because the structure of our data has changed from simple text values to an object structure.

## Step 3: todoList.toggleCompleted should change value of completed property

Now we need to add a new method called toggleCompleted which switches the value of the completed property.

Remember, completed is a Boolean value, so if it’s set to `false` (as default), toggleCompleted will change it to `true`, and if it’s `true` it should change to `false`.

### The Bang Operator

In Javascript, the Bang Operator (!) takes the opposite of whatever comes after it.

For example:

We can get the opposite of `true` with `!true`, which returns `false`. Where `!false` returns `true`.

We can take this a step further:

```javascript
var harryBoolean = false;
```

In this case `!harryBoolean` will return `true`. What if we set `harryBoolean` to the opposite of itself:

```javascript
harryBoolean = !harryBoolean
```

With the exclamation point we can take the current value of a variable and switch it to the opposite value. We can use this technique in our `toggleCompleted` method.

### Adding the toggleCompleted method

Now let’s put this into practice and write a new method for `toggleCompleted`:

```javascript
toggleCompleted: function(position) {  
  var todo = this.todos[postion];
  todo.completed = !todo.completed;    
  this.displayTodos();
}
```

So, whats going on here?

## Breaking down the code

First we add our new method fo `toggleCompleted`, and give it a position so we can target the specific todo we want to modify:

```javascript
toggleCompleted: function(position) {
}
```

Next, we create a reference to our `todo` in the form of a variable. This will save us from having to write this repetitive code in 2 different places. You’ll see what I mean in the line that will follow.

```javascript
toggleCompleted: function(position) {
  var todo = this.todos[position];
}
```

Now, we flip the value of `todo.completed`, by grabbing the value of `todo.completed` and setting it to the opposite of the current value using the bang operator. So if the value is `false` it will be `true` and if it’s `true` it will be `false`.

```javascript
toggleCompleted: function(position) {
  var todo = this.todos[position];
  todo.completed = !todo.completed;
}
```

Finally we add the ability to display our updated changes with `displayTodos`, again using `this` to target the displayTodos method.

```javascript
toggleCompleted: function(position) {
  var todo = this.todos[position];
  todo.completed = !todo.completed;
  this.displayTodos();
}
```

## v.4.0 Review

In `todoList.addTodo` we changed the structure of the array to be an array of objects, rather than text, this allowed for a text value and a boolean value, to specify whether the todo has been completed.

Next, we modified the `todoList.changeTodo` method so it only modifies the `todoText` property on each todo object.

Lastly we learnt about Booleans and how to take the opposite of a boolean value in our new `toggleComplete` method.

## Next Steps

Head over to [Watchandcode.com](https://watchandcode.com/) to take the course that these notes are based on.
