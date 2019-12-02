+++
title = "Objects"
date = "2018-10-29T11:28:49+01:00"
slug = "practical-javascript-objects"
tags = ["JavaScript", "Coursenotes"]
description = "Objects allow you to group your functions together, so everything related to your todo list is in one place and easy to access."
syndicate = "false"
+++

This is Part 3 of my notes on Gordon Zhu’s [Practical JavaScript](https://watchandcode.com/p/practical-javascript). This part focuses on turning the standalone functions created in [part 2](notes/gordon-zhus-practical-javascript-functions/) to methods on an Object.

Objects are great for organisation and will allow you to group your functions together, so everything related to your todo list is in one place and easy to access.

## Building a todo app v3.0 -  What’s an Object?

You use Objects in Javascript to group related data and Functions together. Think about some real objects. Take your computer, for example.

Your computer is a thing, or an ‘object’. And it has a certain set of unique properties:

- operatingSystem mac
- screenSize 15 inches
- purchaseYear 2015

This is data that is related to a specific object: **myComputer**. Objects in Javascript are pretty much the same.

## Writing an Object

In Javascript, Curly braces can be used to group data in an Object:

```javascript
{  
  operatingSystem: 'mac', 
  screenSize: '15 inches',  
  purchaseYear: 2015
}
```

Each of these 3 things is called a `property`. Each property needs to be separated by a comma. The format of the property needs to contain a name and a value:

```javascript
propertyName: PropertyValue,
```

In other words:

```
operatingSystem: mac,
```

Any text value will need to be surrounded by quotes. A number doesn’t need quotes.

## Using an Object

To use an Object you will need to assign it to a Variable.

```javascript
var myComputer = {
  operatingSystem: mac, 
  screenSize: '15 inches', 
  purchaseYear: 2015
};
```

Then you can type the variable in the console to retrieve the entire Object:

`myComputer`

To print out a specific part of the Object. You can do that by aappending a period, then the property name to the variable like this:  

`myComputer.operatingSystem`

## Objects and Functions

Functions can be placed on Objects.

```javascript
var harry = {
  name: 'Harry',  
  sayName: function() {
    console.log(this); 
  }
}
```

It’s optional to name functions on Objects. Most programmers leave out the name. Instead we can access the function by the property name.

In other words,

```javascript
sayName: function sayName() {}
```

becomes:

```javascript
sayName: function(){}
```

You can use `this` to reference the Object you are on.

So, when you use `this` inside of a Function on an Object, `this` refers to the entire Object.

In this case, when we run our `sayName` Function: `harry.sayName` will print out the entire Object.

To print out a property on the Object, for example the name only, you can add `.name` to `this`

```javascript
var harry = { 
  name: 'Harry',  
  sayName: function() {
    console.log(this.name); 
  }
}
```

This pattern of putting a function on an Object is a common pattern in Javascript, and is referred to as ‘a Method’. A Method is simply a property which is equal to a Function.

In this case, `sayName` is a Method, on the `harry` Object.

**Remember, when you have a Function on an Object, you don’t need to give it a name as you can call it using the Property name. This is called an ‘Anonymous Function’.**

## Requirements

The requirements for this version is to put everything we’ve done so far onto an Object.

- It should store the todos array on an Object
- It should have a displayTodos method
- It should have an addTodo method
- It should have a changeTodo method
- It should have a deleteTodo method

This will help us organise our code better. So everything related to our todo list will be on a todoList Object.

## Step 1: Store Todos array on an Object

In the previous version of our app we stored our todos array in a variable:

```javascript
var todos = ['item 1', 'item 2', 'item 3'];
```

For this version we need to take our Array and put the data onto an Object.

```javascript
var todoList = {
  todos: ['item 1', 'item 2', 'item 3']
};
```

To access the data inside our program we need to give it a variable name, in this case `todoList`.

We can now type `todoList` in the console to retrieve the data.

## Step 2: Create displayTodos method

Next we need to change displayTodos from the standard function we made in [version 2](notes/parctical-javascript-functions):

```javascript
function displayTodos(){  
  console.log('My Todos:', todos);
};
```

…to a method on our new todos object:

```javascript
var todoList = {  
  todos: ['item 1', 'item 2', 'item 3'],
  displayTodos: function() {  
    console.log('My Todos', this.todos);
  }
};
```

To print out our todos on the console we type `todosList` followed by the `displayTodos` method, preppended with a dot:

```javascript
todoList.displayTodos
```

You should now see your todos.

### Things to note

One difference from [version 2](notes/parctical-javascript-functions) is that we’re now using an anonymous function, as functions don’t need to be named when they’re a method. This is because when we run the function we use the property name instead, in this case `displayTodos`.

Another difference is we’re now using `this.todos` instead of `todos`, as we no longer have the `todos` variable. The  `this.` keyword allows us to refer to the `todos` property on the object we’re on.

## Step 3: Create an addTodo method

Now we need to change the addTodo function:

```javascript
function addTodo(todo) {  
  todos.push(todo); 
  displayTodos();
}
```

…to an Method on our todoList Object:

```javascript
var todoList = { 
  todos: ['item 1', 'item 2', 'item 3'],
  displayTodos: function() {   
    console.log('My Todos', this.todos);
  }, 
  addTodo: function(todo) {  
    this.todos.push(todo);   
    this.displayTodos();  
  }
};
```

Now `todos` and `displayTodos` are on this Object, we need to prepend with the `this.` keyword to reference those two properties. Otherwise it works exactly the same, just using an anonymous function, like in the previous step.

Now you can use the addTodo method and add todos by typing:

```javascript
todoList.addTodo('New Todo');
```

Where ‘New Todo’ is the new value you would like to add.

## Step 4: Create a changeTodo method

Next we need to turn our changeTodo function:

```javascript
function changeTodo(position, newValue) {
  todos[position] = newValue;  
  displayTodos();
}
```

…into a method on our object:

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
  }
};
```

You should now start to see the pattern; when you want to reference something on an object, use `this.`, to refer to the object itself.

In this case we prefixed `todos` and `displayTodos` with `this.` because they are both already on the object.

Now change a todo by running the change todo method:

```javascript
todoList.changeTodo(0, 'first');
```

Where ‘0’ is the position of the todo (remember javaScript starts counting from  zero), and ‘first’ is the new value of the todo at position zero.

## Step 5: Create a deleteTodo method

Finally, we need to make our deleteTodo function:

```javascript
function deleteTodo(position) {    
   todos.splice(position, 1);  
   displayTodos();
 }
```

…into a method on our object:

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
  deleteTodo: function(postion) {
    this.todos.splice(position, 1);
    this.displayTodos();  
  }
};
```

Similar to before, to delete an item in the todo list, use the todoList object and prepend the deleteTodo method, specifying to position of the item you wish to delete:

```javascript
todoList.deleteTodo(1);
```

In this case we delete the second item.

By now you should see the pattern. The only real difference in a method on an object from a standalone function is that we need to add `this.`, so we can reference the appropriate data on the object. This is true for all our methods in our `todoList` object.

## v.3.0 Review

Now all our code is on an object, this is good for code organisation, as all code related to our `todoList` is grouped together.

We practiced writing methods, which are simply functions on objects.

Remember if you want to refer to the object itself, inside a method you need to use the `this` keyword, `this` refers to the entire method. Using the dot notation (the period; `this.`) allows us to reference different properties on this object.

## Next steps

Head over to [Watchandcode.com](https://watchandcode.com/p/practical-javascript) to take the course that these notes are based on.

I highly recommend Gordon’s teaching style to anyone who has struggled to grasp common JS principles in the past. Gordon uses some of the best examples I’ve seen to explain JavaScript.
