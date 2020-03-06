---
title: "Likes"
date: 2020-02-21T13:04:04Z
draft: false
description: "This is a collection of articles I’ve starred on Feedbin, my go-to RSS reader. Feedbin creates an RSS feed for these articles, which you can fetch and parse as text using JavaScript."
slug: "likes"
syndicate: "false"
type: "likes"
---

This page collects my starred articles in <a href="https://feedbin.com/" target="_blank" rel="noopener">Feedbin</a>. I stole the idea from [Robin](https://www.robinrendle.com/notes/rss-favorites), who learn’t about it from [Dave](https://daverupert.com/likes/), who was inspired by [this post from Chris](https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/).

<div id="likes-list" class="Likes"></div>

The final bit of magic [I learn’t from Andy](https://hankchizljaw.com/wrote/jamstack-ifttt-and-netlify:-a-power-trio/#heading-back-to-power-trios). It involves using [IFTTT](https://ifttt.com/) to watch for changes to [my Feedbin RSS feed](https://feedbin.com/starred/e8b05a0c7620135a0be3cffa18aa898b.xml).

So whenever I favourite a new article in Feedbin, IFTTT sends a POST request to Netlify, which then triggers a build hook and pulls in the new articles.
