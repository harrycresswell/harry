---
title: "Responsive images with Cloudinary"
date: 2018-07-23T10:18:59+02:00
tags: ["Hugo", "Javascript", "API"]
slug: "cloudinary"
description: "Stop committing images to your git repo and use Cloudinary to create automatic responsive images that don’t slow down your build times."
---

{{< intro >}}Responsive images are crucial part of improving website performance. But that doesn’t just mean globally setting images to 100% width, height ‘auto’, then calling it a day.{{< /intro >}}

Ideally we want to create multiple versions of each image, sending users the version which best suits their viewing context. If, for example, visitors are using 3G on a mobile device, then we should serve the appropriately scaled images, for the best possible experience.

[Cloudinary](https://cloudinary.com/), a cloud based image solution makes this laborious task somewhat simple, by automatically adapting images for delivery in any context.

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

Add Cloudinary to your project by including `cloudinary-core-shrinkwrap.js` in the footer of your page, right before the closing `<body>`.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.3.0/cloudinary-core-shrinkwrap.min.js">
</script>
```

### Step 3: Include images with data-src

Head to your Media Library in Cloudinary and hover over your image thumbnail to reveal the link icon. Click the icon to copy the URL.

Now we have the URL for an image we can add it to an `<img>` tag in our HTML using `data-src`. It’s important you use the `data-src` attribute and not `src` as Cloudinary will dynamically create the `src` images using JavaScript.


```html
<img
data-src="https://res.cloudinary.com/harrycresswell/image/upload/naming-artboards-in-sketch-01.png"
alt=""
class="cld-responsive" />
```

Next we need to add the `cld-responsive` class to our image, this will allow `cloudinary-core-shrinkwrap.js` to find the image in our HTML and perform the necessary transformations, which we’ll get into a bit later. Remember you’ll need to do this for all images on your site hosted by Cloudinary.

The final thing we need to do to get this working is to add the JavaScript call.

### Step 4: Adding the Javascript call

To initialise the Cloudinary instance, call the responsive method in your JavaScript file:

```js
const cl = cloudinary.Cloudinary.new({ cloud_name: 'YOUR_CLOUD_NAME' })
cl.responsive()
```

You can find your `YOUR_CLOUD_NAME` in your Cloudinary Dashboard under Account Details.

At this point you should now be seeing you Cloudinary hosted image. But right now Cloudinary is just devilering the image. We still need to set up some image transformations on the URL the make it responsive.


## Step 5: Responsive image transformations

In the image URL, right after `upload/`, include `w_auto,c_scale` this will ensure basic responsive images. Now we have something like this.

```html
<img
data-src="https://res.cloudinary.com/harrycresswell/image/upload/w_auto,c_scale/naming-artboards-in-sketch-01.png"
alt=""
class="cld-responsive" />
```

So what’s going on here?

The [w_auto](https://cloudinary.com/documentation/responsive_images#automatic_image_width) transformation will deliver an image automatically scaled to a width that matches the width available in the responsive layout of your site.

[c_scale](https://cloudinary.com/documentation/image_transformation_reference#crop_parameter) is the default crop transformation, which will change the size of the image exactly to the given width and height of its container.

## Taking it further

There are a number of ways you might want to improve this workflow, such as adding more image transformations, to find out what transformations would work best it’s worth analysis your current image performance.

### Running a Web Speed Test

Using Cloudinary’s [Web Speed Test](https://webspeedtest.cloudinary.com/) we can gather detailed optimisation insights on how changes to image size, format, quality and encoding parameters can improve performance.

Chances are you could make improvements on your image compression. Cloudinary recommends 2 transformations for this.

### Useful transformations

Adding `q_auto` to the string of transformations in your URL will handle automatic image [quality](https://cloudinary.com/blog/the_holy_grail_of_image_optimization_or_balancing_visual_quality_and_file_size).

Including `f_auto` will analyse the image content and select the best [format](https://cloudinary.com/documentation/image_optimization#how_to_optimize_image_format) to deliver.

For optimal image performance on [retina](https://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices) displays use `dpr_auto`.

### Using a Hugo Shortcode

If you built your site with Hugo, like this one, you’ll likely want to create a [Shortcode](https://gohugo.io/content-management/shortcodes/) so you can easily add Cloudinary hosted images to any Markdown file.

Inside `site/layouts/shortcodes`, create a new file to store your shortcode. I named mine `cld.html` (as in Cloudinary) as it’s nice and short and easy to remember. Inside the HTML file I added the following:

```go
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

Inside your `config.toml` file, add the following line, remembering to updated `YOUR_CLOUD_NAME` accordingly.

```yaml
# Set Cloudinary URL for image hosting
cloudinary_url = "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload"
```

To access your new Shortcode in any markdown file use the following:


```go
# Hugo Shortcode to use in markdown files
{ {< cld src="naming-artboards-in-sketch-organised-albion-03.jpg" alt="" caption="Your Caption" >} }
```

Here `src` is the last part of your image URL and caption is optional and takes a string of plain text for the image caption.

*Note: In the example above I have spaces between the curly brackets to prevent Hugo from rendering the image. You will want to make sure yours are written without spaces*


### Cloudinary with Forestry CMS

If you’re building a site for a client, you’ve likely considered using a Git based CMS like [Forestry](https://forestry.io/). Forestry is great for content editors who don’t want to mess around with code, instead prefering to use an interface in the browser.

Unlike a traditional CMS where updates to content are near instantaneous, Forestry needs to re-build your site each time content changes. So for content editors to view their changes quickly, we need to ensure build times are as fast as possible. This is where Cloudinary comes in.

Cloudinary mitigates the need to store media inside a Git repository – the primary cause of slow build times – by storing your media on their own servers. This makes Cloudinary a great option combined with a Forestry workflow.

To get Cloudinary and Forestry playing well together you’ll need to change a few settings in your Forestry dashboard.

Assuming you’ve imported your site to Forestry, you will need to update your website Media configuration which you can find inside Settings on the sidebar:

- **Update your Media Storage Provider to Cloudinary**
- **Add your Cloud Name, API key and API Secret.** You can find these details in your Cloudinary dashboard. Once you’ve added these you should see anything uploaded to cloudinary appear in the Media folder inside Forestry. Likewise when you upload new media via Forestry, it‘ll be hosted by Cloudinary.

One final thing to note, if you find yourself setting up a Front Matter Template in Forestry, and use the ‘Image/File Upload’ field, you might need to override the public path for front matter fields, to get your images working. You can do this in the Advanced Media Settings under ‘Front Matter Path’. Depending on how you’ve set things up in your layout templates you might want to include any transformations in the URL you provide.

For more on Forestry head over to the [Forestry Docs](https://forestry.io/docs/media/cloudinary/) for more on getting started.

## Wrapping up

Responsive images are imperative for both website performance and good user experience. But often the work which goes into making images responsive and not just adaptable or flexible is enough not to bother.

Cloudinary tackles this pain point with a JavaScript method which provides automatic responsive images along with a simple solution to optimise and edit your images with URL transformations.

For more on Cloudinary, head over to [the docs](https://cloudinary.com/documentation) to see what else is possible. Below you’ll find a list of resources referenced in the configuration above.

## Further reading

- [Responsive images](https://cloudinary.com/features/responsive_images) on Cloudinary
- [Mastering Image Delivery with Cloudinary](https://forestry.io/blog/master-image-delivery-with-cloudinary/) by DJ Walker
- [Cloud Media Storage with Cloudinary](https://forestry.io/docs/media/cloudinary/), Forestry Docs
- [Automatically adapt website images to Retina and HiDPI devices](https://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices) by Nadav Soferman
