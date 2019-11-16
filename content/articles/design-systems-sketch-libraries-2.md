---
title: "Better design systems in Sketch 2"
date: 2018-06-28T16:35:12+01:00
tags: ["Design"]
slug: "better-design-systems-sketch-libraries-part-2"
description: "Build a flexible system of Avatars with particle properties (primitives) and Sketch Symbol Overrides"
feature: "https://miro.medium.com/max/5340/1*TyHlUOExsXrDz4eXY8WMzg@2x.png"
---

{{< message >}}
This article was originally posted (with supporting imagery) on <a href="https://medium.com/sketch-app-sources/using-sketch-libraries-to-build-a-better-ui-design-system-part-2-8de6cef5adc5">Medium.com</a>
{{< /message >}}

*Prerequisite: This article requires [Sketch 47](https://www.sketch.com/updates/) as it make use of the long awaited new ‘Libraries’ feature.*

Where [the first part](https://blog.usejournal.com/using-sketch-libraries-to-build-a-better-ui-design-system-part-1-26f5660f3c98) gives you an intro to building ‘primitive’ Libraries to use in a UI design system, this article focuses on using the Symbols stored in these Libraries to build a highly flexible Atom level component.

For those new to these concepts, the term primitives is used to describe subatomic properties; the lowest level ‘particles’ from which everything else in a system is composed. These ideas are explored in depth in Dan Eden’s work on [Subatomic Design Systems](https://daneden.me/2018/01/05/subatomic-design-systems/).

{{< blockquote quote="“Rather than creating a limited and vast set of UI elements, you define the system in terms of its particle properties, thus limiting the available styles but opening potentially unlimited avenues of creativity for the actual pieces of UI.” " cite=" Dan Eden" >}} 

We can use the concept of ‘particles’ to better understand the Libraries created in the first article. As the process involves identifying or extracting the core properties from our work and storing them in Libraries for reuse.

But why do this? Our intention is to reference these particles when building pieces of UI. As our components will share properties they’ll remain consistent, yet flexible enough to allow for creativity in their construction.

The particular pieces of UI we’ll focus on here are commonly known as Atoms. Atoms are the smallest identifiable components in a system, taken from [Brad Frost’s Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) which you’ll likely be familiar with.

As Atomic Design is widely understood we might use it as the principle guide for our component structures, borrowing the concept of ‘particles’ from Subatomic Design to help explain properties composing an Atom.

[This diagram](https://miro.medium.com/max/4440/1*h4vUVzQL5iDd4BEE6dUCyw.png) illustrates where we are on a scale of UI complexity. At this stage we’re primarily concerned with subatomic properties and how we can use them to build Atoms.

By storing these properties (particles per Subatomic Design) as a collection Symbols and Symbol Overrides in Sketch Libraries, we can build a highly flexible system of low level UI components (Atoms per Atomic Design). And with these components, rapid prototype complex structures with minimal cognitive load.

Before we get onto the practical stuff ahead, here’s a few reasons why you might consider ditching the ‘single file UI Kit’ approach in favour of breaking your UI system into multiple files. And how Sketch Libraries can take your UI design system process to the next level.

## How Libraries improve our design systems

Fundamentally, Libraries help reduce complexity and inconsistency in our work and increase portability and reuse of UI assets.
In other words, Libraries help us create useful work which serves our needs for the long term. As design systems thinker [Nathan Curtis](https://medium.com/@nathanacurtis) puts it:

{{< blockquote quote="“Focusing on style guide delivery as the climax is the wrong story to tell. A system isn’t a project with an end, it’s the origin story of a living and evolving product that’ll serve other products.” " cite="  Nathan Curtis" >}} 

Benefits of using Libraries to create systems that last:

- **Organised, maintainable projects:** More files, fewer moving parts per file. Sync changes from a single source of truth.
- **Reduced design debt and redundancy:** No more broken Symbols and inconsistencies as you’ll be building comps using shared properties stored in ‘primitive’ Libraries.

- **Scaleable, flexible systems:** Make changes, sync updates and evolve your system with relative ease. Symbol Overrides allows for fewer Symbols and flexible components.

- **Portable design assets:** Libraries are independent files and so can be used across multiple Sketch files and reused in other projects.

Where you may have struggled to maintain a system in the past, Sketch Libraries help you build lightweight systems which are easier to manage as your product grows and evolves.

By organising Symbols in multiple Library files, we can nest a Symbols from one file within another and keep those files both light in complexity and small in size. With Libraries, our assets become portable and updates easier to sync across entire projects.

That means no more redundant design mockups post developer hand-off, no more battling to keep your designs up to date and generally a stress free time with Sketch.

So how can you adopt this approach to UI design systems with Libraries?

## Using Libraries for a UI design system

Theory aside, building a design systems with Libraries is fairly simple. A high level overview might look like this:

1. Decouple reoccurring properties found in your designs.
2. Store properties as Symbols in a series of Library files.
3. Use Libraries to build identifiable components.
4. Use components to rapid prototype design comps

I cover the first 2 parts above in [the first article](https://blog.usejournal.com/using-sketch-libraries-to-build-a-better-ui-design-system-part-1-26f5660f3c98). The third part is where we’ll focus from here. Let’s get on with that now.

## Building an Atom using Sketch Libraries

Now we’re all familiar with Atomic Design, we have a good understanding of how we can use primitive or particle properties to build an Atom. Then in future cases Atoms to build Molecules, Molecules to build Organisms etc.

As I’ve shared [my process for building buttons](https://medium.com/sketch-app-sources/using-sketch-libraries-and-primitives-to-build-an-even-better-system-of-buttons-ecc8f25486ac), we’ll look at building a flexible Avatar component, another low level Atom. Later we’ll use this Avatar inside a card component. Expect to read about that in a future article.

With some design system methodology in mind, we will start by identifying the properties needed to build the component.

## Step 1: Audit your work

Call it what you like, Brad frost refers to this as a [Interface Inventory](http://bradfrost.com/blog/post/interface-inventory/), but ‘Audit’ is nice and short so lets go with that for now.

{{< blockquote quote="“An interface inventory is a comprehensive collection of the bits and pieces that make up your interface.” " cite=" Brad Frost" >}} 

However you choose to do it — whether using a spreadsheet, in Evernote, on a piece of paper—just do it. Taking a holistic view of your entire product will help you identify patterns and relationships between different UI components.

In our case this means potential cases of reusability among properties, which we can decouple from our design and store in Libraries.

When auditing my work on the [AIN design system](https://ainlabs.netlify.com/), I realised many design patterns in the product were made from variables of a handful of property types: `color`, `icon`, `shape`, `border`, `text`.

In theory, this meant I could build the majority of any component (Avatars included) using variables of these 5 primitive properties. This made a good starting point when considering what to store in primitive Libraries.

### Adding missing Libraries

If you read [the first part](https://blog.usejournal.com/using-sketch-libraries-to-build-a-better-ui-design-system-part-1-26f5660f3c98) you’ll know I already built Libraries for 2 out of the 5 primitive properties used in my system: `colors`, and `icons`.
  
I’ve since built Libraries for `shape` and `border`, which contain all instances of these properties used in my designs.

At this point you might be thinking; why not use Layer Styles?

New for Sketch 51 (currently in Beta): Both Text Styles and Layer Styles defined in Libraries will be available in all documents, just like Symbols are. This is a huge update and will help us solve inconsistencies across Styles which currently we have to recreate for each Library.

Layer Styles, however, still don’t maintain shape, meaning we have no way to control border radius when using Layer Styles.

For this reason, I chose to ditch Layer Styles altogether, instead creating Symbols for all instances of shape, storing them in Libraries which can be used across the entire system.

By doing this I could reduce the number of unique Symbols created on a component level and reduce the complexity of each component.

### Handling text on a component level

Typography in Sketch, as you’ll know, is no easy beast to tame. For this reason, I decided against creating a `text` Library. Instead I handle all instances of text on a ‘per component’ basis, meaning any text required will live in same file as the component itself.

This isn’t a big deal if you set your text using a [modular scale](https://www.modularscale.com/) or create shared Text Styles with [Text Styles plugin](http://www.textstyl.es/) to avoid inconsistency. But keep in mind you won’t need the plugin come Sketch 51.

Now I have 4 primitive Libraries which I can use to build components. As the majority of components will reference these Libraries, component files will become smaller, less complex and easier to manage. Components will contain only a very few unique symbols, native to their file.

Fewer unique parts means components remain ultra lightweight. Using Symbols store in my Libraries, I can now utilise Overrides to build highly flexible components.

Let’s leave these 4 Library files for now. We’ll come back to them later when it’s time to construct the component.

## Step 2: Identify component variables

Before building your component, aim to identify the requirements of the particular component. In other words, what are the unique attributes comprising the component?

For the [AIN Design System](https://ainlabs.netlify.com/components.html#avatars) it made sense to build 2 styles of Avatar, to differentiate between the 2 different user types in the product:

- People — in the form of a profile image.
- Projects — in the form of a company logo.
  
To make these 2 user types noticeably different, a design decision was taken to use 2 visually different styles: `round` for users and `square` for companies.

The next variable to consider was whether or not a user uploads an image or not. This meant we would have to create 2 component states, one `with an image` and one `without an image`, for both `round` and `square` styles.

We decided to fallback to the users initials for cases when an image isn’t uploaded. This meant `text` would also have to be considered for both styles.

The final variable to consider was the `size` of the Avatar. This was tricky to get exactly right before we knew all the potential use cases. It required some fine tuning after we began using the system, however the sizing scale remained true to the [8pt grid](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632), which we used for all components and spacing in the final system. If you’re new to the 8pt grid, this means all spacing units are multiples of 8, which helps ensure a consistent rhythm in your work.

Ok that’s a lot to remember! Let’s break down these component requirements so they’re more manageable and we have a clear direction to take.

### Breaking down the requirements

Avatars will need to have Override states for:

- **Round**: (99px radius) for user avatars
- **Square**: (4px radius) for company logos avatars
- **With an image**: for when a user uploads one
- **With initials and a colour background**: for when a user doesn’t upload an image
- **5 sizes**: xl, l, m, s and xs

## Step 3: Identify cases of reusability

Now we know the requirements for the component, let’s come back to those 4 primitive Libraries. Which of these existing Libraries can we use to build our Avatar component?

As identified in my audit, Avatars in the system are made up of 5 primitive properties:

`Color`, `Shape`, `Border`, `Text` and `Image`

3 of which can make use of the Libraries we made:

`Color`, `Shape` and `Border`

`Text` and in this case `Image`, are both specific to the Avatar component, meaning these have little to no re-use elsewhere in my system. So it makes sense to handle these specificities directly within the Avatar Sketch file.

## Step 4: Build the avatar component

Now we know the requirements, it’s time to create a new Sketch file and build our component. In my case I called the file `AIN-avatars`, where `AIN–` is the project name prefix. Useful for if you decide to create more than one system.

From here I updated my folder structure from a flat system to organising Libraries by Atomic Design principles. This step isn’t crucial but it may help you think about the parts to your system in order of complexity.

### Method using Abstract for version control

If you are using Abstract to keep track of revisions and changes, files set up is slightly different. You will want to **create your file from within Abstract**: *Add File > Create Sketch file as Library*. This will prevent you running into problems where Abstract doesn’t recognise Symbols you made previously.

*Pro tips for Abstract: Always open files from within Abstract via the ‘Edit in Sketch’ button and not from Sketch. This will ensure the changes you make to your files are tracked by Abstract.*

### Create Symbol Overrides for avatar images

Inside my new file I created 5 Artboards, at my `xl` size (120px x 120px), giving me 5 override options to use for user profile images.

Remembering the shape of my user profile images, I named these Artboards `avatar / image / rounded / 1` (1 through to 5) and created a 120px circle to fill each Artboard. Then I turned each shape into a mask: ctrl + click on the layer, then select Mask.

I used the [UI Faces Sketch Plugin](https://uifaces.co/sketch-plugin) to auto generate my 5 images. Of course, you don’t have to stick to 5 images here, you could create as many user image overrides as you need. Once this is done turn each Artboard into a Symbol.

From here, I created 5 more Artboards, again at my `xl` size for my 5 company logo overrides. I names these Artboards `avatar / image / 4px / 1` (1 through to 5). Next I added a shape layer with 4px radius, changed the color fill and added a different logo option for each. In my case I used logos from our other products, but you can use whichever Logos or graphics you wish.

Don’t forget to turn your new Artboards into symbols once you’re done.

Great! Now I have a total of 10 new symbols to use as Overrides for user profile images and company logos.

### Create master Symbol for each component size

Building the master component is where the real Library magic happens. Here we’ll make use of our `border`, `shape` and `color` Libraries from earlier. I call it a ‘master’ component as this is the Avatar component we’ll place into designs when building larger components and design comps.

To make the master components, I made 5 more Artboards, at the 5 different sizes determined using the 8pt grid system:

- `xl`: 120px
- `l`: 96px
- `m`: 80px
- `s`: 64px
- `xs`: 40px

### Adding Symbol Overrides from Libraries

Now we need to insert our `Shape` Library. Do this for each of the 5 Artboard sizes: *Insert > AIN-shapes > shape/radius > rounded*. This will allow us to change the Avatar shape from round to square for company logos.

As my Color Library is nested inside my shape Library, that kills two birds with one stone. We now have control of our Avatar shape and color in the form of Symbol Overrides.

Make sure the shape layer sits at the bottom, and you’ve renamed the layer `shape` for clean naming in your Override options.

Now let’s do the same for the border. Our border will be handy for when the Avatar contains an image which clashes with the background colour of its container. Insert a border for each Artboard size now: *Insert > AIN-borders > border/radius > rounded > white*.

Once you’ve placed your border library and it matches the shape, make sure the new layer sits at the top of the layer stack and you’ve renamed the layer to `border`. Again, this will keep your Overrides panel clean and easy to read.

### Adding the image Override Symbol to master component

Now let’s insert those image overrides we created earlier. Providing you named your Artboards sequentially, following the same naming convention, you should be able to override your image with any of the 5 options we made earlier: *Insert > Symbols > avatar > image > rounded > 1*.

Make sure you do this for each size. Again, rename the new layer to `image` for clean override names. Your image layer should sit above your shape layer.

### Adding text for users initials

The final stage is to add the text used to write the initials of our user or company name. Initials only show in the component if a user fails to upload an image, for both user profile images and company logos.

As mentioned, you can create text styles based on your typography scale, or use the [Textstyl.es plugin](http://www.textstyl.es/) to synced your shared text styles* from another sketch file to your Avatar component file.

*Shared text styles will become a native Sketch feature called ‘Library Styles’ in Sketch 51.

Using the type scale used throughout my design system, I chose 3 font sizes: `20px`, `16px`, `14px` which fit all 5 component sizes.

I made a new text layer for each Symbol size, placing it below the image layer. Now the text will be hidden from view whenever an image is selected.


## Step 5: using component overrides

You should now have a flexible `Avatar` component, built using the fewest number of unique symbols possible.

In order to test out your new component and its Overrides, insert a master symbol at the size of your choice: *Insert > Symbol > Avatar > xlarge*.

Providing you have the symbol selected, in the Inspector window on the right you will see all the possible overrides including those from your external Libraries.

To make sense of all my Override options I made a page called `Avatars` where I keep a visual reference of all possible instances of Avatars used in my design.

You should now have a complete Avatar component stored in a Library which can be nested in other Sketch files. We’ll take a look at how this works when we make a card component in the next article.

## Taking it further

There are a number of ways you can improve your workflow from here. I’ll start with a few essentials and let you run with it from there. You may well have specific requirements for your project which I haven’t accounted for.

### Using Sketch Runner to improve speed and efficiency

Sketch runner is a valuable tool when it comes to using your Symbols and Libraries. Insert your components with `cmd + '`, then start typing the name of your symbol. This will become the fastest way to build mockups using your components as you start to remember all your various component names.

### Versioning and collaborating on Libraries using Abstract

I touched earlier on using Abstract for versioning your work.

When you follow a component based workflow using multiple Libraries, Abstract will help you stay on top of all your files as your system grows or if you’re working as part of a team.

*Protip: Add your files to Abstract from the start. This will prevent you from having to comb through your files updating Symbols in order for Abstract to track them. I had to do this, and it wasn’t much fun!*

### Sharing Libraries with your team via Sketch Cloud

Sketch 49 saw the release of Sketch Cloud. Native sharing and collaborating on your Libraries with other designers is now possible, so no need for Dropbox or Google Drive.

Personally I’ve been working as a solo design on the design systems I’ve created so haven’t used Sketch Cloud but would be interested in hearing from anyone who has.

## Wrapping up

In this article we’ve looked at how adopting principles from both Atomic and Subatomic Design can help us better understand how to build highly flexible Atom level components, using Sketch Libraries and Symbol Overrides.

By building components primarily using Symbols from Libraries, we can reduce redundancy and design debt. Whilst Symbol Overrides allow us to maintain maximum flexibility in our components. Storing our components in Libraries keeps files lightweight, making our system easier to maintenance and less of a hassle to update.

These components will become an integral part of our component based UI design system, as we use them as building blocks to rapid prototype larger parts of UI faster and with fewer inconsistencies.

In the next part we’ll look at using Atom level components — the Avatars built here along with buttons — to build more complex component patterns, such as cards. You might categorise these larger components as Molecules, as per Atomic Design, but of course that’s totally your call.

## Further resources

- [Subatomic Design Systems](https://daneden.me/2018/01/05/subatomic-design-systems/) by Daniel Eden
- [Maintaining Design Systems](http://atomicdesign.bradfrost.com/chapter-5/) by Brad Frost
- [A Comprehensive Guide to Design Systems](https://www.invisionapp.com/inside-design/guide-to-design-systems/) by Will Fanguy
- [Sketch Libraries: Building a better system of buttons](https://medium.com/sketch-app-sources/using-sketch-libraries-and-primitives-to-build-an-even-better-system-of-buttons-ecc8f25486ac) by me.
- [Sketch Libraries: How they work, and the crazy stuff you can do with them](https://medium.com/ux-power-tools/sketch-libraries-how-they-work-and-the-crazy-stuff-you-can-do-with-them-fc10f142ac80) by Jon Moore.
- [Text System Mastery with Shared Styles](https://medium.com/sketch-app-sources/text-system-mastery-with-shared-styles-9931bea7d085) by Bunin Dmitriy
- Exporting text styles with [Textstyl.es](http://www.textstyl.es/)
- [Library Styles Sync plugin](https://github.com/zeroheight/library-styles-sync) to sync shared styles from Library to doc
