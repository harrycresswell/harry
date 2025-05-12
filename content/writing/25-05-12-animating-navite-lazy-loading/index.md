---
title: "Animating native Lazy Loading (as a progressive enhancement)"
date: 2025-05-12T11:40:57+01:00
draft: false
slug: "animating-native-lazy-loading-progressive-enhancement"
topics: ["HTML", "JavaScript"]
description: "Enhancing `loading=\"lazy\"` with a simple fade-in effect."
---

Native lazy loading is well supported across all major browsers and has been since December 2023. This means there’s no longer any need to use third-party JavaScript plugins to defer non-critical resources from loading until they reach the viewport. Just slap the `loading="lazy"` attribute onto images and iframes, and your browser will take care of the rest.

```html
<img loading="lazy" src="image.jpg" alt="" />
<iframe loading="lazy" src="video-player.html"></iframe>
```

With one less third-party script, we have one less potential point of failure. We’ve simplified our codebase and created a more resilient website. What’s not to like about that? 

There are, of course, a ton of performance benefits to lazy loading, but we won’t get into those today. Instead, I want to talk about a subtle feature missing from native lazy loading. And that’s those buttery smooth fade-in animations you’d tend to get with certain third-party scripts. My personal favourite being the once invaluable [lazysizes](https://github.com/aFarkas/lazysizes) from Alexander Farkas.

## Animated fade-in, how it works

Typically these type of fade-in effects are handled by a few lines of CSS and a little DOM manipulation. The trick is a simple one. Hide the the element by default, then add a `lazyloaded` class via JavaScript when the resource is ready to load.

```css
.lazyload {
  opacity: 0;
}

.lazyloaded {
  opacity: 1;
  transition: opacity 300ms;
}
```

Unfortunately, there’s no default fade-in when using native lazy loading. But it’s easy to implement a similar effect without reaching for any third-party plugins. There is, however, a right way and a wrong way to go about it.

## Make it work with HTML first (a.k.a progressive enhancement)

The important thing to remember is to provide an acceptable baseline experience for every website visitor, regardless of their device, internet connection or browser preferences. The best way to achieve that is to consider the effect as a [progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement), instead of the default experience, and not something that depends on JavaScript. So what does that look like?

[When JavaScript fails](https://www.kryogenix.org/code/browser/everyonehasjs.html), as [it often does](https://piccalil.li/blog/a-handful-of-reasons-javascript-wont-be-available/), resources should load as normal, without a fade-in effect if necessary. Ultimately, they shouldn’t be hidden because JavaScript is unable to apply a class that changes the opacity. When JavaScript is functional and circumstances allow for it, then and *only* then should the fade-in take effect. 

With this approach, all bases are covered. Everything functions with HTML-only and none of our resources are dependent on JavaScript to load.

Ok. So how do we build this sort of thing? To make it happen we can use the Intersection Observer API along with a simple technique know as *cutting the mustard*.

## Cutting the mustard

[Cutting the mustard](https://responsivenews.co.uk/post/18948466399/cutting-the-mustard) is a simple trick, made popular by the BBC, that can be used to check if a browser is able to offer a modern JavaScript experience. 

There are a few different methods, but the one I like most I learned from [Manuel Matuzović](https://www.matuzo.at/blog/html-boilerplate/).

```html
<!-- See https://www.matuzo.at/blog/html-boilerplate/ -->
<script type="module">
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
</script>
```

 It works by adding a simple script to the `<head>` of your HTML documents. If the browser supports JavaScript modules (and thus other modern JS), then a class called `.no-js` is removed from HTML element and a`.js` class is added in its place. 
 
 Now we’re in a position to write Javascript and CSS that only applies *if* the `.js` class is present on the document.

## Write your state-based styles

I’m using the same styles used by [lazysizes.js](https://github.com/aFarkas/lazysizes) out of habit and familiarity. 

The `.lazyload` class can be applied to any `<img>` or `<iframe>` elements you wish to hide. Once we’ve written our JavaScript, the `.lazyloaded` class will replace the `.lazyload` class, revealing the element.

```css
/* Animate the lazyloading if JavaScript is enabed and .js class has been added to the HTML document */
.js {

  .lazyload {
    opacity: 0;
  }

  .lazyloaded {
    opacity: 1;
    transition: opacity 300ms;
  }

}
```

You’ll notice the only difference is that our styles are nested within the `.js` class. We’re doing this so that our styles will only apply if our *cutting the mustard* script runs and adds the `.js` class to the HTML document. If this happens, we know that the browser is in a position to parse modern JavaScript and therefore it’s acceptable to hide the elements we want to *lazyload* using `opacity: 0`. 

Of course, if the `.js` class isn’t applied to the document, because JavaScript isn’t functional, then any element with the `.lazyload` class applied will be unaffected by these styles and therefore remain visible.

With that we have an acceptable experience for both JavaScript enabled and non-JavaScript enabled browsers.

Before we move on, let’s not forget to add the `lazyload` class to any non-critical elements that we want the brower to lazyload:

```html
<img class="lazyload" loading="lazy" src="image.jpg" alt="" />
<iframe class="lazyload" loading="lazy" src="video-player.html"></iframe>
```

## Apply class when resources hit the viewport

Now we have our *cutting the mustard* script and styles in place, the final step is to write the JavaScript which removes the `.lazyload` class and adds the `.lazyloaded` class, so that elements fade in. 

Something else we need to consider is when we actually want elements to fade in. Given that we want this effect to apply to lazy loaded resources, it makes sense that resources should fade in as they hit the viewport and are loaded by the browser. 

This we can do with JavaScript’s [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

The first thing to do is grab any `<img>` or `<iframe>` elements found in the document.

```js
const imgs = document.querySelectorAll('img');
const iframes = document.querySelectorAll('iframe');
```

Next, we’ll create a new observer to detect when these elements intersect with the viewport. Our intersection observer takes two arguments; a callback function and some options. 

```js
// Element observer
const elObserver = new IntersectionObserver(elObserverCallback, elObserverOptions);
```

Let’s tackle the callback function next. 

```js
// Callback function
const elObserverCallback = (elToWatch, elObserver) => {
  // For each element to watch, grab element to watch
  elToWatch.forEach(elToWatch => {
    // If the element is intersecting
    if(elToWatch.isIntersecting) {
      // Remove lazyload class 
      elToWatch.target.classList.remove('lazyload');
      // Add lazyloaded class
      elToWatch.target.classList.add('lazyloaded');
      // Stop watching element when in viewport
      elObserver.unobserve(elToWatch.target);
    }
  })
}
```

First we pass in the elements we want to watch; `elToWatch`, then the action we want to perform, the element observer; `elObserver`. For each element in the document, we want to grab that element then do something. We can do this using a foreach statement. Inside our statement, we’ll check if our element is intersecting the viewport. If this returns true, then we’ll remove our `lazyload` class and add our `lazyloaded` class instead. Finally, when all that’s done, we stop watching the element using the [unobserve](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve) method.

Now let’s run the card observer on our elements. 

```js
// Run observer on images
imgs.forEach(img => {
  // Call intersection observer and observe image
  elObserver.observe(img);
});

// Run observer on iframes
iframes.forEach(iframe => {
  // Call intersection observer and observe iframe
  elObserver.observe(iframe);
});
```

We’ll need to create a forEach statement to loop through all elements. Then for each element, we call our intersection observer, `elObserver`, and observe the element using the [observe](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe) method. We’ll need to do this for both our `<image>` and `<iframe>` elements.

Finally, let’s add our options, which we passed in to our intersection observer earlier as as the second argument. 

```js
// Element options
const elObserverOptions = {
  // Fade in when 25% of element is in view
  threshold: .25
}
```

Here we’re using `threshold` to delay the `lazyloaded` class from being applied until 25% of the element is in view. That way, the fade effect will be nice and obvious for anyone viewing our website.

And here’s our complete code.

```js
const imgs = document.querySelectorAll('img');
const iframes = document.querySelectorAll('iframe');

// Callback function
const elObserverCallback = (elToWatch, elObserver) => {
  // For each element to watch, grab element to watch
  elToWatch.forEach(elToWatch => {
    // If the element is intersecting
    if(elToWatch.isIntersecting) {
      // Remove lazyload class 
      elToWatch.target.classList.remove('lazyload');
      // Add lazyloaded class
      elToWatch.target.classList.add('lazyloaded');
      // Stop watching element when in viewport
      elObserver.unobserve(elToWatch.target);
    }
  })
}

// Element options
const elObserverOptions = {
  // Fade in when 25% of element is in view
  threshold: .25
}

// Element observer
const elObserver = new IntersectionObserver(elObserverCallback, elObserverOptions);

// Run observer on images
imgs.forEach(img => {
  // Call intersection observer and observe image
  elObserver.observe(img);
});

// Run observer on iframes
iframes.forEach(iframe => {
  // Call intersection observer and observe iframe
  elObserver.observe(iframe);
});
```

And, that’s it! 

## Wrapping up

We now have a solution to animate native lazy loaded resources with a simple fade-in effect. We’ve provided an acceptable baseline experience (visible resources) for browsers without JavaScript capabilities and used progressive enhancement to show our effect only when JavaScript is available.

To see the various techniques used in this post in action, make sure you check out [the demo project](https://elegant-bublanina-3b0aae.netlify.app/). Don’t forget to disable JavaScript in your browser Inspect settings to see how resources behave without JavaScript capabilities. You can also find all the code from this post over on [GitHub](https://github.com/harrycresswell/animating-native-lazy-loading).

To learn more about working with the Intersection Observer API, I highly recommend watching Chris Pennington’s excellent video [Fade Images on Scroll with JavaScript](https://youtu.be/sRrNgeXBHBA?si=gE7joxbVZK8Fyted) from his YouTube channel, Coding in Public.
