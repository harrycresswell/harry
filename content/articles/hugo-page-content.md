---
title: "Page content on your Hugo homepage"
date: 2018-03-02T15:44:49+01:00
tags: ["Hugo"]
slug: hugo-page-content-on-homepage
description: "A simple method to print page content on your homepage using the Hugo static site generator."
---

{{< intro >}}A simple Hugo snippet for displaying content from a specific page on your site homepage.{{</ intro >}}

Say for example I wanted to add the title and content from a page called “How it works” on my homepage.

First I’d need to create a page called how it works.

```
$ hugo new page/how-it-works.md
```

In the page front matter add a parameter called `type` and give it a value which makes sense.

That might look something like this:

```yaml
---
title: "How It Works"
date: 2018-03-02T14:58:10+01:00
type: "how"
---
```

Then in your `index.html` add the following:

```go
<!-- show contents of how it works page -->
  {{ range .Data.Pages }}
      {{if eq .Type "how" }} <!-- look for type in the front matter of page -->
        <h2 class="f3">{{ .Title }}</h2>
        <p>{{ .Content }}</p>
      {{end}}
  {{ end }}

```

That’s it!
