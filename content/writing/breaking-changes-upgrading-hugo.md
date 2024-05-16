---
title: "Fixing breaking changes when upgrading Hugo"
date: 2021-03-08T09:29:40Z
draft: false
description: "Documenting errors which might break a Hugo site as you upgrade and the solutions to fix them."
slug: "breaking-changes-upgrading-hugo"
topics: ["Hugo"]
syndicate: "false"
---

Unless you want to use new features, or you’re working on a Hugo project built with a newer version, then it’s not absolutely necessary to upgrade your version of Hugo. You can run an old version of Hugo and everything will continue to work just fine.

However, if you do find yourself needing or wanted to upgrade Hugo, then you’re probably wondering if anything is going to break in your existing projects when you upgrade to the latest version. It’s a reasonable concern.

Last week I upgraded my Hugo version from [0.55.6](https://gohugo.io/news/0.55.6-relnotes/) to Hugo [0.80](https://gohugo.io/news/0.80.0-relnotes/). I sort of expected everything to break, so I had a contingency plan in the form of [Fernando Medina Corey’s article on using legacy versions](https://www.fernandomc.com/posts/brew-install-legacy-hugo-site-generator/). But to my surprise, after the upgrade I was pleased to find very few errors.

The main issue - which seems like a common one - concerns content from sections not rendering on a homepage. To be clear, what I mean by section content is content stored in a sub directory of the content directory. For example, `./content/supplier`.

To render section specific content on a homepage in the past you might have nested a where clause in your range. Something like this:

```golang
{{ range (where .Pages "Type" "supplier") | first 2  }}
  {{ .Content }}
{{ end }}
```

But with Hugo 0.80 this no longer works.

The easiest way to fix this (in plain english) is as follows:

- Add any sections you want to range over as Params in the config file, [as explained here](https://gohugo.io/functions/where/#mainsections).
- Then use `site.RegularPages` instead of `.Pages` , [as Zachary Betz alludes suggests](https://discourse.gohugo.io/t/pagination-doesnt-work-after-hugo-update-after-a-few-months/21332/2).
- And move your [nested where clause](https://gohugo.io/functions/where/#nest-where-clauses) from the range function into a variable. You can then range over the variable, applying any filters you might need.

In Go templating that will look something like this:

```golang
{{ $pages := where site.RegularPages "Type" "in" site.Params.supplierSection }}
{{ range $pages | first 2  }}
  {{ .Content }}
{{ end }}
```

If it wasn’t clear from this example, you can assign your section to any variable name you like in your config file. It doesn’t have to be in the `mainSections` array as suggested in the Hugo docs. Consider the below example.

```jsx
//config.toml
[params];
mainSections = ["blog", "docs"]; // use an array as suggested in the Hugo docs
supplierSection = "supplier"; // this also works great
interviewSection = "interview"; // as does this
```

If you have a few different sections and don’t want to combine content from both sections into one array to range over, then the second option is probably the best way to go.

I had similar issue on another project which involved paginating through pages in a section from on the homepage.

```golang
{{ $paginator := .Paginate (where .Pages "Type" "writing") 6 }}
<ul class="PostList">
{{ range (.Paginator 6).Pages }}
  {{ partial "post-list-item.html" . }}
{{ end }}
</ul>

{{ partial "pagination.html" . }}
```

The fix was almost identical as before. But this time passing the `$pages` variable to `.Paginate` function stored in a second variable called `$paginator` and ranging over that instead.

```golang
{{ $pages := where site.RegularPages "Type" "in" site.Params.mainSections }}
{{ $paginator := .Paginate $pages }}
<ul class="PostList">
{{ range $paginator.Pages }}
  {{ partial "post-list-item.html" . }}
{{ end }}
</ul>

{{ partial "pagination.html" . }}
```

It’s worth noting if you’re using pagination on a list page everything should still work as normal but if it’s not then it’s probably an issue with `.Pages` vs `.RegularPages`, as explained in [Alexandros’s comment](https://github.com/gohugoio/hugoThemes/issues/682#issue-481516283) about this.

I’ll return to this article to document any errors I get the next time I upgrade, but that’s all for now.

## Further reading

- [Nested where clauses](https://gohugo.io/functions/where/#nest-where-clauses)
- [Portable where filters](https://gohugo.io/functions/where/#mainsections)
- [Demos with empty homepage and/or wrong posts list](https://github.com/gohugoio/hugoThemes/issues/682)
- [Pagination doesn’t work after Hugo update](https://discourse.gohugo.io/t/pagination-doesnt-work-after-hugo-update-after-a-few-months/21332)
