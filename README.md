# harrycresswell.com

A Hugo starter project and theme used for [harrycresswell.com](https://harrycresswell.com/).

## Features

- [Hugo](https://gohugo.io/)
- [Hugo pipes](https://gohugo.io/hugo-pipes/) for SCSS, Sourcemaps and JS
- [Lazysizes.js](https://github.com/aFarkas/lazysizes) for image lazy loading
- Responsive image with [Cloudinary](https://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_javascript)
- Minimal dependencies

Read more about it in [How I built this site](https://harrycresswell.com/build/).

## Prerequisites

You need to have [Hugo](https://gohugo.io/) installed locally.

## Installation

Clone this repository:

```
git clone https://github.com/harrycresswell/harry.git
```


## Local development

To start a local development server at at `https://localhost:1313/` run:

```
hugo server
```

## Production build

Whe your ready to build a production ready site, update the `baseUrl` inside `config.toml` then run:

```
hugo --cleanDestinationDir
```

This will clean the `/public` folder and run a fresh build ready for production.


### Licence information

All of the content on this site is produced under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0) license](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.en).

Head to my [Licence page](https://harrycresswell.com/license/) for more information on what you can do with it, and how to provide attribution correctly.


