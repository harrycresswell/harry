+++
title = "Working with the Debugger"
date = "2018-12-17T14:44:41Z"
description = "Debugging JavaScript using Debugger"
slug = "/practical-javascript-debugger/"
tags = ["Javascript", "Coursenotes"]
syndicate = "false"
+++

The process of going through your JavaScript and fixing issues with your code is called ‘debugging’.

The ‘debugger’ is a powerful tool we can use to assist us in the debugging process. Debugger is built into the browser and can be found in the chrome dev tools.

We can use the debugger to step through our methods in order to see what’s happening line by line.

To do this we need to add `debugger;` to the first line within our method.

Now when we call the method, Debugger will pause the program as it’s running, so we can step though and see what’s happening, at every stage of the method.

## todoList.displayTodos

In our displayTodos method, we can add `debugger;` to the first line of the function:

```javascript
displayTodos: function() {
debugger;
if (this.todos.length === 0) {
  console.log('Your todo list is empty!')
} else {
  console.log('My Todos:');
  for (var i = 0; i < this.todos.length; i++) {
    if (this.todos[i].completed === true) {
      console.log('(x)', this.todos[i].todoText);
    } else {
        console.log('( )', this.todos[i].todoText);
      }
    }
  }
},
```

Now when we run `todoList.displayTodos();` in the console, the program will pause and debugger will launch in the Sources panel of Inspect.

At the top of the screen we see ‘Paused in debugger’ and notice the script in highlighted on the `debugger;` statement.

From here we can inspect the different elements of our program to help us debug our code.

On the right side, we can see the different variables in our program. Expand `this` and see that it’s an Object, with all our different methods on it.

### Stepping through the code

On the right side you will see a button ‘Step over next function call’, when pressed this will go to the next line of our program, you’ll see the highlighted line changes too the one below.

If you hover over the values in the program, you can see what they are.

We can hit the Step button again to run the next line and step through the program to the end. Hit the blue button; ‘Resume script execution’ to get back to the console and run the script again.

Remember to remove `debugger;` from your program so the code works as it did before.

### todoList.addTodo

For our `addTodo` method we can do the exact same thing as before and add `debugger;` to the first line inside the method.

```javascript
addTodo: function(todoText) {
debugger;
  this.todos.push({
    todoText: todoText,
    completed: false
  });
  this.displayTodos();
},
```

#### Step 1: run debugger

Now run the method `todoList.addTodo('runnin the debugger');`

The debugger will pause the program and launch. We can see debugger has paused on the line we added `debugger;`.

#### Step 2: Stepping over

Step over the line with the ‘Step over next function call’ button. Here we can hover over `this.todos` and see the value is currently 0.

Step over once more and here we’re pushing an item to the `todos` array. You can also see the value of the parameter `todoText` which equals ‘runnin the debugger’.

Step over again. Now we’ve pushed an item to `todos`. on the right side we expand the `this` object, and the `todos` property will now show us an array with 1 item. If you expand the first item, you will see ‘runnin the debugger’ as the value of `todoText`.

Step over to complete the function. Then hit ‘resume script execution’ to exit the debugger.

Now you will see ‘runnin the debugger’ printed to the console.

#### Step 3: Stepping into a function call

Now add another todo item.

`todoList.addTodo('adding something extra');`

The debugger will pause as expected. Next, keep stepping through until you reach the last section of the method; `this.displayTodos();`.

Here we can click the down arrow; ’step into the next function call’, to inspect `displayTodos`. Now we’re in the `displayTodos`.

As we now have 2 items in our `todos` array, `todos.length` is not equal to 0, so when we step through the function it skips the next line. Instead it enters our `else` statement.

Here we can see step through our `for` loop to see how it works.

#### Step 4: Stepping through a for loop

If we step through, we can see how the value of `i` (our initialisation variable) increases each time the loop is run.

It does this until we reach the `todos.length` condition, which in this case is 2.

When it hits 2, and the condition is no longer true, so we exit the `for` loop. And our script ends.

We can hit the blue button to resume our script. Don’t forget to remove `debugger;` for the script to run as normal.

## todoList.changeTodo

Now let’a do the same with the `changeTodo` method by adding `debugger` to our script.

Add a new item so we can change it
`todoList.addTodo('something to change');`

Next, run the `changeTodo` method, `todoList.changeTodo(0, 'changed');`. Now the debugger will pause the program.

From here you can see the arguments we entered in yellow; position is 0 and `todoText` is ‘changed’.

Now step over to the next line. Then if we go into Scope on the right hand side, expand the `this` object, then expand the `todos` array and you will see the object in the 0 position has a `todoText` property with the value `'something to change'`.

Step over again and we will see this value update to `'changed'`.

We’ve now reach the `displayTodos` method.

## todoList.deleteTodo

Move `debugger;` to the `deleteTodos` method, then add a todo item:

`todoList.addTodo('delete this');`

Next run `todoList.deleteTodo(0);` to pause the script and run the debugger.

Now we’re in the debugger and we can see the position is 0, as that’s what we set. Step over to the next line.

`this.todos.splice(postion, 1);`

This is going to delete whatever is at position 0 and delete 1 item, in our case the value `'delete this'`.

In the Scope panel on the right, watch the value of `todos` Array go from `todos: Array[1]` to `todos: Array[0]`, as you step over to the next line.

Now we can resume our script.

## todoList.toggleCompleted

Move the debugger statement into `toggleCompleted`.

Add a new todo item; `todoList.addTodo('to be toggled');` then toggle the item to enter debugger.

`todoList.toggleCompleted(0);`

Step over to see we’re grabbing `this.todos` item in position 0. Now `todo` is undefined.

Step over again, now `todo` is defined. And if you hover over you can see `completed: false` and `todoText: 'to be toggled'`. This is the item we’re adding.

When we step over the next line you’ll see `completed: true`.

## TodoList.toggleAll

Start by moving the `debugger;` statement to the beginning of the `toggleAll` method, as we’ve done before.

Next we’ll need to add some data, so we have something to toggle.

`todoList.addTodo('this is true');`

Next make the item true. We can do this using the `toggleCompleted` method, parsing in 0, for the position of our new item.

`todoList.toggleCompleted(0);`

The console should return:

``` My Todos: (x) this is true ```

Now we can use `todoList.toggleAll();` to pause the script and run the debugger.

### Stepping through code with debugger

Step over the first line and you’ll see we’re saving the length of our todos array to the variable `totalTodos`. This should show our 1 item.

Next we start `completedTodos` at 0, so we can count up the number. In other words, each time we find a completed item in the array, we can increase `completedTodos` by 1.

This time when we step over we reach the `for` loop. Step over again to set the undefined `i` to 0. As 0 is less than `totalTodos` of 1, we go into the `for` loop when we step over.

Here we have a condition that states `if` the completed property of our todos item is set to `true` (which in our case it is), we enter the `if` statement and increase `completedTodos` by 1.  We’re using the value of `i` to grab the todo item at position 0.

Step over once more and you’ll see `completedTodos` is now set to 1.

At this point we return to the start of the `for` loop,
where our final expression `i++` increases `i` by 1. As 1 is no longer less than 1, but equal to 1, we leave the `for` loop and arrive at Case 1.

In Case 1 we check if everything is true, in which case we will make everything false.

We do this by checking if `completedTodos` is equals to `totalTodos`. In our case they are both 1, so the condition is `true`.

As the condition is true, we go into the `if` statement and we reach a `for` loop. Here `i` is reset to 0. Which is less than `totalTodos`, currently 1. So we go into the `for` loop when we step over again.

Now we grab the only item we have, in position 0, and set completed to `false`.

Finally, we return to the start of the `for` loop and increment `i` by 1. When we evaluate the condition again it’s no longer true, as 1 is not less than our `totalTodos` which is 1. Now we exit the `for` loop.

This time we skip our `else` statement in case 2 because case 1 was true.

## Use the debugger all the time

Debugger helps you solve problems with your code before you start asking questions. Use debugger to understand your code even if theres nothing wrong with it.

If you have a question like what is this line of code doing, use the debugger.

Don’t ask questions that the debugger can answer.

## Focus on understanding, not building from scratch

Focus on understanding code, not building from scratch. Use the debugger to understand the code deeply. Then forget about it.
