---
title: "Design tokens and styleguides with Eleventy"
date: 2020-06-05T09:50:37+01:00
draft: false
description: "A simple workflow showing you how to use Eleventy and NPM scripts to take YAML design tokens and generate CSS custom properties and a styleguide."
slug: "design-tokens-styleguides-eleventy"
tags: ["Eleventy"]
syndicate: "false"
---

Lately I’ve been exploring the concept of [design tokens](https://24ways.org/2019/design-tokens-and-component-based-design/) as a way to make design decisions more portable and easier to maintain.

If you‘re new to design tokens, here’s [a good explanation from Robin Rendle](https://css-tricks.com/what-are-design-tokens/).

> ”Design tokens are an agnostic way to store variables such as typography, color, and spacing so that your design system can be shared across platforms like iOS, Android, and regular ol’ websites.”

There’s some great tools out there that help you generate design tokens. [Theo](https://github.com/salesforce-ux/theo) used by the Salesforce team is a popular choice, as is [Chromatic](https://github.com/ui-js/chromatic) and [Style Dictionary](https://amzn.github.io/style-dictionary/#/). However, for my particular needs, most of theses solutions are either overkill or not exactly what I was looking for.

All I want to do start is with some basic tokens which are stored in their own file, independent of whatever will eventually consume them. Then I’d like to make these tokens accessible in my stylesheets and templates. By doing this I’ll be able to use my tokens to style the website and build a styleguide to visually represent them.

When my tokens are updated at the source, I want these changes to cascade down to the styleguide template, SCSS styles and whatever else in the website uses them.

I’m not interested in generating tokens for IOS or Android, like a lot of these existing tools offer. This is one of the reasons I decided to roll my own. All I’m after is a simple workflow that does the above with minimal fuss.

All this should be possible with a few NPM packages, NPM scripts and Eleventy.

## Setting up the project

First thing’s first. I need to create a new directory for my website, then initialise NPM from inside the directory, so I can use some NPM packages.

```
npm init -y
```

I now have a `package.json` file at the root of my project.

Next, I need to install Eleventy so I can process my templates when I add them. I won’t go through this in detail as I’ve already covered that in [Getting Started with Eleventy](https://harrycresswell.com/articles/getting-started-with-eleventy/).

But here are a few reminders.

Install Eleventy:

```
npm install --save-dev @11ty/eleventy
```

Run Eleventy:

```
npx @11ty/eleventy
```

Start a local web server:

```
npx @11ty/eleventy --serve
```

You might want to add an `index.njk` file at the root of the project with some boilerplate code. This will give Eleventy something to process.

## Starting with YAML

From what I’ve read it sounds like creating design tokens in YAML is a good place to start. Makes sense. YAML is easy to read and write by anyone, so I can see the benefits. Should also play nice with Forestry or Netlify CMS.

Start by creating a file inside the project at `src/tokens/tokens.yaml`. This will be the source of truth, where I’ll write my design tokens and manage any future changes before they are generated.

To keep things simple I‘ll add a few color tokens and a sizing scale to the file. This should be more than enough to get going with for now.

```yaml
colors:
  primary: "tomato"
  background: "#f1f1f1"
  body: "#333"
size-scale:
  sm: "0.8rem"
  md: "1rem"
  lg: "1.4rem"
  xl: "2rem"
```

I’ll return to this file later. Now I need to think about how to convert these tokens into a format that can be consumed from inside Eleventy templates.

## Converting YAML to JSON

Eleventy works well with JSON. You can pass it to templates which is ideal. So next it makes sense to take these YAML tokens and convert them into JSON.

You can do this with the [YAMLJS](https://www.npmjs.com/package/yamljs) package.

```
npm install yamljs --save-dev
```

Now inside `package.json` file, write a quick NPM script:

```
"tokens:json": "yaml2json src/tokens/tokens.yaml > src/site/_data/tokens.json --pretty"
```

So what’s going on here? First, I’m telling Yaml2json the source folder of my tokens, then I specify the destination folder where the JSON output should be stored. I’m adding the `--pretty` flag to make the JSON easier to read.

For this to work out I need to add a `_data` folder at `./src/data`, so that the script will run and generate a `tokens.json` file inside the folder.

Now, when I type `npm run tokens:json` in the command line, YAMLJS will take my `tokens.yaml` file, process it as JSON, then chuck it in the `_data` folder.

The `_data` folder is where Eleventy suggests storing data files by default, but you could easily store this wherever you like. Just change the data location in your config file to do so.

## Consuming JSON in templates to crete a style guide

I now have a new file called `tokens.json` inside my `_data` folder that looks like this.

```json
{
  "colors": {
    "primary": "#542bff",
    "background": "#f1f1f1",
    "body": "#333"
  },
  "size-scale": {
    "sm": "0.8rem",
    "md": "1rem",
    "lg": "1.4rem"
  }
}
```

This is an exact representation of my tokens in JSON format. The next step is to consume these tokens in a template.

You might want to do this for a number of reasons, but perhaps the most obvious one is to build a visual representation of your tokens. For the sake of simplicity, I’m refering to this as a styleguide.

To keep things nice and modular, I start by creating a new file for my styleguide which I’ll be able to add to my index file (or wherverer I like) later as an include.

```
touch src/_includes/styleguide.njk
```

Then I add the following code to loop through the JSON object, and return each item.

```html
<section>
  <!-- Loop through JSON object -->
  {% for key, item in tokens.colors %}
  <div class="color">
    <p class="color-palette" style="background-color: {{ item }}">Some space</p>
    <p class="color-hex">{{ item }}</p>
  </div>
  {% endfor %}
</section>
```

You can return a specific item value like this.

```html
<!-- Grab the specific value -->
<div style="background-color:{{ tokens.colors.primary }}">
  {{ tokens.colors.primary }}
</div>
```

Pretty simple.

## Converting JSON to SCSS

Now I need a way to consume my tokens from within CSS files. That means turning this JSON output into SCSS.

You can use the conveniently named [json-to-scss](https://www.npmjs.com/package/json-to-scss) package to make this happen.

```
npm install json-to-scss --save-dev
```

With the package installed, write another NPM script inside the scripts object in `package.json`, underneath the last one.

```
"json:scss": "json-to-scss src/_data/tokens.json src/scss/_tokens.scss"
```

Here I’m telling `json-to-sass` the source folder and the destination for the sass variables.

Now I can run `npm run json:scss` in the command line and `json-to-scss` will take our JSON, convert it to SCSS and chuck it in `src/scss/_tokens.scss` ready for my stylesheets to consume.

Now I have a new file at `./src/scss/tokens.scss` containing a Sass map of my tokens.

That look something like this:

```scss
$tokens: (
  colors: (
    primary: #542bff,
    background: #f1f1f1,
    body: #333,
  ),
  size-scale: (
    sm: 0.8rem,
    md: 1rem,
    lg: 1.4rem,
  ),
);
```

So far so good.

## Mapping through SCSS to create variables and styles

At this point I have a Sass map which stores my tokens. But I need to do something with the data so I can use it in my styles.

It makes sense to extract the data and turn it into CSS custom properties. I’ll want to create a custom property for every single value in the map.

Something like this:

```css
--color-primary: #542bff;
--color-background: #f1f1f1;
--color-body: #333;
--size-scale-sm: 0.8rem;
--size-scale-md: 1rem;
--size-scale-lg: 1.4rem;
```

To do this I create a new Sass file at `src/scss/_config.scss`.

From inside `_config.scss`, first I import the tokens map, then grab each property type in the array and assign each to a corresponding variable.

```scss
@import "tokens";

$colors: map-get($tokens, "colors");
$size-scale: map-get($tokens, "size-scale");
```

Now to generate the custom properties.

To do this I’ll loop through the map array, which can be done using the [@each](http://www.thesassway.com/intermediate/if-for-each-while#each) directive. I want to create these properties on the `:root` element so I have them available throughout my website.

There are a couple of methods you can use to make this happen.

The first method:

```
:root {
  @each $color-name, $color-value in $colors {
    --color-#{$color-name}: #{$color-value};
  }
}
```

The second method:

```
:root {
  @each $color in $colors {
    #{'--color-' + nth($color, 1)}: #{nth($color, 2)};
  }
}
```

Both methods produce the same results, so choose whichever approach you are more comfortable with and make most sense of.

You can do exactly the same thing for the size scale.

```
:root {
  @each $size in $size-scale {
    #{'--size-' + nth($size, 1)}: #{nth($size, 2)};
  }
}
```

## Compiling SCSS to CSS

Now I want to compile my SCSS to CSS, so that the browser can make use of my styles and I can see a visual output of my tokens as CSS custom properties.

To do this I’m installing the [node-sass](https://github.com/sass/node-sass) package.

```
npm install node-sass --save-dev
```

Then I’ll write a new NPM script to take the SCSS from `src/scss` and compile it to CSS inside `src/site/_includes/css` where Eleventy will be able to process it.

```
"scss": "node-sass --output-style expanded -o src/_includes/css src/scss"
```

If you want to get a better understanding of what’s happening here, I cover this in detail in [Getting Started with Eleventy](https://harrycresswell.com/articles/getting-started-with-eleventy/#compiling-sass-to-css).

Before testing the script I need to add an entry point for my SCSS. So I create a `main.scss` file at `/src/scss/main.scss` and import the config file.

```csss
@import "config";
```

Now I can test the script by running:

```
npm run scss
```

A new file has now been created at `src/_includes/css/main.css` containing my tokens as CSS custom properties.

```css
:root {
  --color-primary: tomato;
  --color-background: #f1f1f1;
  --color-body: #333;
  --size-sm: 0.8rem;
  --size-md: 1rem;
  --size-lg: 1.4rem;
  --size-xl: 2rem;
}
```

Exactly what I was after.

## Watching files for changes

Theres a few final things left to do before this workflow is complete. The first thing is to set up a script that will watch for any changes made to SCSS files.

When I make a change to my SCSS, I need a way to run the SCSS script I just wrote, so I don’t have to do it manually each time. You can use a package called [onchange](https://www.npmjs.com/package/onchange) to make this happen.

First install the package.

```
npm install onchange --save-dev
```

Then write a script to run the SCSS script, when changes are made to SCSS files.

```
"watch:css": "onchange 'src/scss' -- npm run scss"
```

All we’re saying here is when `npm run watch:css` is run in the terminal, onchange will “watch” for changes in the `src/scss` directory, then run the `scss` script when it sees changes occur.

Now there’s one final problem to solve. To get a development server running and the SCSS compiling to css onchange, right now you have to run two scripts: `watch:css` (the one we just created) and `eleventy --serve`.

You can combine these into one script to make life easier, but first create a simple serve script.

```
"serve": "eleventy --serve",
```

Nice. That simplifies the Eleventy serve command. Now I need to install one final package and we’re good to go.

## Run all scripts in parallel

[npm-run-all](https://www.npmjs.com/package/npm-run-all) will help you run `serve` and `watch:css` in parallel, alongside our other two scripts; `tokens:json` and `json:scss`.

First install the package.

```
npm install npm-run-all --save-dev
```

Then write a start script which runs all the scripts at the same time.

```
"start": "run-p tokens:json json:scss serve watch:css"
```

Now you should be able to run `npm start` in the terminal and everything should work as expected.

One thing to note, if you make changes in your `tokens.yaml` you will need to stop the server and re-run `npm start` for the changes to propagate.

If you wish you could write one another script to tell onchange to watch for changes to your YAML tokens.

## Wrapping up

So that’s pretty much it. How to take a simple set of YAML design tokens, convert them into JSON so they can be consumed inside Eleventy templates, then generate SCSS to use to style your website.

Since writing this, Heydon published [Easily Use Design Tokens In Eleventy](https://heydonworks.com/article/design-tokens-in-eleventy/) which is well worth reading if you’re looking for a simple dependency free approach to a very similar problem.

Haydon’s article shows you how to turn JSON tokens into CSS by using Nunjucks templating and setting a permalink in your `theme.njk` template to `theme.css`. It’s very elegant and you could easily adapted it to convert YAML to JSON.

Haydon’s approach may well be a better way to go about all this, but I’ll leave that for you to decide.

{{< message >}}
You can find all the code from this article over on <a href="https://github.com/harrycresswell/design-tokens-eleventy">Github.com</a>
{{< /message >}}
