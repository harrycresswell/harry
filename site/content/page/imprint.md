+++
title = "Imprint"
date = "2018-02-15T22:11:02+01:00"
description = "About this site"
slug = "imprint"
+++

For those interested in how I built this site, here's a quick overview. If you don’t find the answers you’re looking for or have a specific question [drop me a message](/contact/), I’d be happy to help.

## Templating
I’m using [Hugo](https://gohugo.io/), a [Go](https://golang.org/) based [static site generator](https://www.staticgen.com/), primarily because it’s flexible and lightning fast. The site uses a custom theme built on top of the [Victor-Hugo](https://github.com/netlify/victor-hugo) boilerplate, a great starting point for a [Gulp](https://gulpjs.com/) and [Webpack](https://webpack.js.org/) assets pipeline. I made a few modifications to include SCSS support and a [responsive image build task](https://github.com/harrycresswell/harry/blob/master/gulpfile.babel.js#L66), which generates both retina and non-retina image sizes.

## Typography
Type is currently set using [system defaults](https://css-tricks.com/snippets/css/system-font-stack/), meaning it will render differently depending on your operating system. I’m using a [fluid type mixin developed by Mike Riethmuller](https://www.madebymike.com.au/writing/fluid-type-calc-examples/) to make it responsive for different screen resolutions. Type sizes are set using 2 modular scales, [5:6 — minor third](http://www.modularscale.com/?1&em&1.2) for smaller devices and  [8:15 — major seventh](http://www.modularscale.com/?1&em&1.875) for desktop.

## CSS naming
The CSS is written in SCSS, and follows [SuitCSS](https://suitcss.github.io/), a component based CSS methodology developed by [Nicholas Gallagher](http://nicolasgallagher.com/). It’s pretty similar to the [BEM](http://getbem.com/) method, I just prefer the syntax. Otherwise theres not much in it.

I organise my SCSS partials loosely based on [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), in terms of order of specificity, however I opted to use a more conventional system for file naming and folder structure. I have [Sourcemaps](https://knpuniversity.com/screencast/gulp/sourcemaps) set up so go ahead and inspect element to see what’s going on. Alternatively you can head over to [github](https://github.com/harrycresswell/hc).


## Deployment and hosting
The site is hosted directly from [a GitHub repository](https://github.com/harrycresswell/harry) and served on the [JAMstack](https://jamstack.org/) by [Netlify](https://www.netlify.com/). Netlify is an awesome CDN which also takes care of TLS certificates for HTTPS, and continuous deployments. That means when I push changes to Github it automatically deploys updates to the live site.

All the code can be found on [GitHub](https://github.com/harrycresswell/harry). Feel free to use it for your own learning and development. If you have any questions [drop me an email](mailto:studio@harrycresswell.com) or a [tweet](https://twitter.com/harrycresswell/). I'd be more than happy to help.


## Form handling
All form handling is also taken care of by Netlify, so when a visitor submits the form, Netlify collects the submission and notifies me via email. If you’re interested in how all this works, I wrote about it in [Static Site Form Handling with Netlify](/articles/forms-with-netlify/).

## Licensing

The content on this site is published under a [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/) licence.
