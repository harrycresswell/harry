+++
title = "HTML and the DOM"
date = "2018-11-25T12:14:41+01:00"
description = "Build a todo app with Javascript,learn about the Document Object Model and begin building the front-end HTML to allow users to interface with our application"
slug = "practical-javascript-html-dom"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

This is Part 7 of my notes on Gordon Zhu’s [Practical JavaScript](https://watchandcode.com/p/practical-javascript). In this part we learn about the Document Object Model and begin building the front-end HTML to allow users to interface with our application.  

## Building a todo app v.7.0

In version 7, we want to start building a user interface that people can interact with, type into, click on etc, so they don’t have to work on the console.  We’ll start by creating 2 buttons which run 2 of our methods.

## Requirements

- There should be a “Display todos” button and a “Toggle all” button in the app.
- Clicking “Display todos” should run `todoList.displayTodos`
- Clicking “Toggle all” should run `todoList.toggleAll`

## What is the DOM?

Where HTML is plain text which gives the browser information about whats on the page. The Document Object Modal (DOM) is the browsers interpretation of the HTML.

The browser uses the information in your HTML to build an understanding of what the document looks like.

If you’ve ever right clicked on your website and hit Inspect Element, you will see how the browser has interpreted your document. The code the browser reveals is the DOM.

In other words, the DOM represents the HTML code you write and provides a way to interact with the HTML objects.

The DOM tree is how the nodes in each HTML document are organised. Think of this as a family tree, full of parents, siblings and children. The nodes are essentially the HTML tags you write. When you Inspect Element and drill down through the different levels of your HTML code you are moving through the DOM tree.

The distinction between plain HTML and the DOM is subtle but it’s important to understand the difference.

## Step 1: There should be “Display todos” and “Toggle all” buttons in the app

First we need to go into our HTML document and create 2 buttons, one for displaying todos and one for toggling all todos.

Inside the body tags, we can write:

```html
<button>Display Todos</button>
<button>Toggle All</button>
```

## Step 2: Clicking “Display todos” should run todoList.displayTodos

Next we need our new display todos button to run the `todoList.displayTodos` method we made previously.

In our JavaScript code we can start by writing out some comments for what we want to happen.

```
// 1. We want to get access to the display todos button.
// 2. We want to run displayTodos method, when someone clicks the display todos button
```

### Creating a reference to the button

Starting with the first requirement, we can create a new variable called `displayTodosButton` so we can reference the button.

Then, in order to access the DOM, we can use the `document` object, which is built into JavaScript. The `document` object has methods on it that allow you to select a specific element. One of these methods is called `getElementById` which will grab an `id` on an element.

```javascript
// 1. We want to get access to the display todos button.
var displayTodosButton = document.getElementById();
```

In order for the `getElementById` method to run we will need to head back to our HTML and add an `id` to our display todos button.

```html
<button id="displayTodosButton">Display Todos
</button>
```

This will allow us to reference this specific button in our JavaScript:

```javascript
// 1. We want to get access to the display todos button. 
var displayTodosButton = document.getElementById('displayTodosButton');
```

### Moving script.js references to the end of the page

Now our code will grab the button we want. Let’s add a `console.log` to our code to check it‘s working correctly.

```javascript
// 1. We want to get access to the display todos button. 
var displayTodosButton = document.getElementById('displayTodosButton'); console.log(displayTodosButton);
```

If we run our code you might well see an error, this is likely because of how we’re loading the JavaScript. Check to see if your link to `script.js` is inside the `<head>` of your document. If it is, remove it from the head and move it just above the closing `</body>` tag.

```html
<script src="script.js"></script>
</body>
```

Now the browser can see the `id` in the HTML document before it runs the JavaScript code. Whereas before, we were loading the JavaScript before the browser parsed the HTML, which is no good.

This time when we run the code, our error should have disappeared and instead we see

```html
<button id="displayTodosButton>Display Todos</button>
```

Great, our code is working as expected.

### run displayTodos method

Now we can focus on our second requirement. Here we want to run the display todos method when someone clicks the displays todo button.

First, we grab our `displayTodosButton` variable, then add an event listener, which allows us to do something when an even happens. We can use the `addEventListener` method for this.

In this case we’re listening for anytime someone clicks the button, and when that happens it runs a function which runs the `displayTodos` method.

```javascript
// 1. We want to get access to the display todos button.

var displayTodosButton = document.getElementById('displayTodosButton');
console.log(displayTodosButton);

// 2. We want to run displayTodos method, when someone clicks the display todos button.

displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
  });
```

Now we can run our code to make sure its working. If all went well the console should return `“Your todo list is empty!”`

Now we can clean up our code by removing the comments and the `console.log`.

```javascript
var displayTodosButton = document.getElementById('displayTodosButton');
displayTodosButton.addEventListener('click', function() { 
  todoList.displayTodos();
});
```

## Step 3: Clicking “Toggle all” should run todoList.toggleAll

The toggle all button will work exactly the same.

First we need to get a reference to the toggle all button via an `id`, so we start by giving the button an `id`.

```html
<button id="toggleAllButton">Toggle All</button>
```

Next we need to grab the button, so create the variable `toggleAllButton` and use the `getElementById` method as before and parse in the `id` we just created.

```javascript
var toggleAllButton = document.getElementById('toggleAllButton');
```

Next we need to add the event listener to it, to listen for clicks.

```javascript
var toggleAllButton = document.getElementById('toggleAllButton');
toggleAllButton.addEventListener('click', function () {
  todoList.toggleAll();
});
```

Now try adding some todo items to your todo list with:

```
todoList.addTodo(‘first’);
todoList.addTodo(‘second’);
```

Now try clicking the toggle all button to change the todos to completed, then click again to make incomplete.

## v.7.0 Review

In version 7 we started moving away from the console and into the actual webpage, where people can interface with our todo app.

We learnt about the DOM and the structure of HTML and where we need to put our JavaScript link.

Then we learnt about how we can access the DOM using the `document` method and then grab the buttons on our page via an `id` using the `getElementById` method.

We also learnt about event listeners and the `addEventListener` method, using a `click` event, which allows us to run some code when someone clicks a button. The `click` is just one of many types of events you can use to handle events inside of the DOM.
