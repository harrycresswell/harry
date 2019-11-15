+++
title = "Destroy all for loops"
date = "2019-05-29T16:14:14+02:00"
description = "Making improvements to a todo list app using higher order functions and callback functions."
slug = "destroy-all-for-loops"
tags = ["JavaScript", "Coursenotes"]
draft = "false"
syndicate = "false"
+++

These are my notes from Gordon Zhu’s free course [Practical JavaScript](https://watchandcode.com/p/practical-javascript), which teaches you how to create a todo app in vanilla JavaScript.

Now we’ve had some practice with Higher Order Functions and Callback Functions, theres a few places in our app that we can make improvements using what we know.

Version 11 will look at refactoring our code to use these new methods.

## Requirements v11

- `todoList.toggleAll` should use `forEach`
- `view.displayTodos` should use `forEach`

At the end of this version we will have replaced all `for` loops in our app wth `forEach`.

## todoList.toggleAll should use forEach

Our `toggleAll` method on the `todoList` object currently has 3 `for` loops. In this part we’ll focus on one at a time and refactor the code into a `forEach` function.

We can comment out the first one so we can see what behaviour we need to replicate.

```javascript
// for (var i = 0; i < totalTodos; i++) {
//   if (this.todos[i].completed === true) {
//     completedTodos++;
//   }
// }
```

Once we have it working the way we want it we can get rid of this old code.

Now we can use the built in `forEach` method that every array comes with. So if you think about what’s happening in the code above, we’re trying to iterate over all items in `this.todos`.

First we can grab `this.todos` then call the `forEach` method.

```javascript
// for (var i = 0; i < totalTodos; i++) {
//   if (this.todos[i].completed === true) {
//     completedTodos++;
//   }
// }
this.todos.forEach();
```

Then we need to give `forEach` a callback function, which `forEach` will run for us. Each time it runs the function, it will pass in each item in the array. So we will need to pass in the `todo` parameter to make this happen.

```javascript
// for (var i = 0; i < totalTodos; i++) {
//   if (this.todos[i].completed === true) {
//     completedTodos++;
//   }
// }
this.todos.forEach(function(todo) {
});
```

Next, the code is more or less the same, except we no longer need to pass in `i`, as our `for` loop no longer exists.

```javascript
// for (var i = 0; i < totalTodos; i++) {
//   if (this.todos[i].completed === true) {
//     completedTodos++;
//   }
// }
this.todos.forEach(function(todo) {
  if (todo.completed == true) {
    completedTodos++;
  }
});
```

Now we can remove the old code we commeneted out and take a look at the second `for` loop statement.

Again, we can start by commenting out the code.

```javascript
// Case 1: If everything’s true, make everything false.
if (completedTodos === totalTodos) {
  // for (var i = 0; i < totalTodos; i++) {
  //   this.todos[i].completed = false;
  // }
}
```

In this case, the `forEach` is very similar to before, where we call `forEach` on `this.todos`.

```javascript
// Case 1: If everything’s true, make everything false.
if (completedTodos === totalTodos) {
  // for (var i = 0; i < totalTodos; i++) {
  //   this.todos[i].completed = false;
  // }
  this.todos.forEach(function(todo) {

  });
}
```
The next step is to take `todo.completed` and set it to `false`.

```javascript
// Case 1: If everything’s true, make everything false.
if (completedTodos === totalTodos) {
  // for (var i = 0; i < totalTodos; i++) {
  //   this.todos[i].completed = false;
  // }
  this.todos.forEach(function(todo) {
    todo.completed = false;
  });
}
```

Now we can remove the old code as before.

```javascript
// Case 1: If everything’s true, make everything false.
if (completedTodos === totalTodos) {
  this.todos.forEach(function(todo) {
    todo.completed = false;
  });
}
```

The `forEach` inside the `else` statement will replace the `for` loop in the exact same way, but this time `todo.completed` will be set to `true`.

```javascript
// Case 1: If everything’s true, make everything false.
if (completedTodos === totalTodos) {
  this.todos.forEach(function(todo) {
    todo.completed = false;
  });
  // Case 2: Otherwise, make everything true.
} else {
  this.todos.forEach(function(todo) {
    todo.completed = true;
  });
};
```

There’s one more optimisation we can make now we’ve replaces our `for` loops with `forEach`. That is to collaspe the two `forEach` statements inside the `if else` statement into one single `forEach`.

The way we can achieve this is to have the `forEach` outside and then depending on if `completed === totalTodos`, we set it to `true` or `false`

So now we can comment out the whole section. And write out the refactored code, starting with our `forEach` statement.

```javascript
// // Case 1: If everything’s true, make everything false.
// if (completedTodos === totalTodos) {
//   this.todos.forEach(function(todo) {
//     todo.completed = false;
//   });
//   // Case 2: Otherwise, make everything true.
// } else {
//   this.todos.forEach(function(todo) {
//     todo.completed = true;
//   });
// };

this.todos.forEach(function(todo) {

});
```

The logic here will still be exactly the same as before. If `completedTdodos === totalTodos` we want to make everything `false`. Otheriwse make everything `true`.

```javascript
// // Case 1: If everything’s true, make everything false.
// if (completedTodos === totalTodos) {
//   this.todos.forEach(function(todo) {
//     todo.completed = false;
//   });
//   // Case 2: Otherwise, make everything true.
// } else {
//   this.todos.forEach(function(todo) {
//     todo.completed = true;
//   });
// };
this.todos.forEach(function(todo) {
  // Case 1: If everything’s true, make everything false.
  if (completedTodos === totalTodos) {
    todo.completed = false;
    // Case 2: Otherwise, make everything true.
  } else {
    todo.completed = true;
  }
});
```

Now our code only has one `forEach` and is a bit shorter. It is however a bit more complicated, hense why we didn’t do this in the first place. Now you can see how you can write the same things in multiple ways, using two different implementations.

The final thing is to remove the commented code from before and test our app is working with the refactored code. We can test our app by checking that each case is met.

```javascript
this.todos.forEach(function(todo) {
  // Case 1: If everything’s true, make everything false.
  if (completedTodos === totalTodos) {
    todo.completed = false;
    // Case 2: Otherwise, make everything true.
  } else {
    todo.completed = true;
  }
});
```

## view.displayTodos should use forEach

Next we need to get rid of our last `for` loop by using `forEach` in `view.displayTodos`.

In the `displayTodos` method we can start by commenting out the `for` statement.

```javascript
// for (var i = 0; i < todoList.todos.length; i++) {
//   var todoLi = document.createElement('li');
//   var todo = todoList.todos[i];
//   var todoTextWithCompletion = '';
//
//   if (todo.completed === true) {
//        todoTextWithCompletion = '(x) ' + todo.todoText;
//    } else {
//      todoTextWithCompletion = '( ) ' + todo.todoText;
//    }
//
//   todoLi.id = i;
//   todoLi.textContent = todoTextWithCompletion;
//   todoLi.appendChild(this.createDeleteButton());
//   todosUl.appendChild(todoLi);
// }
```

Next we want to iterate over the todo items and call `forEach`. Then we want to pass the callback function that has access to each item in the array. We can use the `todo` variable name as the parameter.

```javascript
// for (var i = 0; i < todoList.todos.length; i++) {
//   var todoLi = document.createElement('li');
//   var todo = todoList.todos[i];
//   var todoTextWithCompletion = '';
//
//   if (todo.completed === true) {
//        todoTextWithCompletion = '(x) ' + todo.todoText;
//    } else {
//      todoTextWithCompletion = '( ) ' + todo.todoText;
//    }
//
//   todoLi.id = i;
//   todoLi.textContent = todoTextWithCompletion;
//   todoLi.appendChild(this.createDeleteButton());
//   todosUl.appendChild(todoLi);
// }

todoList.todos.forEach(function(todo) {

});
```

Next we can paste in the code from before, which sits inside the old `for` loop, and modify it as needed.

```javascript
todoList.todos.forEach(function(todo) {
  //   var todoLi = document.createElement('li');
  //   var todo = todoList.todos[i];
  //   var todoTextWithCompletion = '';
  //
  //   if (todo.completed === true) {
  //        todoTextWithCompletion = '(x) ' + todo.todoText;
  //    } else {
  //      todoTextWithCompletion = '( ) ' + todo.todoText;
  //    }
  //
  //   todoLi.id = i;
  //   todoLi.textContent = todoTextWithCompletion;
  //   todoLi.appendChild(this.createDeleteButton());
  //   todosUl.appendChild(todoLi);
});
```

The first line looks fine, though the second isn’t necessary as we no longer use `i` to get access to each object in the arrya. This came from the `for` loop which we replaced with `forEach`.

```javascript
todoList.todos.forEach(function(todo) {
  var todoLi = document.createElement('li');
  //var todoTextWithCompletion = '';
  //
  //   if (todo.completed === true) {
  //        todoTextWithCompletion = '(x) ' + todo.todoText;
  //    } else {
  //      todoTextWithCompletion = '( ) ' + todo.todoText;
  //    }
  //
  //   todoLi.id = i;
  //   todoLi.textContent = todoTextWithCompletion;
  //   todoLi.appendChild(this.createDeleteButton());
  //   todosUl.appendChild(todoLi);
});
```

The next few lines look good because they use the variable `todo` which we have access to in our callback function.

```javascript
todoList.todos.forEach(function(todo) {
  var todoLi = document.createElement('li');
  var todoTextWithCompletion = '';

    if (todo.completed === true) {
         todoTextWithCompletion = '(x) ' + todo.todoText;
     } else {
       todoTextWithCompletion = '( ) ' + todo.todoText;
     }
  //
  //   todoLi.id = i;
  //   todoLi.textContent = todoTextWithCompletion;
  //   todoLi.appendChild(this.createDeleteButton());
  //   todosUl.appendChild(todoLi);
});
```

The line `todoLi.id = i;` causes a problem. We need the position of the element in the array which we grabbed previously using `i`. We can pass in an additional argument to our callback function on `forEach` called `position`. This is equivilant to `i`. Now it will work as before.

```javascript
todoList.todos.forEach(function(todo, position) {
  var todoLi = document.createElement('li');
  var todoTextWithCompletion = '';

    if (todo.completed === true) {
         todoTextWithCompletion = '(x) ' + todo.todoText;
     } else {
       todoTextWithCompletion = '( ) ' + todo.todoText;
     }

  todoLi.id = position;
  //   todoLi.textContent = todoTextWithCompletion;
  //   todoLi.appendChild(this.createDeleteButton());
  //   todosUl.appendChild(todoLi);
});
```

The final 3 lines look good but one line will cause the following error: `this.createDeleteButton is not a function`.

The problem is our callback function in `forEach` is not directly on the `view` object that `this.createDeleteButton` is trying to access. It’s one level deeper. If we want `this` in our callback function to refer to `this` in our `displayTodos` function, we can pass in another `this`, inside the `forEach` to refer to the `view` object.

We can write that like: `forEach(callback, this);`. So `this` must go after our callback function, as a second argument in `forEach`. Now, with `this` at the very end of our `forEach` statment, our code will run without errors, as we are now refering to the `view` object.

```javascript
todoList.todos.forEach(function(todo, position) {
  var todoLi = document.createElement('li');
  var todoTextWithCompletion = '';

    if (todo.completed === true) {
         todoTextWithCompletion = '(x) ' + todo.todoText;
     } else {
       todoTextWithCompletion = '( ) ' + todo.todoText;
     }

  todoLi.id = position;
  todoLi.textContent = todoTextWithCompletion;
  todoLi.appendChild(this.createDeleteButton());
  todosUl.appendChild(todoLi);
}, this);
```

You can read more about the `this` argument in `forEach` in the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Parameters).

## Review v.11

We’ve now removed all `for` loops from our application.

First we changed the `for` loops in `toggleAll` to `forEach` statements. We also colapsed 2 `for` loops into one `forEach` by moving our `if` statement inside of the `forEach`.

The second thing we did was in the `displayTodos` method. We learn’t how `this` inside a callback function will not be equal to the `view` object. However we can make it equal to the `view` object by passing in another `this` to the `forEach`, right after the callback function. Now when you access `this` inside the callback function, in this case in `this.createDeleteButton`, it will be equal to the `view` object.

The final subtly we practiced was the use of `position`, a second argument we can pass into a callback function which grabs the position of an item in an array. So now we know we can access the item and the position.

The main thing to take away is that the behaviour of the `this` keyword inside of a callback function in a `forEach` is not the same as `this` on a method, so we have to add a second `this` keyword after the callback function to refer to the parent object.
