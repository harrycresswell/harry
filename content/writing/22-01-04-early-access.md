---
title: "Early access"
date: 2022-01-04T18:14:28Z
draft: false
description: "From now until launch, anyone who signs up for Practical Hugo will get free access to course material in return for completing a short survey about their experience with Hugo."
slug: "early-access"
topics: ["Updates", "Side Projects"]
---

I decided to try a thing. 

From now until launch, anyone who signs up for [Practical Hugo](https://practicalhugo.com/) will get free access to course material in return for completing [a short survey about their experience with Hugo](https://harrycresswell.typeform.com/to/drSopGck). I’m hoping this might help me gather some insight into why folks are signing up, and what they’re interested in learning most.

From a technical perspective this was all very easy to implement.

When new subscribers click the confirmation link in the double opt-in email, they’re redirected to [a thankyou page](https://practicalhugo.com/thanks/),  where I explain the deal and provide a link to the survey. 

Using Buttondown, you can set up this redirect by heading to **Settings > Subscribing**, then adding a link to a custom URL, underneath the *Customize my confirmation email* section.

I put the survey together using Typeform. Nothing out of the ordinary there. It gets the job done and it makes it nice and easy to forward survey submissions to my email.