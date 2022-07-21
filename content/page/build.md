+++
title = "How I built this site"
date = "2018-02-15T22:11:02+01:00"
description = "Find out how I built this site, what technology I used, who I learnt it from and the best places to read more on those subjects"
slug = "build"
layout= "page"
+++

{{< intro >}}This page shares the technology and techniques I used to build and host this website.  If you have a specific question [drop me a message](/contact), I’m always happy to talk websites. {{< /intro >}}

## Templating

The website is built using a [static site generator](https://www.staticgen.com/) called [Hugo](https://gohugo.io/). I’m using [a custom theme](https://github.com/harrycresswell/harry/tree/master/themes/hc-starter) I built on top of Hugo for the front-end.

## Asset pipeline

All assets are processed by Hugo using [Hugo Pipes](https://gohugo.io/hugo-pipes/). This means I no longer need a build tool like Gulp to do stuff like compile SCSS to CSS or concatenate and minify JavaScript.

## Typography

Typography on the site is set using [system defaults](https://css-tricks.com/snippets/css/system-font-stack/), meaning text will render differently depending on your operating system. Personally I like the way this happens. It’s less of a headache to work with browser inconsistences instead of against them.

~~I use a [fluid type mixin developed by Mike Riethmuller](https://www.madebymike.com.au/writing/fluid-type-calc-examples/) to make it responsive for different screen resolutions. Type sizes are set using 2 modular scales, [5:6 — minor third](http://www.modularscale.com/?1&em&1.2) for smaller devices and [8:15 — major seventh](http://www.modularscale.com/?1&em&1.875) for desktop.~~

I recently started using [Utopia](https://utopia.fyi/) by James Gilyead & Trys Mudford, to create buttery smooth fluid responsive type. The [exact config](https://utopia.fyi/type/calculator?c=320,16,1.125,1140,20,1.25,4,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l) uses the [Major Second](https://www.modularscale.com/?1&em&1.125) modular scale for smaller screen resolutions and the [Major Third](https://www.modularscale.com/?1&em&1.25) scale for larger resolutions.


## CSS methodology

I follow [SuitCSS](https://suitcss.github.io/) methodology developed by [Nicholas Gallagher](http://nicolasgallagher.com/) when working with components. It’s very similar to how you might use the [BEM](http://getbem.com/) method, however I prefer the way it looks. Otherwise theres not much in it.

I organise my SCSS partials loosely based on [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) in terms of order of specificity, however I opted to use a more conventional system for file naming and folder structure.

## Deployment and hosting

The theme and content which makes up this site is stored in [a GitHub repository](https://github.com/harrycresswell/harry) and served on the [Jamstack](https://jamstack.org/) by [Netlify](https://www.netlify.com/). Netlify is a great CDN which also takes care of TLS certificates for HTTPS, and continuous deployments. That means when I push changes to Github it automatically deploys updates to the live site.

All the code can be found on [GitHub](https://github.com/harrycresswell/harry). Feel free to use it for your own learning and development.

## Form handling

All form handling is taken care of by Netlify, so when a visitor submits the form, Netlify collects the submission and notifies me via email. If you’re interested in how all this works, I wrote about it in [Static Site Form Handling with Netlify](/articles/forms-with-netlify/).

## Media content

All media on the site (images, GIFs etc) is hosted by [Cloudinary](https://cloudinary.com/), a cloud based storage service. This way I’m not committing large media files to GitHub and can avoid slow build times. ~~Cloudinary provides automatic responsive images and compression with 'transformations' set in the URL. You can read [more about how that works here](/articles/cloudinary/)~~. 

I’ve now switched to [a simple responsive image workflow](/writing/responsive-images-next-gen-formats/) which utilises the power of Cloudinary URL transformations and automatic creation of next-gen image formats. The approach avoids the need for JavaScript and ensures the most optimum format is rendered. 

If you have any further questions [drop me an email](mailto:studio@harrycresswell.com) or a [tweet](https://twitter.com/harrycresswell/). I'd be more than happy to help.
