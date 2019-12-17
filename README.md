# Hugo Starter 1.0

A Hugo starter project and theme used for [harrycresswell.com](https://harrycresswell.com/).

## Features

- [Hugo](https://gohugo.io/)
- [Hugo pipes](https://gohugo.io/hugo-pipes/) for SCSS, Sourcemaps, PostCSS Autoprefixer and JS
- [Lazysizes.js](https://github.com/aFarkas/lazysizes) for image lazy loading
- Responsive image with [Cloudinary](https://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_javascript)
- Minimal dependencies

Read more about it in [How I built this site](https://harrycresswell.com/build/).

## Prerequisites

You need to have the latest/LTS [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) versions installed in order to use Victor Hugo.

## Installation

Clone this repository:

```
git clone https://github.com/harrycresswell/harry.git
```

Then run:

```
npm install
```

This will install the necessary dependencies.

## Local development

To start a local development server at at `https://localhost:1313/` run:

```
npm start
```

This is a simple NPM Script which `hugo server --disableFastRender`. 

## Production build

Whe your ready to build a production ready site, update the `baseUrl` inside `config.toml` then run:

```
Hugo
```

This will build  ready site to `./public`.

## Basic concepts

A few of the basic concepts to get the most out of using this theme.

### Adding Content

Create a new markdown file in the `./content/articles` directory:

```
hugo new articles/my-new-article.md
```

Create a new page in the `./content/page` directory:

```
hugo new page/my-new/page.md
```

Follow the same steps for notes and projects.

### Writing Sass

Write your **Sass** inside `./assets/scss`. 

With the server running (`npm start`) Hugo will watch your Sass for changes, then pipe them to `./public/css/main.css` and reload the browser.


### Site structure

The main structure of the site live is `./themes/hc-starter`, so this is where you will need to go to change layouts, partials, shorcodes and taxonomies.
