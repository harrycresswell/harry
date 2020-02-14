+++
title = "How I built this site"
date = "2018-02-15T22:11:02+01:00"
description = "Find out how I built this site, what technology I used, who I learnt it from and the best places to read more on those subjects"
slug = "build"
url = "build"
+++

{{< intro >}}This page shares the technology and techniques I used to build and host this website. {{< /intro >}} If you have a specific question <a href="/contact/">drop me a message</a>, I’d be happy to help.

## Templating

The website is built using a [static site generator](https://www.staticgen.com/) called [Hugo](https://gohugo.io/). I’m using [a custom theme](https://github.com/harrycresswell/harry/tree/master/themes/hc-starter) I built on top of Hugo for the front-end.

## Asset pipeline

All assets are processed by Hugo using [Hugo Pipes](https://gohugo.io/hugo-pipes/). This means I no longer need a build tool like Gulp to do stuff like compile SCSS to CSS or concatenate and minify JavaScript.

## Typography

Typography on the site is set using [system defaults](https://css-tricks.com/snippets/css/system-font-stack/), meaning text will render differently depending on your operating system. Personally I like the way this happens. It’s less of a headache to work with browser inconsistences instead of against them.

I use a [fluid type mixin developed by Mike Riethmuller](https://www.madebymike.com.au/writing/fluid-type-calc-examples/) to make it responsive for different screen resolutions. Type sizes are set using 2 modular scales, [5:6 — minor third](http://www.modularscale.com/?1&em&1.2) for smaller devices and [8:15 — major seventh](http://www.modularscale.com/?1&em&1.875) for desktop.

## CSS naming

The CSS is written in SCSS, and follows [SuitCSS](https://suitcss.github.io/), a component based CSS methodology developed by [Nicholas Gallagher](http://nicolasgallagher.com/). It’s pretty similar to the [BEM](http://getbem.com/) method, I just prefer the way it looks. Otherwise theres not much in it.

I organise my SCSS partials loosely based on [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) in terms of order of specificity, however I opted to use a more conventional system for file naming and folder structure.

## Deployment and hosting

The site is hosted directly from [a GitHub repository](https://github.com/harrycresswell/harry) and served on the [JAMstack](https://jamstack.org/) by [Netlify](https://www.netlify.com/). Netlify is a great CDN which also takes care of TLS certificates for HTTPS, and continuous deployments. That means when I push changes to Github it automatically deploys updates to the live site.

All the code can be found on [GitHub](https://github.com/harrycresswell/harry). Feel free to use it for your own learning and development.

## Form handling

All form handling is taken care of by Netlify, so when a visitor submits the form, Netlify collects the submission and notifies me via email. If you’re interested in how all this works, I wrote about it in [Static Site Form Handling with Netlify](/articles/forms-with-netlify/).

## Media storage

All media on the site (images, GIFs etc) is hosted by [Cloudinary](https://cloudinary.com/), a cloud based storage service. This way I’m not committing large media files to GitHub and can avoid slow build times. Cloudinary provides automatic responsive images and compression with 'transformations' set in the URL. You can read [more about how that works here](/articles/cloudinary/).

If you have any further questions [drop me an email](mailto:studio@harrycresswell.com) or a [tweet](https://twitter.com/harrycresswell/). I'd be more than happy to help.
