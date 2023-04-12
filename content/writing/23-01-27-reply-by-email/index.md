---
title: "Reply by email"
date: 2023-01-27T08:07:10Z
publishdate: 2023-01-27
lastmod: 2023-01-27
draft: false
slug: "reply-by-email"
topics: ["Privacy"]
description: "Giving readers a clear and obvious way to contact me, should they have any questions about something they’ve read."
---

I’ve added a “Reply by email” button to the end of posts on my site. My aim is to give readers a clear and obvious way to contact me, should they have any questions about something they’ve read. 

Now that I’m using a [masked email](/writing/masking-email) address as a way to control spam, this solution feels the least confusing. It means you can click a button which automatically opens your mail client, without having any concerns about why my email address looks a little strange. 

“Reply by email” is simple and descriptive, unlike random.yw4fe@aleeas.com, which if you saw it in plain text, you might think twice about emailing.

In this post I want to explain how it works.

## Utilising the config.toml file

My personal site is built with Hugo, so I store this masked email address in my `config.toml` file. Doing so means I can manage it from one place and easily update it, should it receive spam.


```toml
[author]
email = "random.yw4fe@aleeas.com"
```

Now I can expose the address in my templates using a variable:

```go
{{ .Site.Author.email }}
```

Simple stuff. Next it’s onto building the button.

## Building the HTML partial

I set up a partial file for the code that renders my ‘Reply by email” button. Now I can include it anywhere in my templates. 


```html
<div id="reply-by-email">
  <a class="Button Button--secondary" href="mailto:{{ .Site.Author.email }}">Reply by email</a>
</div>
```

And, here is the final HTML output, with the email address rendered.

```html
<div id="reply-by-email">
  <a class="Button Button--secondary" href="mailto:random.yw4fe.@aleeas.com">Reply by email</a>
</div>
```

You’ll notice I’ve wrapped the link in a div with an `id`. This is so I can create jump links from some other place in the content. For example:

```markdown
If you spot any typos of have any questions, [drop me an email](#reply-by-email).
```

The anchor tag includes two classes used to style the link as a button.

```css
.Button {
  border-width: 0;
  border-radius: 0;
  box-sizing: border-box;
  cursor: pointer;
  outline-style: none;
  text-align: left;
  text-decoration: none;
  transition-duration: 0.1s;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
}

.Button--secondary {
  background: var(--color-white);
  border: solid 2px var(--color-dark);
  color: var(--color-dark);
  padding: 8px 16px;
}

.Button--secondary:hover,
.Button--secondary:focus,
.Button--secondary:active {
  background-color: var(--color-dark);
  box-shadow: 0 10px 28px rgba(47, 47, 47, .3);
  transform: translateY(-2px);
}

.Button--secondary:focus {
  color: var(--color-white);
  outline: 2px dotted var(--color-dark);
}
```

This does the job.

But, as I wrote about recently, exposing your email address in plain text is asking for trouble from email scraper scripts. Unless you’re a fan of spam, it’s worth taking a few extra steps to [prevent email scraping](/writing/prevent-email-scraping/) altogether.

## Final thoughts

The way I see it, nobody really cares what your email address is, as long as they can find a clear and easy way to contact you. 

Realising this, I now feel far less need for a dedicated email address on my website. Especially when it increases the chances of spam. A masked email address, which I can update from time to time and disguise behind a “Reply by email” button, is a good enough solution. 

I assume folks might end up saving the address in their contacts, and if I delete and update the address, then emails will start to bounce. But it’s easily enough to head back to my website and find a new way to contact me, if this happens.

In any case, I still have [a contact form](/contact), so all bases are covered.

Sidenote: I’m pretty sure I got the idea for this after reading [Saying Thank You](https://blog.jim-nielsen.com/2022/saying-thank-you/) from Jim Nielsen.