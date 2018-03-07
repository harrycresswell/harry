+++
title = "imprint"
date = "2018-02-15T22:11:02+01:00"
description = "About this site"
slug = "imprint"
+++

For the geeks out there, here's a quick overview of how I built this site.

I’m using a lightening fast static site engine called [Hugo](https://gohugo.io/). On top of that is a boilerplate called [Victor-Hugo](https://github.com/netlify/victor-hugo) which I’ve used as a starting point for a [Gulp](https://gulpjs.com/) and [Webpack](https://webpack.js.org/) assets pipeline. I built on it slightly to include SCSS support and a task to automatically generate responsive image.

## Typography
Type is set in Suisse Intl and uses a fluid type mixin developed by Mike Riethmuller. I’m using 1.2 modular scale for smaller devices and 1.875 for larger ones.

## CSS naming
I use SuitCSS as my CSS methodology. If you know BEM it’s pretty similar. I just prefer the syntax, otherwise theres not much in it.

My SCSS partials loosely follow ITCSS, for OOCSS. Though I keep a more conventional folder structure. I have sourcemaps set up so go ahead and Inspect Element to see what’s going on. Alternatively head over to [github](https://github.com/harrycresswell/hc).


## Deployment and hosting
The site is hosted directly from a Github repository and uses the [Netlify](https://www.netlify.com/) CDN  for continuous deployment. That means when I push changes to Github it automatically deploys the live site.

All the code can be found on my [github](https://github.com/harrycresswell/hc) page. Feel free to use it for your own learning and development. If you have any questions [drop me an email](mailto:studio@harrycresswell.com) or a [tweet](https://twitter.com/harrycresswell/). I'd be more than happy to help.
