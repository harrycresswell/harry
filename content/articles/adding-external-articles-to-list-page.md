---
title: "Adding external articles to a list page"
date: 2018-04-03T10:28:50+02:00
tags: ["Hugo"]
description: "Learn how to list your external articles amoung the posts on your Hugo blog"
slug: "hugo-external-articles"
---

 {{< intro >}}Lately I’ve been publishing articles both here on my personal site and on Medium. It seems to be fairly common practice these days.{{< /intro >}}

In order to stay organised, as I publish on various sites, it seems logical to try and keep track of everything I’m writing in one place, and that means here on my personal site.

To do this I came up with a super simple solution which extends the typical [Hugo List template](https://gohugo.io/templates/lists/) to include posts from external sources (in this case Medium). You’ll find this useful if like me you publish articles on multiple sites and want to link to all of them from one posts page on your [Hugo](https://gohugo.io/) site, without having to duplicate articles.

_For a quick demo of this in action click on a few of my [articles](/articles/) and you’ll notice some link to internal pages on this site and some link to external sources._


## Solution

All that’s needed to add external post links to your post list page, is one line of front matter, and some logic in the form of an If statement which uses the [isset function](https://gohugo.io/functions/isset/).

## Step 1: Create new post with specific front matter

First you’ll need to create a new post for your external article.

In my case I do this by moving into the site folder within my Hugo site. From the command line: `cd site`, then `hugo new articles/external-article-name.md`. If you haven’t changed the name of your content type then you will use `hugo new posts/external-article-name.md`.

You should now have a new article in `site > content > articles` with basic front matter included.

Inside the front matter of your new post, include a new param for your external article. I called mine `affiliatelink`, but you could use something like `externallink` if you prefer. Add the URL of your external article as the value.

Your posts should now look something like this:

```yaml
---
title: "Sketch Libraries and primitives to build buttons"
date: 2018-01-26T21:29:52+01:00
affiliatelink: "https://medium.com/@harrycresswell/using-sketch-libraries-and-primitives-to-build-an-even-better-system-of-buttons-ecc8f25486ac"
---
```

This is all you need to do in the post.

## Step 2: Extending the List page template

In order to get external articles showing on your [list page](https://gohugo.io/templates/lists/), jump back into your `list.html` layout. In most cases you’ll find this in `layouts > _default`.

If you haven’t made any major changes your list page should look something like this:

```go
{{ define "main" }}
    {{ range .Data.Pages }}
        <h3><a href="{{ .Permalink }}">{{ .Title }}</a></h3>
    {{ end }}
{{ end }}
```

Pretty simple stuff. All we’re doing here is looping through our posts and printing out the post title. In this case clicking the title will take you do to the single post url. This should look familiar.

Now we need to extend this to include links to our external articles within the same loop:


```go
{{ define "main" }}
    {{ range .Data.Pages }}
        <h3>
            <!-- If external link exists in post matter -->
            {{ if isset .Params "affiliatelink" }}
                <a href="{{ .Params.affiliatelink }}" target="_blank">{{ .Title }}</a><span>&#8599;</span>
            <!-- Else show internal post page -->
            {{else}}
                <a href="{{ .Permalink }}">{{ .Title }}</a>
            {{ end }}
        </h3>
    {{ end }}
{{ end }}
```

So what’s going on here?

First Hugo looks for `affiliatelink` in the front matter of our post. If the parameter exists, `isset` returns true and replaces our usual permalink with the URL value from our post front matter. If a value for `affiliatelink` doesn’t exist, our list behaves as normal. We handle this with an `else` statement.

## Wrapping up

Hopefully you’ve now implemented a simple bit of logic which serves up both external and internal links on your website.

On a final note, if you want to differentiate between the different post types try using the `↗` icon and wrap in a <span> positioned after your title. I also added a `target='_blank'` to the `a` tag. It’s not essential but it’s a quick and easy way to show your readers that the post is from an external source and the link will open in a new window

I hope you’ve found this helpful. Any questions [leave me a message](/contact/) or [shoot me a tweet](https://twitter.com/harrycresswell/)!
