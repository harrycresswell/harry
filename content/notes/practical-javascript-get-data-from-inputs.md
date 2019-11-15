+++
title = "Getting data from inputs"
date = "2019-01-07T12:43:51Z"
description = "Build a todo app with Javascript, learn how to refactor your code and grab data from inputs"
slug = "practical-javascript-refactoring-code"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

This is Part 8 of my notes on Gordon Zhu’s [Practical JavaScript](https://watchandcode.com/p/practical-javascript). 

In this version of our todo list app we start by learning about refactoring and how it can help improve our code. Then we look at how to fetch data from input elements in our html.

## What is Refactoring?

Refactoring is the process of restructuring existing code without changing it’s external behaviour. It improves the non-functional attributes of the software.

In our case when we refactor our code, it will work exactly as before but it will make it more readable, organised and easier to understand.

## Reviewing our code

Previously when we grabbed the buttons inside our HTML we retrieved an `id` attached to our buttons using `getElementById`. And used `addEventListener` to watch for clicks.

```javascript
var displayTodosButton = document.getElementById('displayTodosButton');
var toggleAllButton = document.getElementById('toggleAllButton');

displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
});

toggleAllButton.addEventListener('click', function() {
  todoList.toggleAll();
});
```

This is a common way to connect JavaScript to a user interface, however in our case it adds a lot of repetitive extra code and unnecessary complexity, as we will need to write similar code for several buttons.

Instead we can use a different way which will allow us to remove the `id`’s for each button, drop the varibales and remove the `addEventListener` `'click'` function.

## Refactoring our buttons

In our `html` we can start by removing the `id`’s from our buttons.

```html
<button>Display Todos</button>
<button>Toggle All</button>
```

Instead we can replace these `id`’s with the `onclick` attribute.

```html
<button onclick="">Display Todos</button>
<button onclick="">Toggle All</button>
```

The `onclick` attribute works similar to our `addEventListener` code in our JavaScript.

`onclick=""` provides another way to run a function when our button is clicked. Inside the quotes, we can specific the name of the function we want to run.

As we don’t have a function yet we’ll need to create that next.

## Creating a new object to handle functions

Back in our JavaScript, we need a way to access our functions which run `displayTodos` and `toggleAll`. To do this we can create a new object called `handlers`.

```javascript
var handlers = {

};
```

The reason it’s called `handlers` is that we want the methods on this object to handle different click events. For example when you click on this button we want something to handle that event. We’ll put all methods that handle different events inside this object.

Start by creating a new method for `displayTodos`, making it equivilent to the function we wrote in the previous version.

```javascript
var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  }
};
```

Next we need to create another method, this time for `toggleAll`. Again we can use the function from before.

```javascript
var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};
```

Now we have these methods defined on the `handlers` object we can access them from our `html`.

## Running functions onclick

Back in our `html`, inside `onclick=""` we can add the name of the object followed by the method to access the function. Remember the parentheses in order to run the function.

```html
<button onclick="handlers.displayTodos()">Display Todos</button>
<button onclick="handlers.toggleAll()">Toggle All</button>
```

## Comparing original and refactored code

Refectoring doesn’t change the way the code works, it just makes it more organised and readable. They are non-functional changes.

Looking back at our original code you can see there is a lot more of it than what we have now we’ve refactored it.

```javascript
var displayTodosButton = document.getElementById('displayTodosButton');
var toggleAllButton = document.getElementById('toggleAllButton');

displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
});

toggleAllButton.addEventListener('click', function() {
  todoList.toggleAll();
});
```

The orginal code was a lot more complicated and harder to understand. Now we’re no longer using `getElementById` and we no longer have `id`’s. We’ve also got rid of our `addEventListener` code.

Now we just have methods on an object, our code is shorter and easier to understand.

```javascript
var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};
```

If we look at the original `html` we had 2 `id`’s which didn’t make it clear what happens when you click the button. Our `id`’s simply name the button.

```html
<button id="displayTodosButton">Display Todos</button>
<button id="toggleAllButton">Toggle All</button>
```

In our refactored code the `onclick` attribute gives us an idea of what happens when the button is clicked. It’s more descriptive as you know the `displayTodos` or `toggleAll` method is supposed to run when the button is clicked.

```html
<button onclick="handlers.displayTodos()">Display Todos</button>
<button onclick="handlers.toggleAll()">Toggle All</button>
```

This is a clearer way to write our code and avoids the use of repetitive code.

It’s important to note that the refactoring we’ve done here works well in this case but that might not always be true. Using the `onclick` attribute is very specific and can only handle one event.

Often you’ll see the prefered `addEventListener` method used as it’s more flexible and can handle many different events. The thing to rememebr is theres no strict better way of doing things, it’s often a judgement call.

## Requirements v8

- It should have working controls for `.addTodo`
- It should have working controls for `.changeTodo`
- It should have working controls for `.deleteTodo`
- It should have working controls for `.toggleCompleted`

What makes these different from `displayTodos` and `toggleAll` is that they each need an input, as they all require an arguement.

For example, the user will need to type some text when adding a new todo.

Now we require data to be added we need to add inputs to make this possible.

### There should be a button for adding todos

In our `html` we need to add a new button for adding todos. We will also need an input so we can collect the data for the user. In this case the data is text for a new todo item.

```html
<button onclick="">Add</button>
<input id="addTodoTextInput" type="text">
```

We can add the `onclick` attribute to the button so we can run the `addTodo` function, which we’ll get to next.

Notice we’re using `type="text"` property on our `input` to specifiy the type of data we want to collect. We’ve also added an `id` so we can access the `input` data in our JavaScript.

Back in our JavaScript, we can start by adding a `addTodo` method on our `handlers` object, to handle clicks on our add todos button.

```javascript
var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
  },
  addTodo: function() {
    // addTodo function here
  }
};
```

To make our method do something, first we need to get hold of the `id` on our new input. We can use `getElementById` and save it to a variable.

```javascript
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');

  }
```

Now we have access to the input we can grab the  `todoList` object and access the `addTodo` method on that.

```javascript
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo();
  }
```

As the `addTodo` method takes the `todoText` argument, we can parse in the `addTodoTextInput` element as the parameter, using `.value` to grab the value of whatever is typed into the input.

```javascript
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
  }
```

Finally, we need to tell the program to run the function when you click on the add todo button. To do this we can go back to our `html` and update the `onclick` attribute on the button.

```html
<button onclick="handlers.addTodo()">Add</button>
```

If you try out the input and add a new todo, you’ll notice the input field doesn’t clear after we add a new todo. To fix this we can grab the `addTodoTextInput` and set the value to an empty string.

```javascript
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  }
```

This will reset the input field to nothing after the code runs.

## There should be a button for changing todos

In our `html` we need to create another button, with an `onclick` attribute which runs our `changeTodo` function.

 This time we also need two inputs. The first `input` will take the value of the todo position and the second will take the todo text value.


```html
<button onclick="handlers.changeTodo()">Change Todo</button>
<input id="" type=""/>
<input id="" type=""/>
```

Now we need to add an `id` and `type` for the position `input`. We give `type` the value of `number` so we can collect number data.

We can do the same for the text `input` but this time we need to give `type` the value of `text`.

```html
<button onclick="handlers.changeTodo()">Change Todo</button>
<input id="changeTodoPositionInput" type="number"/>
<input id="changeTodoTextInput" type="text"/>
```

### Create method on handlers for changeTodo

Now back in our JavaScript we need to set up a method on our `handlers` object which runs our changeTodo function when someone adds data to change a todo.

As before we can create a variable which uses `getElementById` to access the `id` on the `input`. This time we’ll need 2 variables for each `input`.

```javascript
changeTodo: function() {
  var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
  var changeTodoTextInput = document.getElementById('changeTodoTextInput');
}
```

Next we want to run our `changeTodo` method on the `todoList` object, which takes a `position` and `todoText` parameter. Position in this case is a number value.

Before we used `.value` to access the data. This will work for our text input, but it won’t for our number input. The reason is because `.value` grabs a string of text.

Instead we can use the `valueAsNumber` property to grab the number data from our `input`.

```javascript
changeTodo: function() {
  var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
  var changeTodoTextInput = document.getElementById('changeTodoTextInput');
  todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
}
```

Finally we’ll need to clear the `input` values at the end of the method in order to reset the input to an empty state.

To do this we just need to set the value property on both `input`’s to any empty string.

```javascript
changeTodo: function() {
  var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
  var changeTodoTextInput = document.getElementById('changeTodoTextInput');
  todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
  changeTodoPositionInput.value = '';
  changeTodoTextInput.value = '';
}
```

If everything is working correctly you should now be able to add a new todo item then change it.

## There should be a button for deleting todos

First we need to build the user interface. As before we’ll need a `button` and this time only one `input`.

We want to run a function inside our JavaScript when the button is clicked so we can use `onclick` and parse in the method on our `handlers` object. This method doesn’t actually exist yet but we’ll make it a bit later.

We then need to add information to the `input`. First a descriptive `id` as before, this will allow us to access the data in our JavaScript. Then we add  `type="number"` so we can collect a number, representing the position of the todo which needs to be deleted.

```html
<button onclick="handlers.deleteTodo()">Delete</button>
<input id="deleteTodoPositionInput" type="number" />
```

In our JavaScript we’ll need to write a new method on our `handlers` object.

The pattern is very similar as before. We first need to grab the input for  the position of the item to delete. We can do this with `getElementById`, parsing in the `id` and storing this in a variable.

```javascript
deleteTodo: function() {
  var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
}
```

Next we want to run the `deleteTodo` method on our `todoList` object.

```javascript
deleteTodo: function() {
  var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
  todoList.deleteTodo();
}
```

If we take a look back at the `deleteTodo` method we can see it takes a `position` parameter. In this case can use the number value from our `input`. As it has to be a number we need to use `.valueAsNumber` to grab the data.

```javascript
deleteTodo: function() {
  var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
  todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
}
```

Finally we will need to clear the `input`   once the code has run, so the previous value doesn’t remain in the `input` box. We do this using an empty string.

```javascript
deleteTodo: function() {
  var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
  todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
  deleteTodoPositionInput.Value = '';
}
```

We can check our code is working by adding a new todo item then deleting it.

Hopefully now you can see a pattern forming with our code.

We start by building the user interface, then write the method in our JavaScript. In
this case our `deleteTodo` method grabs the input, and parses the input value into our `deleteTodo` method on our `todoList`object. Then it clears the input field when it’s done.

## There should be a button for toggling a todo

The `toggleCompleted` feature will almost be the same as `deleteTodo`.

First we start with the user interface. So in the `html` we need a `button` and an `input`.

As before we need an `onclick` attribute on our button. We haven’t written the method yet but it will be on our `handlers` object and be called `toggleCompleted`.

Our `input` needs an `id` and a `type` of `number`. This is because `toggleCompleted` takes a position of the item you want to toggle.

```html
<button onclick="handlers.toggleCompleted">Toggle Completed</button>
<input id="toggleCompletedPositionInput" type="number" />
```

Now we can move into our JavaScript. We start with a new method; `toggleCompleted`.

```javascript
toggleCompleted: function() {

}
```

First we want to grab the `input` and store in a variable.

```javascript
toggleCompleted: function() {
  var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
}
```

Next we want to make a call to the method on our `todoList` object. Parsing the number value from our `input` to set the postion.

```javascript
toggleCompleted: function() {
  var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
  todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
}
```

Finally we need to clear the `input`, which we can do by setting the value to an empty string.

```javascript
toggleCompleted: function() {
  var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
  todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
  toggleCompletedPositionInput.value = '';
}
```

Now we can add an item to see if it works. Enter the position of the item and hit the toggle completed button. If all went well we should see the following output in the console.

```
My Todos:
(x) new todo item
```

Hit the button again and we should see:


```
My Todos:
( ) new todo item
```

## Review v8

In version 8 of our application we looked at how we can effectively use `input`’s and get data from users. So we can use that data in our application.

We learnt how to access different both `text` and `number` data types using `.value` and `.valueAsNumber` properties.

We’re starting to see how using objects is an effective way of organising our code. Now we have all of our handler methods on a `handlers` object. This is a good way to group code related to our user interface. 
