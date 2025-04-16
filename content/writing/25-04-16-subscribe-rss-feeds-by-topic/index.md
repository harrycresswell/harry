---
title: "Subscribe to RSS feeds by topic"
date: 2025-04-16T11:00:31+01:00
draft: false
slug: "subscribe-rss-feeds-by-topic"
topics: ["Updates", "Hugo"]
description: "How to list taxonomy specific feeds on your feeds page."
---

I assume not everyone wants to read everything I write about (I certainly wouldn’t blame you for that). Personally, whenever I subscribe to someones content via RSS, it’s often because I’m interested in a specific topic they write about.

With this in mind, I’ve listed feeds for each topic I write about over on my [feeds](/feeds/) page. So you now have the option of only subscribing to the topics that interest you. No more clogging your RSS reader with the stuff I write that doesn’t interest you.

Hugo generates RSS feeds for each taxonomy automatically, so getting this to work is much easier than you might think. 

## Creating a shortcode that loops through taxonomies

The solution I went with was to create a simple shortcode file in the `/shortcodes` directory called `topic-feeds.html` with the following code inside:

```html
<ul>
  {{ range .Site.Taxonomies.topics }}
  <li>
    <a href="{{ .Page.Permalink }}/feed.xml">{{ .Page.Title }}</a>
  </li>
  {{ end }}
</ul>
```

This loops through each topic, displays the topic name which is linked to the corresponding RSS feed. Perhaps there’s a more elegant way to handle this, but it works well enough for now.

## Including the shortcode on the /feeds page

The final step was to include the shortcode in my `feeds.md` file. 

```markdown
## Topic feeds

If you’re only interested in certain [topics](/topics/) I write about, then subscribe to those feeds and only receive posts on those topics.

/* Note: Remove square brackets for valid shortcode syntax, these prevent the shortcode from rendering for the purposes of this demo. */
{{[< topic-feeds >]}}
```

And, that’s that! You can now [subscribe to my content by topic](/feeds/#topic-feeds).

There’s a couple of other things too...

## A few updates to the names of topics

Whilst I was at it, I’ve made some subtle changes to how content on my site is organised. Apologies if this has caused mayhem in your RSS reader.

So what’s changed exactly?

Firstly, the topic once called ”Hugo course” is now [side projects](/topics/side-projects/). I have [a few different side projects](/things/) on the go right now, so this felt like a sensible move. Any side project related posts can now be found here.

Secondly, the topic once called ”Daily” is now called [/topics/updates/]. I was struggling with the name *Daily*, mainly because the frequency of these posts are far from a daily. I also want to try and get back into posting short-form updates about what I’m currently working on and what’s changed on this site (like this one). So “Updates” feels like a much clearer name for content of this nature.
