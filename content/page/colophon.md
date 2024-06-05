+++
title = "How I built this site"
date = "2018-02-15T22:11:02+01:00"
description = "Find out how I built this site, what technology I used, who I learnt it from and the best places to read more on those subjects"
slug = "colophon"
layout= "page"
+++

{{< intro >}}This page shares the technology and techniques I used to build and host this website.  If you have a specific question [drop me a message](/contact), I’m always happy to talk websites. {{< /intro >}}

## Templating

This website is built using [Hugo](https://gohugo.io/) and uses a custom theme.

Hugo takes content files (typically written in markdown), combines them with layout templates (created using HTML, CSS, JavaScript and Go Templating) and generates static HTML files, ready to deploy to the web.

CSS and JavaScript is processed by Hugo using [Hugo Pipes](https://gohugo.io/hugo-pipes/). This means I no longer need a build tool like Gulp to do stuff like compile SCSS to CSS or concatenate and minify JavaScript.


## Typography

Typography on the site is set using [system defaults](https://css-tricks.com/snippets/css/system-font-stack/). In other words the fonts thar already exist on your operating system. This means that text will render differently depending on your system. But I’m ok with that.

I use [Utopia](https://utopia.fyi/) by James Gilyead & Trys Mudford, to create buttery smooth fluid responsive type. The [exact config](https://utopia.fyi/type/calculator?c=320,16,1.125,1140,20,1.25,4,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12) uses the [Major Second](https://www.modularscale.com/?1&em&1.125) modular scale for smaller screen resolutions and the [Major Third](https://www.modularscale.com/?1&em&1.25) scale for larger resolutions.

## CSS

I write my CSS using the [CUBE CSS](https://cube.fyi/) methodology.

I organise my SCSS partials using a custom directory structure which you can learn more about via [cu.css, my CSS boilerplate](https://cu.harrycresswell.com/getting-started/#understanding-the-directory-structure).

The thinking behind my [layout compositions](https://github.com/harrycresswell/harry/tree/main/assets/scss/compositions) is borrowed from [Every Layout](https://every-layout.dev/).

I follow [SuitCSS](https://suitcss.github.io/) methodology when working with [components](https://github.com/harrycresswell/harry/tree/main/assets/scss/blocks). It’s similar to how you might use [BEM](http://getbem.com/), I just prefer the way it looks.


## Deployment and hosting

The theme and content which makes up this site is stored in a GitHub repository and deployed by [Netlify](https://www.netlify.com/). 

Netlify handles the following things:

- **Continuous deployments**: when I push changes to Github, Netlify is notified and automatically re-deploys my site.
- **Form handling**: when a visitor submits the form, Netlify collects the submission and notifies me via email. If you’re interested in how all this works, I wrote about it in [Static Site Form Handling with Netlify](/articles/forms-with-netlify/).

All the code can be found on [GitHub](https://github.com/harrycresswell/harry). Feel free to use it for your own learning and development.


## Media content

Media on this site (images, video etc) is hosted by [Cloudinary](https://cloudinary.com/), a cloud based storage service. This way I’m not committing large media files to GitHub and can avoid slow build times.

I use a [a simple responsive image workflow](/writing/responsive-images-next-gen-formats/) which utilises the power of Cloudinary URL transformations and automatic creation of next-gen image formats. The approach avoids the need for JavaScript and ensures the most optimum image format is rendered. 
