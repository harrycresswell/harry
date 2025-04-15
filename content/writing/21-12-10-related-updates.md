---
title: "Related updates"
date: 2021-12-10T10:03:55Z
draft: false
description: "Course related updates now automatically display on my Hugo course page. It took some thought but the solution was pretty simple in the end."
slug: "related-updates"
topics: ["Daily", "Side Projects"]
---


*⚠️ Things have changed since I originally wrote this post. Course updates are now part of my [/writing](/writing) page, organised under [Side Projects](/topics/side-projects/). I have also retired the course landing page that onced lived at /learn-hugo, in favour of [practicalhugo.com](https://practicalhugo.com).*

---

I had the idea of displaying updates related to [the Hugo course](https://practicalhugo.com) I’m writing at [the bottom of the  course landing page](/learn-hugo/#updates).  Until I have some course material to share I figured I might as well get these updates on the page so you can see how I’m getting on. 

These updates live in their own directory and are marked with a specific tag. And I want to display them on a single page on my website. How do you do it?

First I need to get hold of all the updates I’ve written. As mentioned, updates are a dedicated content type. In other words, they live in their own directory at content/updates. Each update has it’s own markdown file.

Hugo refers to this type of content as [regular pages](https://gohugo.io/variables/site/#sitepages-compared-to-pages). Think *post* or *content* page, as opposed to a taxonomy or section page. You can get hold of all regular pages from anywhere on your site using the [.Site.RegularPages](https://gohugo.io/variables/site/#site-pages) variable. 

```go
 {{ $updates := .Site.RegularPages }} 
```

But here’s the thing, using `.Site.RegularPages` on it’s own will return all regular pages. I have a few different content types on this site, so that includes any file in *content/writing* and *content/newsletter*. Not exactly what I want. I’m only interested in *content/updates.*

The solution is to filter by the Type associated with the content. Hugo automatically assigns a Type to all content types. The type is based on the name you give your content directory. For example, *content/writing* has the Type *writing* and *content/updates* has the Type *updates.* 

Then you can use the [where function](https://gohugo.io/functions/where/) to filter the array.

Putting this in practice my updates variable now looks like this.

```go
 {{ $updates := where .Site.RegularPages "Type" "updates" }} 
```

Next I’m need to loop through my updates. You can do this using the [range function](https://gohugo.io/functions/range/), which is the equivalent of using [foreach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) in other programming languages.

```go
<!-- grab updates -->
{{ $updates := where site.RegularPages "Type" "updates" }}  
<!-- loop through updates -->
{{ range $updates }}
  // return something!  
{{ end }}
```

Now, what data should I return? Well, all I want to do is create a list of updates, so for each update I need the title, the date it was written and a link to it. That way you’ll be able to click the title and read the update.

```go
<!-- grab updates -->
{{ $updates := where site.RegularPages "Type" "updates" }}  
<ul>
<!-- loop through updates -->
{{ range $updates }}
  <li>
    <a href="{{ .Permalink }}">{{ .Date.Format "Jan 2, 2006" }} – {{ .Title }}</a>
  </li>   
{{ end }}
</ul>
```

Now I have updates showing on the page, but there’s a problem. I only want to show updates that have been assigned the topic “Hugo” in the frontmatter of the updates markdown file. 

```go
---
title: "Learning exhaust"
date: 2021-12-07T10:29:30Z
slug: "learning-exhaust"
topics: ["Hugo"]
---
```

To check if an element is in a particular array you can use the [in function](https://gohugo.io/functions/in/).

```go

  <!-- grab updates -->
  {{ $updates := where site.RegularPages "Type" "updates" }}  
  <ul>
  <!-- loop through updates -->
  {{ range $updates }}
    <!-- render if topic “Hugo” returns true -->
    {{ if in .Params.topics "Hugo" }}
      <li>
        <a href="{{ .Permalink }}">{{ .Date.Format "Jan 2, 2006" }} – {{ .Title }}</a>
      </li>   
    {{ end }}
  {{ end }}
  </ul>
{{ end }}
```

What we’re saying here is; *only display updates if they have the topic “Hugo” assigned in their frontmatter and ignore all other pages*.

There’s one last thing to do before I’m done here. 

Currently I’m writing this logic in [a template called page.html](https://github.com/harrycresswell/harry/blob/master/themes/hc-starter/layouts/_default/page.html) in my _default directory. The template is used by quite a few different pages, so these updates will show on all those different pages. Not exactly what I want. If you remember, I only want these updates to display on my Hugo course page. 

The simple solution is to check if the current page URL is the same as the URL of the page in question – in my case that’s /learn-hugo/.  To do this you can use the [eq function](https://gohugo.io/functions/eq/) and the .URL variable to check if the  statement evaluates `true`. Simply put, *if the current page URL equals /learn-hugo/, then run this code*. 

```go
<!-- render if permalink returns true -->
{{- if eq .Permalink "/learn-hugo/" }}
  <h2>Course updates</h2>
  <!-- grab updates -->
  {{ $updates := where site.RegularPages "Type" "updates" }}  
  <ul>
  <!-- loop through updates -->
  {{ range $updates }}
    <!-- render if topic returns true -->
    {{ if in .Params.topics "Hugo" }}
      <li>
        <a href="{{ .Permalink }}">{{ .Date.Format "Jan 2, 2006" }} – {{ .Title }}</a>
      </li>   
    {{ end }}
  {{ end }}
  </ul>
{{ end }}
```

Notice the final statement contains all the previous code. This is because I only want Hugo to execute all this logic *if* the page is /learn-hugo/. In other words, if the condition is met. 

That’s it. I now have course related updates displaying at the bottom of my Hugo course page. Hopefully you’ve learnt something here.

I think that’s it for the technical stuff for now. I need to get my head down and focus on creating course content, otherwise I’ll never get this thing launched by Spring ‘22.