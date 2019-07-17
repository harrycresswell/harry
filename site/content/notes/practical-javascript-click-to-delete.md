+++
title = "Click to delete"
date = "2019-03-06T11:32:56+01:00"
description = "Notes taken from module 10 of Practical JavaScript, a free course by Gordon Zhu. In this part we create a way to delete todo items with a todo button."
slug = "practical-javascript-click-to-delete"
tags = ["JavaScript", "Coursenotes"]
syndicate = "false"
+++

In version 10 of our todo list app we create a way to delete todo items by added a todo button to each todo item. These are my notes from Gordon Zhu’s free course [Practical JavaScript](https://watchandcode.com/p/practical-javascript), which teaches you how to create a todo app in vanilla JavaScript.

## The 'return' statement

The return statement allows you to return a value from a function.

Say, for example, you have a variable which produces the value of 2 and 10. The variable calls a function which multiplies the 2 numbers.

```javascript
var theProductOf2And10 = multiplyTwoNumbers(2, 10);
```

As `multiplyTwoNumbers` doesn’t yet exist we will need to create that function. The obvious way to do this is to create a function that takes two values as parameters. Then create a variable that stores the result of the calculation. The calculaton being `a * b`, using an asterisk to represent multiplication.

```javascript
function multiplyTwoNumbers(a, b) {
  var result = a * b;
}

var theProductOf2And10 = multiplyTwoNumbers(2, 10);
```

What we expect to get from this is the multiplication of 2 and 10, which is 20. But when we run `theProductOf2And10`, the console returns `undefined`.

The reason the value is undefined if because we haven’t returned the value.

We can easily change this to work the way we want by adding a `return` statement, which returns the value of our `result` variable.

```javascript
function multiplyTwoNumbers(a, b) {
  var result = a * b;
  return result;
}

var theProductOf2And10 = multiplyTwoNumbers(2, 10);
```

To recap, if you want to return a value from a function, as in this case, you need to `return` the value you want. If you don’t `return` the value, the value will be `undefined`.

## Requirements

In version 10 we want to give each todo item a delete button. Instead of having to enter the number of the item in the todos array to delete a todo item, we can then delete an item with a simple click.

- There should be a way to create delete buttons
- There should be a delete button for each todo
- Each li shold have an id that has the todo position
- Delete buttons should have access to the todo id
- Clicking delete should update todoList.todos and the DOM

## There should be a way to create delete buttons

In our JavaScript file, we want to create a new method on our `view` object. The reason we’re doing this in the `view` object is because the delete button another DOM element – a visible piece of UI in our application.

We can call the new method `createDeleteButton`, and set it to an empty function.

```javascript
createDeleteButton : function() {

}
```

Next we want to have a variable called `deleteButton`, which is returned by the function.

```javascript
createDeleteButton : function() {
  var deleteButton;
  return deleteButton;
}
```

This helps us get the structure for how this function will work – create a button, then return the button. Later we’ll use this method inside `displayTodos` to create buttons for us.

Now we can set the variable to create a button element.

```javascript
createDeleteButton : function() {
  var deleteButton = document.createElement('button');
  return deleteButton;
}
```

Next we need to give the button some text content, so we know what it is. We can use the `textContent` property and set it to ‘delete’.

```javascript
createDeleteButton : function() {
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'delete';
  return deleteButton;
}
```

Next we’ll need a way to access these different delete button elements. We can use a class in this case, as unlike `id`, which will only work for unqiue elements, classes can be reused. This is important as we will need a delete button for every item in our todo list. We can use the `className` property to identify the elements.

```javascript
createDeleteButton : function() {
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  dleteButton.className = 'deleteButton';
  return deleteButton;
}
```

## Ther should be a delete button for each todo

The next requirement is to get the delete button to show up for each todo item.

We can do this by appending our createDeleteButton function to the `li` element that contains the todo item.

Inside the `displayTodos` method, go to the second to last line and create a new line. That should look like this:

```javascript
todoLi.textContent = todoTextWithCompletion;

todosUl.appendChild(todoLi);
```

Now we can use the `appendChild` property on `todoLi`, so we can add the button element.

```javascript
todoLi.textContent = todoTextWithCompletion;
todoLi.appendChild()
todosUl.appendChild(todoLi);
```

As `createDeleteButton` is available on the same object, we can use `this` to access it. Now when the method runs it will return a delete button, and append it to the todo `li`.

```javascript
todoLi.textContent = todoTextWithCompletion;
todoLi.appendChild(this.createDeleteButton());
todosUl.appendChild(todoLi);
```

Now we can head to our app and add a few items to see if the code worked.
You should see a delete button appear for every item you add. Right now the delete buttons dont’t work when you click them, we’ll get to that next.

## Each li should have an id that has the todo position

Now we have a delete button, we’re no longer able to tell the app the position of the item in the array which we want to delete. So now we need a way to give each todo item a unique reference.

This reference will represent the items postion in the array and we can use it later to grab the position of the item we want to delete. The easiest way to make this happen is using an `id`.

For example, the first item should have an `id` of 1, the second an `id` of 2 and so on.

We can do this in a single line of code. Right above the last section of code, grab `todoLi` and set its `id` property to `i`.


```javascript
todoLi.id = i;
todoLi.textContent = todoTextWithCompletion;
todoLi.appendChild(this.createDeleteButton());
todosUl.appendChild(todoLi);
```

This works because our `for` loop iterates over every item in our todos, so `i` is equal to each position in the array. And we can use it to set the `id` to the postion.

We’re using an `id` in this case as we need a unqiue identifier. There should only every be one `id` value for each postion. For example there should only be one 1, one 2, one 3 and so on.

To see how this works, in the app add 3 new items, then Inspect the elements console and see the `id`’s attached to each of your `li`’s.

Now when delete is clicks we have a way to reference the particular item we want to delete.

## Delete buttons should have access to the todo id

Delete buttons should have access to the todo `id` so it knows which todo in the array to delete.

The first thought might be to add events listeners to each of the delete buttons however this can cause memory problems if there are too many event listeners.

A better way is to use a single event listener. To conceptulise this let’s add 3 items to our todo list. Inspect Element on those items and notice  that all the `li`’s are contained in a single unordered list (`ul`).

Here, instead of adding several event listeners on the delete buttons, we can add a single event listener on the unordered list. This is because if we you click anything inside the `ul`, the event listener will know about it. We can handle the events from the parent element, and listen for when a delete button inside the unordered list is clicked.

Back in our code we can start by saving a reference to the unordered list using `document.querySelector`.

```javascript
var todosUL = document.querySelector('ul');
```

From here we want to add an event listener to the `ul` which listens for `click` events. Then run a callback function as we want to do something when the click happens

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function() {

});
```

To recap from the functions inside of functions module, this new function which happens after the click event is the callback function. Whereas `addEventListener` is the higher order function. It’s the function which takes other functions. And `addEventListener` will run this function for us, whenever a click event happens on the `todosUl` element.

What’s most important is that when it runs the function, it will pass in an event. To get access to that event we need to add it as a parameter.

Finally, we can log out the event to the console using `console.log`.

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {
  console.log(event);
});
```

Now let’s add an item to the todo list, then click the delete button on the item to see if the event is logged to the console.

You should now see a `MouseEvent` object logged to the console, which includes several properties. We can ignore most of these for now as we’re only interested in the `target` property. `target` tells us which element we actually clicked on, in this case `button.deleteButton`.

From here we need to access the `id`, but they are attached to the `li` element. We can access the `li` from the delete button by using the `parentNode` property, as delete button is a child element of the `li` parent.

If you expand the `target` property you can see the `parentNode` property. Notice it has a value of `li#0`. This is the `li` followed by the corresponding `id` value, where the `#` symbol represents `id`. This is how we can access the `id` of the item that was clicked on.

With this information, we can think about our code like this:

- get the `event`
- get the `target` (which will be the delete button)
- go up one level with `parentNode`, (this gets the list item that the button is inside of)
- then get the `id` which is on the `parentNode`

In our code that looks like this:

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {
  console.log(event.target.parentNode.id);
});
```

Now when we add an item, hit delete then notice the code logged to the console, we get the value of the `id`. In this case `0`.

To go over our code, when someone clicks the delete button, `addEventListener` will run our callback function and pass in the `event` object. When you log out the `event` object, `target` is the element clicked on, in this case the delete button, `parentNode` takes you one level up to the `li` element, and `id` grabs the `id` value on that parent element, which is exactly what we need to delete a specific item.

## Clicking delete should update todoList.todos and the DOM

The last part of this version is to to get the array and the DOM to update when delete is clicked, so that the user can see the correct information.

Remember we can write comments in our code to understand better what we’d like to do.

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {
  console.log(event.target.parentNode.id);

  // Get the element that was clicked on.
  var elementClicked = event.target;
});
```

In this case `event.target` returns `button.deleteButton`, however any number of things could be clicked, so we need a way to check that it is in fact `button.deleteButton` which has been clicked on. We can do this with an `if` statement using the comparison opporator which for the `className`.

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {
  console.log(event.target.parentNode.id);

  // Get the element that was clicked on.
  var elementClicked = event.target;

  // Check if elementClicked is a delete button
  if (elementCLicked.className === 'deleteButton') {

  }
});
```

This works as it checks for the class name we added when we create a delete button. So this `if` statement will only be `true` if that class exists.

Finally, we want to run `handlers.deleteTodo` to actually delete the item clicked, if the statement returns true.

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {

  // Get the element that was clicked on.
  var elementClicked = event.target;

  // Check if elementClicked is a delete button
  if (elementCLicked.className === 'deleteButton') {
    // Run handlers.deleteTodo.
  }
});
```

We can also get rid of the `console.log` statement as this was just for demonstration purposes.

At this point we need to look back at `handlers.deleteTodo` because the feature is quite different.

```javascript
deleteTodo: function() {
  var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
  todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
  deleteTodoPositionInput.value = '';
  view.displayTodos();
},
```

As you can see above, before, `handlers.deleteTodo` was trying to get the `id` on the delete todo input, and pass the position value from that input into `todoList.deleteTodo`. Now we’re no longer using an input to delete a todo item, we’re using a button on each item instead.

This means we can get rid of the input field and delete button from our earlier version and remove the associated code. That leaves us with the code below.

```javascript
deleteTodo: function() {
  todoList.deleteTodo();
  view.displayTodos();
},
```

Now we’ll need to explicitly pass in a posistion, so that whenever you call `deleteTodo` on the `handlers` object you will have to pass in a posistion which it will then take and use to delete the item.

```javascript
deleteTodo: function(position) {
  todoList.deleteTodo(position);
  view.displayTodos();
},
```

Now we’ve modified our `deleteTodo` handler to suit our new code, we want to run `handlers.deleteTodo` and pass in a position. So back inside our `view` object, we can visualise that in the comments by adding a `posistion` paramenter.


```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {

  // Get the element that was clicked on.
  var elementClicked = event.target;

  // Check if elementClicked is a delete button
  if (elementCLicked.className === 'deleteButton') {
    // Run handlers.deleteTodo(position)
  }
});
```

Now we need to think about how we get the position. The posistion is the `id` of the `li` element. Rememeber, on `elementClicked`, the `li` is the `parentNode` of the delete button. Then we just need to get the `id`.


```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {

  // Get the element that was clicked on.
  var elementClicked = event.target;

  // Check if elementClicked is a delete button
  if (elementCLicked.className === 'deleteButton') {
    // Run handlers.deleteTodo(position)
    elementClicked.parentNode.id
  }
});
```

This creates a new problem, `elementClicked.parentNode.id` is a *String* but our delete handler needs a *number*.

JavaScript has a function to turn strings into numbers called `parseInt`, for example, if we have a string `0` `parseInt` will turn it into the number `0`.

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {

  // Get the element that was clicked on.
  var elementClicked = event.target;

  // Check if elementClicked is a delete button
  if (elementCLicked.className === 'deleteButton') {
    // Run handlers.deleteTodo(position)
    parseInt(elementClicked.parentNode.id);
  }
});
```

Now that we have our position value as a number, we can use it as the position parameter inside the `handlers.deleteTodo` function.

```javascript
var todosUL = document.querySelector('ul');

todosUL.addEventListener('click', function(event) {
  // Get the element that was clicked on.
  var elementClicked = event.target;
  // Check if elementClicked is a delete button
  if (elementCLicked.className === 'deleteButton') {
    // Run handlers.deleteTodo(position)
    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
  }
});
```

Now we can go to our app and see how it works. Great, our delete buttons are now removing any items we add.

Now we can move this code inside the `view` object to keep our code organised. we’re putting it into `view` as it’s directly linked to what we see in the interface.

So at the bottom of the `view` object, we can create a new method called `setUpEventListeners` to contain our code. Then cut and paste our new code inside.

```javascript
setUpEventListeners: function() {
  var todosUL = document.querySelector('ul');

  todosUL.addEventListener('click', function(event) {
    // Get the element that was clicked on.
    var elementClicked = event.target;
    // Check if elementClicked is a delete button
    if (elementCLicked.className === 'deleteButton') {
      // Run handlers.deleteTodo(position)
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
  });
}
```

Finally, as this is a method we will need to call the method for it to work. At the very bottom of the file we can add `view.setUpEventListeners();` which will run all this code for us.

To recap what we’ve done in the past few lessons, we’ve seen that instead of added an event listener on every delete button, we can add a single event listener to the parent element and listen for clicks there.

When something is clicked we can look at the `event` object to figure out the exact element that was clicked. Once we have the element, we can check to see `if` the element is a delete button, and if it is we can run the `handlers.deleteTodo` method, which passes in the position taken from the `parentNode id`. We use `parseInt` to change the value from a string to a number.

To make this work we had to update our `handlers.deleteTodo` method so it no longer references our delete todo input. All it does now is takes a number for the position value and sends that number to the `todoList.deleteTodo` method which deletes the data. Then `view.displayTodos` updates the DOM so the correct information is show to the user.

## Cleanup and review

Now we have delete buttons on our todo items, we can go into our HTMl and remove the delete button and input field from the interface.

The lines to remove:

```html
<div>
   <button onclick="handlers.deleteTodo()">Delete</button>
   <input id="deleteTodoPositionInput" type="number">
 </div>
```

Now we can go back through our JavaScript and do a quick review.

In the first part of version 10 we focused on a function which creates delete buttons. We used the `return` statment and did a few other things:

- Create a delete button
- added text text
- added a class name
- returned delete button

Then we used that method to appead the delete button to the todo `li`.

The second part we focused on setting up a single event listener on our `ul`. We listened for all clicks on the `ul` and used the `event` object to work out which item was clicked. If the item clicked was a delete button, only then do you delete the item.

This pattern is called Event Delegation. This is because it’s listening for events on a single item, then any items inside of that delegate the event handling to the parent element. This is a common JavaScript pattern used for list items, where each item in the list has the same event listeners. So instead of added them to each item in the list you can add one single event listener to the parent element.

DOM event delegation is a mechanism of responding to ui-events via a single common parent rather than each child.

