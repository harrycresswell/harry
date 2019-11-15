+++
title = "Functions inside functions"
date = "2019-02-06T21:45:46Z"
description = "5 different examples of using functions within functions. Lean about higher order functions and callback functions"
slug = "practical-javascript-functions-inside-functions"
tags = ["JavaScript", "Coursenotes"]
draft = "false"
syndicate = "false"
+++

## runWithDebugger

It would be good if we had a function called `runWithDebugger`, which we could use to pass in any function and run debugger on that function.

```javascript
runWithDebugger(ourFunction);
```

We want `runWithDebugger` to first run the debugger, then take our function and run that. This would replace the following manual work, which can get tiresome.

```javascript
// debugger;
// ourFunction();
```

We could write this function in the following way, where we pass `ourFunction` into the function named `runWithDebugger`, run debugger on the first line, then call `ourFunction`.

```javascript
function runWithDebugger(ourFunction) {
  debugger;
  ourFunction();
}
```

Now let’s take a simple function which logs ten numbers to the console and see if we can pass it into `runWithDebugger`. First let’s take a look at this new function we’ll be passing in.

```javascript
function logTenNumbers() {
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
};
```

Now let’s pass in our `logTenNumbers` function to our `runWithDebugger` function to see what happens. Hopefully this will run the debugger first, then run `logTenNumbers`.

```javascript
runWithDebugger(function logTenNumbers() {
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
});
```

Hit enter and debugger runs, stopping on the first line `debugger`. This is what has caused debugger to open and run. We can step over this line, to get to the next line which reads `ourFunction();`. Step in to `ourFunction` to go into `logTenNumbers`.

Effectively we’ve made a function which enhances the behaviour of other functions. In this case, by taking a function and running debugger on that function for us. This simple example should demonstrate how powerful and useful this can be.

## setTimeout

In this example we’re going to create a simple text based alarm clock.

We’ll use a built in function called `setTimeout()`, which enhances the behaviour of any function your pass in by running the function after a certain period of time.

For example, if we wanted to run the function we pass in after 5 seconds we can write that like this:

```javascript
setTimeout(function() {

}, 5000)
```

The function is blank right now so we can add a `console.log` statement to make it do something after 5 seconds.

```javascript
setTimeout(function() {
  console.log('Wake up Harry!');
}, 5000)
```

Now when we run the function, it will wait 5 seconds, before printing `Wake up Harry!` to the console.

## forEach

There is a method built into all arrays called `forEach`. You can use it to run a function on every item in an array.

To see how this works let’s start by creating an array of students.

```javascript
var students = ['jonathan', 'jenny', 'elliot']
```

Next we want to create a function which logs a name.

```javascript
function logName(name) {
  console.log(name);
}
```

Now we want to run `logName` over every item in the students array. A manual way of doing this could be to pass the students array in our `logName` function, using the number in the array to grab a particular student. In this case, 0 grabs Jonathan.

```javascript
logName(students[0])
```

This is one way to do it, but it’s a lot of work. Instead we could use a `for` loop to do the work for us.

```javascript
for (var i = 0; i < students.length; i++) {
  logName(students[i]);
}
```

This gives us the exact same results, printing out the names of the students in the array.

An even simpler way to do this is to use the `forEach` method, which loops through each item in an array, in this case our students array.

```javascript
students.forEach(logName);
```

This is the same thing as writing the following:


```javascript
students.forEach(function logName(name) {
    console.log(name);
});
```

This can also be written as an unnamed function by omitting the function name; `logName`.

```javascript
students.forEach(function(name) {
    console.log(name);
});
```

In this example, again, we can see how parsing a function into another function can enhance the behaviour of the function. Using the built in `forEach` method, which is essentially it’s own function, we can handle a `for` loop without having to write one.

### forEach from scratch

We can actually create a `forEach` function from scratch. As this is a stand alone `forEach` and not a method on an array, we will need to pass in the array. That way `forEach` knows which items we want to work with.

```javascript
function forEach(myArray) {

}
```

Next we need to pass in a function. The idea is we want our `forEach` function to run `myFunction` on every item in `myArray`.

```javascript
function forEach(myArray, myFunction) {

}
```

To make this happen we need a `for` loop, to loop through the items in `myArray`.

```javascript
function forEach(myArray, myFunction) {
  for (var i = 0; i < myArray.length; i++) {
  }
}
```

Inside the `for` loop we want to run `myFunction` on each of the items in the array. We can do this by parsing in the `ith` element, which runs each item in the array through `myFunction`.

```javascript
function forEach(myArray, myFunction) {
  for (var i = 0; i < myArray.length; i++) {
    myFunction(myArray[i]);
  }
}
```

Now we can test the function to see how it works. Here we’re parsing in our `students` array, followed by the function we want to run.

```javascript
forEach(students, function() {
})
```
As we need to parse in each `student` name in the array, we will need to give our function a parameter. This represents the `ith` element.

```javascript
forEach(students, function(student) {

})
```

Finally we can `console.log` the student to print out the names in the array.

```javascript
forEach(students, function(student) {
 console.log(student);
})
```

We could also use the `logName` function from before, instead of writing out the function. This works fine as `logName` also accepts a parameter.

```javascript
forEach(student, logName);
```

## addEventListener

Another example of functions that take functions is `addEventListener`.

We can see how this works by navigating to any web page, in this case [Mozilla Web Docs JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and selecting the heading “Tutorials”, then Inpecting element (ctrl+click on mac) on this selection.

In the Chrome browser you can reference the selected element using `$0`.

So now in the Console tab you can type `$0` and you should see the following output:

```html
<h2 id="Tutorials">Tutorials</h2>
```

We can save this in a variable called `tutorialsElement`, so we can refer to it later.

```javascript
var tutorialsElement = $0;
```

Now when we type `tutorialsElement` the console returns the following:

```html
<h2 id="Tutorials">Tutorials</h2>
```

Now we set up for the `addEventListener` example.

All elements in the DOM have a method on them called `addEventListener`, which listens out for different types of events. In this case we want to listen for click events. Whenever someone clicks on the element, it runs a function. We can make this function do whatever we want.


```javascript
tutorialsElement.addEventListener('click', function() {

});
```

This is another example of a function which takes a function and enhances its behaviour.

Next we want to make our function do something. In this case we can log a notification of the click event to the console.

```javascript
tutorialsElement.addEventListener('click', function() {
  console.log('The tutorials element was clicked!');
});
```

Now when we click the element on the page, the function runs and we see the ouput. The function will run everytime the element is clicked.

`addEventListener` can also parse in an optional `event` object to the function. We can use it inside our function as a parameter and `console.log` the object, to see an object logged with various information about the event.

```javascript
tutorialsElement.addEventListener('click', function(event) {
  console.log(event);
  console.log('The tutorials element was clicked!');
});
```

## Buzzwords: Higher order functions and callback functions

Time for some formal vocabulary.

**Higher order functions** are functions that accept other functions. `runWithDebugger`, `setTimeout`, `forEach` and `addEventListener` are all examples of higher order functions, which accept other fuctions and enhance the behavior of the functions they’re given.

`runWithDegger` takes the function and runs it through the debugger. `setTimeout` takes a function and turns it into an alarm clock timer.
`forEach` will take a function and run it on every item in an array and `addEventListener`will run a function whenever there is a certain event on a specific DOM element.

**Callback functions** are simply the functions that are parsed into Higher Order Functions.
