---
title: "Preventing email scraping"
date: 2023-01-25T09:18:41Z
publishdate: 2023-01-25
lastmod: 2023-01-25
draft: false
slug: "prevent-email-scraping"
topics: ["Privacy", "JavaScript"]
description: "Tackling spam with base64 encoding and a few lines of JavaScript."
---

I’ve made all the mistakes to ensure my email receives a sickening amount of spam. 

A while back, my address somehow crept into the meta data of a client website. Now I’m constantly bombarded with industry specific spam relating to that particular client. Not the end of the world, but kind of annoying, nonetheless.

Over the years I’ve exposed my address on numerous social channels, none of which is good news, either. And then, of course, there’s the most popular one of all – adding your email address to your website as a plain text *mailto:* link.

All these mistakes make it extremely easy for email scraper scripts to crawl your website, find your email address and exploit the hell out of it.

With this in mind, I want to share an approach I’m using to prevent email scraping altogether. Which drastically reduces the chance of spam ever reaching your inbox in the first place. The technique uses base64 encoding and a few simple lines of JavaScript.


## base64 encoding the address

The first step involves encoding your email address to throw off any scraper scripts. The idea is that when a script attempts to scape your website looking for an address, all it will find is a random encoded string, obfuscating the address.

To make this happen, I’ve set up a variable called `$email` to hold my email address. This site is built using Hugo, so I’m using Hugo’s built in [base64](https://gohugo.io/functions/base64/) function to encode the data. This is done by adding `base64Encode` as a pipe to the value.

```
{{ $email := .Site.Author.email | base64Encode }}
```

Then, all I’m doing is referencing this variable from within the `href`.

```html
{{ $email := .Site.Author.email | base64Encode }}
<a
  data-decode="email"
  class="Button Button--secondary"
  href="mailto:{{ $email }}">
  Reply by email
</a>
```

Here’s how the encoded data looks in the final HTML output. 

```html
<a 
   data-decode="email" 
   class="Button Button--secondary"
   href="mailto:aGFycnkudXYxd2FAYWxlZWFzLmNvbQ==">
   Reply by email
</a>
```


First, notice the random string that replaces the email address. Now malicious scripts won’t be able to find an email address to scrape.

Also, notice the custom data attribute I’ve added to the link – `data-decode="email"`. Keep this in mind, we’ll need to use it later.

At this point, if a human visitor were to click the link, their mail client might well launch, but the `to:` field will be filled with the random encoded string. Not exactly what we want. For humans, we want to replace the encoded string with the real email address.

To solve this problem we can use those aforementioned lines of JavaScript.


## Decoding the address for humans using JavaScript

Scraper scripts generally won’t execute JavaScript, which means we can use it to decode the encoded data when the page loads. This will allow humans using a JavaScript enabled browser to access the real address, whilst scrapers and other bots will continue to see the encoded data.

You’ll find a bunch of similar techniques out there for this particular step, but here’s how I happen to be doing it.

First I set up a new function to contain the code I want to write.

```javascript
function decodeStringBase64() {

}
```

Inside the function, I set up a variable to hold all elements in the DOM that contain `[data-decode="email"]`. Remember that `data-decode="email"` data attribute I added to the a tag?


```javascript
function decodeStringBase64() {
  // Grab Reply by email link tag
  let elemsToDecode = document.querySelectorAll('[data-decode="email"]');
}
```

Next, using a [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method, I set up a function to run for any item returned in the array.

```javascript
function decodeStringBase64() {
  // Grab Reply by email link tag
  let elemsToDecode = document.querySelectorAll('[data-decode="email"]');
  // For each link found
  elemsToDecode.forEach(function(elem) {
    // do something...
  });
}
```

Inside the function I want to do a few things. 

First, I want to grab the data found in the `href`.  Currently that consists of *mailto:* + the encoded string.

Next, I want to extract only the encoded string from the `href` and ignore the *mailto:* part entirely. For this I use JavaScript’s [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) method to split the value of `href` at the colon, `:`.  

This leaves me with the encoded string.


```javascript
function decodeStringBase64() {
  // Grab Reply by email link tag
  let elemsToDecode = document.querySelectorAll('[data-decode="email"]');
  // For each link found
  elemsToDecode.forEach(function(elem) {
    // Grab href data
    let hrefData = elem.href;
    // Split the href data after the colon
    let splitData = hrefData.split(/[:,]/);
  });
}
```

The next step is to decode the encoded string using the [atob function](https://developer.mozilla.org/en-US/docs/Web/API/atob), which is designed specifically for decoding *base64* encoded data.

With the data decoded, I dump `decodedString` along with the *mailto:* back inside `href` to combine *mailto:* with the real email address.

```javascript
function decodeStringBase64() {
   // Grab Reply by email link tag
  let elemsToDecode = document.querySelectorAll('[data-decode="email"]');
  // For each link found
  elemsToDecode.forEach(function(elem) {
    // Grab href data
    let hrefData = elem.href;
    // Split the href data after the colon
    let splitData = hrefData.split(/[:,]/);
    // Decode the second item in the array
    let decodedString = atob(splitData[1]);
    // Dump encodedString and “mailto:” in href
    elem.href = 'mailto:' + decodedString;
  });
}
```

The final step is to make the function call, so the function runs when the page loads.

```javascript
function decodeStringBase64() {
  // Grab Reply by email link tag
  let elemsToDecode = document.querySelectorAll('[data-decode="email"]');
  // For each link found
  elemsToDecode.forEach(function(elem) {
    // Grab href data
    let hrefData = elem.href;
    // Split the href data after the colon
    let splitData = hrefData.split(/[:,]/);
    // Decode the second item in the array
    let decodedString = atob(splitData[1]);
    // Dump encodedString and “mailto:” in href
    elem.href = 'mailto:' + decodedString;
  });
}
// Make the function call
decodeStringBase64();
```

Whilst this does a nice job of preventing scraper scripts, it still depends on human visitors using a JavaScript enabled browser, which you can’t always rely on. 

Unfortunately, that means it’s not quite a perfect solution. Although it may well be worth implementing, depending on the depth of the problem and how much you can handle spam. In my case, I feel it’s worth it.