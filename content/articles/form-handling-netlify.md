---
title: "Static site form handling with Netlify"
date: 2018-04-05T09:49:36+02:00
tags: ["Hugo", "API"]
slug: "forms-with-netlify"
description: "Learn how to use Netlify to manage form submissions with automatic spam filtering."
---

_Note: This tutorial requires you have a static site which you deploy using [Netlify](https://www.netlify.com/). If you don‘t use Netlify, read on as you might well be convinced to switch._

Chances are you might have read [Using Zapier to send form data](/articles/form-data-with-zapier/). I used Zapier to handle form submissions on the previous incarnation of this site. And it worked great. I was very happy with the fact I could by-pass subscription based static site form services like [Formspree](https://formspree.io/) and [Formkeep](https://formkeep.com/), just by using Zapier Webhooks and a bit of AJAX to tidy things up.

If you’re also running a static site and wondering how best to go about collecting form submissions without a backend, then [I’d highly recommend using Zapier](/articles/form-data-with-zapier/), everytime. There is however one exception, and the reason I made the switch. And that reason is Netlify.

If you use Netlify to deploy your static site, there’s an even easier way to handle your form submissions. This article looks at how to get set up.

In case you’re interested in seeing how this form we’re about to build works, then head over to [my contact page](/contact/) for a quick demo. Feel free to test it out.

## Why use Netlify for your form submissions

Before we get into the code, let’s run through why Netlify is an awesome option for static form handling.

- No need for any API calls
- No JS required
- Less code
- Built-in email and slack notification options for form submissions
- Optional integrate with [Zapier](https://zapier.com/)
- Receive file upload submissions
- Export form submissions to a CSV file
- Automatic spam filtering, reCAPTCHA 2 and honeypot field options
- Optional AJAX submissions

That’s a fair amount of cool stuff we can do with Netlify Forms already.

## So What’s the deal?

Netlify’s ’Forms Free’ includes up to 100 form submissions per month, if you hit the limit, Netlify will upgrade you to ’Forms Pro’, which includes 1000 submissions per month. Perfect for small business and personal websites.

With that said, let’s take a look at how to set up a form to work with Netlify. I’ll be using my own setup as an example.

## How I set up Netlify to handle forms

First, I created a new page on my site to host my new contact form. From the command line that looks something like this:

```
cd site
hugo new page/contact.html
```

Notice I’m using `.html` and not `.md` as my contact page will contain the HTML needed for my form. Using the `.html` extension for pages is perfectly valid in Hugo.

Inside my `contact.html` page I added some basic markup for my form:

```html
<form name="contact" method="POST" netlify>
  <label>What is your name?
    <input name="full-name" type="text" placeholder="Your full name" required>
  </label>
  <label>What is your email address?
    <input name="email-address" type="email" placeholder="Your email" required>
  </label>
  <label>What your message?
    <textarea name="message" type="text" placeholder="Your message..." required></textarea>
  </label>
    <button type="submit" value="Submit" id="Form-submit">Submit</button>
</form>
```

_Note: I’ve removed class names to make it easier to read, you will want to add some in order to style your form._

For Netlify to start receiving my form submissions, it’s as simple as adding the `netlify` attribute to the `<form>` tag.

Next go ahead and add a `name` attribute, so Netlify knows what to call the form in the Netlify web app. If you have more than one form on your site you will need to use unique names. I’ve called mine `name="contact"`.

That’s it! Once you push your new form page to your production site, Netlify will start receiving form submissions.

## Extending your form for Spam filtering

Netlify runs a spam filter by default when a form is submitted, but you might want to add an extra layer of security by using a “Honeypot” field. This will keep bots from hammering your inbox with junk submissions.

In the words of Netlify:

_”‘Honeypot‘ fields are hidden form fields that lure bot users into completing a field that human users can’t see. A form submitted with a completed honeypot field can be rejected as spam, because only a bot would see and complete the field.“_

Sounds like a good idea to me, so let’s get this set up now.

All you need to do is add `netlify-honeypot="bot-field"` to your `<form>` tag, then add a new input field in your form to catch those bots, `name="bot-field"`.

With that done your form should now look something like this:

```html
<form name="contact" netlify-honeypot="bot-field" method="POST" netlify>
  <p class=“u-visually-hidden">
    <label>Don’t fill this out if you're human: <input name="bot-field"></label>
  </p>
  <label>What is your name?
    <input name="full-name" type="text" placeholder="Your full name" required>
  </label>
  <label>What is your email address?
    <input name="email-address" type="email" placeholder="Your email" required>
  </label>
  <label>What your message?
    <textarea name="message" type="text" placeholder="Your message..." required></textarea>
  </label>
    <button type="submit" value="Submit" id="Form-submit">Submit</button>
</form>
```

As you can see I’ve added `class="u-visually-hidden"` to the `<p>` tag containing the “Honeypot” field. This is a reusable utility class which will hide the field with some simple CSS. Now bots will find the field but reader won’t.

At this point Netlify is set up to collect form data and any spam will be filter out. The final thing to do is add some finesse with a custom page redirect.

## Adding a custom success page  

By default, when someone completes your form, they will see a generically styled success message with a link back to the form page, that’s fine but you might want something custom.

I chose to replace this with [a success page](/success/), to inform visitors their message was submitted successfully and to say thanks.

To do something similar create a new page, for example `/success/` and add an `action` attribute to your `<form>` tag.

If all’s well and good, your form tag should now look something like this:

```html
<form name="contact" netlify-honeypot="bot-field"   method="POST" action="/success/"  netlify>
```

Make sure the path is relative, and starts with a `/`.

Great, now we have a success page. The final thing to do is set up a way to receive our form submissions.

## Receiving form submissions

Netlify has a few different notification options for form submissions, including email and Slack notifications.

This is handled from within the Netlify web app. You can find the options in __Settings > Forms > Form notifications__. Select the __Add notification__ dropdown to see your options. I chose to keep things simple for now, receiving a notification by email.

## Wrapping up

In this article we’ve looked at setting up static site form submissions using Netlify. If you’ve followed along you should now have a functioning contact form on your site which sends notifications to your email.

From here you might consider adding more fields to your form or building a success alert using AJAX and ditching the success page.

Perhaps you’re thinking about adding a few automation steps with Zapier, to send your submission data to other apps in your workflow. Whether that be updating your mailing list in Mailchimp or adding data to a google sheet. The possibilities are almost endless so I’ll leave you to decide where to take it next.

Finally, if you haven’t seen it already, make sure you check out the article below from the Netlify blog, which goes into more detail on what can be done with form data using Netlify.

## Further reading

- [Netlify Docs: Form Handling](https://www.netlify.com/docs/form-handling/)
