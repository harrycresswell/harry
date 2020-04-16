---
title: "Listing page content in Hugo"
date: 2020-04-15T10:50:11+01:00
draft: false
description: "The ins and outs of listing content in Hugo. Breaking down the various functions and variables it takes to create lists of the different content types."
slug: "listing-page-content-in-hugo"
tags: ["Hugo"]
syndicate: "false"
---

In Hugo, [everything is a page](https://bepsays.com/en/2016/12/19/hugo-018/).

A common thing to do with these pages is make lists of them. By doing so you make your content easily accessible to readers.

A list of pages, at the very least, might look like a collection of page titles, which hyperlink to the pages themselves.

In plain old HTML that might look something like this:

```html
<ul>
  <li><a href="/page-1">Page #1</a></li>
  <li><a href="/page-2">Page #2</a></li>
  <li><a href="/page-3">Page #3</a></li>
</ul>
```

But that’s just the basics. You can create a list of any data associated with your content.

In Hugo, unfortunately there’s no one size fits all approach to rending content.

The context of the code you write changes depending on which template you’re working in. This can often produce unexpected results.

In this piece we’ll learn about the specific functions and variables you can use to create lists of different content types and look at how context effects the content rendered on a page.

Let’s start by considering how we create lists of data, from a technical perspective, when using a static site generator like Hugo.

## What does it mean to list content?

When we programatically create a list of anything, essentially all we’re doing is iterating over a map of data.

In other words, looping through an array – a list of items – which, in other programming languages, you might do with a for loop, or a map function.

In Hugo, in the context of pages, you do this with the range function.

## Understanding range

The [range](https://gohugo.io/functions/range/) function provides an easy way to iterate over a map, array or slice of data. Think of it as grabbing a collection of pages, or a “range” of pages.

Range is fundamental to templating in Hugo and it’s the only function we’ll need to return a lists of pages.

```go
{{ range }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
{{ end }}
```

But using range alone won't return any data.

To get hold of our pages, we need to pass a [page variable](https://gohugo.io/variables/page/) to the range function. This variable will give you access to different collections of content, depending on which variable you pass in and which template you write the code in.

There’s quite a few different variables you can choose from, but for now, let’s focus on some of the main ones.

## Combining .Site and .Pages

[.Site](https://gohugo.io/variables/site/) gives you access to global values in your templates.

So regardless of where you are writing your code, with `.Site` you can get hold of all site-wide variables. These are either defined in your site’s configuration or directly built-in to Hugo.

In the interest of listing page content, we can combine `.Site` with a built-in variable called `.Pages` to access all pages across our website.

```go
{{ range .Site.Pages }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
{{ end }}
```

The Hugo docs describe [.Site.Pages](https://gohugo.io/variables/site/#site-pages) as a super set of everything.

This means by passing `.Site.Pages` to the range function we can grab data associated with every single page on our site. It will return regular pages, collections, taxonomies, and so on.

In the case above, we’re rendering all page titles, with a permalink to those pages.

A few things to note.

`.Site.Pages` doesn’t care if you store your content in subdirectories, for example posts in `./content/posts` or pages inside `./content/pages`. It will render all content types regardless of your content directory structure.

`.Site.Pages` also doesn’t care which template you use it in. The object returned will always be the same.

## .Pages without .Site

`.Pages` can be used without `.Site`, but the content returned will be different, depending on where you use it.

Where `.Site` gives you access to the global values in your templates, `.Pages` only returns a collection of regular pages and only first-level section pages under the current list page.

To make sense of this let’s turn now to list templates, and talk a bit about what they are and how you can use them.

## The list template

List templates are key part of rendering specific collections of pages. For the sake of clarity, let’s call these ”lists” of pages.

The only `list.html` template you need to render a list of pages in Hugo is kept at `.layouts/_default/list.html`.

This acts as the default template for all collections, sections, taxonomies and terms. It’s the first list template Hugo will look for when it tries to render lists.

```go
// ./layouts/_default/list.html
{{ range .Pages }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
{{ end }}
```

Notice we’re no longer using `.Site.Pages`, but just `.Pages`. It will soon become clear why.

Now let’s say you have a content collection at `./content/posts` and you want to create a specific list template for this collection, which renders the posts on the `/posts` page of your website.

To do this you might want to override the default list template by adding another list template, using the exact same code, but this time located at `./layouts/posts/list.html`.

```go
// ./layouts/posts/list.html
{{ range .Pages }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
{{ end }}
```

Notice the location of this list template mirrors the content directory structure.

Now we can customise the template however we like and Hugo will only return content from the corresponding folder at `./content/posts`. Whilst all other pages will continue to use the default list template.

```go
// ./layouts/posts/list.html
{{ range .Pages }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
	<p class="intro">{{ .Summary }}</p>
{{ end }}
```

It’s important to note that if we used `.Site.Pages`, as we have done previously, Hugo will return an object of all our site pages, which isn’t what we want in this case.

We’re specifically interesed in the collection of post pages, so we use the `.Page` variable in a new list template, kept in a directory which mirrors our content structure.

Now we’re starting to see how context effects the results of the code we write.

Let’s look at another example to make this absolutely clear.

Say we have another template with the exact same code at `./layouts/notes/list.html`.

```go
// ./layouts/notes/list.html
{{ range .Pages }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
{{ end }}
```

This time `list.html` will only return content from the corresponding content folder located at `./content/notes` .

We can see now that the context of `.Pages` changes, depending on the location of your list template. And it’s something to keep in mind, as it can be confusing at first.

Ok, so how does Hugo know which template to use?

Hugo picks the template it uses to render content based on something called the lookup order.

Let’s get into that next.

## The lookup order

[The lookup order](https://gohugo.io/templates/lookup-order/) is how Hugo decides which layout template to use for a given page, based on a well defined order of priority.

The default list template (that one at `./layouts/_default/list.html`) will serve all content, unless it is overridden by another template, with a higher priority in the lookup order.

This is what is happening with our list template at `./layouts/posts/list.html`.

Understanding the lookup order, and how context changes, will help you understand which variables to use in certain situations and why the same variable can produce different results.

Ok, let’s move on to a few other interesting things we can do.

## Using the first function

Now let’s try something a bit different, this time with [the first function](https://gohugo.io/functions/first/).

You can add the first function to range, to reduce the array of data returned to only the first N elements. Where N is the value you set.

Think of first as an argument which you pass in alongside your page variables.

Here we’re returning the first 10 pages across all our content.

```go
{{ range first 10 .Site.Pages }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
{{ end }}
```

But what if you want to loop through a specific collection of content? Let’s use our example of a collection posts stored inside `./content/posts` again.

Let’s say now we want to list our posts on the `index.html` page. We can’t just use `.Pages` in this case, as we’re no longer in our post specific `list.html` template.

This is where `.Site.RegularPages` is helpful.

## Understanding .Site.RegularPages

The `.Site.RegularPages` variable is similar to `.Site.Pages`, but instead of returning all pages, it returns all collections.

```go
{{ range .Site.RegularPages }}
	<a href="{{ .Permalink }}">{{ .Tite }}</a>
{{ end }}
```

In Hugo, collections are known as [Content Types](https://gohugo.io/content-management/types/), which basically means anything stored within the `./content` directory or inside subdirectories within.

To give you an example, on this site I have three collections of content. `./content/articles`, `./content/notes` and `./content/projects`. Each directory contains pages created in markdown.

Here, the `.Site.RegularPages` variable would return all pages from across these three collections, and ignore any else, such as pages inside `./content/pages` or taxonomy pages.

But what if you only want to loop through your `./content/articles` collection? How might you handle this kind of behaviour?

The `.Type` variable is useful in the scenario.

## Filtering pages by .Type

As per the docs; “Hugo resolves the content type from either the type in front matter or, if not set, the first directory in the file path.” So what does this mean, exactly?

It means that if we want to render specific content types, we have two options.

We can either a), set `type` inline in the front matter of our pages, like this:

```yaml
title: My first post
type: post
```

Or b), make directories within `./content` to mirror how we want to filter our content, as we’ve already seen in the earlier examples.

So for our post example, this approach means we have to keep our posts inside `./content/post` for it to work.

Regardless of whether you go with a) the frontmatter method or b) the directory structure method, you use the same code to render the content.

Consider the following example:

```go
{{ range where .Pages "Type" "post" }}
	{{ .Title }}
{{ end }}
```

Here we combine range with the conditional [where](https://gohugo.io/functions/where/) function. This allows us to filter our array to only the elements containing a matching value of “type” _post_. In this case, only our posts will be returned.

This is a useful snippet. The frontmatter approach is particular useful when you want to group together a selection of pages, perhaps as featured content.

You’ll also find this approach useful when you want to render specific content outside of the context of a list template, for example on the homepage of your website, as we’ve imagined here.

## Wrapping up

This was a quick introduction to the functions and variables in Hugo that help you list different pages of content, in different places on a Hugo website.

At times it can be confusing to know which variable to use in a given situation to effectively render the content you wish. But with some practice it will start to sink in.

I hope this has made things a bit clearer and given you a few ideas for your next project. We’ve only just scratched the surface, but what we’ve covered should help get you off to a good start, with a good idea of some of what’s possible.

As always, if you spot any mistakes or something doesn’t look quite right, please let me know and I will make sure I make changes.

I’m aiming to keep this post updated with new examples and scenarios, as I come across them and use them in my own projects. In the meantime, here’s a list of articles which should help give you a better understanding of what we’ve covered.

## Further reading

- [The Range Function](https://gohugo.io/functions/range/) from the Hugo Docs
- [Lists of content in Hugo](https://gohugo.io/templates/lists/) from the Hugo Docs
- [Page Variables](https://gohugo.io/variables/page/) from the Hugo Docs
- [Hugo, the scope, the context and the dot](https://regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/) from Regis Philibert
- [The First function](https://gohugo.io/functions/first/) from the Hugo Docs
- [Content types](https://gohugo.io/content-management/types) from the Hugo Docs
- [The Where function](https://gohugo.io/functions/where/)
- [Homepage Template](￼https://gohugo.io/templates/homepage/￼)
- [Different page types without organising into subdirectories](https://discourse.gohugo.io/t/different-page-types-without-organising-into-subdirectories/558/3) from Stiobhart
