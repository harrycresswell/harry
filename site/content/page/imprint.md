+++
title = "imprint"
date = "2018-02-15T22:11:02+01:00"
description = "About this site"
slug = "imprint"
+++

For those interested in how I built this site, here's a quick overview. If you don’t find the answers you’re looking for or have a specific question [drop me an email](mailto:studio@harrycresswell.com), i’d be happy to help.

## Templating
I’m using [Go](https://golang.org/) based static site templating engine [Hugo](https://gohugo.io/), primarily because it’s flexible and lightning fast. The site uses a custom theme built on top of the [Victor-Hugo](https://github.com/netlify/victor-hugo) boilerplate, which is a great starting point for a [Gulp](https://gulpjs.com/) and [Webpack](https://webpack.js.org/) assets pipeline. I made a few modifications to include SCSS support and a responsive image build task, which generates both retina and non-retina image sizes.

## Typography
Type is currently set based on operating system using [system defaults](https://css-tricks.com/snippets/css/system-font-stack/) which use a [fluid type mixin developed by Mike Riethmuller](https://www.madebymike.com.au/writing/fluid-type-calc-examples/). I’m using [5:6 — minor third](http://www.modularscale.com/?1&em&1.2) modular scale for small devices and [8:15 — major seventh](http://www.modularscale.com/?1&em&1.875) for desktop.

## CSS naming
I write my CSS in SCSS and use the [SuitCSS](https://suitcss.github.io/), which is component based methodology developed by [Nicholas Gallagher](http://nicolasgallagher.com/) when working at Twitter. If you the [BEM](http://getbem.com/) method it’s pretty similar. I just prefer the syntax, otherwise theres not much in it.

I organise my SCSS partials loosely based on the theory behind [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), in terms of order of specificity, however I opted to use a more conventional file and folder structure. I have [Sourcemaps](https://knpuniversity.com/screencast/gulp/sourcemaps) set up so go ahead and inspect element to see what’s going on. Alternatively you can head over to [github](https://github.com/harrycresswell/hc).


## Deployment and hosting
The site is hosted directly from a Github repository and uses the [Netlify](https://www.netlify.com/) CDN for continuous deployment. That means when I push changes to Github it automatically deploys the live site.

All the code can be found on my [github](https://github.com/harrycresswell/hc) page. Feel free to use it for your own learning and development. If you have any questions [drop me an email](mailto:studio@harrycresswell.com) or a [tweet](https://twitter.com/harrycresswell/). I'd be more than happy to help.
