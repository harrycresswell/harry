---
title: "Software that encourages deletion"
date: 2024-03-06T11:42:53Z
draft: false
slug: "software-that-encourages-deletion"
topics: ["Web sustainability"]
description: "Thoughts on how to deal with redundant, obsolete or trivial data."
---

In [Design Patterns that Encourage Junk Data](https://css-irl.info/design-patterns-that-encourage-junk-data/), Michelle talks about the huge amount of data we accumulate and the impact storing it in “the cloud” is having on the environment. Frighteningly most of that data is junk. 

As Michelle writes:

> It’s estimated that [up to 88%](https://volume.lboro.ac.uk/digital-waste-polluting-the-planet) of the data stored in the cloud is ROT (Redundant, Obsolete or Trivial) data, or [“dark data”](https://www.gartner.com/en/information-technology/glossary/dark-data): data collected by companies in the course of their regular business activities, but which is not used for any other purpose. It all amounts to a lot of junk data that has no purpose, that will never be needed or looked at again.

Reading Hidde’s follow up post, [Design that encourages deletion](https://hidde.blog/links/design-that-encourages-deletion/), got me thinking:

- Which existing design patterns may offer a solution to this problem? 
- And, what software currently exists that encourages deletion of data, or where data deletion is a primary feature of the product?

Here are some thoughts and a few software examples.

## Software where data self-destructs 

Ephemeral data storage – that is, apps which automatically destroy data after a certain period of time – isn’t a new concept. Most of us are familiar with the self-destructing nature Snapchat videos and Instagram Stories. But what lesser-known apps exist that also focus on ephemeral data storage?

[Privnote](https://privnote.com/) is a browser based note-taking tool that allows you to send notes that will self-destruct after being read.

[Safenote](https://safenote.co/upload-file) allows you to share files with end-to-end encryption and a link that expires automatically, “so you can keep what you share privately and make sure your stuff doesn't stay online forever”, as Safenote puts it.

[1ty.me](https://1ty.me/) allows you to send one time self-destructing links for sharing sensitive information like passwords and log in details.

[Confide](https://getconfide.com/) is a messenger app with which you can send end-to-end encrypted, self-destructing and screenshot-proof messages. Messages disappear forever after they are read once, making them as private and secure as the spoken word.

We seem to see the self-destructing data pattern mostly often used in communication software and, for obvious reasons, these tools are mostly promoted for their privacy/security benefits. But what other types of software could utilise this design pattern?

What’s great about self-destructing data is that it takes the burden off the end-user, meaning there’s no need to “clean up” the data you create. Instead, the responsibility is passed to the software creator. This isn’t without its pitfalls, of course, but perhaps slightly more resilient than expecting responsible data housekeeping from end-users.


## Software to help you delete existing data

For those that *do* have the time, energy and inclination to clean up the redundant data they create, then there’s lots of apps out there that help do just that. Here are a few that come to mind.

[Redact](https://redact.dev/) is a desktop app which can help you automatically clean up your old posts from services like Twitter, Reddit, Facebook and Discord. 

[Twitter Deleter](https://tweetdeleter.com/) is another option to help you delete old posts from Twitter.

Tools that help you remove data exposed by third-party companies also come to mind. These solutions are mostly marketed around reclaiming your privacy. But, in reality, through the process you’re also removing your data from potentially many datacenters.

[Incogni](https://incogni.com/), [Hello Privacy](https://helloprivacy.com/) and [Optery](https://www.optery.com/) all fall into this category.

[How digital waste is polluting the planet](https://volume.lboro.ac.uk/digital-waste-polluting-the-planet/) (referenced by Michelle above), suggests that much of this redundant data not only stems poor data housekeeping/management, but also the accumulation of duplicate data.

Tools such as [CCCleaner](https://www.ccleaner.com/), [Gemini 2](https://macpaw.com/gemini) and [DupeGuru](https://dupeguru.voltaicideas.net/) can help you identify duplicate files and remove them from both your local machine and cloud storage.

Whilst these apps are all useful in their own right, they only help us deal with the redundant data we’ve already accumulated (or lost control of). 

So I have to agree with Michelle and Hidde here – if we want to reduce the environmental impact of data storage, then we have to consider how data is handled from the design stage. Part of that might mean designing sofware that doesn’t actually store data in the first place. After all, if we don’t store data, then there’s nothing to delete. 


## Software that prioritises local data storage

Perhaps we should be asking ourselves whether we even need store all our data in ”the cloud”, then choose the software we use accordingly?

Ross Wintle’s [JSON: Notes](https://notes.veryuseful.app/) app uses local storage to store data directly in the browser, so data never even hits a datacenter in the first place.

[Thyme](https://usethyme.com/), a simple time logging tool – which I recently discovered via Ross’s post [A manifesto for small, static, web apps](https://rosswintle.uk/2024/02/a-manifesto-for-small-static-web-apps/) – also uses local storage to store data directly in the browser. What’s interesting about Thyme is that whilst the app stores your data in the browser by default, you *can* use cloud storage to sync your data across devices should you wish to. With this pattern, data storage is opt-in rather than the default, which seems like a clever solution. This also means that, by default, you don’t need to create an account to use the app, which is pretty cool in and of itself. The downside of this approach is that the browsers cache can be cleared at anytime, so it’s only really useful for fleeting or ephemiral data, that doesn’t need to be stored long-term.

I don’t have a wide list of examples of software that falls into this category, but hopefully you get the idea. For many of the apps we use, it’s possible that we don’t even need to store our data permanently. Relying on local storage may, in fact, be more than enough for our needs. And that doesn’t necessarily mean relying on the browsers local storage. There’s something to be said for storing data on your local machine, too.

[Obsidian](https://obsidian.md/), the local-first Markdown editor, comes to mind here. It’s just a bunch of Markdown files, which sit on your machine until you decide to back your data up on a hard drive or pay for cloud storage. [Apple Notes](https://www.icloud.com/notes), [Things](https://culturedcode.com/things/), [Muse](https://museapp.com/), [Actual](https://actualbudget.com/) and [Superhuman](https://superhuman.com/) are some other good examples of popular local-first apps, which just use the Cloud to sync data between devices or for collaboration purposes.

Perhaps it’s time to favour desktop apps (local-first) over web apps (cloud-first)? Or, where possible, opt for web apps that prioritise browser-based local storage?

Whatever the case, making local data storage the default and cloud data storage an opt-in, might well increase the friction of creating redundant data in the Cloud. 

Would software designed with this approach in mind help us make progress in discouraging junk data? 


## Final thoughts

Some fairly rough ramblings there, but hopefully enough to spark some ideas.

I will do my best to keep this post updated with any new software I come across which encourages the deletion of data. In the meantime, if you have any thoughts on this topic or if you know of any software I’ve missed then please let me know and I’ll add them in.
