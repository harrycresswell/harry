---
title: "Reducing CSS"
date: 2024-05-02T10:33:00+01:00
draft: false
slug: "reducing-css"
topics: ["CSS"]
description: "Without making any changes to the design, I managed to reduce the amount of CSS on my personal site by around 36%."
---

Since formalising [my CSS boilerplate](https://cu.harrycresswell.com/), I’ve come to realise that many CSS problems that I’d typically solved with unique component based styles (using BEM or similar), can actually be solved using a handful of reusable styles. 

For this I have [CUBE CSS](https://cube.fyi/) and techniques from [Every Layout](https://every-layout.dev/) to thank.

With this in mind, last week I set out to rewrite the CSS on my personal site with the aim of cleaning up redundant styles and make some general improvements. In the process I managed to reduce the file size of my stylesheet by 33% – all with virtually zero change to the overall design.

Maybe this isn’t much to shout about when it concerns some low-traffic personal website, but this would be a big deal for a commercial website. Savings like this can improve site speed, increase conversion and ultimately lead to more sales. And all it took was a simple audit of my styles and a slight rethink about how I write CSS.

Let me explain what’s changed and how I’ve managed to achieve the exact same results from 134 fewer CSS rules.

## Removing unused styles

First I combed through my Hugo templates and CSS files to remove any unused styles, most of which were probably the remnants of some previously abandoned feature.

Maybe I could have used a tool to help with this step, but with a modest amount of styles, I decided to keep things simple and do this bit by hand. 

The process involved working through my stylesheets and comparing them with my template files to see which classes were no longer being used, then removing any unused styles. Nothing glamorous, just good old grunt work.

## Improving site wide variables by adopting Utopia

Next I set out to improve the [global variables](https://developer.mozilla.org/en-US/docs/Web/CSS/:root#declaring_global_css_variables) which permeate through the rest of my CSS. 

First I converted all SASS variables to [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). Next I changed my Utopia fluid type scale [from CSS locks to CSS Clamp](https://github.com/harrycresswell/harry/commit/b5202cbaf11450413a137a07d698306248ac5b15).

Following this, I ditched my old SASS based spacing system in favour of, you guess it, a fluid responsive scale using Utopia. 

Now both type and spacing on my site resizes fluidly depending on viewport width or device. To make this happen, Utopia makes heavy use of the Clamp function, providing a scale of Custom Properties.

For type:

```css
:root {
  --step--1: clamp(0.8889rem, 0.8455rem + 0.2168vi, 1rem);
  --step-0: clamp(1rem, 0.9024rem + 0.4878vi, 1.25rem);
  --step-1: clamp(1.125rem, 0.9543rem + 0.8537vi, 1.5625rem);
  --step-2: clamp(1.2656rem, 0.9973rem + 1.3415vi, 1.9531rem);
  --step-3: clamp(1.4238rem, 1.0267rem + 1.9855vi, 2.4414rem);
  --step-4: clamp(1.6018rem, 1.036rem + 2.8292vi, 3.0518rem);
}
```

And for space:

```css
:root {
  --space-3xs: clamp(0.25rem, 0.2283rem + 0.1087vi, 0.3125rem);
  --space-2xs: clamp(0.5rem, 0.4565rem + 0.2174vi, 0.625rem);
  --space-xs: clamp(0.75rem, 0.6848rem + 0.3261vi, 0.9375rem);
  --space-s: clamp(1rem, 0.913rem + 0.4348vi, 1.25rem);
  --space-m: clamp(1.5rem, 1.3696rem + 0.6522vi, 1.875rem);
  --space-l: clamp(2rem, 1.8261rem + 0.8696vi, 2.5rem);
  --space-xl: clamp(3rem, 2.7391rem + 1.3043vi, 3.75rem);
  --space-2xl: clamp(4rem, 3.6522rem + 1.7391vi, 5rem);
  --space-3xl: clamp(6rem, 5.4783rem + 2.6087vi, 7.5rem);
  --space-4xl: clamp(7rem, 6.3913rem + 3.0435vi, 8.75rem);
}
```

Now, instead of having to write a breakpoint to adjust type or space sizing for smaller devices like this:

```css
section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  section {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
}
```

I can now do something like this:

```css
section {
  margin-block: var(--space-3xs)
}
```

And utopia handles the resizing fluidly as the browser width or device size changes. 

With the additional switch to using [Logic Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) where possible, all this good work resulted in far fewer lines of CSS. 


## Move as much CSS a possible to global styles

After improving my variables, the next step was to move as much of my CSS as possible to global styles.

Global styles aim to broadly style as much as possible. This is done by targeting HTML elements, using [Type selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors). The result of creating global styles is HTML that looks great without any additional classes. This is the exact approach used by classless CSS frameworks like [Water.CSS](https://watercss.kognise.dev/), [Concrete.css](https://concrete.style/) and [Simple.css](https://simplecss.org/).

Notable improvements to my global styles include removing the margin from headings, which is now handled using the `.flow` utility. But more on that later. 

Similarly, I’ve also managed to ditch many of the utility classes I was using to create the various link styles on my site.  I now style the `<a>` element globally and handle each style variant by creating [Exceptions](/writing/reducing-css/#create-exceptions-for-state-and-style-modifiers) using data attributes.

```css
a {
  color: var(--color-brand);
  text-decoration: underline;

  &:hover {
    color: var( --color-bg);
    background-color: var(--color-brand);
    text-decoration: none;
  }
}

/* Use naked variant to style links as text*/
a[data-variant="naked"] {
  color: var(--color-text);
  text-decoration: none;
}

a[data-variant="naked"]:hover {
  background-color: unset;
  text-decoration: underline;
}  

/* Use desaturate to remove brand color from links */
a[data-variant="desaturate"] {
  color: var(--color-text);
}

a[data-variant="desaturate"]:hover {
  background-color: var(--color-text);
  color: var(--color-bg);
  text-decoration: none;
}
```

I’ve also moved button styles to the `<button>` element and input elements with type `submit`, `button` or `reset`.  I’ve included the `.button` class to make it easier to style links as buttons.

```css
button,
.button,
input[type="submit"],
input[type="reset"],
input[type="button"] {
  background-color: var(--color-text);
  border: solid .2rem var(--color-text);
  border-radius: var(--border-radius);
  color: var(--color-bg);
  cursor: pointer;
  padding: var(--space-3xs) var(--space-s);
  display: inline-block;
  text-decoration: none;
  text-align: left;
  white-space: nowrap;
}
```

Before now, I only had these styles set up on a `.button` class, meaning that the HTML elements targeted in the code above would inherit the default user-agent styles by default. That is, unless the `.button` class was applied. So although I haven’t reduced the amount of CSS, I’ve definitely made some improvements when it comes to creating consistency between elements.

Though not strictly reducing the amount of CSS, the final thing I did was to consolidate my global styles into fewer SASS partial files. 

So this:

```css
scss/
  base/
    _base.base.scss
    _base.code.scss 
    _base.form.scss
    _base.heading.scss
    _base.image.scss
    _base.link.scss
    _base.list.scss
    _base.quote.scss
    _base.reset.scss
    _base.syntax.scss
    _base.video.scss
```

Has become this:

```css
scss/
  base/
    _button.scss
    _code.scss
    _form.scss
    _global.scss
    _nav.scss
    _reset.scss
```

Of course, I could have used a single partial file for all global styles, but I like to distinguish certain styles to improve reusability of code between projects. For example, not all website projects I work on will use forms, so by keeping the CSS used for forms inside a `_form.scss` partial, I can easily remove form styles for that particular project.

It’s worth mentioning that this is the only feature I now require SASS for – to break my CSS into partial files, then import them all into a `main.scss` file.

## Solve common layout problems with intrinsically responsive (and reusable) layout compositions

One of the biggest improvements I’ve made to my CSS was adopting the concept of Compositions from Every Layout and CUBE CSS. 

Compositions are skeletal styles that create flexible layouts containers for content. Importantly they are reusable, not tied to any specific context and don’t depend on the use of media queries. Instead they adapt and reconfigure themselves to fit any context or device.

In the past, I’d often handle layout problems like this on the component level. For example, to style my navigation layout I might have created a component like this:

```css
.Nav {
  display: flex;
  gap: calc(var(--space) *1.5);
}
```

Then, to style the layout of page pagination items I might create another component with very similar styles:

```css
.Pagination {
  display: flex;
  flex-wrap: wrap;
}
```

This would result in lots of repetition, where I’d have several different components, each with virtually the same CSS. 

With compositions I can avoid this repetition by creating context agnostic layout which can be used in any context that requires it. 

Take the `.cluster` composition as an example.

```css
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, var(--space-xs));
  justify-content: var(--cluster-horizontal-alignment, flex-start);
  align-items: var(--cluster-vertical-alignment, center);
}
```

I’m now using `.cluster`  to create a flexible layouts for my *navigation*, *page pagination*, *taxonomy tags* and *post author* component. Now I can tackle many similar problems in various different places, using only one CSS class.  


## Use utility classes for specific problems that global styles and compositions don’t solve

In a utility-first approach, utility classes make up the majority of styles and are the primary method of applying styles to HTML. I’m not using utility classes in this way. 

Instead, I’m using utility classes is to solve specific problems that my compositions or global CSS styles don’t solve. In other words, they aren’t the first thing I reach for, but something to lean on when nothing else solves the problem.

Two such utilities that have made a big impact in reducing the amount of CSS my site design requires. Both solve problems concerning the space between elements.

The first is the `.flow` utility, which creates consistent space and rhythm between elements.

```css
.flow > * + * {
  margin-top: var(--flow-space, 1em);
}
```

This technique was popularised as [The Stack](https://every-layout.dev/layouts/stack/) layout by Heydon Pickering and Andy Bell in Every Layout. It works by applying margin to direct sibling elements. Flow is incredibly useful for creating space between prose elements, for example the headings and paragraphs found in a blog post.

With liberal use of `.flow`, I’ve been able to remove styles I’d typically use to create space between elements. For example, I no longer need to litter my base styles with the [next-sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators#next-sibling_combinator):

```css
ul+p,
ol+p {
  margin-top: 1rem;
}

pre+p {
  margin-top: 1rem;
}
```

Similarly, using the `.flow` utility has also meant I can remove the default margin from heading elements:

```css
h2,
.h2 {
  font-size: var(--step-2);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

h3,
.h3 {
  font-size: var(--step-1);
  margin-top: 1.5rem;
  margin-bottom: .5rem;
}

h4,
.h4 {
  font-size: var(--step-0);
  line-height: 1.4;
  margin-top: 1.5rem;
  margin-bottom: .5rem;
}
```

Instead, I can now use the `--flow-space` variable to override the default [fallback value](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#custom_property_fallback_values) and control the amount of margin required:

```css
h2,
.h2 {
  font-size: var(--step-2);
  --flow-space: var(--space-l-xl);
}

h3,
.h3 {
  font-size: var(--step-1);
  --flow-space: var(--space-l);
}

h4,
.h4 {
  font-size: var(--step-0);
  line-height: 1.4;
  --flow-space: var(--space-m);
}
```

The second utility I’m using to reduce CSS is `.region`, which has the sole job of adding consistent vertical padding between sections of content.

```css
.region {
  padding-top: var(--region-space, var(--space-l-xl));
  padding-bottom: var(--region-space, var(--space-l-xl));
}
```

Where I once created space between elements on a component level. Consider my old `.Hero` styles as an example:

```css
.Hero {
  padding-top: 6rem;
  padding-bottom: 6rem;
}
```

I can now use the reusable `.region` utility to achieve the same results in various places. For example, my *site header*, *site footer* and *newsletter signup form* all rely on the `.region` class for their vertical spacing.

With considered use of utilities I’ve been able to make some big reductions in the amount of CSS required to style my site. However, utilities don’t always provide the solution, particularly when it comes to more complex UI.


## Create blocks (and combine with utilities) for more complex pieces of UI

According to [cube.fyi](https://cube.fyi/block.html#block): “A block is a skeletal component or organisational structure. To compare it to common user interface elements: it is a card element or a button element.”

I’m now using blocks to manage the styles of commonly used design patterns, which global styles, compositions and utilities don’t necessarily account for.

Before now I’d create block components using SUITCSS, a BEM-like syntax, for all sorts of UI problems: 

```
.Block {}
.Block-part {}
.Block—modifier {}
```

Consider my newsletter component, as an example.

```css
.NewsletterForm {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.NewsletterForm-field {
  &:nth-child(even) {
    margin-bottom: 1rem;
  }
}

@media (min-width: 768px) {
  .NewsletterForm {
    flex-direction: row;
  }

  .NewsletterForm-label {
    margin-top: 0;
  }

  .NewsletterForm-field {
    flex: 1;
    align-self: flex-end;

    &:nth-child(even) {
      margin-bottom: 0;
    }

    &:not(:last-of-type) {
      margin-right: .5rem;
    }
  }
}
```

Now, all this is handled by `.switcher`, a reusable layout composition, which can be applied to any context. 

```css
.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter, 1rem);
  align-items: var(--switcher-vertical-alignment, flex-start);
}

.switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--switcher-target-container-width, 40rem) - 100%) * 999);
}

.switcher > :nth-last-child(n + 5),
.switcher > :nth-last-child(n + 5) ~ * {
  flex-basis: 100%;
}
```

By using `.switcher` alongside the block class, like this:

```html
<form class="NewsletterForm switcher">
 ...
</form>
```

I’ve been able to simplify the component block itself to a single line of CSS:

```css
.NewsletterForm {
  --switcher-vertical-alignment: flex-end;
}
```

In this case, all the block class contains is a single custom property used to override the default vertical alignment of `flex-start` with `flex-end`.

By using this approach, I’ve been able to simplify the complexity of most of the block components on my site. And in certain cases I’ve managed to remove the need to create block classes entirely, which has obviously lead to a considerable reduction in the amount of CSS required to style my website.


## Create Exceptions for state and style modifiers

According to [cube.fyi](https://cube.fyi/exception.html), “An exception is a deviation from the rules outlined in a block“, however, personally, I’m also using exceptions for deviations in compositions and – in the case of links (see global styles section above) – global styles. 

In my CSS, exceptions deal with changes in state or style of an element. They replace BEM/SUITCSS modifiers. For example, with SUITCSS, I might have modified the default button style by adding a `Button--secondary` class.

```html
<a class="Button Button--secondary" href="#">Reply by email</a>
```

This modifier class would have changed the button style from the default style to a secondary style.

Using CUBE CSS Exceptions, however, it’s possible to achieve the same results using data attributes which override or extend the default styles.

```html
<a class="button" data-variant="secondary" href="#">Reply by email</a>
```

While this doesn’t necessarily reduce the amount of CSS I’m writing, it certainly reduces the number of classes required and improves clarity in my templates. It also, to quote the [cube.fyi](https://cube.fyi/exception.html) docs again, “provides a useful hook for both CSS and JavaScript.”

But, the real magic happens when combining exceptions with compositions. Remember, compositions create flexible layout without the need for media queries to adapt to different contexts. And with fewer media queries, the amount of CSS required to solve layout problems is greatly reduced.

For example, the CSS for the grid layout I use on certain case study pages now looks like this:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-placement, auto-fill),
  minmax(var(--grid-min-item-size, 16rem), 1fr));
  gap: var(--gutter, var(--space-s-l));
}

.grid[data-layout='50-50'] {
  --grid-placement: auto-fit;
  --grid-min-item-size: clamp(16rem, 50vw, 26rem);
}

.grid[data-layout='25x4'] {
  --grid-placement: auto-fit;
  --grid-min-item-size: clamp(10rem, 20vw, 26rem);
}
```

Whereas, before I achieved the same results with a mix of BEM style *block*, *element* and *modifier* classes, along with breakpoints to handle the layout change from smaller to larger viewports.

```css
.Grid {
  display: grid;
  grid-gap: 24px;
}

.Grid--2col {
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .Grid,
  .Grid--2col {
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 48px;
    max-width: 1600px;
  }

  .Grid-1-3 {
    grid-column: 1 / span 3;
  }

  .Grid-1-6 {
    grid-column: 1 / span 6;
  }

  .Grid-1-12 {
    grid-column: 1 / span 12;
  }

  .Grid-4-3 {
    grid-column: 4 / span 3;
  }

  .Grid-7-3 {
    grid-column: 7 / span 3;
  }

  .Grid-7-6 {
    grid-column: 7 / span 6;
  }

  .Grid-10-3 {
    grid-column: 10 / span 3;
  }

}
```

 When leaning on flexible layout compositions, the job of exceptions, in this case, is to change the layout. All that is required to achieve this is to override the default fallback by updating the variable value.
 
```css
.grid[data-layout='50-50'] {
  --grid-placement: auto-fit;
  --grid-min-item-size: clamp(16rem, 50vw, 26rem);
}

.grid[data-layout='25x4'] {
  --grid-placement: auto-fit;
  --grid-min-item-size: clamp(10rem, 20vw, 26rem);
}
```

 That’s a couple of lines of CSS for each layout, and not a media query in sight.


## Summary

There’s no doubt that adopting the [principles of intrinsic web design](https://moderncss.dev/contextual-spacing-for-intrinsic-web-design/) and using modern CSS techniques can make a huge contribution towards reducing CSS. Fortunately, these two aspects of web development often go hand in hand, which makes the future look promising. 

Additionally, much of this stuff has already been formalised into practical solutions. For that we have various clever folk in our industry to thank.

If you’re serious about writing better CSS and less of it, then [Every Layout](https://every-layout.dev/) by Andy Bell and Heydon Pickering is a fantastic place to learn about flexible, algorithmic layout design. Likewise, [Utopia](https://utopia.fyi/) from James Gilyead and Trys Mudford, in my view, is *the* place to learn about and generate fluid responsive type, space and grid systems which do away with breakpoints. Finally, when it comes to writing and organising CSS sensibly, there are few better approaches to turn to than Andy’s [CUBE CSS](https://cube.fyi/).

Much of my understanding of modern CSS techniques I owe to these guys.

