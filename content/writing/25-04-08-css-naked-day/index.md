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

It’s an event that’s been on my radar for years, but I must admit that this is the first year I’m actually giving it a go. A little website skinny dipping? Why the hell not. How embarrassing can my HTML possibly be?

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

It’s by no means perfect, but gets 95% of the way there. One slight inconvenience, which I’m yet to find a solution for, is that I’ll have to remember to update the year in my `$begin` and `$end` variables if I want this logic to function year after year.

The other downside of doing this inside your templates using a static site generator, is that you also need to trigger a build in order for it to work. My site is currently hosted by Netlify, so it’s easily done by setting up a [build hook](https://docs.netlify.com/configure-builds/build-hooks/) and using a service like Zapier, IFTTT or even GitHub Actions to send an HTTP post request at specified times.

Whether this is approach is a good idea or not I’ll leave for you to decide, but it does remove the need for client-side JavaScript which is always a good thing.

---

**10-04-25 update**: It’s all a little too late given that this years event is already over, however I managed to find a solution for having to update the year manually. 

The trick is to get hold of the current year using [time.Now.Year](https://gohugo.io/functions/time/now/), then use the [fmt.Print](https://gohugo.io/functions/fmt/print/) function to turn it into a string. Now it’s possible to pass the string version of the year into the start date string using [fmt.Printf](https://gohugo.io/functions/fmt/printf/). This makes the date dynamic, so the logic will function year after year, without any further updates.

```go
{{/*  Get current time to determine whether it’s CSS Naked Day  */}}
{{ $now := time.Now }}
{{/*  Get current year so we can update logic for each year  */}}
{{ $year := time.Now.Year }}
{{/*  Convert year from integer to string so we can pass it to the printf function  */}}
{{ $yearString := print $year }}
{{/*  Set start date and pass $yearString to make it dynamic */}}
{{ $startDate := printf "09 Apr %s" $yearString }}
{{/*  Set end date and pass $yearString to make it dynamic  */}}
{{ $endDate := printf "10 Apr %s" $yearString }}
{{/*  Update start date to include correct timezone (UTC+14:00)  */}}
{{ $start := time.AsTime $startDate "Etc/GMT-14" }}
{{/*  Update end date to include correct timezone (UTC-12:00)  */}}
{{ $end := time.AsTime $endDate "Etc/GMT+12" }}

{{/*  If $now is >= $start and <= $end  */}}
{{ if and (ge $now $start) (le $now $end) }}
  <p><mark>It’s <a href="/writing/css-naked-day/">CSS Naked Day</a> somewhere in the world!</mark></p>
{{ else }}
  Include styles...
{{ end }}
```

There you have it. A native Hugo script to automate the removal of CSS when CSS Naked Day comes around each year. The only downside is that we’ll have to wait another year to see this in action.