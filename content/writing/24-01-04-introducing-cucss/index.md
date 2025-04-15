---
title: "Introducing cu.css"
date: 2024-01-04T11:05:51Z
publishdate: 2024-01-04
lastmod: 2024-01-04
draft: false
slug: "introducing-cu-css"
topics: ["CSS", "Side Projects"]
description: "A lightweight CSS framework built using uses modern techniques and two popular methodologies, designed to help you hit the ground running."
---

It’s not always easy to keep the CSS you write consistent, particularly when you’re working on a variety of different projects. Things tend to get messy when you jump between projects, making arbitrary updates, without a clear approach. As your projects grow, so too does the complexity of your stylesheets and your CSS soon enough becomes a nightmare to maintain. 

The ultimate goal, I suppose, is to find a way to manage a growing number of projects somewhat systematically. All while keeping chaos to a minimum. 

One solution I’ve found is to adopt a CSS methodology. Something that helps to formalise the way you write the language with a solid, sensible approach. A good CSS methodology will help improve the consistency of your code and make you more efficient at building and maintaining websites.

But while a CSS methodology is a great start, in reality, you’ll often need a little more than just guidance on how to structure and write your code. Most of the time, I find the best way to kick start my projects is with a methodology, plus a good bit of the CSS itself – already in place and ready to build upon.

[cu.css](https://cu.harrycresswell.com/) is a lightweight CSS framework I built with these things in mind. It uses modern CSS techniques and two popular methodologies and it’s designed to help you hit the ground running. 

In this post I want to share a little more about the project.


## A lightweight CSS  framework built with modern techniques

*cu.css* is a lightweight CSS framework that makes it quicker to start using CUBE CSS and Utopia fluid responsive design in your projects. 

[CUBE CSS](https://cube.fyi/), if you’re new to it, is a CSS methodology that’s orientated towards simplicity, pragmatism and consistency. It helps bring structure to your styles, while respecting the powerful features of the CSS language.

[Utopia](https://utopia.fyi/) is an approach to fluid responsive space, type and grid, which utilises modern CSS techniques, most notably the Clamp function.

*cu.css* wraps these two tools together into what is effectively a CSS starter project. Something you can use as a starting point to quickly get going with modern CSS techniques, sensible defaults and a solid CSS methodology. Think of it as [intrinsic web design](https://moderncss.dev/contextual-spacing-for-intrinsic-web-design/) in action, a base to build upon and a clear direction of travel. 

To the best of my knowledge, a CSS framework built using CUBE CSS and Utopia doesn’t exist. While [cube.fyi](https://cube.fyi/) helps you learn the methodology, there’s not much out there that helps you quickly put it into practice. The same is true for Utopia, so that’s why I decided to make this project public.

Let’s rattle off a few features to give you an idea of what to expect from *cu.css*:

- Built using the CUBE CSS methodology.
- Utopia fluid responsive design for space and type.
- CSS Custom Properties over token-based CSS.
- Two flavours – choose from SCSS or CSS.
- Zero dependencies, no third-party tooling.
- Global styles making HTML elements look great.
- Automatic “user-preference” dark mode.
- Works with [the grain](https://frankchimero.com/blog/2015/the-webs-grain/) of CSS, not against it.
- Simple, accessible and intuitive to work with.
- Lightweight: ~15kb (compressed)

Ok. So why might you want to use *cu.css*, and when might be a good time to use it?

## Why *cu.css*?

*cu.css* will appeal, if like me, you prefer leaning on a lightweight CSS methodology, rather than reaching for an all signing all dancing framework, like Bootstrap or Tailwind. 

To me, Bootstrap is complete overkill, stuffed full of features that I really don’t need. Tailwind, with its all-in utility class approach, fights against the grain of CSS entirely. It’s a complete reinvention of the language, which isn’t how I prefer to write my CSS. 

A methodology, on the other hand, simply acts as a guide. It helps steer you in a sensible direction and offers a lightweight, flexible way to write and structure your CSS. A good methodology is pragmatic and respects the grain of the language.

Building *cu.css* using two well recognised and respectable methodologies has other advantages, too. There’s plenty of documentation online that will help you learn both CUBE CSS and Utopia. Meaning anyone can pick up a project and know exactly how to work with it. With a clear approach, it’s much easier to build upon and expand on the foundations that *cu.css* provides. And do so in a consistent way. 

This seems like a sensible approach. I don’t pretend to be an expert in CSS. It’s not an easy language to master and [Andy](https://andy-bell.co.uk/), [Trys](https://www.trysmudford.com/) and [James](https://www.hustlersquad.net/), the clever folk behind these projects, are far more knowledgable and experienced with the language than I’m sure I will ever be. So why try and come up with my own methodology when these fantastic tools already exist?

I like to think of cu.css as a little bit more than a class-less CSS framework. Call it a low-class framework, if you will. Most the CSS in *cu* is applied to HTML elements, on a global level – just like with a class-less framework. Then, on top of that you have Utopia powering your space and type and the concepts that CUBE CSS brings with it – a handful of utility classes for dealing with common yet specific problems, blocks (otherwise known as components) and compositions (a.k.a layouts) to give you that little extra power.

You may find *cu.css* a good fit for your next project, if:

- you like to write CSS the way it was intended to be written
- you prefer a lighter touch than your typical CSS framework
- you need a clear, consistent approach for writing your CSS
- you need that little bit more than a classless CSS framework
- you’d like to use a modern fluid approach to space and type
- you don’t have time to start your next project from scratch

Have I sold it to you already?

## How to get started with *cu.css*

The best way to get started with *cu.css* is to head to https://cu.harrycresswell.com/ and read the [getting started](https://cu.harrycresswell.com/getting-started/) docs.

Please keep in mind that this project is still very much in its infancy. Existing documentation, methods of installation, and so on, are all likely to change in the months ahead.

You can also find [cu.css on Github](https://github.com/harrycresswell/cu) where you can find the entire Hugo project that powers the *cu.css* website.

## What’s next for *cu.css*

I’m keen to keep *cu.css* as lightweight as possible, but there are a few features I’ve missed, that I’d like to add at some point in the future.  

- Docs for `.prose` and `.skip-link` blocks
- Some of the compositions I’ve missed from [Every Layout](https://every-layout.dev/), for example `.sidebar` and `.reel`.
- Semantic heading classes: `.h1`, `.h2`, `.h3` and so on.
- A utility for visibility

I also plan on improving the code comments in the CSS to explain some of the design decisions further. I also need to add a fancy header comment to the CSS file.

Then there’s the matter of improving how you install *cu.css*. Currently you need to copy files into your project which seems rather rudimentary. Perhaps I will publish the project on NPM, so it can be installed that way or via a CDN.

There are also certain improvements I’d like to make to the *cu.css* website itself. In no particular order, in the coming weeks I’m planning to add the following features:

- A `/changelog` page
- Heading anchor links
- Open external links in a new tab
- Next/previous links for the docs
- A better domain name (possibly)

The docs could undoubtably do with a little more polish too. I’m also considering creating a Figma or Penpot file to help folks create design mockups which play nice with the project.

At some point this year I plan to re-write the CSS on my personal website using CUBE CSS and a good bit of *cu.css*. I’ll probably do the same for the [Practical Hugo](https://practicalhugo.com) website and begin using *cu.css* or at least some iteration of it for most of my future projects. Hopefully, that way, I can create build things more efficiently and keep my code nice and consistent.

## I’d love to hear from you

If you have any feedback or suggestions I’d love to hear from you. Likewise if you end up using *cu.css* in a project, please let me know. 

I have a vague plan to add a “cu.css in use” page to the documentation site. I’ll begin by listing my own projects, but if you have one you end up using *cu.css* with, let me know and I’ll add a link to your project.
