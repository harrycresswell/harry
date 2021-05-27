---
title: "Working with data which doesn’t require a page"
date: 2021-05-12T09:24:54+01:00
draft: false
description: "You wont always want Hugo to generate a page for all your content. Here we look at what to do with content that doesn’t require a page, and how to display it on a list page."
slug: "data-no-page"
topics: ["Hugo"]
syndicate: "false"
---

{{< intro >}}You wont always want Hugo to generate a page for all your content. Here we look at what to do with content that doesn’t require a page, and how to display it on a list page.{{< / intro >}}

Hugo will create a standalone page for every markdown file you store in the content folder. Most of the time this is what you’ll want. But there are times when you need to display data that doesn’t require a dedicated page.

For example, let’s say you want to display a list of projects in your list template. Where each project consists of a title, description and link to an external source on the web. There’s no long form content associated with these projects and they don’t need their own page, as the link takes you somewhere else on the web.

So where do you put this type of data?

You might think to put it in the front matter of a markdown file in the content folder. But then Hugo will generate a new page for each file and that’s not what you want.

The data folder helps solve this problem.

## The data folder

Hugo won’t generate standalone pages for any data stored in [the data folder](https://gohugo.io/templates/data-templates/#the-data-folder). So if your custom data doesn’t require it’s own page, then make sure you add it to the data folder.

Let’s look at this in practice.

Inside my data folder I have a file called `projects.yaml` which looks like this:

```yaml
- title: "Type Services"
  description: "A type foundry I set up in 2017 with a focus on hand drawn type and imperfection in type design."
  link: "https://typeservices.co/"
- title: "Mood"
  description: "A visual aid for creative projects – a moodboard of things I like. None of the content is my own. Built with Hugo, hosted with Netlify."
  link: "https://mood.harrycresswell.com/"
- title: "Dark Sky"
  description: "An electronic music project by Matt Benyayer. Since 2012 we’ve collaborated on artwork for most of Matts releases. You’ll find the music and artwork on my [Soundcloud](https://soundcloud.com/harrycresswell) page."
  link: "https://soundcloud.com/dark-sky"
```

The file consists of a list of projects. Each project has a title, a brief description and a link to an external source where the project is hosted.

For these projects, I don’t want a single page for each project as it will skew my site map with a bunch of empty pages. What I actually want to do is render the title and description for each project on my list page, along with the external link to the project.

From within `layouts/_default/list.html` I loop through the data in the `projects.yaml` file and return the title, link and description for each project.

```go
{{ range .Site.Data.projects }}
  <article>
    <h3>
      <a href="{{ .link }}" target="_blank" rel="noopener noreferrer">{{ .title }}</a>
    </h3>
    <p>{{ .description | markdownify }}</p>
  </article>
{{ end }}
```

In Hugo we can do this using the [Range](https://gohugo.io/functions/range/) function, which is essentially the same as using a [for loop](https://en.wikipedia.org/wiki/For_loop) in other languages

Don’t forget to close all functions using `{{ end }}`.

Finally, I wrap the range in an if statement, using the [eq function](https://gohugo.io/functions/eq/) to target `.Type "projects"`.

```go
{{ if eq .Type "projects"}}
  {{ range .Site.Data.projects }}
    <article>
      <h3>
        <a href="{{ .link }}" target="_blank" rel="noopener nofollow">{{ .title }}</a>
      </h3>
      <p>{{ .description | markdownify }}</p>
    </article>
  {{ end }}
{{ end }}
```

Now I can control which pages display my projects data by adding `type: projects` to the front matter of the page. In other words, what we’re saying here is;

> If `type: projects` exists in the front matter of a page, then render the data.

Finally, I add this to the front matter of a page called `projects.md` in the content folder. This page uses the default list template, so my projects render on the page.

## Wrapping up

Rememeber, the data folder is the place to store data which doesn’t require a standalone page. Don’t add this type of data to the content folder, unless you want Hugo to generate a page for it. Hugo will create a page for all markdown files stored in the content folder.

## Further reading

- [Passing data to templates and tables in Hugo](/articles/passing-data-to-templates-hugo/)
- [Working with Data in Hugo](https://harrycresswell.com/articles/data-hugo/)
