---
title: "Responsive images with Cloudinary"
date: 2018-07-23T10:18:59+02:00
tags: ["Cloudinary", "Javascript"]
slug: "cloudinary"
description: "Stop committing images to your git repo and use Cloudinary to create automatic responsive images"
---

Responsive images are crucial part of improving website performance. But that doesn’t just mean setting all your images to `width: 100%;`, `height: auto;` and calling it a day.

Ideally we want to create multiple versions of each image, sending users the version which best suits their viewing context. If, for example, visitors are using 3G on a mobile device, then we should serve the appropriately scaled images, for the best possible experience.

[Cloudinary](https://cloudinary.com/), a cloud based image solution makes this tedious task somewhat simple, by automatically adapting images for delivery in any context.

The article presents a problem Cloudinary helps solve, then provides a quickstart guide to help you get set up. This is particularly suited to those working with static or serverless sites, where hosting images directly within a repository can lead to issues down the line.

## The Problem

When building static sites, in the past I’ve used the [gulp-responsive](https://www.npmjs.com/package/gulp-responsive) Gulp task to find the original image in the `src` folder and auto generate multiple sizes at build time. Perhaps this sounds familiar?

Using `srcset` and a Hugo [shortcode](https://github.com/harrycresswell/harry/blob/master/site/layouts/shortcodes/img.html), I can serve up the different sizes when required.

Flawless workflow, until deployment. Now I’m committing multiple images for every image on my site to my repository. For sites with lots of images this doesn’t really work out. Build times take forever. You get the picture.

The solution to all this is fairly simple, abstract images assets away from your repo and let a service like Cloudinary take care of your media storage.


## Introducing Cloudinary

_“Cloudinary simplifies responsive images by dynamically adapting image properties — dimensions, crop, format, quality — on-the-fly and delivering the optimal version based on the content and viewing context.”_

By adding transformations – custom parameters set in the URL which we’ll look at later – you can customise your image in any number of ways. Think automatic photoshopping in the cloud.

Using a CDN, Cloudinary delivers media faster based on your visitors location, and now images are out of the repo, build times are back to optimum speeds. Portable also makes total sense. No more syncing your media library when you change environment or make changes down the line.

The next part will look at getting Cloudinary set up to auto generate responsive images.

## Getting started with Cloudinary: JS setup

There are a few ways to set up Cloudinary but the Javascript option is perhaps the most straight forward.

### Step 1: Create an account with Cloudinary

First, [Create an Account](https://cloudinary.com/users/register/free) at Cloudinary.com, then upload a single high-resolution version of any image. Cloudinary with auto generate responsive sizes for you. Pretty cool.

### Step 2: Include Cloudinary in your project

Add Cloudinary to your project by including the core Shrinkwrap JS file in the footer of your page, right above `</body>`.

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.3.0/cloudinary-core-shrinkwrap.min.js">
</script>
```

### Step 3: Include images with data-src

Head to your Media Library in Cloudinary and hover over your image thumbnail to grab the URL.

Include your image using `data-src` not `src`. This is important so the JS can do it’s thing.

Just after `upload/` in the url, include `w_auto,c_scale` this will ensure basic responsive images.

```
<img
data-src="https://res.cloudinary.com/harrycresswell/image/upload/w_auto,c_scale/v1531476918/hc/naming-artboards-in-sketch-01.png"
alt=""
class="cld-responsive" />
```

Then add the class `cld-resonsive` and you’re good to go.


### Step 4: Adding the Javascript call

Finally, to initialise the Cloudinary instance call the responsive method in your JavaScript file:

```
const cl = cloudinary.Cloudinary.new({ cloud_name: 'YOUR_CLOUD_NAME' })
cl.responsive()
```

You should now be set up with auto responsive images.

## Taking it further

There are a number of ways you can improve the workflow. The main one of which is using transformations which we’ll get onto. But first it’s worth analysis your image performance.  

### Web Speed Test

Using [Web Speed Test](https://webspeedtest.cloudinary.com/) we can gather detailed optimisation insights on how changes to image size, format, quality and encoding parameters can improve performance.

Chances are you could make improvements on your image compression. Cloudinary recommends 2 transformations for this

### Useful transformations

Adding `q_auto` to the string of transformations in your URL will handle automatic image [quality](https://cloudinary.com/blog/the_holy_grail_of_image_optimization_or_balancing_visual_quality_and_file_size).

Including `f_auto` will analyse the image content and select the best [format](https://cloudinary.com/documentation/image_optimization#how_to_optimize_image_format) to deliver.

For optimal image performance on [retina](https://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices) displays use `dpr_auto`.

### Using a Hugo Shortcode

If you built your site with Hugo, like this one, you’ll likely want to create a [Shortcode](https://gohugo.io/content-management/shortcodes/) so you can easily add Cloudinary hosted images to any Markdown file.

Inside `site/layouts/shortcodes`, create a file named `cld.html` (as in Cloudinary) and add the following:

```
<div class="Image">
 <img
 data-src="{{ .Site.Params.cloudinary_url }}/w_auto,dpr_auto,c_scale,f_auto,q_auto/{{ .Get "src" }}"
 class="cld-responsive" alt="{{ .Get "alt" }}">
 {{ if .Get "caption"}}
 <figure>
 {{ end }}
 {{ if .Get "caption"}}
 <figcaption>{{ .Get "caption" }}</figcaption>
 </figure>
 {{ end }}
 </div>
 ```

Inside your `config.toml` file, add:

```
# Set Cloudinary URL for image hosting
cloudinary_url = "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload"
```

Access your new Shortcode in any markdown file using


```
# Note: replace straight braces with curly braces (I can’t show the exact code without the shortcode working)
[[< cld src="v1531476921/hc/naming-artboards-in-sketch-organised-albion-03.jpg" alt="" caption="Your Caption" >]]

```

Where the `src` is the last part of your image URL.


### Cloudinary with Forestry CMS

If you’re building a site for a client, you’ve likely considered using a Git based CMS like [Forestry](https://forestry.io/). So content editors can view changes quickly, build times will need to be as fast as possible. In this case using Cloudinary together with Forestry is a great option.  

It’s as simple as adding your cloud name, API key and secret to your site’s settings to get started. Head to the [Forestry Docs](https://forestry.io/docs/media/cloudinary/) for more on this.

## Wrapping up

Responsive images are imperative for both website performance and good user experience. But often the work which goes into making images truly responsive is enough not to bother.

Cloudinary sets out to changes this by generating responsive images automatically and offering a simple solution to optimise and edit your images with custom URL transitions.

For more on Cloudinary, head over to [the docs](https://cloudinary.com/documentation) to see what else is possible. Below you’ll find a list of resources referenced in the configuration above.

## Resources

- [Responsive images](https://cloudinary.com/features/responsive_images) on Cloudinary
- [Mastering Image Delivery with Cloudinary](https://forestry.io/blog/master-image-delivery-with-cloudinary/) by DJ Walker
- [Cloud Media Storage with Cloudinary](https://forestry.io/docs/media/cloudinary/), Forestry Docs
- [Automatically adapt website images to Retina and HiDPI devices](https://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices) by Nadav Soferman
