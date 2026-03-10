---
title: "HTML elements vs tags"
date: 2026-03-10T10:49:42Z
draft: false
slug: "html-elements-vs-tags"
topics: ["HTML"]
description: "A quick refresher on the differences between HTML Elements and Tags."
---

Last week I received an email from a [Practical Hugo](https://practicalhugo.com/) student who was struggling to understand my instructions in one of the episodes. As a result, code was added in the wrong place, which subsequently broke their template.

It appears the confusion came from a misunderstanding between the terms _element_ and _tag_. An easy mistake to make, given we often talk about these two constructs as if they’re interchangeable names describing the exact same thing.
 
I thought I’d write a quick post about the issue, to give some context on how it came about and how I solved it. Or rather, how I attempted to improve clarity in my choice of wording, to be exact. You’ll also find a quick primer on the difference between HTML elements and tags. Simple stuff perhaps, but it’s so easy to forget the basics when you’re busy working on the difficult stuff.


## Understanding the problem

My instructions in [the episode in question](https://practicalhugo.com/learn/1-up-and-running/optimising-for-search/) read as follows:

> “Open `layouts/_partials/head.html` in your text editor and create an empty line beneath the `<title>` element. Then, copy the code below and paste it inside.”

In this case, when I said “the code below”, I was referring to Hugo logic used to render a meta description. In the interests of making this post broadly relatable, here’s an example of that code in plain HTML:

```html
<meta name="description" content="Some meta description">
```

As I understood it, my instructions had lead the student to do the following (again written in plain HTML for relatability):

```html
<title> 
<meta name="description" content="Some meta description">
Some page title
</title>
```

In this case, the meta description should have been placed _beneath_ the entire title element, instead of directly after the opening `<title>` tag.

```html
<title>Some page title</title>
<meta name="description" content="Some meta description">
```

For a moment I questioned whether I’d messed up with my original instructions. However, when I read the suggestion on what to change the wording to in an email, I quickly realised the issue. 

The suggestion from this student was to change the part that said:

> “create an empty line beneath the `<title>` element. Then, copy the code below and paste it inside.” 
 
to the following:

> ”create an empty line beneath the `</title>` element. Then, copy the code below and paste it inside.”

Did you spot it?

The suggestion was to change `<title>` to `</title>`. However, with that change, the word _element_ should have also changed to _tag_.


## HTML elements and tags are not the same thing

We often use the terms _element_ and _tag_ interchangeably, using them describing the exact same thing. At least, that’s what it can feel like, for example, when we talk about the `<h1>` tag, the `<img>` element, and so forth.

But, these two terms are not interchangeable. They mean two different things. 

An HTML _tag_ is one part of an HTML element. There’s usually two, an opening tag and closing tag. These form the start and the end of the element, respectively. Not all elements require two tags, however. These type of elements are commonly referred to as self-closing elements or (confusingly) self-closing tags. 

The `<img>` element being a good example.

```html
<img src="snowy-mountains.jpg" alt="A snowy mountain"/>
```

With the exception of self-closing elements, an HTML _element_ consists of an opening tag, a closing tag, the content between these two tags, and any attributes that have been applied to the element. 

For self-closing elements, the element consists of the open tag, along with the attributes applied to the tag and any values the attributes have been given. Which may help explain why we often refer to them as self-closing tags.

Here’s a basic diagram to help illustrate the difference between elements and tags.

```html
<title>Some page title</title>
   |                      |
  Tag                    Tag
|___________Element__________|
```

Here’s another to illustrate a self-closing element and it’s comprising parts.

```html
<img src="image.jpg" alt="Rainbow">
  |                   |
 Tag              Attribute
|_____________Element_____________|
```


## Creating a confusion proof solution

Taking this students feedback on board, I switched the original wording from:

> “create an empty line beneath the `<title>` element. Then, copy the code below and paste it inside.”

to the following:

> “create an empty line beneath the closing `</title>` tag. Then, copy the code below and paste it inside.” 

Notice I’ve used the wording “`</title>` _tag_”, instead of ”`</title>` _element_” which was originally suggested.

It’s a small difference, but an important distinction that should make more sense now. Indeed, `</title>` is a tag not an element. The closing tag, to be precise. Just one part of the _title_ element.

Whenever I’ve given instructions to add code to a template in the course content, I tend to follow these instructions with an example of what the template should look like with the additional code applied. For example:

With the code in place, your template should now look like this.

```html
<title>Some page title</title>
<meta name="description" content="Some meta description">
```

For whatever reason I didn’t do that this time, which probably helped fuel the confusion. With that in mind, the final improvement I made was to add the code example above to show exactly how the template should look once the meta description has been added.

## Conclusion

HTML elements and tags are not the same thing. However, given we use the two terms so interchangeably, you’d be forgiven for thinking otherwise.

Remember, an element consists of various parts – at least one tag, sometimes two, often attributes and content, as well. A tag is just one of these parts. Where elements are the building blocks of HTML pages, tags are the building blocks of the HTML elements themselves.

I’ll finish up by saying that I don’t want this post to seem like I’m calling anyone out for making mistakes. My goal was simply to draw attention to how easy it is to overlook the basics, and in doing so, create issues for ourselves that have knock on effects.

These are easy mistakes to make. With an impossible amount to remember, it’s difficult to retain it all. Often it’s the simple stuff we learnt way back when that seems to slip away. This post exists as a quick reminder.