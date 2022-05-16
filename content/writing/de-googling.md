---
title: "De-Googling"
date: 2022-05-13T16:00:14+01:00
draft: false
description: "I’m doing what I can to minimise my dependence on Google services."
slug: "de-googling"
topics: ["Privacy", "Tools"]
syndicate: "false"
---

I’m doing what I can to minimise my dependence on Google services.

This is by no means a new idea. You’ll find more than 75,000 members in the [r/DeGoogle](https://www.reddit.com/r/degoogle/) subreddit, and [a Wikipedia page](https://en.wikipedia.org/wiki/DeGoogle) all about the movement. 

My reasons for De-Googling are similar to most. I have growing concerns about privacy and the dominance of big tech. Google also has [a history of pulling the plug on well-loved products](https://killedbygoogle.com/). So, in general, going all-in with Google is a bad idea. 

If investing has taught me anything it’s that diversification is important. 

*Don’t put all your eggs in one basket*, as the saying goes. It’s better to spread your bets, if you want to limit your risk.

Intended as much for my reference, as, I hope, some insight and encouragement for others. Here’s where I’m at with the De-Googling process.


## Google alternatives 

These days there are plenty of great alternatives to Google services. So it’s never been easier to start making better choices. Most have a much healthier approach to privacy and security.   


### Google Workspace &#8594; Tutanota

I wrote about [secure, privacy-focused email](/writing/privacy-focused-email/) recently. In the article, I explain why I’ve finally switched my business email over. Give it a read if you want the details about my experience.

I’ve been with Tutanota for a few months now and I’m enjoying it. 

Sure, there are quirks to get used to. Such as images not loading by default (a privacy thing). Then there’s the counterintuitive feel when you delete an email. Tutanota marks the next email read, whether you want to read it or not.

But, you get used to these things fast and the pros outweigh the cons.


The interface is simple and distraction-free. It’s much cheaper than Google Workspace. And, for whatever reason, I’m finding it easier to stay on top of email.


### Google Calendar &#8594; Tutanota Calendar

Tutanota includes an encrypted calendar. It’s not as feature-rich as Google Calendar, and there’s no seamless way to add a video call to an event, but I can deal with that. It does the basics well. 

Custom event colours are a subtle feature which I love. With Google Calendar you’re stuck with the Material Design colour palette.

As I’ve mentioned, there’s something about how simple and stripped back Tutanota feels that appeals to me. The Calendar is a great example of this.


### Google Analytics &#8594; Netlify Analytics

There are a bunch of [responsible analytics options](https://rigorousthemes.com/blog/open-source-google-analytics-alternatives/) out there these days. Most are far easier to work with and much lighter in weight, when compared with Google Analytics.

Most of the sites I manage are hosted by Netlify, so I’ve started using [Netlify Analytics](https://www.netlify.com/products/analytics/). It only takes a few clicks to add analytics to a site. Unlike many of the other options out there, Netlify Analytics runs on the server, rather than the client. Meaning there’s no third-party scripts to add to your website. If you’re looking for secure, performant analytics, then Netlify is tough to beat.

The downside to this approach is that you need to host your sites with Netlify to use their Analytics.


### Google Authenticator &#8594; Raivo

I discovered Raivo OTP (One Time Password) on [Privacy Tools](https://www.privacytools.io/#2fa). Then I read a review on [The New Oil](https://blog.thenewoil.org/ios-2fa-apps-review-2021-or-ravio-otp-the-only-ios-2fa-app-worth-recommending) which convinced me to make the switch.

Why Raivo? First of all, it’s [open-source](https://github.com/raivo-otp) and actively maintained. Second, you can sync the Raivo app across multiple devices and make local backups easily. Meaning that if you lose your phone, you’re far less likely to lose access to all the services you use. Neither of these things you can do with Authenticator. 

Switching from Google Authenticator involves disabling two-factor authentication (2FA) on all your accounts. You then need to re-enabling it using your new 2FA app, be it Raivo, or another. This is usually a manual process, so if you’re big on 2FA then expect it to take some time.

If you’re coming from Authy, then you can follow the [migrating from Authy to Raivo OTP](https://github.com/raivo-otp/ios-application#migrating) guide.


### Google Chrome &#8594; Brave 

I switched my primary browser to [Brave](https://brave.com/) a year or so ago. I still use Chrome for web development, but for everything else I use Brave.

I currently have the [Ecosia](https://www.ecosia.org/) search extension installed, but I’ve also used [DuckDuckGo](https://duckduckgo.com/) in the past. Both are great replacements for Google Search.

By using Brave you can collect [Brave rewards](https://brave.com/brave-rewards/https://brave.com/brave-rewards/) and the Basic Attention Token (BAT). In other words, you get paid to use the browser.


### Google Drive &#8594; Sync

These days I only use Google Drive when someone shares a Google Doc, or Sheet with me. For years my preference was Dropbox until I realised encryption isn’t [zero-knowledge](https://www.cloudwards.net/what-exactly-is-zero-knowledge-in-the-cloud-and-how-does-it-work/). In other words, Dropbox retains the right to access your data.

For the past two years, I’ve been using [Sync](https://www.sync.com/secure-cloud-storage/) and it ticks most of the boxes. But it’s not open source.

Lately, I’ve been looking into [Mega](https://mega.io/) and [Filen](https://filen.io/) as possible alternatives to Sync. Saying that I’m pretty happy with Sync for the most part, so not in any mad rush to switch.

Before moving to Sync, I looked into [Nextcloud](https://nextcloud.com/), a self-hosted solution. But, it seemed like a fair bit of work to set up and perhaps overkill for my needs. So I decided against it in the end.


### Google Docs &#8594; Notion + Obsidian

I’ve never been a fan of Google Docs. I can’t handle the way you have to switch to Google Drive to organise your documents. Like Drive, I only use it when someone shares a Doc with me.

I’ve tried various writing tools over the years, [iAWriter](https://ia.net/writerhttps://ia.net/writer), [Ullyses](https://ulysses.app/) and [Dropox Paper](https://www.dropbox.com/paper), to name a few. But, I find myself using Notion most of all, nowadays.

I’ve been a paying Notion customer since 2019. I use it for most things. Journaling, long-form writing, project and task management, client CRM, bookmarking, and a whole lot more. It’s a brilliant all-in-one tool, but it’s not ideal for security or offline use. 

For that reason, I’ve started using [Obsidian](https://obsidian.md/) for taking notes. Although its primary focus is on knowledge management, I’ve been using it to draft articles, too. There’s a certain resilience in creating a system based on a set of markdown files stored in a local folder. Store that folder in a secure cloud and you’ll have access via mobile. Even when offline.

I’ve been toying with the idea of using Obsidian for project management and moving away from Notion. But, I fear that might be pushing Obsidian beyond its limits.

[Anytype](https://anytype.io/) could well be the ultimate like-for-like Notion replacement. Currently, in beta, I’m keeping an eye out for the launch. The advantage of Anytype is that it works locally, encrypts all your data and is open source. It seems  Anytype might take on Obsidian with their connected thought features. But, I haven’t used it, so I can’t say too much about that, yet.


### Google Sheets &#8594; Airtable

I'm sure you can do most of what Google Sheets does with Notion. But I’ve been using Airtable as a like-for-like replacement for a while.

I have a couple of big tables that I actively manage. One for dev resources and the other for [Local London](https://locallondon.life/) content. I can’t see much point in moving these over to Notion, so I continue to use Airtable. 

I’d say Airtable feels more Notion-like than Sheets-like. But if you want a similar experience to Sheets, then [Cryptpad](https://cryptpad.fr/) has a suite of Google replacements. The software is open-source, with the addition of end-to-end encryption. Cryptpad also has a strong focus on collaboration.


### Google Maps &#8594; Apple Maps + Citymapper

Apple has a much healthier approach to privacy than Google, in general. It makes sense given that they don’t give their products away for free, or rely on Ad revenue.

[Apple Maps](https://www.apple.com/uk/legal/privacy/data/en/apple-maps/) keeps your data in sync across all your devices using end-to-end encryption. This includes your favourites, history and guides. It will also hide your exact location after 24 hours.

Living in London, I find myself using [Citymapper](https://citymapper.com/) quite a bit for travel advice. It’s excellent for navigating public transport. The downside is that it only works in certain cities.

I recently discovered [Maps.me](https://maps.me/) and [Organic Maps](https://organicmaps.app/), both of which use open-source data from  [OpenStreetMap](https://www.openstreetmap.org/). It’s early days, but the ability to use these maps offline makes them very appealing.


## Google dependencies

 Some Google services I’ve found more difficult to replace than others.

### Google Chrome

Google Chrome is a tricky one. It’s no longer my primary browser since I replaced it with Brave. But, I still use it for web development and testing. 

In theory, I could do this testing with Brave. Like Chrome, Brave runs on top of Chromium, so it has the same UI and most of the same features, minus the spyware. 

I guess old habits die hard. I like to test sites on as many different browsers as I can, so I still use Chrome, from time to time.


### Google Search Console

It seems unwise to neglect Search Console given the popularity of Google Search. And as far as I’m aware there’s no obvious replacement.

Before closing my G-Suite/Workspace account, I decided to move the sites I manage over to my personal Gmail account. I guess this is the best solution for now.


### YouTube

I’m a big fan of YouTube, and can’t see myself quitting anytime soon. Some of the best content creators post videos on YouTube, so it’s a difficult one to give up.

For now, I’ve resubscribed to the subscriptions I still follow from my personal Gmail account. Same as I did for my Search Console accounts. 

I did a similar thing for playlists. It took a while, as I’ve created loads over the years. Most of which are music. YouTube is the best places to find all the old music I listened to as a kid. The stuff you can’t find anywhere else.


## Final thoughts

These days there are a bunch of privacy-focused alternatives to Google. So it’s never been easier to move away from Google and find a better experience.

Saying that it doesn’t look like I’ll be going 100% Google free, any time soon. 

I still use Search Console and YouTube most days. I also use Chrome for web development and testing. For that reason, I’ve decided to keep my personal Gmail address for now. I can’t see much point in deleting my account, to sign up for these services again with a non-Google address. Whilst I understand it’s possible, it may be more effort than it’s worth.



## Inspiration

The piece was inspired by two fantastic articles:

- [What I Use Now Instead Of Google](https://dev.to/kiraemclean/what-i-use-now-instead-of-google-56lf) by Kira McLean
- [De-Googling](https://davesmyth.com/de-googling) by Dave Smyth

Before reading Kira’s article, I hadn’t given much thought to my dependency on Google services. So thanks to Kira for introducing me to all this stuff.

H/t to Dave for all your good work on privacy and the title for this article.


## Resources 

Here are the resources I used whilst researching alternatives to Google. Use them to inspire your move away from Google.

- [Switching.software](https://switching.software/): Ethical, easy-to-use and privacy-conscious alternatives to well-known software
- [Good Reports](https://goodreports.com/): Get off Big Tech tools. Use these instead
- [Privacy tools](https://www.privacytools.io/). A brilliant resource 
- [Ethical.net](https://ethical.net/resources/). A collaborative, online directory of ethical companies of all kinds
- [Privacy Savy](https://privacysavvy.com/). Learn to stay secure on the internet

Still not sure how to get going with all this? [Why You Should DeGoogle & Intro DeGoogling Techniques](https://www.reddit.com/r/degoogle/comments/huk4rp/why_you_should_degoogle_intro_degoogling/) is a great place to start. 

Happy De-Googling.

