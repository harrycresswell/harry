---
title: "Upgrading Hugo to 0.126.1"
date: 2024-05-21T12:09:08+01:00
draft: false
slug: "upgrading-hugo-warnings-breaking-changes"
topics: ["Hugo"]
description: "I’m always impressed at how straight forward it is to maintain Hugo websites and upgrade to the latest releases of the Hugo binary."
---

Last week I upgraded Hugo from [v0.115.0](https://github.com/gohugoio/hugo/releases/tag/v0.115.0) to [v0.126.1](https://github.com/gohugoio/hugo/releases/tag/v0.126.1). With all the Hugo sites I manage (for myself and clients), I was half expecting a few breaking changes to fix as a result of the update.

But this is Hugo we’re talking about here and [I’ve been pleasantly surprised in the past](/writing/breaking-changes-upgrading-hugo/) at how few issues you tend to run into when upgrading versions. So I was feeling somewhat confident this time round.

Luckily, all sites were unscathed by [the documented breaking changes of v.0.123.0](https://github.com/gohugoio/hugo/releases?page=3), but there were a few warning and other minor things to fix, which I’ll run through in this post, along with the solutions.


## Fixing the `.Site.IsServer` warning

Following the upgrade, when running `hugo sever`  Hugo displayed the following warnings in the terminal.

```
WARN Site.IsServer was deprecated in Hugo v0.120.0 and will be removed in a future release. Use hugo.IsServer instead.
```

With `.Site.IsServer` now depreciated, the simple update, as suggested, is to use `hugo.IsServer` instead.

## Fixing the `Author` key warning

Another warning shown when running `hugo server` was the following:

```
WARN The author key in site configuration is deprecated. Use params.author.name instead.
```

With author key now been depreciated, adding something like the following to your configuration file won’t be possible in upcoming releases.

```toml
[Author]
  name = "Harry Cresswell"
  github = "https://github.com/harrycresswell"
  linkedin = "https://linkedin.com/in/harrycresswell/"
```

Instead, Hugo wants you to treat author as a param:

```toml
[params]
  [params.author]
    name = "Harry Cresswell"
    github = "https://github.com/harrycresswell"
    linkedin = "https://linkedin.com/in/harrycresswell/"
```

Inside your templates, what was once this:

```html
{{ with .Site.Author.name }}
  <meta name="author" content="{{ . }}">
{{ end }}
```

Become this:

```html
{{ with .Site.Params.author.name }}
  <meta name="author" content="{{ . }}">
{{ end }}
```

With the warnings out of the way, there were two minor issues I ran into following the upgrade.

## Finding an alternative for `File.Path`

I haven’t quite worked out the reasons why yet, but for some reason Hugo v0.126.1 doesn’t seem to like the use of `.File.Path`. 

I was using it on one of my sites to conditionally render a partial on certain pages. 

```go
{{ if eq .File.Path "colour/_index.md" }}
  {{ partial "colors.html" . }}
{{ end }}
```

I couldn’t seem to fix the issue using either the `.File` or `.Path` method, so I’ve resorted to using [RelPermalink](https://gohugo.io/methods/resource/relpermalink/) to check the relative permalink instead.

```go
{{ if eq .RelPermalink "/logo/" }}
  {{ partial "logos.html" . }}
{{ end }}
```

I actually prefer the solution above. It achieves the exact same results and it’s easier to make sense of.

## Custom params on language top level

The final issue I ran into was another depreciation which caused a build error. This time encountered when serving sites which use Hugo’s [Multilingual mode](https://gohugo.io/content-management/multilingual/).

```
ERROR deprecated: config: languages.en.languagenameshort: custom params on the language top level was deprecated in Hugo v0.112.0 and will be removed in Hugo 0.127.0. Put the value below [languages.en.params]. See https://gohugo.io/content-management/multilingual/#changes-in-hugo-01120
```

Similar to the Author key above, Hugo now wants us to move `languageNameShort` from the top level of the language config to the param level. 

In other words, something like this:

```toml
[languages]
  [languages.en]
    languageName = "United Kingdom"
    languageCode = "en-gb"
    languageNameShort = "uk"
    contentDir = "content/en"
    weight = 10
```

Needs to be rewritten like this:

```toml
[languages]
  [languages.en]
    languageName = "United Kingdom"
    languageCode = "en-gb"
    contentDir = "content/en"
    weight = 10
    [languages.en.params]
      languageNameShort = "uk"
```

Nothing too challenging about that.

## Final words

I’m always impressed at how straight forward it is to maintain Hugo websites and upgrade to the latest releases of the Hugo binary. This is testament to Hugo and its built-in features, which typically means there’s little need to rely on third party dependencies.

I don’t always upgrade Hugo to the latest version, but there were two new features released in v0.126.0 that I’m keen to check out. The first is the long-awaited [Content Adapters](https://gohugo.io/content-management/content-adapters/), which allows you to build pages from a remote data source. The second is the introduction of the [Goldmark Extras extension](https://gohugo.io/getting-started/configuration-markup/#extras-extension), which enables inserted text, mark text, subscript and superscript. A subtle improvement to markdown authoring, but one I’m particularly excited about. Now I no longer have to misuse `<em>` to add text highlighting in markdown content. Instead, I can \==surround text in two sets of equal signs\== to create ==highlighted text==.



