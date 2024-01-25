---
title: "Facades"
date: 2022-01-24T18:13:02Z
draft: false
description: "Improving video performance by lazy-loading iframes using fancy facades."
slug: "facades"
topics: ["Daily",]
---

Found some time to improve performance on [roofsimple.com](https://roofsimple.com/). Now rather than rending video content directly in iFrames on page load, it’s now now lazy-loaded using [a nice little facade technique from Paul Irish](https://github.com/paulirish/lite-youtube-embed).

If all this is new to you, using a facade is just a fancy way of saying you’re replacing the actual embedded video with a static image that looks similar. 

Video is expensive in terms of performance, so it makes far more sense to render a static image on page load, then swap out the image for the iFrame, when a visitor clicks the play button. A simple but effective way to improve speed and user experience.

The performance gains from such a quick enhancement make it well worth looking into, especially if your websites contain lots of video. 

For more on the various techniques I recommend checking out [Lazy load third-party resources with facades](https://web.dev/third-party-facades/)  from web.dev. And, of course, Paul’s [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) repo.