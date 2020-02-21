---
title: "Hugo SEO: Unique, Accurate Page Titles"
date: 2018-11-02T10:32:26+01:00
slug: "hugo-seo-accurate-page-titles"
description: "Unique, descriptive page titles lead to higher rankings by helping search engines better understand the content on your site."
tags: ["Hugo"]
---

<p class="intro">You don’t have to be an SEO expert to know unique, descriptive page titles lead to higher rankings by helping search engines better understand the content on your website.</p>

According to [Google’s SEO starter guide](https://support.google.com/webmasters/answer/7451184?hl=en#uniquepagetitles), “Each page on your site should ideally have a unique title, which helps Google know how the page is distinct from the others on your site.”

At all costs avoid default, vague titles which have no relation to the content on the page and never use a single title across all pages on your site.

This piece is for those building sites with Hugo. It introduces a common mistake, often seen in [Hugo starter themes](https://themes.gohugo.io/) – where the `<title>` tag renders generic page titles – and offers a simple concise solution to get your pages into Google’s good books and ranking properly.

## The big mistake with page titles

When building a theme for your new Hugo site, you might be tempted to dig through the `_default` templates of a Hugo starter theme for some tips on where to begin.

No bad thing, it’s a great way to learn, but approach this method with caution, starter themes can also contain bad practices.

In many cases, a quick look inside the `<head>` will often reveal the following seemly simple but potentially harmful code:

```html
<title>{{ $.Site.Title }}</title>
```

So what’s going on here?

Here we’re taking the title of our site directly from our `config.toml` file and applying it to each and every page on our site. That means every page on our site now has the same name.

In terms of SEO this is bad news, as we now know.

## A simple elegant solution

A better solution would be to use the conditional `if` statement and reach for the title set in the front matter of each page when possible. We can make this happen with something like:

```
{{ if .IsHome -}}
  <title>{{ .Site.Title }}</title>
{{- else -}}
  <title>{{ .Title }} – {{ .Site.Title }}</title>
{{- end }}
```

The difference here is that `{{ .Site.Title }}` is only used if the current page is the homepage.

For every other page, we use the page title specified in the page front matter, which should almost always be unique and therefore good for SEO.

For an alternative solution try:

```html
<title>
  {{ if .Page.Title }}{{ .Page.Title }} - {{ end }}{{ .Site.Title }}
</title>
```

This should be fairly self explanatory and produces the same results, in an arguably cleaner single line of code.

## Taking it further

For an added SEO boost, try applying the same thinking to your page descriptions. According to Google, “A page's description meta tag gives Google and other search engines a summary of what the page is about. Description meta tags are important because Google might use them as snippets for your pages”.

The simple solution would be to define the description in the front matter of each page:

```yaml
---
title: "Hugo SEO: Unique, Accurate page titles"
description: "Get an SEO boost on your website pages with descriptive page titles which make search engines happy"
author: "Harry Cresswell"
---

```

Then call the `Parmeter` in a meta tag in your `<head>`:

```
<meta name="description" content="{{ $.Param "description" }}">
```

Using some simple logic we can take this further still, [head over to github](https://github.com/harrycresswell/harry/blob/master/site/layouts/partials/head.html) if you’re interested in finding out how this works.

There you have it. A couple of simple fixes to optimise your web pages and improve your chances of ranking higher in search engines.

I hope this has been a helpful read.

## Further reading

- [Create unique, accurate page titles](https://support.google.com/webmasters/answer/7451184?hl=en#uniquepagetitles) from Google’s SEO Starter Guide
- [Go Hugo SEO](https://blog.el-chavez.me/2015/11/26/go-hugo-seo/) from MT Chavez
- [Rank Bio](http://www.rankbio.com) - test your websites for best practices
