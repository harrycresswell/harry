# Hugo Starter 1.0

A Hugo starter project and theme used for [harrycresswell.com](https://harrycresswell.com/).

## Features

- [Hugo](https://gohugo.io/)
- [Hugo pipes](https://gohugo.io/hugo-pipes/) for SCSS and JS
- Autoprefixer
- [Lazysizes.js](https://github.com/aFarkas/lazysizes) for image lazy loading
- Sourcemaps for local development
- Netlify Large Media
- Minimal dependencies


## Prerequisites

You need to have the latest/LTS [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) versions installed in order to use Victor Hugo.

## Installation

Clone this repository 

```
git clone ...
```
then run `npm install`.

This will install the necessary dependencies.

## Local development

```
npm start
```
This will start a local development server at https://localhost:1313/ in the browser. It’s shorthand for `hugo server --disableFastRender`.


## Production build

```
Hugo
```

This will build a production ready site to `./public`

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

### Writing Sass

Write your **Sass** inside `./assets/scss`. 

With the server running (`npm start`) Hugo will watch your Sass for changes, then pipe them to `./public/css/main.css` and reload the browser.