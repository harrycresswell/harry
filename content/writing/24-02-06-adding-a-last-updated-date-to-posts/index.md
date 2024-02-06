---
title: "Adding a “last updated” date to posts"
date: 2024-02-06T09:52:55Z
draft: false
slug: "adding-a-last-updated-date-to-posts"
topics: ["Hugo"]
description: "Using `.Lastmod`, `.PublishDate` and comparison operators to create a date for when your content was last updated."
---

I often find myself updating posts I’ve previously published. Usually this happens when I re-read what I’ve written and think of a better way to say it. Or when I discover more about the subject and I feel a supplement is relevant. Sometimes it’s when my process changes, which typically outdates the post, compared to the way I’m currently doing things. 

Whatever the case, these updates happen frequently. They keep the content on my personal site somewhat evergreen, which I like and feel is important. But it‘s not always clear to readers when content has changed.

To solve this, I’d eventually like to add some form of footnotes to document the exact changes. But as an interim solution, I’m adding a date to these posts (or pages) which specifies when the content was updated. You’ll find this “updated” date just beneath the published date on certain pages on my site, such as on my [app defaults](/writing/app-defaults/) post.

If you also build your site using [Hugo](https://gohugo.io/), then adding this fuctionality is straight forward to automate. In this post I’ll explain how it works.


## Understanding `.PublishDate` and `.Lastmod`

Getting a “Last updated” date set up on your pages requires two Hugo page methods – [PublishDate](https://gohugo.io/methods/page/publishdate/) and [Lastmod](https://gohugo.io/methods/page/lastmod/).

`.PublishDate` returns the publish date of your content, whereas `.Lastmod` returns the date a page was last modified. 

Consider the following code found in my `single.html` template.

```
{{ $published := .PublishDate | time.Format ":date_medium" }}
{{ $updated := .Lastmod | time.Format ":date_medium" }}
```

First, we grab the published date and assign it to a variable, in this case the variable is called `$published`. Then, we use the [Lastmod](https://gohugo.io/methods/page/lastmod/) method to grab the date the page was last modified. Again, the value is stored in a variable, this time called `$updated`.

It’s important to note, by default, Hugo will look for a value for both `publishDate` and `lastmod` set in the front matter of a page:

```
---
title: A new post
publishDate: 2024-02-01T00:40:04-07:00
lastmod: 2024-02-05T00:40:04-07:00
---

Some post content.
```

This may be convenient depending on your needs, but personally I’d rather automate this step, if I can. That way I don’t have to remember to manually change the `lastmod` value in the front matter, every time I update a page.

Assuming you’re using Git to manage your project and your code is stored in a repository – Github or similar – then this is a simple problem to solve. 

With the following added to your `hugo.toml` config file, you can forget about adding `lastmod` values to your front matter altogether.

```Toml
enableGitInfo = true
```

Now your `lastmod` date will derive from the last git commit of a given page. See the [Gitinfo](https://gohugo.io/methods/page/gitinfo/) method for more details.


## Comparing `.PublishDate` and `.Lastmod`

The final step in getting this working is to compare *publishDate* with *lastmod*. Then return the date the page was last modified (when the last commit was made), should the two values differ.

Let’s head back to our `single.html` file, for an example:

```
{{ $published := .PublishDate | time.Format ":date_medium" }}
{{ $modified := .Lastmod | time.Format ":date_medium" }}

{{ if ne $published $modified }}
  <span> Updated: {{ $modified }} </span>
{{ end }}
```

Notice we’re using the [if](https://gohugo.io/functions/go-template/if/) function and the [ne comparison operator](https://gohugo.io/functions/collections/where/#operators), to check whether the two values are “not equal to” each other. *if* returns a boolean value (`true` or `false`), so if this statement holds `true`, then we return the value of `$modified`, in other words, our last modified date.

## Formatting `time` to the day, not the second

Notice both `date` and `lastmod` consist of [time](https://pkg.go.dev/time#time) values, which, when generated, will return values to the nearest second, by default. 

Here’s that example content file once again.

```
---
title: A new post
publishDate: 2024-02-01T00:40:04-07:00
lastmod: 2024-02-05T00:40:04-07:00
---

Some post content.
```

Therefore, it’s important to format dates to the day, rather than second. Doing so will ensure the comparison is between days “not equal to“ each other, rather than seconds “not equal to“ each other. That way, the *if* condition won’t always return `true` when comparing that the two values do not match.

We can achieve this by using the [time.format](https://gohugo.io/functions/time/format/) method as a pipe, so we get consistent dates, to the day. 

Let’s consider those variables once again:

```
{{ $published := .PublishDate | time.Format ":date_medium" }}
{{ $modified := .Lastmod | time.Format ":date_medium" }}
```

Using `:date_medium` returns something like: `Jan 27, 2023`, which is what we’re looking for.

Now our *if* statement is checking that the day differs, rather than the seconds – exactly what we want. As a result, the “last updated” date will only show on content updated days later than the publish date, rather than seconds later.  


## Summary

It’s worth mentioning, whilst I’ve used `publishDate` in the context of the examples in this post, you could quite easily compare `lastmod` with the value of `date`, using the [Date](https://gohugo.io/methods/page/date/) method instead.

In other words, this works just as well:

```
---
title: A new post
date: 2024-02-01T00:40:04-07:00
lastmod: 2024-02-05T00:40:04-07:00
---

Some post content.
```

With you front matter using a `date`, as above, your template might look like this:

```
{{ $published := .Date | time.Format ":date_medium" }}
{{ $modified := .Lastmod | time.Format ":date_medium" }}

{{ if ne $published $modified }}
	<span> Updated: {{ $modified }} </span>
{{ end }}
```

Ok, that’s all for this one.