---
title: "Design Systems"
date: 2018-05-02T20:47:43+01:00
tags: ["Design"]
slug: "design-systems"
description: "Using design system methodology will make you a better designer. In this piece you’ll learn some key methods to help you design in systems."
draft: "true"
---

{{< intro >}}Using design system methodology will make you a better designer. If design is all about problem solving, then solving problems becomes a whole lot easier when you have a process in place.{{< /intro >}}

There are certain methods and ways of thinking, which are fundamental in the design system process, and having a clear understanding of these methods will help you build robust UI design systems.

So before we start building our system, we need to make sense of these methods, and in order to do that, first we must understand why we’re building a UI design system in the first place.


## Why build a UI design system?

Think for a moment back to the days of Lego blocks. We all had a certain number of pieces to build things with. Certain shapes and certain colours. We were limited by our choices. But this allowed us to work efficiently.

Much like a kid with Lego blocks, with a design system we are defining our tools to work with. Our system helps us build constraints into our process, which we can use as a guideline to work effectively.

There are of course many more reasons to consider. Design systems help:

- reusability of design assets
- reduced design debt
- improve consistency in our work
- improve efficiency with a faster workflow
- make our projects easier to manage
- make our assets portable
- our work scale long term


Now we know why, we can use our understanding to influence the way we go about building our system. So what methods will help guide the build process, which will tick all the boxes mentioned above?

The rest of this article will look at a few useful methods to consider when making of a successful UI design system.


### Design like a developer

If you design like a developer you’ll be thinking in terms of variables, components and partials, not pages and pixel perfect [Dribbble shots](https://blog.intercom.com/the-dribbblisation-of-design/).

Achieve this by seeking to identify reoccurring properties in your work, using these properties to build reusable structures we call components.

By storing these properties in [Library files](https://www.sketchapp.com/docs/libraries/), and [using Libraries to build components](https://blog.usejournal.com/using-sketch-libraries-to-build-a-better-ui-design-system-part-1-26f5660f3c98), you’ll then be able to build your design comps lightning fast, with little inconsistency.

This method replaces the ‘single Sketch file UI kit’ with a multiple file approach, Keeping UI components such as forms, buttons and alerts in independent Sketch Library files. You may notice the similarity between these files and SASS partial files, used by our developer friends.

But why do this? This makes total sense both from a reusability perspective and an organisational one.

From a technical perspective, keeping one big Sketch file can lead to bloat, broken symbols and a whole host of other annoyances. From a workflow perspective, much like having too many browser tabs open can give you anxiety, too much going in one file can lead to design decision paralysis. You might put this down to [Hick’s Law](https://lawsofux.com/hicks-law.html).

{{< blockquote quote="The time it takes to make a decision increases with the number and complexity of choices." cite="William Edmund Hick" >}}

On the other hand, Sketch runs fast when you keep small files. Symbols become easier to maintain and you can focus your attention on one specific component at any one time. You reduce complexity in your work, and keep your stress levels to a minimum.

As your project evolves you’ll realise how much of a joy working this way is. Less moving parts per file means there’s less to maintain, less to update and less to go wrong.

Drill down to the exact file to find the exact problem, make necessary changes and sync across your entire project with ease.


### Designing D.R.Y — don’t repeat yourself

Design like a developer and the term D.R.Y — ’Don’t Repeat Yourself’ — will inevitably come up. This is standard stuff for developers. The idea is you extract any shared properties from your work and store them as variables for later reuse.

Working this way promotes reusability in your work, by keeping your code ’D.R.Y’. The D.R.Y-er your code, the smaller your files. Thus the cleaner your work and the fewer your headaches.

By using Libraries we can do the exact same thing to create D.R.Y-er designs. Much like a developer creating variables, we can identify the shared properties and styles in our work, decouple them from our designs and store them in Libraries to make them re-usable.

So [audit your work](http://bradfrost.com/blog/post/interface-inventory/) and identify those reoccurring properties!

Now we’re thinking on a granular level, not just about components but also their primitive properties. Hold on, wait a minute. Primitives?


### Thinking in Primitives

Thinking in primitives is the easiest way I know to understand these shared or reoccurring properties which make up identifiable UI components.

By decoupling [subatomic](https://daneden.me/2018/01/05/subatomic-design-systems/) level properties or ‘primitives’, from our designs and storing them in independent Library files, we can achieve D.R.Y designs. As we make the majority of our design assets reusable. And inconsistency in our work will become a thing of the past.

Keeping primitive Libraries allow us to create an advanced system of properties overrides which we can use to build a flexible set of components in the fewest unique parts possible.

We can use these primitives in any file across our system, or any project. We can make changes across an entire system via one core set of master files files — as some like to call ’a single source of truth.

This is particularly helpful when your design work doesn’t quite translate to code. Or say for example you want to make a change to one of the core colours in your system without having to go through a ton of files making manual changes.

In order to prevent your mockups from becoming redundant almost immediately, or forever battling to keep your designs up to date with a live product, we can keep primitive Libraries and create a living design system which will evolve as our design changes.

Ok, so now we understand the [subatomic](https://daneden.me/2018/01/05/subatomic-design-systems/). How do how do we organise the components we build in a cohesive, logical way, which supports our demand for a scaleable, evolving design system?


### Atomic Design

If the aim is to keep our components in their own partial files, we need a way of think about them not just on a holistic level, but also in order of hierarchy, scale and complexity.

Enter [Brad Frost’s Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).

Atomic Design helps make our work modular, breaking the interface in components and organising different building blocks using the atomic scale.

From `Atoms`, being the smallest, followed by `Molecules`, and then finally `Organisms`, the most complex structures, comprising both atoms and molecules.

Understanding Atomic theory will help you identify how to break your work up into reusable components, whilst maintaining a system which scales, as your work evolves.

Consider using Libraries in your system, and Atomic design will help you stay organised, use it to guide your file and folder structure.


## For the road

In this article we took a quick look at useful methods we can use to build better design systems in Sketch. Taking the time to understand design methodology will inevitably help you become a better designer and keep complex project from becoming a pain to work with.

Below you will find several resources which I’ve found invaluable in understanding the UI design system process. I hope you find some useful. Something I remind myself often, is don’t be afraid to create your own methods for understanding and work with design.

Remember, there’s no silver bullets when it comes to building UI design systems, each project will have it’s own unique requirements, so don’t follow any method blindly.

As designers it is our responsibility to think deeply and consciously about the work we create. Putting out work which has a positive impact and genuinely solves problems for the long term.

_I explore the ideas found in this article in more detail [over on Medium](https://medium.com/@harrycresswell). If you have a question about UI design or building systems in Sketch, [drop me a tweet](https://twitter.com/harrycresswell) and let’s have a chat about it._


## Further reading

- [Hick’s Law](https://lawsofux.com/hicks-law.html), Laws of UX
- [Interface Inventory](http://bradfrost.com/blog/post/interface-inventory/) by Brad Frost
- [Atomic Design: Create Design Systems, Not Pages](https://www.youtube.com/watch?v=wcAl0VXYBGE) from Brad Frost
- [Subatomic Design Systems](https://daneden.me/2018/01/05/subatomic-design-systems/) by Dan Eden
