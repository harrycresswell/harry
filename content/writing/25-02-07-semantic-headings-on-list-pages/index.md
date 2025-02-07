---
title: "Semantic headings on list pages"
date: 2025-02-07T16:48:30Z
draft: false
slug: "semantic-headings-on-list-pages"
topics: ["Accessibility", "HTML", "Hugo"]
description: "Using Regular Expressions to structure content correctly."
---

Creating semantic headings can be tricky business. This is especially true when you find the need to render all the content of your pages on a list page (a page that lists pages). Often we only see page titles and perhaps a summary of each page on a list page, which usually cause little to no issue. But, as soon as you throw a few h2’s and h3’s into the mix, correct heading heirachy tends to go straight go out the window.

The solution I’ve found is to use a little Regex. But before we get into that, first let me give you an example to help illustrate the problem. 

## The problem

Below I have a basic markdown file containing a page *title* stored as YAML front matter and content mostly organised under level two headings (h2). In Markdown these are indicated by the double hash (##). The reason I’m using level two headings in the content is that the title will take the top-level heading (h1).

```md
---
title: The title of our page
---

Some intro

## Some heading level 2

Some content

## Another heading level 2

More content

```

Before we look at the list page, first lets consider a `single.html` template we might use, in a Hugo project, to render this page.

```go
{{ define "main" }}
  <div class="flow">
    <h1>{{ .Title }}</h1>
    {{ .Content }}
  </div>
{{ end }}
```

As you might expect, the output this `single.html` template generates for our page presents no issues whatsoever. All headings are semantically correct.

```html
<body>
  <div class="flow">
    <h1>The title of our page</h1>
    <p>Some intro</p>
    <h2>A heading level 2</h2>
    <p>Some content</p>
    <h2>Another heading level 2</h2>
    <p>More content</p>
  </div>
</body>
```

Now let’s consider the `list.html` page template we might use to render our page alongside other pages within the same collection or section.

```go
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ range .Pages }}
    <div class="flow">
      <h2>{{ .Title }}</h2>
      {{ .Content }}
    </div>
  {{ end }}
{{ end }}
```

The problem isn’t immediately obvious as we look at our list template. But, the output that our list template generates tells a different story. 

```html
<div>
  <h1>Posts</h1>
  <div class="flow">
    <h2>The title of our page</h2>
    <p>Some intro</p>
    <h2>A heading level 2</h2>
    <p>Some content</p>
    <h2>Another heading level 2</h2>
    <p>More content</p>
  </div>
  <div class="flow">
    <h2>The title of another page</h2>
    <p>Some intro</p>
    <h2>A heading level 2</h2>
    <p>Some content</p>
    <h2>Another heading level 2</h2>
    <p>More content</p>
  </div>
</div>
```

You’ll notice that the `<h1>` is now occupied by the title of our list page – in this case, *Posts* – and no longer the title of our pages. This makes sense, as we want to describe the contents of the whole page using the top-level heading. 

You’ll also notice that the title of our pages are now wrapped in `<h2>` tags. This is semantically correct, as they are no longer the top-level heading like on a single page, but instead the level two subheadings of our list page. One indentation down, if you like, in the structure of content.

Here lies the problem. As our page titles are now `<h2>`’s, that means the `<h2>`’s found within the content of the page are no longer semantically correct. In this case, they should in fact be `<h3>`’s, as level three subheadings would provide the correct structure to our content[^1]. 

So how do we solve this problem? 

The simple solution is to programatically change the `<h2>`’s in our page content to `<h3>`’s. But, of course, only in our list template. We don’t want to change them in the actual markdown file, as this would skew the semantics on the single page.

## The solution

I must admit, I’m no expert at creating regular expressions. However, Hugo has a few helpful Regex functions that even a novice like me can get some use out of. 

One of these functions is [strings.ReplaceRE](https://gohugo.io/functions/strings/replacere/), which can be used to replace all occurrences of some part of a string (indicated using a regular expression) with a replacement pattern.

Consider the following updates to our list template.

```go
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ range .Pages }}
    <div class="flow">
      <h2>{{ .Title }}</h2>
      {{ .Content | replaceRE "h2" "h3" | safeHTML }}
    </div>
  {{ end }}
{{ end }}
```

You’ll notice we now [piping](https://gohugo.io/templates/introduction/#pipes) the `.Content` method – which is used returns our page content – to the replaceRE function. We pass two arguments to the function, the *pattern* we’re looking to replace (in this case `h2`) and the value, or *replacement*, we want to replace the pattern with (in this case `h3`). Finally, as ReplaceRE converts our content into a string, we need to use the [safeHTML](https://gohugo.io/functions/safe/html/) pipe to return our content as HTML.

With that, the level two subheadings in the content of our pages are now level three subheadings in our list templates. However, they remain level two subheadings in our content files and on single pages. Exactly what we want.

Those of you creating anchor tags for your headings, may prefer to use the following – slightly more intimidating – few lines of code to make that happen:

```
{{ $h2toh3 := .Content | replaceRE "h2" "h3" | safeHTML }}

{{ $h2toh3 | replaceRE "(<h[2-9] id=\"([^\"]+)\".+)(</h[2-9]+>)" `${1}&nbsp;<a class="heading-anchor" href="#${2}" aria-label="Anchor">#</a> ${3}` | safeHTML }}
```

Here we get into some real head scratching regex. I’ll leave that for you to try and make sense of.

For those that are interested, you can find an implementation of what we’ve discussed in this post over on [my /now page](/now/).

[^1]: I recommend [WebAIM’s article on headings](https://webaim.org/techniques/headings/#visualonly) for further reading on how to correctly structure your content with headings.