---
title: "Automate your newsletter with RSS"
date: 2021-10-20T11:23:19+01:00
draft: false
description: "How publishing content on your personal website first, then using RSS to automate newsletter campaigns can save you a ton of time and effort."
slug: "automating-newsletter-posse-rss"
topics: ["IndieWeb", "Automation"]
keywords: ["IndieWeb", "Automation", "POSSE", "RSS", "Really Simple Syndication", "Mailchimp", "Newsletter", "Newsletter automation"]
---

{{< intro >}}
Earlier in the year I made [an archive of all my newsletters](/newsletter/), here on my website. My aim was to revive past issues from the abyss of many inboxes. Then came the power of RSS and automation.
{{< /intro >}}
## Owning your content

Whilst going through the tedious task of creating markdown files for all past issues, I realised hosting newsletters on my site also made a lot of sense from a content ownership perspective. 

Ok, I realise that might sound obvious, but hear me out.

What if I didn’t just archive each issue, but actually posted each one on my site _first_, before sharing the link elsewhere? That way I’d actually _own_ the original content, rather than handing it over to Mailchimp. I’d have that all important canonical URL. A single source of truth for, which I could link to from elsewhere – always bringing readers back to my website.

If you’re a follower of the [IndieWeb](https://indieweb.org/), you’ll know this approach as  ‘Publish (on your) Own Site, Syndicate Elsewhere’, or simply; [POSSE](https://indieweb.org/POSSE).

When I shared the [changes I’m making to my newsletter](/newsletter/newsletter-changes/) earlier this year, I briefly mentioned one of the benefits of POSSE is the ability to leverage [RSS](https://en.wikipedia.org/wiki/RSS). But I didn’t go into any detail about how this works. Let me do that now.

## The power of RSS

By publishing on your website, you can create an RSS feed of your content with very little effort. In fact, most Static Site Generators either do this automatically or via a plugin. 

The next thing to realise is that most email newsletter providers include a feature that allows you to create campaigns directly from an RSS feed. 

That means you can automate the entire process of building your newsletter campaign.

To give you a clear picture of how helpful this is, consider my original newsletter workflow, pre-RSS automation.

Before now I would write each newsletter in [Notion](https://www.notion.so/) (mainly because Notion docs copy over to Mailchimp without any formatting issues). Then I’d manually set up a new campaign in Mailchimp, before copying the content across from Notion. Once content was in Mailchimp I’d send a test email, check the links worked, then the hit schedule. The Mailchimp process initially took me a while, but I managed to get it down to 10-15 minutes by the end. Not too long, but still a reasonable amount of time.

With an RSS workflow, I only have to set this up once. Mailchimp will take care of the rest automatically. No more copying each newsletter over to Mailchimp. I can now focus 100% on writing my newsletter, which I now write in Markdown, directly in a text editor. Just as if I’m writing a blog post, like this one. 

When I publish my newsletter (aka push to Github), my RSS feed updates. When the schedule time I set in Mailchimp comes around, Mailchimp will grab the new content from my RSS feed and send out the email. All this happens without me ever having to sign into Mailchimp to compose and test the campaign. Result.

Thanks to RSS I now own my content _and_ save myself a good bit of time.

In the next part I’ll show you the steps to get set up. But first, let’s run through the concept once again so you know exactly what needs to be done.

## A simple newsletter workflow

The concept is very simple and can be broken down into 3 steps.

1. **Publish your newsletter on your personal website first**. This part is critical. None of this will work if you don’t. 
2. **Create an RSS feed of your content**. Make sure you have a dedicated feed for your Newsletter, this will prevent non-newsletter content from being sent out. If you’re using Hugo [a feed is created automatically for any section content](https://gohugo.io/templates/rss/#section-rss). For example if write your newsletters in content/newsletter then you can find your RSS feed at `your-domain.com/newsletter/index.xml` unless you have made changes in your config file. For 11ty folk, check out the [RSS plugin](https://www.11ty.dev/docs/plugins/rss/). There’s [a plugin for Gatsby](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/), too.
3. **Set up an RSS automation with your newsletter provider**. This will work differently depending on what service you use.   Below you’ll find the steps for Mailchimp, as that‘s my current provider.


### RSS automation with Mailchimp

In Mailchimp you want to head to **Automations** then in the top right click go to **Classic Automations**.

From here you want to select **Share blog updates**, next choose your campaign name and audience, then hit _Begin_.

At the next step you need to paste in your RSS feed (most likely `your-domain.com/newsletter/index.xml`) and set the send schedule.

Run through the Campaign Info set up, tracking, etc, as usual.

When you get to Template, **choose a template built with blocks**. In other words, not a ‘Code your own’ one. 
Now design your template how you want and **include the RSS items block.** This is important, without the block your email won’t render any content. If you just want your newsletter content and nothing else (like mine), then remove all the other blocks in the template, except for the RSS Items block you just added.

Under the RSS Items settings, makes sure _Content > RSS Items Style_ is set to **Custom**. Now you can [edit the RSS Merge tags](https://mailchimp.com/help/rss-merge-tags/) as you like. When you’re done hit **Save & Close**.

Now click **Preview & Test,** then **Enter Preview Mode**. The email should now pull in the most recent entry in your RSS feed.

Click **Start RSS** when you’re ready to start the schedule.


{{< message >}}<strong>Note</strong>: Since writing this piece I discovered an article on the Mailchimp blog; <a href="https://mailchimp.com/help/share-your-blog-posts-with-mailchimp/" target="_blank">Share your blog posts with Mailchimp</a> which will walk you through the entire process. If my explanation above isn’t clear, then maybe you’ll have more luck with that.{{< /message >}}

## Summary

Publishing your content on your own website is a no-brainer from an ownership perspective. It also makes it much easier to automate the repetitive process of composing newsletter campaigns on third-party providers. The secret to all this is good old RSS. So learn to love it. RSS is very much your friend.

I hope this has helped you get your head around some of the benefits of POSSE and working with RSS feeds. Now you should be well on your way to owning your content and automating your emails newsletters.
