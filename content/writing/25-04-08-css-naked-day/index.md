---
title: "CSS Naked Day"
date: 2025-04-08T15:31:18+01:00
draft: false
slug: "css-naked-day"
topics: ["Hugo", "CSS"]
description: "The 9th April is CSS Naked Day which is all about promoting web standards."
---

The 9th April is [CSS Naked Day](https://css-naked-day.org/) which is all about promoting [web standards](https://www.w3.org/standards/).

The idea is that for one whole international day each year, anyone who wants to get involved has the chance to strip their websites of CSS, show off their semantic `<body>` and lay bare to all their proper use of HTML, semantic markup and good hierarchy structure. 

It’s been on my radar for years, but I must admit this is the first year that I’m actually giving it a go. A little website skinny dipping? Why the hell not. How embarrassing can my HTML possibly be?

Inspired by [Fabian Holzer’s client-side script that automates CSS removal](https://holzer.online/articles/2025/06-04-naked-css-day/), I thought I’d try something similar. But instead of using JavaScript, I’m  doing it directly in my templates using some of [Hugo’s time functions](https://gohugo.io/quick-reference/functions/#time).

Here is the logic that now lives inside my `<head>`, including a nice little reminder about what this is all about, for anyone who lands on my site when the actual day comes around.

```go
{{/*  Get current time   */}}
{{ $now := time.Now }}
{{/*  Set CSS Naked Day start date/time UTC+14:00  */}}
{{ $begin := time.AsTime "09 Apr 2025" "Etc/GMT-14" }}
{{/*  Set CSS Naked Day end date/time UTC-12:00  */}}
{{ $end := time.AsTime "10 Apr 2025" "Etc/GMT+12" }}

{{/*  If $now is >= $begin and <= $end  */}}
{{ if and (ge $now $begin) (le $now $end) }}
  <p><mark>It’s <a href="https://css-naked-day.org/">CSS Naked Day</a> somewhere in the world!</mark></p>
{{ else }}
  Include styles...
{{ end }}
```

It’s by no means perfect. One slight inconvenience, which I’m yet to find a solution for, is that I’ll have to remember to update the year in my `$begin` and `$end` variables if I want this logic to function year after year.

The other downside of doing this inside your templates using a static site generator, is that you also need to trigger a build in order for it to work. My site is currently hosted by Netlify, so it’s easily done by setting up a [build hook](https://docs.netlify.com/configure-builds/build-hooks/) and using a service like Zapier or IFTTT to send an HTTP post request at specified times.

Whether this is approach is a good idea or not I’ll leave for you to decide.