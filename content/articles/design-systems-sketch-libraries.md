---
title: "Better design systems in Sketch"
date: 2017-10-19T21:15:59+01:00
tags: ["Design"]
slug: "better-design-systems-sketch-libraries"
description: "The answer to cohesive, maintainable and re-usable projects."
---

{{< message >}}
This article was originally posted on <a href="https://blog.usejournal.com/using-sketch-libraries-to-build-a-better-ui-design-system-part-1-26f5660f3c98">Medium.com</a>
{{< /message >}}

{{< blockquote quote="“Design is just problem solving within a set of constraints. In the grand scheme of things, it rarely has anything to do with graphics.” " cite=" Adam Morse" >}} 

Designers who have worked with [a design system](https://airbnb.design/building-a-visual-language/) before will understand constraints as the various elements in a visual language, constructed to guide our every decision. Colors, icons and buttons are just some of these elements which together, form a unified system of tools to work with.

Systems of constraint help us pave a path in which to follow, improving the efficiency and speed of our process. Promoting reusability and consistency in our work, they enable us to design better digital products. When used effectively, our projects are scalable and maintaining them easier.

That being said, often the reality of managing these systems is quite different. Whilst Sketch has made the process easier, it’s still not without it’s quirks.

## The Problem

Before the arrival of Sketch Libraries we had [Symbols](https://www.sketch.com/docs/symbols/)— the biggest leap forward to date, in the world of design systems. Symbols helped solve issues concerning consistency, making parts of our interface re-usable. However Symbols were document dependent. Until now, there was no native way for Symbols to transcend the Sketch files they lived in.

### Why is this a problem?

For small projects this wasn’t a big deal. You could keep your entire design in one Sketch document. Mockups, wireframes, userflows, UI Kit, the lot. Symbols worked fine as all your project required was in one document.

But what happens when you’re designing bigger projects? Perhaps you want Sketch to run fast and free of bloat, so you split your project into multiple sketch files, surely it will be easier to manage? It will. That is until you want these various files to reference one set of symbols.

At [AIN](https://www.angelinvestmentnetwork.co.uk/) we have 3 different products which all utilise one design system (or set of symbols). The challenge has been working out how to use the same set of symbols simultaneously, for all 3 projects. Bare in mind these projects are big, each one containing hundreds of Artboards. Using one Sketch document for everything just wouldn’t make sense—the file size would be unmanageable.


### The old way of doing it

My old process involved using a Sketch Template for my Symbols, which I picked up from [Yavor Punchev’s awesome process for the Marvel style guide](https://blog.marvelapp.com/creating-maintaining-marvel-style-guide-sketch/). I extended Yavor’s method by pulling Symbols into different Sketch documents using the Shared Library feature of Craft plugin by Invision. Maybe this process sounds familiar?

Truth be told, this is a hacky process which I don’t recommend using. Yes my files were bloat free, and I could insert Symbols into multiple documents, but I had no way of syncing updates to those Symbols already in use across different files.

Symbols are designed to make projects easier to maintain. Whilst this method allowed for re-usability, it made maintaining and updating existing symbols impossible.

*Side note: I couldn’t use Sketch Runner to search for and insert symbols on the fly using this process. Nothing major but still annoying as Runner is a huge time saver.*

Luckily, the solution arrives with Libraries, new for Sketch 47.

## The Solution

[Sketch Libraries](https://blog.sketchapp.com/libraries-an-in-depth-look-56b147022e1f) allow you to create a Library of Symbols, which can be use across multiple documents. We’re talking SASS partials for the developers out there. On top of that, you can also nest Libraries within Libraries. This is big news.

Essentially, you can now keep different groups of symbols in their own Sketch file. That means different document for your buttons, colours, icons, form elements, and whatever else you might use in your system. Other documents in your project can then reference the symbols in these source files, and at the click of a button sync when you make any updates to those symbols.

Simply put; you now have one source of truth for all your different UI element, which, in turn, all your other Sketch files reference. The advantages to doing this will soon become clear:

- Smaller file sizes
- Faster Sketch performance
- Reusable components
- Maintainable projects

[Pablo Stanley](https://medium.com/@pablostanley) summed it up pretty well: “This is like the holy grail of product design”. You can watch Pablo getting excited about Libraries here.

Libraries explained by the Sketch team:

_“A Library is just an ordinary Sketch document that contains Symbols which you can then use in any other Sketch document. If you update any of those Symbols in your Library file, documents containing instances of those Symbols will receive a notification telling you that they can be updated. Here you can preview, check, and confirm changes — and by doing so, you can always ensure your documents are using the up-to-date copies of those components.” _

## Putting Sketch Libraries into practice to build a component library

The next part of this article will look how I’m using Sketch Libraries to maintain a system of UI components. But first, there are a few things to keep in mind:

**Think like a developer**
Adopting the developer mindset when designing systems is imperative. There are many lessons we can learn.

**D.R.Y — Don’t repeat yourself**
The idea is to create re-usable components. This keeps our files lightweight and our design consistent.

**Think in Primitives**
Every component we create is made up of a certain set of properties. These properties are the most ‘primitive’ elements, used throughout a design system. A developer would create variables for these properties to prevent duplicates in the code. We can do the same, by creating a Library files for all primitives which we can utilise when we build larger components.

**Atomic Design Methodology**
I’m following [Brad Frost’s Atomic Design Methodology](http://bradfrost.com/blog/post/atomic-web-design/) for building scaleable interfaces. Primarily because it’s easy follow and everyone understands the principles.

In a nutshell, Atomic Design takes inspiration from the molecular structure of the natural word. Where Atoms; the basic building blocks or in our case the smallest parts of a visibly recognisable UI, combine to form Molecules; the larger parts of our interface. Organisms are the assemblies of these Molecules and represent even larger, more complex parts of our interface.

### Separate Sketch documents for all groups of symbols

Of course, you can still create one file for all your components if you prefer—and reference Symbols from that file in other documents—however my suggestion (and the way we’ll be doing it here) is to create individual documents for each group of Symbols.

Again, this is similar to how a developer might use Sass partials. Using lots of smaller documents make our design system easier to manage. The other advantage is our Library files will be re-useable in other projects and importantly, it will be scaleable.

By thinking in primitives, we can start by creating Libraries for the core elements which will be used across our entire design system. These basic properties will make up all Atoms, Molecules and Organisms.

Let’s start by creating a new Sketch document for the colors in our system. Colors are highly reusable and found throughout our UI—a sensible place to start.

## Step 1: create a new Sketch document for your colors

I started by prefixing the name of my sketch document with AIN- so not to confuse them with any other ‘non AIN’ projects I’m currently working on. For example AIN-colors and so fourth.

*Note: Obviously this part is totally optional but you might find it useful if, like me, you work on several different unrelated projects and like to be organised.*

Following this, I made a Shared Style for each colour in our design system and organised them into categories: brand, greyscale and ui by using a ‘/’ in the name, to build the folder structure.

Then I made each color style into a Symbol, and arranged them on my Symbols page using the [Symbol Organiser](https://github.com/sonburn/symbol-organizer) plugin. My category naming convention from the previous step made this process nice and straight forward. Now all my Symbols are clearly labeled and organised.

## Step 2: turn your colors document into a Library

The next step is to turn your file to a Sketch Library. We will need to do this each time we want to use a Sketch file into a Library.

In *Sketch > Preferences*, you’ll find the new Libraries tab. Click Add Library and locate your new file.

Using my example from above, I made my AIN-colors document into my first Library. As my colors document is now a Library, I can nest my colors inside of other Sketch files. This is where the power of Libraries comes in. We will see how helpful this is when I create the next Library document in the system – for my icons.

## Step 3: create a new Sketch file for your icons

Next I did the same thing as I just did for my colors, but this time for icons.

First create a file for your all your icons. This time I named the document AIN-icons and saved it in the same folder as my AIN-colors file. This is the start of my ‘folder of truth’—the directory that all the components in my design system will live in.

I then created a 24x24px Artboard and placed the icon. I made a 24x24px transparent container below the icon shape (if your using Google’s Material Icons this will already be in place), then I inserted the brand color Symbol from my AIN-colors Library (Insert > AIN-colors) on top of my icon shape. Resizing the Symbol to 24x24px after.

*Note: the purple Symbol icon in the layer view is now a link, instead of the usual rotating arrows. This means your Symbol is from an external library which your file is referencing. So don’t expect to find it on the Symbols page in your current document.*

Next I turned my icon shape into a mask (Ctrl + Click > Mask), which reveals the original icon shape below. Now our icon shape is masking the color Symbol from our Color Library.

Awesome, I’ve used my first Library. That means I can now change the color of my icons throughout my system, to any color in my color Library. If I need to make changes to my AIN-color file, those changes will also occur in my icons file or anywhere else I reference my colors Library.

Next, be sure to turn each icon Artboard into a Symbol, this is important if you want to use your icons document as a Library—which we do.

*Pro tip: When creating your icon Symbols, make sure you check “Adjust content on resize” and set “pin object to all edges on re-size”, this will ensure you icon scales, should you wish to use it at bigger or smaller sizes than the base size of 24px. Also make sure your size dimensions are locked so the whole Symbol scales correctly.*

I repeated this process for all icons used in the AIN design system, each set at a base size of 24px. Then I organised my Symbols using the Symbols Organizer plugin, as before.

## Step 4: turn your icons file into a Library

This is the same process as Step 2 above, so follow that again, but this time for your icons.

At this point you should have 2 Library files. In my case I have AIN-colors and AIN-icons. Now our icons are ready to use in other documents.

## Step 5: repeat the process for your atoms

Hopefully this has been enough to help you get the gist of this workflow.

Continue with your own system by creating Library files for all the different Atoms in your design system. Build your Atoms from the Primitive Library files you’ve created. Nesting them as you go. For the design system at AIN, I made Libraries for my buttons, form elements, avatars and so on, until I had a folder of truth containing all the atom level elements in our system. I can now reference these Libraries in other documents, where I’m designing even larger components of the interface and hi-fidelity mockups.

### Updating your Library files

Inevitably, you will at some point need to make changes to Symbols in your core Library files. Luckily this is pretty straight forward, just make your changes as normal. When changes are made, any other documents containing the updated Symbols will show an alert in the top right corner of the Sketch document which needs updating.

When you see this, make sure you click it. Sketch will show you the outdated symbols and the new versions which will replace them. Click Update Symbols to sync the changes across documents. That’s it, pretty simple.

## Taking it further

Once you’ve built your Atoms, you’re ready to start building more complex parts of your UI; your ‘Molecules’ if you like, and following that, your ‘Organisms’. Each time making use of the Libraries you’ve created by nesting them inside one another.

As your system become more complex and you build out your interface, you can utilise these Libraries you’ve created. In essence, you will now have a Sketch design system to work with, usable in any document or any project.

In the second part we’ll look at putting our system to use, by building out the more complex components, for now here are a few ideas of where to go next:

**Possible ideas for Molecules:** Navigation, Hero, Banner.

**Possible ideas for Organisms:** Cards, Media, Header, Footer.

*Note: The Atomic Design Methodology is just a guideline, there are no set rules. If your navigation is complex it might be more suited to being an Organism. In that case go with it. Use the method as you see fit. Alternatively come up with a method of your own.*

### Sharing Libraries across different devices

One thing I haven’t looked at is how Libraries work with Dropbox or Google Drive. I’m guessing this isn’t a big deal, but I haven’t tried it yet. This would be super useful for remote workers or teams looking to share design assets or work with a system across multiple devices. Perhaps you know more about this than I do?

## Wrapping Up

We just looked at using [Libraries](https://www.sketch.com/docs/libraries/) new for [Sketch 47](https://blog.sketchapp.com/introducing-libraries-and-smooth-corners-in-sketch-47-2abc5dfc1fb3) to create a modular system or component library to use in our design projects. Hopefully by now it’s clear how powerful the feature is.

If you’re working in a team of designers, sharing design elements or working independently and looking for a better way to manage on-going projects then try incorporating Libraries into your workflow. Libraries are easily the biggest leap forward for Sketch users since Symbols when it comes to the challenging process of maintaining a design system.

[Download the example project](https://www.dropbox.com/home/harrycresswell/05_writing/graphics%20and%20images/medium%20articles/sketch-libraries-part-1/sample%20project%20for%20download/folder%20of%20truth) for reference, it includes files for colors, icons and buttons, plus a quick example project which uses these Library files. I hope it helps you to see how I’ve set things up. Bare in mind you’ll need a copy of Sketch 47 for all this stuff to work.

If you found this article helpful, please share it with any friends who would benefit. Thanks for reading!

Looking for part 2? You can [find it here](https://medium.com/sketch-app-sources/using-sketch-libraries-to-build-a-better-ui-design-system-part-2-8de6cef5adc5).

## Resources

- [Libraries, an in depth look](https://blog.sketchapp.com/libraries-an-in-depth-look-56b147022e1f) by Sketch
- [Sketch Libraries](https://medium.com/ux-power-tools/sketch-libraries-how-they-work-and-the-crazy-stuff-you-can-do-with-them-fc10f142ac80) by Jon Moore
- Brad Frost’s [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/)
- Pablo Stanley on [Sketch Libraries](http://atomicdesign.bradfrost.com/chapter-2/)
- [Introducing Libraries](https://blog.sketchapp.com/introducing-libraries-and-smooth-corners-in-sketch-47-2abc5dfc1fb3) by Sketch
- [Airbnb: Building a Visual Language](https://airbnb.design/building-a-visual-language/) from Karri Saarinen