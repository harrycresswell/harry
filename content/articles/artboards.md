+++
tags = ["Design", "Process"]
title = "Naming Artboards for responsive web design"
date = "2017-04-02T21:34:41+01:00"
slug = "artboards"
description = "A naming system to help you name your Sketch Artboards and create scaleable, maintainable Sketch projects you’re entire team can understand."
Author = "Harry Cresswell"
feature = "https://res.cloudinary.com/harrycresswell/image/upload/v1550264893/hc/naming-artboards-in-sketch-organised-albion-03.jpg"
+++

{{< intro >}}Naming Artboards might not be the most exciting subject, but non the less, it's an important one. If it's not already, a solid Artboard naming system should be a critical part of your design process.{{< /intro >}}

A year or so ago I started thinking more about how best to name Artboards in Sketch. After a fair bit of trial and error, I arrived at a particular technique which just works. **I've used this method extensively for a year** or so now without having to revisit it.

More recently, I decided to find out if anyone else had approached the subject of naming Artboards, but I found very little. Seeing as not much had been written, I figured it was time to share my method.

**This technique is best suited to Responsive Web Design (RWD)**. That being said, if your focus is on design for mobile the principles still remain the same and it should work just as well.

I've used this technique both for personal projects and in production working with teams. It has helped us to clean up (and stay on top of) otherwise complex and unmanageable Sketch files. Without much thought, we're now producing **well organised, scaleable mockups which are easy to maintain**. At the very least, using this technique should help you avoid the numerous headaches caused by messy Sketch files, when you’re working on big projects or as part of a team.

Before I get into explaining the technique, let's first look at why you might want to consider using a system to name your Artboards in the first place.

{{< cld src="v1550264893/hc/naming-artboards-in-sketch-organised-albion-03.jpg" alt="A well organised Sketch file" caption="A well organised Sketch file" >}}



## Maintainability

We're designers. We like to be organised.

Nobody wants to fire open a sketch file in 6 months time and find a mess of arbitrarily named Artboards. I certainly don't, i'm sure you don't either. **It pays to be organised, and that goes for your Artboards too**.

So the point is this; we want to be able to know exactly what state, in what stage, of what flow any given Artboard belongs to. In order to do this we need a system. A system that is quick to understand — by anyone in our team — and efficient in its implementation. No nonsense. Minimal fuss.

I'm sure you'll agree with me here. The sketch file below — where the Artboards are clearly named and numbered — will be easier to manage than the Sketch file below that.

This Sketch file isn't doing anyone any favours. As this file grows it'll become a nightmare to deal with.

{{< cld src="v1550264893/hc/naming-artboards-in-sketch-unorganised.jpg" alt="A badly organised Sketch file" caption="A badly organised Sketch file" >}}


## Scalability

**Does it scale?** We're not talking about front end frameworks here (let's leave that for another one). Instead, we're trying to solve the problem you have when you need to add in an extra step (or stage) to a flow you created a last week, let's say. **Does your system allow you to add in extra Artboards — anywhere in the sequence** — without you having to go through and rename the rest of your Artboards to maintain some sort of order?

{{< cld src="v1550264893/hc/naming-artboards-in-sketch-organised-albion-02.jpg" alt="Another well organised Sketch file" caption="Another well organised Sketch file" >}}

## Communication

In most cases the design process tends to involve a few more people than just one designer.

So the question is; **does the rest of our team also understand what's going on in our Sketch file?**

Ok, I doubt all team members will need access to our Sketch files, but they will have to see them at some point. Without a naming system, the problems will start to show when you start using a prototyping tool like Invison. Unless your working on a side project, your team, your client or whoever will need to feedback on your designs. Sure they can comment on Invision, but all too often you'll find you need a simple way to verbally discuss an Artboard. Let's say by using a reference code.  

**Giving your team a quick and easy way to reference Artboards will make your life a lot easier**, particularly as your project grows.  We like our team right? Let's introduce a system which is great for them and not just ourselves.

{{< cld src="v1550264893/hc/naming-artboards-in-sketch-invision.jpg" alt="Prefixing Artboard names with a reference short code makes discussion and organisation easier" caption="Prefixing Artboard names with a reference short code makes discussion and organisation easier" >}}

Ok enough of the reasoning, i'm sure you get the idea by now. Let's look take a look at the system and explain how it works.

## How the system works

Ok, the basic idea is this:

- Make sure you use a 4 level sequence.
- Use both a reference code and a description.
- Pick a clear and descriptive, sequential structure (i.e Breakpoint, Flow, Stage, State).

### Using a 4 level sequence

I'm using **a 4 level numerical sequence followed by a description**, where the purpose of the description is to explain the numerical sequence in a more verbose manor.

{{< cld src="v1550264882/hc/naming-artboards-in-sketch-01.jpg" alt="4 level sequence — Breakpoint, Flow, Stage, State" caption="4 level sequence — Breakpoint, Flow, Stage, State" >}}

The four levels represent the **Breakpoint, the flow, the stage and the state** of our design.

I will come to exactly what I mean by this a bit later, but first let's look at why we're using a code and a description.

### Use a reference code and a description

**Using both a code and a description makes our Artboards easy to understand and equally as easy to reference** — and not just by us — by the whole of our team.

On it's own, the description (let's call it the `Unique Identifying Description` or `UID` for short) isn't exactly quick to reference, and it doesn't help us order our Artboards in any way, but it is still important as it accurately explains the contents of our Artboard.

By prefixing the `UID` with a numerical sequence, we now have a quick and easy reference code, if you like. By adding this code (let's call it the `Unique Identifier Code` or `UIC` for short) we now have a clear system for ordering our Artboards. **This is particularly useful when we start using tools like Invision** and you or another team member needs to pin point a particular Artboard to discuss.

Likewise, using the `UIC` alone won't make much sense — it's not descriptive of the Artboards contents. But add the two together and you have a quick shortcode (the `UIC`) used for reference purposes, and a more descriptive text version (the `UID`), which helps us further identify the design on our Artboard.

{{< cld src="v1550264891/hc/naming-artboards-in-sketch-02.jpg" alt="Using a unique identifying code and description" caption="Using a unique identifying code and description" >}}


## The sequential structure

Ok. So why use four levels, isn't that over kill? Surely one level is enough? Can't we just use something like `1 - homepage`, `2 - checkout` etc, and be done with it? And, **what exactly does the Breakpoint, Flow, Stage and State represent?**

Let's look at that now — it will help us understand why having four levels in the sequence is important.

### The Breakpoint

In RWD, the Breakpoint is very important, so we will consider this first. **The breakpoint is the screen resolution you are designing for**, in case you didn't know. Think `1200px`, `960px`, `768px`, `320px` or if you prefer Desktop HD, Desktop, Tablet, Mobile etc. This should be the deciding factor that determines what Artboard size you choose for your design.

If you are design a responsive website you're design will most likely change at different screen sizes. We'll need a different Artboard to show how the design looks for each size.

Let's say our design isn't a mockup of the large desktop view (like in the example above), but in fact a regular desktop view or a mockup of our website at a breakpoint of `960px`. In this case we would create a new Artboard and change the breakpoint in our Artboard name to reflect that.

In the example below you can see the Breakpoint is `960`. this, of course, stands for `960px` or our desktop size. Suggesting the Artboard shows how our website will look on a Desktop browser.

{{< cld src="v1550264892/hc/naming-artboards-in-sketch-03.jpg" alt="Breaking down the identifier code" caption="Breaking down the identifier code" >}}


### The Flow

Flow is second in the sequence. This is **the particular user flow you are designing**. An obvious example would be, let's say, the `Checkout` flow. Think UX here. **A flow is the journey a user takes around a site to complete a particular action**. A flow will most likely consist of a number of pages or stages, if you like.

Ok, so you've got the hand of it now.

{{< cld src="v1550264892/hc/naming-artboards-in-sketch-04.jpg" alt="The checkout (or second) flow at a breakpoint of 960px" caption="The checkout (or second) flow at a breakpoint of 960px" >}}


This tells us that the Artboard shows our design at a breakpoint of `960px` (i.e desktop) and the design is part of the checkout flow. Which is the second flow in our website. Notice the second number in the sequence has now changed to 2.

### The Stage

Third in the sequence is the stage. **The stage represents the part or step within in a flow**. If we think back to our example `checkout` flow, a familiar stage in this flow might be `payment details`, as opposed to `shipping details`, or `checkout complete`. These are all stages, which might make up our `checkout` flow.

Updating our example above might result in something like this:

{{< cld src="v1550264892/hc/naming-artboards-in-sketch-05.jpg" alt="The payment details stage in the checkout flow" caption="The payment details stage in the checkout flow" >}}

This Artboard shows our design for the `Payment Details` stage in the `checkout` flow of our website. And this is how our design should look on a desktop monitor, or there abouts.


### The State

Last in the four level sequence is the state. **States are used to show different versions of the same stage in a flow**. For example, you might need to design certain error states in a form. Perhaps a particular user action changes the look of a specific stage, and you need to show this in your design. A success notification would be a good example. Or if we think back to our example; when a user enters the incorrect card details. We might need to design the error message for this.

Think of the state as the same page — if you like — as the stage, only the users action has modified the view of the stage in some way. So for this case we would add a new Artboard into our sequence and use it to mockup the state.

If we update our example above, it might result in this:

{{< cld src="v1550264892/hc/naming-artboards-in-sketch-06.jpg" alt="Form errors on the checkout stage" caption="Form errors on the checkout stage" >}}

This tells us that `Form error` is the second state we have designed this particular state in the flow (the payment details stage which is part of the checkout flow). In this case the first state was the normal page.

_Side note: having said all this, I don't always use states. The reason being, I tend to work with a UI kit or front end framework, where the states have already been determined. If this is the case, (as you've probably noticed in the example) I will just leave a 1 on the end of the sequence. This suggests that the current Artboard is the first and only state._

In some other cases I use the last number in the sequence not for a state but as a quick and dirty way to fudge in an extra Artboard, half way through a sequence.

This happens quite a lot when you return to past projects and you need to add Artboard into the flow. It's hacky but it will prevent you from having to go through and re-jig all your other Artboard names to make your Artboard sequence run in order.

{{< cld src="v1550264892/hc/naming-artboards-in-sketch-07.jpg" alt="The text description explains the identifier code in more detail" caption="The text description explains the identifier code in more detail" >}}

## Wrapping up

Ok, this technique might seem a little over the top for a small project, but if like me, you work on big on-going websites and web apps then then having an Artboard naming system is 100% the way to go. It will save your skin 10 times over.

Whatever system you choose to use, the most important thing is that **your Artboards names are descriptive of the design that is on it**. Now this might sound obvious, but you'd be surprised. I've seen some strange Artboards names before now, which give you no indication of what the design consists of and are totally illegible to a team. Furthermore, **Artboards should be quick and easy to understand and reference**.

**Always discuss a new system with your team**, so that everyone understands it and is on the same page. Above all this will allow you to communicate any design decision you make effectively and with minimal fuss.

If you have any thoughts on this approach or ways to improve it, i’d love to hear from you. Likewise any questions I will do my best to answer.

Heres to a stress free time with Artboards in Sketch.  `#artboardmaster`
