---
title: "Responsive images and next-gen formats with Hugo"
date: 2021-09-30T10:25:59+01:00
draft: false
description: "Optimising image delivery with Hugo, Cloudinary and Forestry."
slug: "responsive-images-next-gen-formats"
topics: ["Performance", "Hugo"]
syndicate: "false"
---

{{< intro >}}
The HTTP Archive’s [2020 State of the Web](https://almanac.httparchive.org/en/2020/page-weight#fig-2) reports that images are still the most popular resource type on the web. Contributing more to page weight than JavaScript, CSS and HTML, combined. 
{{< /intro >}}

The problem is that many of these images remain unoptimised. Created heavier than necessary pages, which result in slower site speeds and lower conversion rates.

According to [Google](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/); “as page load time goes from one second to 10 seconds, the probability of a mobile site visitor bouncing increases 123%. Similarly, as the number of elements—text, titles, images—on a page goes from 400 to 6,000, the probability of conversion drops 95%.”

So, if you want to make your website faster – and increase conversion – one of the best things you can do is optimise your images. Delivering only what’s necessary, and doing so in the lightest possible way. 

Whilst there are a number of different ways to optimise image delivery, today I want to focus on just two – responsive images and delivering next-gen formats. Specifically, I want to share the workflow I use when building websites with [Hugo](/topics/hugo). Where image content is hosted by [Cloudinary](/topics/cloudinary) and the website, itself, is managed via [Forestry](/topics/forestry). 

It’s a popular stack and when it comes to web performance, these two optimisations are well documented. So, I was surprised to find little out there explaining how to tie all this good stuff together. My aim here is to fill those gaps and provide you with some insight. 

Let’s begin with the basics.


## First steps towards responsive layout

The following piece of CSS will no doubt look familiar. It’s the first step in making an image respect a responsive layout and resize as the width of the browser changes.

```css
img {
  max-width: 100%;
  height: auto;
}
```

We’re telling the browser to render images with a maximum width of 100% of the browser and set the height automatically. This allows images to resize with the browser, so they always fit the full viewport width, regardless of the browser width.

In itself, the only real optimisation here is a visual one. But it’s an important first step in making images feel responsive.

## Responsive images using srcset

In the past I’ve used JavaScript to load [automatic responsive images with Cloudinary](https://harrycresswell.com/articles/cloudinary/), but it’s not without its drawbacks. JavaScript can be expensive on performance and if JavaScript is ever disabled, then you’ll run into problems where images don’t load. This doesn’t exactly qualify as [resilient web design](https://resilientwebdesign.com/).

Using `srcset` is a far better approach. At the time of writing [srcset has 96.48% browser support](https://caniuse.com/?search=srcset) and it doesn’t require any JavaScript to work.

So what’s the deal with `srcset`?

Unlike `src`, which only allows one image source, with the `srcset` attribute you can provide multiple image sources, as a comma separated list. 

For each image in the list, you tell the browser how wide it is in advance. The browsers can then determine which image is the most appropriate to load for the current viewport size.

Consider the following example.

```html
<img srcset="small.jpg 320w, medium.jpg 800w, large.jpg 1440w" src="small.jpg"  alt="Responsive Images!">
```

Notice each image in the `srcset` requires a width value, followed by the `w` descriptor; `[width]w`. This tells the browser the width of each image, before it loads. 

In the example above, typically the browser will load the small image at small viewport sizes (320px), the medium image at medium (800px) viewports and the large image at large viewports (1440px). 

However [since Chrome 40](https://codereview.chromium.org/674923004/), if a higher density image is already in the memory cache, Chrome will only display the higher density image. This prevents unnecessary file downloads. 

Here we discover an important insight. 

The preferred image is always selected at the discretion of the browser, rather than the developer. In other words, you, as the developer, can only make suggestions as to which images should be used. But ultimately, the browser makes the final decision.

This can often make it [difficult to test srcset implementation](https://stackoverflow.com/questions/28365079/do-latest-chrome-opera-get-srcset-wrong) and validate the quality of your code.

When using `srcset`, it’s important to include a `src` attribute containing your smallest image size. This will be used as a fallback for older browsers which don’t support `srcset`. Given older browsers are usually less performant, it makes sense to offer the smallest size.

Now let’s turn to next-gen image formats and look at how to optimise image loading, by combining AVIF and WEBP formats with the responsive technique just discussed.


## Adopting the AVIF image format

[AVIF](https://en.wikipedia.org/wiki/AV1#AV1_Image_File_Format_(AVIF)) or AV Image Format is a next-gen image format based on the AV1 codec, which delivers images with better compression than both JPEG and WEBP. AVIF generally delivers smaller file sizes, without loosing image quality. However, at the time of writing, [AVIF support is limited](https://caniuse.com/?search=AVIF) to Firefox and Chrome. 

For browsers that support AVIF, you can start delivering AVIF assets with the `.avif` file extension. There are plenty of [tools to convert JPG to AVIF](https://www.ecosia.org/search?q=jpg+to+avif&addon=chrome&addonversion=3.4.0&method=topbar) if you don’t have the AVIF format to begin with.

For browsers that don’t support AVIF – which unfortunately is quite a few – you’ll need to deliver appropriate fallbacks. You can do this by using the `<picture>` element.

Consider the following example.

```html
<picture>
    <source type="image/avif" srcset="path/to/image.avif">
    <source type="image/webp" srcset="path/to/image.webp" >
    <img src="path/to/image.jpg" alt=""/>
</picture>
```

Within the `<picture>` element we reference two `<source>` elements. One to deliver an AVIF image and the other to deliver a WEBP image fallback. `<img>` is used to deliver a JPG or PNG fallback, for case where both AVIF and WEBP aren’t supported. Include the `type` attribute to specify each image  `<source>` you deliver.

In the example above, I’ve only included one image in the srcset attribute. I’ve done this to keep the example simple, but in reality you’ll want to apply the responsive image technique from earlier, to get the most performant images. 

Let’s tackle that next.


## Combining next-gen formats and srcset

To make next-gen formats responsive, you need to add a list of images, including width descriptors, to each `srcset` attribute in the `<source>` and `<img>` element. As we’re working with next-gen formats we need to use the `<picture>` element instead of using `<img>` alone. That way you can provide fallback formats.

Consider the following code example. 

```html
<picture>
  <source type="image/avif" srcset="small.avif 320w, medium.avif 800w, large.avif 1440w" />
  <source type="image/webp" srcset="small.webp 320w, medium.webp 800w, large.webp 1440w" />
  <img srcset="small.jpg 320w, medium.jpg 800w, large.jpg 1440w" src="small.jpg" alt="" />
</picture>
```

Remember to include a `src` image in the `<img>`, to use as a fallback for [browsers that don’t support `srcset`](https://caniuse.com/?search=srcset).


## What about sizes?

If you’ve worked with `srcset` before you might be wondering why I haven’t included a sizes attribute. According to Chris Coyier; [if you’re just changing resolution, all you need is the srcset attribute](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/#also-sizes). This is because without the sizes attribute, the browser assumes the image will be 100% of the viewport width. In other words, omitting a sizes value is akin to adding `sizes="100vw`. 

So, unless you want to change the width of an image at a specific viewport, or your image doesn’t fill 100% of the viewport width – maybe it sits in one column of a two column layout – then the sizes attribute isn’t all that necessary.

At this point we have responsive images and we’re providing next-gen image formats, for supporting browsers. But how does all this work with an asset management tool?

I often use Cloudinary to host image content in the websites I build. So let’s look at how we can apply responsive images and next-gen image formats, when content is hosted by Cloudinary.


## Using AVIF and WEBP with Cloudinary

Using the AVIF and WEBP formats with Cloudinary is very easy, essentially you have two options. 

Either you upload an image in each format and reference the full path. The path should include the file extension, as suggested above. 

Alternatively, you can upload any image format and use Cloudinary’s transformations feature in each of the image URLs. This will transform your images into the required format. Cloudinary makes this possible by automatically creating both an AVIF and a WEBP version, of any image you upload.

Consider the following example.

```html
<picture>
  <source type="image/avif" srcset="https://res.cloudinary.com/harrycresswell/image/upload/f_avif,q_auto/dog/" />
  <source type="image/webp" srcset="https://res.cloudinary.com/harrycresswell/image/upload/f_webp,q_auto/dog/" />
  <img src="https://o.img.rodeo/image/upload/f_auto,q_auto,w_800/dog" alt="" />
</picture>
```

So, what’s going on here, exactly? 

Notice the initial `<source>` element includes the `f_avif` transformation. This tells Cloudinary to deliver an image in the .avif format, to be used by supporting browsers. In the second `<source>` we include the `f_webp` transformation. Here Cloudinary delivers the .webp format. If a browser doesn’t support AVIF but does support WebP, then this image will render. Finally, if neither AVIF or WebP are supported by the browser, the `<img>` will deliver a JPEG, or equivalent, depending on what file type Cloudinary decides is the smallest. This is achieved using the `f_auto` transformation. In each case we use the `q_auto` transformation to allow Cloudinary to set the image quality automatically.

When using the file extension approach, there’s no need to include the transformations in the URL, but everything still works just fine if you do.

```html
<picture>
    <source type="image/avif" srcset="https://res.cloudinary.com/harrycresswell/image/upload/dog.avif">
    <source type="image/webp" srcset="https://res.cloudinary.com/harrycresswell/image/upload/dog.webp" >
    <img src="https://res.cloudinary.com/harrycresswell/image/upload/dog.jpg" alt="A dog chasing a ball"/>
</picture>
```
 
Notice, again we use the `srcset` attribute in our `<source>` elements. As before, this gives us the ability to make our images responsive. Let’s turn to this next.


## Responsive image with Cloudinary using transformations

When using Cloudinary, the technique is almost exactly the same as with regular responsive images. Except you will need to add a width transformation in each URL, as well as the [width]w descriptor, after the image path. 

Consider the following code example.

```html
<picture>

  <source 
    type="image/avif" 
    srcset="
      https://res.cloudinary.com/harrycresswell/image/upload/f_avif,q_auto,w_600/dogs/7 600w,
      https://res.cloudinary.com/harrycresswell/image/upload/f_avif,q_auto,w_800/dogs/7 800w,
      https://res.cloudinary.com/harrycresswell/image/upload/f_avif,q_auto,w_1400/dogs/7 1400w,
      https://res.cloudinary.com/harrycresswell/image/upload/f_avif,q_auto,w_2000/dogs/7 2000w" />
  <source 
    type="image/webp" 
    srcset="
    https://res.cloudinary.com/harrycresswell/image/upload/f_webp,q_auto,w_600/dogs/7 600w,
    https://res.cloudinary.com/harrycresswell/image/upload/f_webp,q_auto,w_800/dogs/7 800w,
    https://res.cloudinary.com/harrycresswell/image/upload/f_webp,q_auto,w_1400/dogs/7 1400w,
    https://res.cloudinary.com/harrycresswell/image/upload/f_webp,q_auto,w_2000/dogs/7 2000w" />
  <img 
    srcset="
    https://res.cloudinary.com/harrycresswell/image/upload/f_auto,q_auto,w_600/dogs/7 600w, 
    https://res.cloudinary.com/harrycresswell/image/upload/f_auto,q_auto,w_800/dogs/7 800w, 
    https://res.cloudinary.com/harrycresswell/image/upload/f_auto,q_auto,w_1400/dogs/7 1400w, 
    https://res.cloudinary.com/harrycresswell/image/upload/f_auto,q_auto,w_2000/dogs/7 2000w" 
    src="https://res.cloudinary.com/harrycresswell/image/upload/f_auto,q_auto,w_800/dogs/7" 
    alt="A dog chasing a ball." />
  
</picture>
```

Notice we including 3 transformations, one each for format, quality and width. Again, we follow each image path with the width descriptor, which should match the width transformation. For example, `w_600` and `600w`, `w_800` and `800w`, and so on.

Now the browser will load next-gen formats where possible, choosing the most appropriate size image for the current viewport width. 

This, of course, is a manual implementation. But what if we’re using a static site generator and a CMS? 

In the final few sections, I’ll show you how to create a responsive image partial to automate this task in Hugo. Then we’ll look at how to get this set up and working correctly with Forestry. So you can upload new image content directly from a CMS, without touching any code in your Hugo project.


## Building a next-gen responsive image partial in Hugo for Cloudinary hosted content

For this next part I will assume you have a Cloudinary account and a Hugo site running locally, on your machine.

First we need to add our Cloudiary base URL to our site params, in the config file. Most likely, this will be a `config.toml`  file found at the root of your project. 

```yaml
[params]
cloudinary_url = "https://res.cloudinary.com/harrycresswell/image/upload/"
```

This will make it easier to manage the URL from one place, in the future. Make sure you update the URL to your own instance, rather than using mine.

Next, create a new file at `layouts/partials/images/resposive.html`. We’ll keep the code in a partial to make it easier to reuse in different places throughout the website.

Add the following code.

```html
<picture>
  <source 
    type="image/avif" 
    srcset="
      {{ .baseURL }}f_avif,q_auto,w_500/{{ .Params.image }} 500w,
      {{ .baseURL }}f_avif,q_auto,w_710/{{ .Params.image }} 710w,
      {{ .baseURL }}f_avif,q_auto,w_1000/{{ .Params.image }} 1000w,
      {{ .baseURL }}f_avif,q_auto,w_1420/{{ .Params.image }} 1420w">
  <source 
    type="image/webp"
    srcset="
      {{ .baseURL }}f_webp,q_auto,w_500/{{ .Params.image }} 500w,
      {{ .baseURL }}f_webp,q_auto,w_710/{{ .Params.image }} 710w,
      {{ .baseURL }}f_webp,q_auto,w_1000/{{ .Params.image }} 1000w,
      {{ .baseURL }}f_webp,q_auto,w_1420/{{ .Params.image }} 1420w">
  <img 
    srcset="
      {{ .baseURL }}f_jpg,w_500/{{ .Params.image }} 500w,
      {{ .baseURL }}f_jpg,w_710/{{ .Params.image }} 710w,
      {{ .baseURL }}f_jpg,w_1000/{{ .Params.image }} 1000w,
      {{ .baseURL }}f_jpg,w_1420/{{ .Params.image }} 1420w"
    src="{{ .baseURL }}f_jpg,w_500/{{ .Params.image }}" 
    alt="{{ .Params.image_alt }}">
</picture>

```

You’ll notice the code is pretty much identical to our previous implementation of responsive next-gen images. However, there are two clear differences. 

Firstly, we’ve replaced the base URL with `{{ .baseURL }}`. This will represent our Cloudinary base URL.

Secondly, we’ve replace the image path with `{{ .Params.image }}`. This is so we can render an image from the front matter of a markdown page, in our Hugo website. 

You’ll also notice a `{{ .Params.image_alt }}` in the image alt attribute. This allows us to  set alternate text for the image, from the front matter of a page.


### Including the partial in a page template

To include the partial in a template, first you have to reference the partial with the path to the the `.html` file.

```js
{{ partial "images/responsive.html" . }}
```

This might go in your  `single.html` template file, but it could just as easily go into a `list.html`, `index.html`, or any other template file for that matter.

Next you need to pass the context into the partial, so the front matter Params and the Cloudinary base URL are accessible from inside the partial.

To do this, you can use the [dict function](https://gohugo.io/functions/dict/). Dict creates a dictionary from a list of key value pairs and can be used to pass context to partials.

Consider the example below.

```js
{{ partial "images/responsive.html" (dict "Params" .Params "baseURL" $.Site.Params.cloudinary_url ) }}
```

Notice we’re using the keys – `Params` and `baseURL` surrounded by double quotes –  to reference the context `.Params` and `$.Site.Params.cloudinary_url`, respectively. And we’re adding this dictonary to the partial include, in order to pass it to the partial. Without passing the context using dict, the partial will have no way of rendering the content, as the context will be stuck in the template in which we referenced the partial.  

Context can be a tricky concept to understand. If you’re struggling with this I highly recommend reading Regis Philibert’s [Hugo, the scope, the context and the dot](https://www.regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/), in which Regis explains the concept very well.


### Add an image to the front matter of a page

With the partial set up, now we can add an image and image alt text to the front matter of a markdown file to validate our code and render an image on the page.

```yaml
---
title: Performant images with Hugo, Cloudinary, Forestry and Netlify
date: 2021-09-24T17:23:17.000+01:00
image: "/v1571674593/hc/image.jpg"
image_alt: Dog chasing a ball

---
```

Make sure the page is using the template where you placed the partial code, otherwise you won’t see the image on the page.

Now let’s get all this working with Forestry.


## Forestry setup

To set up Forestry we first need to connect our site from a Git repository, then connect a Cloudinary account, so Forestry knows where to store image content.

Assuming you have connected your Git repository to Forestry, head to _Settings_ from your site dashboard. Now click _Media_ and change your _Media Storage Provider_ to Cloudinary. If you want to upload content to a subdirectory in Cloudinary, make sure you add the directory name under _Upload Directory_. You can leave the _Public Path_ empty for now. Next, scroll down to _Cloudinary Settings_ and add your _Cloud name_, _API Key_ and _API Secret_. You’ll find these details in your Cloudinary dashboard. At the bottom of the settings page under _Advanced_, make sure _File Path_ is set to `:filename` and _Front Matter Path_ override is checked. You can leave the path field empty.

At this point Forestry should be configured. However, there’s one last problem we need to solve before uploaded images will render correctly. It’s all to do with file extensions and how to go about next-gen formats when working with Forestry.


### Dealing with next-gen formats in Forestry

When you upload image content via Forestry, as you might expect, the image format is also stored. In other words, if you upload a JPEG, the image path will include the file extension.

```css
image.jpg
```

When it comes to delivering next-gen image formats, this creates a problem. How do you deliver the correct format from Cloudinary, when the original file format extension is appended to the image path?

We can solve this problem using Hugo’s built in [replaceRE function](https://gohugo.io/functions/replacere), to strip the file format from the image URL path, and add the correct one in its place. 

That way we can continue to upload any image format via Forestry and have Cloudinary deliver the correct format, in the correct places. This works because Cloudinary creates all the formats we need automatically, for every image you upload. Remember? So all we have to do is make sure we strip the original file extension from the URL, then replace it with the one we want.

This is done by providing a pattern and replacement value, as a pipe on the `.Params.image` path in our `responsive.html` partial. 

Consider the following code.

```js
{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".avif" }}
```

In this case, the replaceRE function looks for the pattern of JPG and PNG, in their various permutations. And replaces any it finds with `.avif`. 

We can do the exact same thing for `.webp` images. 

```js
{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".webp" }}
```

Now consider the full responsive images implementation.

```go
<picture>
  <source 
    type="image/avif" 
    srcset="
      {{ .baseURL }}f_avif,q_auto,w_500/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".avif" }} 500w,
      {{ .baseURL }}f_avif,q_auto,w_710/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".avif" }} 710w,
      {{ .baseURL }}f_avif,q_auto,w_1000/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".avif" }} 1000w,
      {{ .baseURL }}f_avif,q_auto,w_1420/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".avif" }} 1420w">
  <source 
    type="image/webp"
    srcset="
      {{ .baseURL }}f_webp,q_auto,w_500/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".webp" }} 500w,
      {{ .baseURL }}f_webp,q_auto,w_710/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".webp" }} 710w,
      {{ .baseURL }}f_webp,q_auto,w_1000/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".webp" }} 1000w,
      {{ .baseURL }}f_webp,q_auto,w_1420/{{ .Params.image | replaceRE ".jpg|.jpeg|.JPG|.png|.PNG" ".webp" }} 1420w">
  <img 
    srcset="{{ .baseURL }}f_jpg,w_500/{{ .Params.image | replaceRE ".jpeg|.JPG|.png|.PNG" ".jpg" }} 500w,
      {{ .baseURL }}f_jpg,w_710/{{ .Params.image | replaceRE ".jpeg|.JPG|.png|.PNG" ".jpg" }} 710w,
      {{ .baseURL }}f_jpg,w_1000/{{ .Params.image | replaceRE ".jpeg|.JPG|.png|.PNG" ".jpg" }} 1000w,
      {{ .baseURL }}f_jpg,w_1420/{{ .Params.image | replaceRE ".jpeg|.JPG|.png|.PNG" ".jpg" }} 1420w"
    src="{{ .baseURL }}f_jpg,w_500/{{ .Params.image | replaceRE ".jpeg|.JPG|.png|.PNG" ".jpg" }}" 
    alt="{{ .Params.image_alt }}">
</picture>

```

Although it may look chaotic, all we’re really doing is the same thing over and over. For each image size and each format, we look for all the possible formats it may have been uploaded as from Forestry. From here, we use replaceRE to replace the existing format extension, with the  format extension that satisfies our responsive implementation.


## Summary

When it comes to web performance there’s no denying, [faster is better and less is more](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/). To increase speed and conversion the ideal thing to do is to [use fewer images](https://almanac.httparchive.org/en/2019/page-weight#what-types-of-assets-does-the-http-archive-track-and-how-much-do-they-matter). But, I appreciate that’s not always realistic when many websites are built around image content. So, what can we do? 

As web developers and site owners, it’s our resposibility to optimise the images on the wesites we create. One of the easiest ways to do this is to use responsive image techniques, serving next-generation formats where possible.  

It’s true, the implementation of these techniques creates a fair amount of extra code in the DOM. But the benefits certainly outweigh the cost. Your [Lighthouse audits](https://developers.google.com/web/tools/lighthouse/) will prove as much.

When combining Hugo, Cloudinary and Forestry, there’s a few moving parts involved. But, once you’ve done it once, the same rules apply for every website you build, thereafter. [Build it once, sell it twice](https://visualizevalue.com/blogs/feed/brain-dumps-build-once-sell-twice), as the saying goes.

From here there’s plenty of ways to optimise your images further.

Lazy Loading images outside of the viewport, using image placeholders to reduce Cumulative Layout Shift, asynchronous decoding, lazy rendering and image caching come to mind. 

All these techniques are worth spending time on, and will help to further improve the speed, user experiene and search ranking of your website.