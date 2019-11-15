+++
title = "Escape the Console"
date = "2019-01-15T11:37:09+01:00"
description = "Version 9 of Practical Javascript course, learn how to leave the console behind and allow users to use the interface and return data to the screen"
slug = "practical-javascript-escape-the-console"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

In version 9 of our todo app we will completely escape the console, allowing users to not only use the interface but see the data returned aswell.

## Requirements

- There should be an `li` element for every todo
- Each `li` element should contain `.todoText`
- Each `li` element should show `.completed`

List items will represent every todo in our list. Each list item should contain the `.todoText` property and show if it’s `.completed` or not.

We will also remove the display todos buttons as we want the data to automatically display in the interface when actions are taken by the user.

## Inserting li elements into the DOM

We want to repesent our todo list in the form of an unordered list in html. Where each `li` represents our todo list items.

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

With our app we won’t know how many items are in our list so we need to be able to dynamically add and remove these `li`’s. So the first thing to understand is how we can insert list items into the DOM. We can do this using JavaScript.

We can start in our HTML by creating an empty `ul`.

```html
<ul>
</ul>
```

Then, inside the console first we can initilize a new varibale, which uses a method on the `document` object called `createElement` to create an `li`.

```javascript
var todoLi = document.createElement('li');
```

Now if you type `todoLi` and hit enter, you can see we have an empty `li` to work with.

```html
<li></li>
```

Now we have something we can insert into the DOM, next we need to figure out a way we can insert this list item into the `ul`. So we need to create a referece to the `ul` in our HTML file.

To do this we can create another variable and use the `querySelector` method on the `document` object to grab the `ul` element.

```javascript
var todosUL = document.querySelector('ul');
```

Now if we type `todoUL` and hit enter we can see the unordered list on our page is returned. If you hover over the `ul` in the console you will see where it is highlighted on the page.

Now we have a referece to our todos `ul` we can add the list item to the `ul`. Because the `li` is a child element of the parent `ul` we can use a method called `appendChild` to do this.

```javascript
todosUL.appendChild(todoLi);
```

Run `todosUL` and we can see our `li` has been added to the page inside the `ul` element. Again we can hove over `<li></li>` in the console and see the `<li>` highlighted in the page view.

This is the technique we’ll be using to add our list items to the page. To wrap up we need to do 3 things:

- create an `<li>` element and save it to a varibale called `todoLi`
- grab a reference to the `<ul></ul>` on our page and assign it to a variable called `todosUL`
- Insert the `<li>` into our `<ul></ul>` using `appendChild`

## There should be an li element for every todos

Now we can take what we’ve learnt and build a function, which runs the code everytime theres a new item added to the todos.

First we need the empty `<ul></ul>` in our HTML.

Next, inside our JavaScript file we can create a new object called `view`. The reason it’s called view is because it’s responsible for what the user sees. I doen’t have any logic or change any data in our app, it just takes the todos array and displays it in the page. It’s responsibe only for view functions.

```javascript
var view = {

}
```

Next we need to create a method in our `view` object for `displayTodos` which is equal to a function. Eventually this will replace the `todoList.displayTods` function as we will no longer need to display todos to the console.

```javascript
var view = {
  displayTodos: function() {

  }
}
```

Inside the function the code will be similar to what we learnt in the last section. First we grab a reference to the todos `ul` using the `querySelector` method. Then we want to create a new `li` item to contain our todo items. We can do this with the `createElement` method and tell it we want to create a `li`. Next we need to grab the `todosUl` and insert the `li` into it with `appendChild`.

```javascript
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    var todoLi = document.createElement('li');
    todosUL.appendChild(todoLi);
  }
}
```

Now we can run our code with `view.displayTodos` to see how it works. You can see a `<li>` is added to the page. Run the code again and you’ll see another item added.

Now we want this code run for each item in our `todos` array. We can do this with a `for` loop, which runs our code for each of the items in our `todos` array. So if our array has 5 items it will run 5 times, and so on.

```javascript
var view = {
  displayTodos: function() {
    for (var i = 0; i < todoList.todos.length; i++) {
      var todosUl = document.querySelector('ul');
      var todoLi = document.createElement('li');
      todosUL.appendChild(todoLi);
    }
  }
}
```

If we run the app we can see how this works. First we will need to add a todo item, then we can type `view.displayTodos` and hit enter. Run the code twice and you’ll see there are now 2 `<li>`’s on the page, even though we only have 1 todo item. This isn’t exactly how we want the app to work. We want `displayTodos` to always reflect the number of items in our `todos` array.

Ideally we could clear the previous items from the page before the code runs, so each time it starts from 0.

 We can do this by moving `todosUl` outside of the `for` loop as we don’t need to create it everytime the `for` loop runs. Then using the `.innerHTML` method to target whatever is inside the `<ul>`, we can set it to nothing with an empty string. This will clear out the `<ul>` before it starts adding new `<li>` elements.

```javascript
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      todosUL.appendChild(todoLi);
    }
  }
}
```

To test this is working we can head to our interface and add 3 new items. Next run `view.displayTodos();`.

We should now see 3 new `<li>`’s on the screen. Now when we run the code again, instead of adding another 3 `<li>`’s to make 6 — as it did before – it clears the 3 and adds another 3. So now it looks like nothing changes.

Now our code reflects the number of items in our `todos` array, exactly as we want it to.

## Each li element should contain .todoText

The next requirement is to add the actual todo text to each `<li>` element. So we can show something to the user.

We can do this in one line. First using `.textContent`, a property built into `todoLi`, which allows you to set the text content of an element. In this case our `<li>` elements.

```javascript
todoLi.textContent
```

Now we need to give it the value of our todo text. To make this happen we need to access our `todos` array.

```javascript
todoLi.textContent = todoList.todos
```

But now we need to access the actual todo text for each item in our todos array. To access each item we can use bracket notation `[]` and parse in `i`, as this will allow us to look at each item through our `for` loop. Finally we can use `.todoText` to grab the actual todo text for each item and add it as the content inside each `<li>`.

```javascript
todoLi.textContent = todoList.todos[i].todoText;
```

The final code should look like this.

```javascript
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      todoLi.textContent = todoList.todos[i].todoText;
      todosUL.appendChild(todoLi);
    }
  }
}
```

Now if we add a new todo item to our todo list, then run `view.displayTodos();` we should see that todo item output to the screen.

So to recap, in this line we are taking the `todoLi` element, accessing the `todoLi` element’s `textContent` property and setting it to the `todoText` property each of our todo objects. In other words we’re changing the value of `textContent` to the `todoText` property of each of our todo items in our todos array.

## Each li element should show .completed

Now all of our todo items are showing but they don’t yet show the completed property. Next we need to show which items are completed and which are still to finish.

We can write some comments in our code to plan this out. To start we can set up a variable to store the value of our todoText, but this time with completion data included. We can use an empty string for now as we will update this later.

```javascript
// var todoTextWithCompletion = '';
```

Using an `if` statement we can set a condition that checks whether each todo completed, when the condition is `true`, at which point it will return `(x) todoText`. If the condition is false we can use an `else` statement to return `( ) todoText`.

```javascript
// var todoTextWithCompletion = '';
// if (todo.completed === true)
  // (x) todoText
// else
  // ( ) todoText
```

Once the `todoTextWithCompletion` variable is set–based on the `if` statement–we want to get the `todoLi` and set it  equal to the new value of `todoTextWithCompletion`.

```javascript
// var todoTextWithCompletion = '';
// if (todo.completed === true)
  // (x) todoText
// else
  // ( ) todoText
// todoLi.textContent = todoTextWithCompletion;
```

Now we have our comments we can use them to guide our code.
To start we can set up the `todoTextWithCompletion` varibale. Eventually we will use this to store the completed value but for now we can set it to nothing. Next we need an `if` statement which checks whether `todo.completed` is true.

```javascript
var todoTextWithCompletion = '';
if () {

} else {

}
```

Before we set the condition we need to create a reference to `todo`. We can store this referece in new variable which gives us access to each todo item. This isn’t 100% necessary but it will save us having to write out the code each time.

```javascript
var todoTextWithCompletion = '';
var todo = todoList.todos[i];
if () {

} else {

}
```

Now we have a reference we can add the condition to our `if` statement. Then update `todoTextWithCompletion` if the condition is met. We can use the plus operator `+` to combine the completion string -`(x)` or `( )`- with the `todoText` string.

```javascript
var todoTextWithCompletion = '';
var todo = todoList.todos[i];
if (todo.completed === true) {
  todoTextWithCompletion = '(x) ' + todos.todoText;
} else {

}
```

The only difference in the `else` statement is we’re removing the `(x)` in favor of an empty set of parentheses.

```javascript
var todoTextWithCompletion = '';
var todo = todoList.todos[i];

if (todo.completed === true) {
  todoTextWithCompletion = '(x) ' + todo.todoText;
} else {
  todoTextWithCompletion = '( ) ' + todo.todoText;
}
```

The final step is to set `textContent` on our `<li>’s` equal to the value of `todoTextWithCompletion`.

```javascript
var todoTextWithCompletion = '';
var todo = todoList.todos[i];

if (todo.completed === true) {
  todoTextWithCompletion = '(x) ' + todo.todoText;
} else {
  todoTextWithCompletion = '( ) ' + todo.todoText;
}

todoLi.textContent = todoTextWithCompletion;
```

As `textContent` now contains the completion data we can remove the line below our code which shows our todo item. without the completion data.

`todoLi.textContent = todoList.todos[i].todoText;`

Now we can test our code out to see if it’s working.  Add a new todo then run `view.displayTodos();`. You should see your new item show on the page with empty parentheses. Hit the toggle Completed button then run `view.displayTodos();` again and you should see an `x` inside the parentheses.

## Escaping the console

To escape the console completed we still need to find another way to run `view.displaytodos();`, so we don’t have to open the console each and every time we need to run the method.

We really only need to display todos any time the data changes. That means anytime one of the buttons on the page is clicked by the user. We can do this by adding `view.displayTodos();` at the end of each method in our `handlers` object.

Now that our todos display on the page when you click any of the buttons, our display todos button is redundant. So we can remove the display todos button code inside our HTML. As we no longer have a button, our `displayTodos` handler is also useless, so we can remove this too.

 We’re now displaying our todos directly to the DOM, so there’s also no need for `this.displayTodos();` on the methods inside the `todoList` object. As all this does is display the todos to the console. We can remove this line of code from each of the methods. Finally we can remove the entire `displayTodos` method from `todoList` as we’re now doing this in the DOM, via our new `view` object.

 Now `view` is the only part of our app concerned with displaying information. That’s why it’s called a view object.

## Review v.9 

 Version 9 mostly involved DOM manipulation, which we did inside a new object called `view`. This `displayTodos` method is similar to our old one, the only differnce is we’re no longer working with the console but the DOM. So that’s why we needed to learn about creating and modifying DOM elements.

 In our HTML we added an unordered list element and removed the display todos button.

 We’re now using the `view.displayTodos` method inside every handler because each of the handlers can change data. That means when data changes we want to update what we show to the user.

 Finally, we refactored our `todoList` object, taking away the `displayTodos` method and the method calls associated with that method.

 Now `todoList` has a very specific purpose; it represents the data and has methods which change the data. Now we have all related methods on a single object. This pattern is the same for our other objects. We’re using `handlers` specifically for user interactions and `view` for showing users what the todo list looks like. All our code is organised into related methods inside objects which has a specific purpose.
