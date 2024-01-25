---
title: "Less CSS"
date: 2022-02-23T12:26:31Z
draft: false
description: "How little CSS is too little CSS? How few lines can get away with before a site starts to feel, well, unstyled?"
slug: "less-css"
topics: ["Daily"]
---

How little CSS is too little CSS? How few lines can get away with before a site starts to feel, well, unstyled? To what extent can we rely on default user-agent styles? Do you need anything more than a tiny CSS reset, these days? 

These are the questions I’ve been kicking around in my head lately, so I devised a little exercise to explore these ideas further.

It’s nothing fancy, or new, for that matter. Rather rudimentary, in fact. It may even feel like we‘re going backwards, to some. What am I talking about? Inlining CSS directly in your HTML, of course. Here’s how it works...

Start writing your styles inline, inside `<style>` tags in the `<head>`. How much CSS can you inline before things become unwieldy? At what point do you move your styles to an external stylesheet because you impact performance (TTFB)? Can you style an entire website without even getting to that point?

When inlining CSS you have to keep styles to an absolute minimum. You’re forced you to rely on the cascade, prioritise what’s important and write lean code that does away with the superfluous. There’s no doubt in my mind that creative limitations like this can help us create more sustainable websites.

I starting thinking about this stuff more actively when looking into [Critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/) as a way of improving site performance. But, why use a tool to extract your critical (above the fold) styles and inject them in the head, if you can make *all* your styles critical by writing less of them?

Of course, this is easier said than done on anything larger than a simple personal site. But, it’s a fun little exercise that can encourage you to think more mindfully about how much code you write.