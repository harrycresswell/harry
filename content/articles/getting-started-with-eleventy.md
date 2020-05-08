---
title: "Getting started with Eleventy"
date: 2020-05-08T07:56:50+01:00
draft: false
description: "Setting up an Eleventy website with a simple Sass pipeline using NPM scripts."
slug: "getting-started-with-eleventy"
tags: ["Eleventy", "JavaScript"]
syndicate: "false"
---

{{< message >}}
You can find all the code from this article over on <a href="https://github.com/harrycresswell/eleventy-starter">Github.com</a>
{{< /message >}}

This article will get you up and running with a simple [Eleventy](https://www.11ty.dev/) powered website and Sass pipeline. It’s 100% beginner friendly and should give you a good introduction to working with this lightweight JavaScript based static site generator.

We’ll cover templating, working with data, setting up collections, and compiling Sass to CSS using NPM Scripts. By the end you should have a solid foundation, ready to build upon for your next project.

So what’s the big deal with Eleventy and why is it becoming so popular? You may be wondering why we even need another static site generator (SSG) when there’s literally hundreds of SSG’s out there. I had these questions too, so before we get into it I’ll do my best to answer some of them.

## Why Eleventy?

[Zach Leatherman](https://twitter.com/zachleat/) built Eleventy in 2017 as a JavaScript alternative to Jekyll. So it will appeal, if like me, you’d rather write JavaScript than Ruby, and you’re more familiar with the NPM package library than with Ruby Gems.

Eleventy is extremely simple. Zach describes Eleventy as more of a utility, than a framework. At it’s core, all it does is take templates and outputs HTML. And it takes very few files and very little code to get all this working.

Perhaps the biggest sell with Eleventy is flexibility. Eleventy is, by default, zero config. Which means you don’t need a config file or in fact need to do anything much to build a website.

Unlike with many other SSG’s Eleventy holds no opinions about how your project should be structured. Just initiate Eleventy inside an existing project directory and Eleventy will start building your files. You tell Eleventy where your content lives and how you prefer to structure your project.

Another cool feature of Eleventy is templating. Unlike most other SSG’s with Eleventy you can choose your own engine or mix and match as many as you wish. HTML, Liquid, Markdown, Nunjucks, Handlebars, moustache, EJS, Haml, Pug, JavaScript Template Literals – you decide.

But it would be wrong to think of Eleventy as just another JavaScript framework, as fundamentally it isn’t one. There’s no Eleventy-specific client-side JavaScript. Eleventy only uses JavaScript to transform your template files into static content. Everything is pre-rendered, so in that sense it’s a true SSG.

Ok, enough of the talk, the best way to learn about Eleventy is to build something with it. So let’s do that now.

First up we need to install the required dependencies.

## Install dependencies

Before you can do anything with Eleventy you’ll need [node.js](https://nodejs.org/en/) (version 8 or higher) installed on your machine.

With Node comes Node Package Manager (NPM), which we’ll use to install Eleventy.

## Getting started

Unlike other static site generators, which often scaffold a project when you create a new site, Eleventy requires you to make a new project directory first, then install Eleventy into that directory. Doing this will turn your directory into an Eleventy powered website.

Start by making a new project directory wherever you like to keep your websites and call it something descriptive.

```
mkdir eleventy-blog
cd eleventy-blog
```

### Initialise the project and install Eleventy

From inside your new project directory, create a `package.json` file.

```
npm init -y
```

Now install Eleventy into the directory.

```
npm install --save-dev @11ty/eleventy
```

At this point you should have a `package.json` file, a `package-lock.json` file and a `node_modules` folder in the directory.

### Run Eleventy

Next, using npx run Eleventy by typing:

```
npx @11ty/eleventy
```

If Eleventy installed correctly, you should see a single line returned in your terminal similar to this:

```
Wrote 0 files in 0.01 seconds
```

Everything seems to be working as expected. We don’t have any files yet, so nothing builds and `Wrote 0 files` checks out.

### Create an index page

Now create an `index.njk` file at the root of your project.

```
touch index.njk
```

Whilst it’s perfectly fine to create HTML templates with the `.html` extension, for the scope of this tutorial we’ll be using `.njk`, which is the extension for the Nunjucks templating language.

Nunjucks is basically Liquid, but for JavaScript. So make sure you use the `.njk` extension if you want to follow along.

Inside our `index.njk` we’ll add some basic boilerplate HTML.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My new Eleventy Blog</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
```

To set this up I used the `! + Tab` in VSCode. This tells the [Emmet extension](https://code.visualstudio.com/docs/editor/emmet) to scaffold a basic HTML document.

I then updated the page title and added `<p>Hello World!</p>` to the body, so we have something visible on the page.

Now Eleventy has something to build. So from back in the terminal restart Eleventy to generate the template.

```
npx @11ty/eleventy
Wrote 1 file in 0.04 seconds
```

This time Eleventy builds 1 file and outputs it to a new folder called `_site` in the root directory.

It looks like everything is working correctly.

### Start local web server

To see our site in the browser we need to start the server. This will start hot-reloading our pages anytime we make changes to our code. We can do this by adding the `--serve` flag to our original command.

```
npx @11ty/eleventy --serve
```

Now the server is running you should see `Hello World!` in the browser when you navigate to `http://localhost:8080` in a web browser.

Nice. We have a website up and running.

Anytime you need to stop Eleventy from serving your website, type `ctrl + c` in the command line to exit the server.

## Project structure and configuration

As mentioned, Eleventy is zero config by default. As we just discovered, this means you don't actually need a configuration file for Eleventy to work.

However, if you want to organise your files in a custom folder structure, you’ll need to tell Eleventy where to find those files. To do this we’ll need to add a config file.

Before we create our config file, let’s make a `src` directory in the root of the project.

```
mkdir src
```

This is the “source“ directory where we’ll store all our development related code. When we’re working on our project this is where we will spend most of our time. It’s the code Eleventy will build into html templates, ready for the web.

From the project root, make another directory inside `src` called `site`:

```
mkdir src/site
```

Now move your `index.njk` file from the root into the newly created `src/site` directory.

Next create a new file called `.eleventy.js` at the root of your project. This is our config file which we’ll use to tell Eleventy where to locate our files and directories.

From the project root type:

```
touch .eleventy.js
```

Now we have a new `.eleventy.js` file at the project root.

Inside `.eleventy.js` add custom input and output options to reflect the changes we just made to our directory structure.

```javascript
module.exports = function (config) {
  return {
    dir: {
      input: "src/site",
      output: "_site",
    },
  };
};
```

So what’s going on here? First we create a function as an exportable module, then we pass in a config argument and return the current configuration data as an object.

By setting input to `src/site`, we’re telling Eleventy to find our files in the `src/site` directory. If we don’t do this, then Eleventy won’t process any of our files. The input location can be anywhere you like, providing you set the location in your `eleventy.js` config.

The output directory is set to `_site`, so Eleventy will build the project to this folder. However you could easily change this to something like `public` or `dist` if you prefer, and Eleventy will build the project there instead. This is totally optional and more a personal preference than anything else.

Next restart the server by running the following:

```
npx @11ty/eleventy --serve
```

This will re-build the project and serve it in the browser.

If all went well you should still see “Hello World” in the browser at [http://localhost:8080](http://localhost:8080).

Currently our website is just a simple single page site. So, let’s make some improvements by building our first template.

## Building a layout template

Making a base layout template for our website is a good place to start. Our base template will act as the default layout for all the pages we create. In other words, it will store any code that will be globally applied to every page of our website.

By creating this template we’re saving ourselves from having to manually copy and paste code each time we create a new page, which is one of the main advantages of creating templates.

To set up a base template, first create a new directory called `_includes` inside the `src/site` folder. Then. inside `_includes`, create another new directory called `layouts`.

You can do this from the project root by running:

```
mkdir src/site/_includes src/site/_includes/layouts
```

Change directory into the layouts directory and create a file called `base.njk`.

```
cd src/site/_includes/layouts
touch base.njk
```

Next, move the contents of `index.njk` into `base.njk`. Your base file should now look like this.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My new Eleventy Blog</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
```

Now replace `<p>Hello World!</p>` in the body with the `{{ content | safe }}` variable.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My new Eleventy Blog</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

This tells Eleventy where we want the content from markdown files and other data sources to display in our template. Now we can use `base.njk` as the template for any other page we create.

Back inside `.eleventy.js` we can update our directory structure to include the location of our includes folder:

```javascript
module.exports = function (config) {
  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "_site",
    },
  };
};
```

As we’re using the default location for our includes folder, this step isn’t 100% necessary and everything will work fine without adding the directory to our config.

However should we wish to change the location in the future, we can now simple head into our config and update the directory.

## Updating the homepage

Now we have our base template, but our `index.njk` file is empty, as we moved all the content into the template.

Back inside `index.njk`, we can use front matter to add useful data to the page.

If you’re new to front matter, think of it as data associated with the document in which it resides. Front matter takes the form of key value pairs set between two sets of triple dashes, at the top of the file.

Here’s an example:

```
---
data: this is front matter!
---
```

In our front matter, we can use the layout property to tell Eleventy which template to use for our `index.njk` page. In this case we want to use our new `base.njk` template.

```yaml
---
layout: layouts/base.njk
---

```

Next add some content to the page.

```html
---
layout: layouts/base.njk
---

<h1>Welcome to my new Eleventy Blog!</h1>

<p>Hello World!</p>
```

If you are still in the layouts directory, move back up to the project root by typing:

```
cd ../../../../
```

Now from the project root, restart the server using `npx @11ty/eleventy --serve`.

If everything worked correctly, you should see the following in the browser:

```
Welcome to my new Eleventy Blog!
Hello World!
```

That means `index.njk` is now using the `base.njk` template for its layout. This is exactly what we want.

Now let’s look at some other sources of data.

## Working with data collections

Collections provide a way to group content together.

There are two ways to create collections of documents in Eleventy. You can either use the `tag` property in the front matter of content files, or you can create collections programatically, via the config file. We’ll use the latter approach.

Let’s add a collection of posts, by creating a new directory called posts inside the `src/site` directory.

```
mkdir src/site/posts
```

Next, create a new markdown file for your first post. We’ll use markdown as it’s a simple format for long-form written content.

```
touch src/site/posts/my-first-post.md
```

Inside the post file, add front matter data for a title, date and layout. We’ll use the base layout as we did before.

```yaml
---
title: "This is my first post"
date: "2020-05-08"
layout: layouts/base.njk
---

```

Now we need to add some content to the file.

```yaml
---
title: "This is my first post"
date: "2019-08-24"
layout: layouts/base.njk
---
This is my first paragraph.
```

We can render front matter data in the post content by specifying the variable name that stores the data.

```yaml
---
title: "This is my first post"
date: "2019-08-24"
layout: layouts/base.njk
---
# {{ title }}

This is my first paragraph.
```

In this case `{{ title }}` will render our title in our post. We’re using the `#` markdown symbol to set the title as a top level `h1` heading.

For more on writing markdown check out Adam Pritchard’s [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Before you continue, create a few more posts, so you have more than one post in your collection. You can do this by duplicating the first post and updating the file name and post title. This will help us render a list of posts a bit later on.

## Register a collection

Now we have a post collection we need to return to our `.eleventy.js` config and register the collection. Doing this will allow us to render the content somewhere on our website.

We can register the post collection by adding a collection called posts onto the config object and using the `addCollection` function.

Pass in the collection name (in this case “posts”), which takes a new `collection` function.

Now we need to return the collection object and add a method called `getFilteredByGlob`. This provides us with a way to specify the path in our source directory where the post markdown files can be found.

```javascript
module.exports = function (config) {
  config.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("src/site/posts/*.md");
  });

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "_site",
    },
  };
};
```

Notice we’re using the universal `*` selector to look for all markdown files inside the posts directory.

With our new posts collection registered, next we’ll want to render the posts somewhere on our website, so we can actually see them in the browser.

But before we do that, make sure you re-run the server to propagate the changes we just made to our configuration.

```
npx @11ty/eleventy --serve
```

Anytime you make a change to your `eleventy.js` config file you will need to restart the server to propagate the changes.

## List a collection on the homepage

Back in our `index.njk` file, we’ll use Nunjucks templating syntax and a `for` loop to iterate over all of the posts in our posts collection.

Then inside the for loop we can add `{{ post.data.title }}` to target the title in the front matter and render it on the page.

```
{% for post in collections.posts %}
	{{ post.data.title }}
{% endfor %}
```

Next we can add some HTML tags to semantically style our code, adding `| reverse` to make sure the loop displays the most recent posts first.

```html
<ul>
  {% for post in collections.posts | reverse %}
  <li>
    {{ post.data.title }}
  </li>
  {% endfor %}
</ul>
```

Now we have a list of our posts, but we need a way to click through to each individual post. To do this we can add an anchor tag and add `{{ post.url }}` to the `href` attribute.

```html
<ul>
  {% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
  </li>
  {% endfor %}
</ul>
```

Now when you open the browser you should see your posts rendered on the homepage. You can also click on the post titles to open the corresponding post pages.

Seeing as we now have more than one page it’s might be a good idea to add a navigation, so we don’t have to use the browser back button the whole time.

## Include a navigation

We want our navigation to consistently feature on every page of our website, so we can either add it directly to the `base.njk` template. Or create a partial file called `nav.njk` and include it in our `base.njk`.

Personally I prefer the second method as it’s more modular and keeps files small and simple. The advantages of doing this will become apparent as your website grows, or as you create different projects and want to re-use your code.

Make a new file called `nav.njk` in the includes directory.

```
touch src/site/_includes/nav.njk
```

Inside `nav.njk` create a `nav` element and add an anchor tag that links to the homepage.

```html
<nav>
  <a href="/">Home</a>
</nav>
```

Now back in `base.njk`, use the include syntax to render your new navigation file in the template.

```
{% include "nav.njk" %}
```

Your base template should now look something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My new Eleventy Blog</title>
  </head>
  <body>
    <header>
      {% include "nav.njk" %}
    </header>

    {{ content | safe }}
  </body>
</html>
```

And if all went well your navigation should now display on each page in the browser.

You can apply the exact same process when creating other include files such as a `footer.njk` or a `sidebar.njk`. But that’s for you to decide.

Now let’s take a look at working with some other types of data.

## Working with globally scoped data files

So far we’ve looked at scoping data locally by using front matter in our post pages and on our index page.

Front matter data is directly associated with the page or template in which it resides, so it’s quite specific in that sense.

However, sometimes we may want to scope data globally and expose data to all of our template files. This is useful for data associated with our entire website. We can store this type of data in a data directory and work with either JSON data or JavaScript.

To see this in action, lets create a new file called `site.json` in `.src/site/_data` and define some site wide variables which we can use globally across our website.

First create the directory and file:

```
mkdir src/site/_data && touch src/site/_data/site.json
```

To keep things simple, start by adding a title and description for your website to the new `site.json` file.

```json
{
  "title": "My first Eleventy Blog",
  "description": "A simple website built with Eleventy"
}
```

This data can now be accessed in any template by using the file name followed by one of the object keys.

To demonstrate this, let’s change the site title in our base template to use the data from our new `site.json` file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ site.title }}</title>
  </head>
  <body>
    <header>
      {% include "nav.njk" %}
    </header>

    {{ content | safe }}
  </body>
</html>
```

You can see we are now using `{{ site.title }}` to render the site title from the JSON object stored in `_data/site.json`.

What you decide to store in this file is very much up to you, but consider things like site language, url, repository, navigation items and social links as a few possible ideas.

Now we have our basic site up and running let’s take a look at a building an assets pipeline with NPM Scripts so we can work with Sass and automate some parts of our workflow.

## NPM Scripts

NPM Scripts provide a simple way to write commands that will run functions from NPM packages. By installing certain packages and writing a script, we can automate certain tasks such as watching for changes to our code or compiling Sass styles to regular CSS.

Unlike other build tools such as Gulp or Grunt, which require a dedicated file and their own dependencies, NPM Scripts work natively with NPM and run directly from the scripts object within a `package.json` file.

Further down the line we can use NPM scripts to perform other tasks such as minifying JavaScript and automating an assets pipeline, but let’s not get ahead of ourselves just yet.

### Compiling Sass to CSS

Let’s start by installing the [node-sass](https://github.com/sass/node-sass) dependency which will compile any `.scss` file to regular CSS.

```
npm install node-sass --save-dev
```

We include the `--save-dev` flag with our command to list our new package under **devDependencies** in _package.json_.

```javascript
  "devDependencies": {
    "@11ty/eleventy": "^0.8.3",
    "node-sass": "^4.13.0",
  }
```

Now the package is installed we need to write a script to compile our Sass to CSS. We do this in the _scripts_ object inside our _package.json_ file.

```javascript
"scripts": {
  "scss": "node-sass --output-style compressed -o src/site/_includes/css src/scss"
  }
```

So what’s going on here?

First we give our script a name, in this case _scss_. We’ll use the name when we write the command in the terminal, for example `npm run scss`.

Next we specify the package that our script will use, in this case that’s `node-sass` (the one we just installed). Then we set some parameters, using the `--` flag notation. First we tell _node-sass_ that we want the output style compressed`, as we want our final CSS file size as small as possible.

Next we add the output directory, `src/site/_includes/css`. This is where _node-sass_ will auto-generate our CSS. Finally we specify the source directory. This is where our Sass will live and where we will spend our time writing our styles.

At this point, running the command won’t do much. To change that we’ll need write some Sass, so that _node-sass_ has something to compile and compress.

So let’s make a new directory for our Sass and add a source file so we can write some styles.

```
mkdir src/scss && touch src/scss/main.scss
```

Inside _main.scss_ add some basic styles so we have something to compile:

```css
body {
  color: #333;
  font-family: sans-serif;
}

a {
  color: tomato;
}
```

Now run:

```
npm run scss
```

You should now see a file called _main.css_ at `src/site/_includes/css`, which contains your minified styles.

It’s worth pointing out that we’re using the source includes folder as the destination for our compiled CSS so we can make use of Eleventy’s built-in features.

Remember, we set `includes: "_includes"` inside our config file, so Eleventy will watch this folder for changes and process any files it finds inside, before it live reloads the page.

By doing this we avoid the need to install further NPM packages such as [Browsersync](https://www.browsersync.io/) and keep our dependencies to a minimum.

### Watching for changes

Although Eleventy will watch for changes to our CSS, we still need a way to watch for changes to our SCSS, so we don’t have to run our _scss_ script every single time we add styles or make a change.

Essentially, we want to do two things. First, watch our `src/scss` folder for changes, then run our _scss_ script when those changes occur.

Let’s start by installing [onchange](https://www.npmjs.com/package/onchange), a helpful package that will watch file sets and run a command when anything is added, changed or deleted.

From the project root run:

```
npm install onchange --save-dev
```

You should now see something like `"onchange": "^6.1.0"` listed in the **devDependencies** object inside _package.json_.

```javascript
  "devDependencies": {
    "@11ty/eleventy": "^0.8.3",
    "node-sass": "^4.13.0",
    "onchange": "^6.1.0"
  }
```

Now we need to write a script to watch for our Sass changes and run our _scss_ script:

```
"watch:css": "onchange 'src/scss' -- npm run scss",
```

We can now run the following command in the terminal:

```
npm run watch:css
```

By doing so, _onchange_ will watch our `src/scss` directory for changes, then run our _scss_ script any time we make a change to a SCSS file. This will then compiling our Sass to CSS.

This is great and exactly what we want. But now we have a new problem. We want to run the server at the same time, so we can reload the page and see those changes as and when they happen in real-time, without having to manually reload the browser.

### Running scripts in parallel

If you remember, we can run the server with the command `npx @11ty/eleventy --serve` or `eleventy --serve`. Let’s first create a script to make this easier.

Inside the scripts object in _package.json_ create a new script called _serve_ which runs the command.

```javascript
"scripts": {
    "scss": "node-sass --output-style compressed -o src/site/_includes/css src/scss",
    "watch:css": "onchange 'src/scss' -- npm run scss",
    "serve": "eleventy --serve",
  },
```

Now we have two scripts that we want to run at the same time, _serve_ to run the server and _watch:css_ to compile our Sass to CSS. Doing this will allow us to see changes we make to our Sass appear in real-time in the browser.

To do this we can install one more script called [npm-run-all](https://www.npmjs.com/package/npm-run-all) which will allow us to run two scripts in parallel.

```
npm install npm-run-all --save-dev
```

Inside your `package.json` file you should now see _npm-run-all_ listed under the _devDependecies_:

```javascript
  "devDependencies": {
    "@11ty/eleventy": "^0.8.3",
    "node-sass": "^4.13.0",
    "npm-run-all": "^4.1.5",
    "onchange": "^6.1.0"
  }
```

Next, create another script and call it _start_. We’ll run this script whenever we start development. The _npm-run-all_ package has an option called `run-p` which stands for ‘run-parallel‘. We can use it to run both scripts at the same time.

```javascript
"scripts": {
    "scss": "node-sass --output-style compressed -o src/site/_includes/css src/scss",
    "watch:css": "onchange 'src/scss' -- npm run scss",
    "serve": "eleventy --serve",
    "start": "run-p serve watch:css"
  },
```

Now when we run `npm start` everything is working as intended. Our site is served locally in the browser and Eleventy will live reload the page anytime we make changes to our Sass.

We’re almost there.

## Clean and build

Now we need a way to build a fresh production version of the site ready to publish on the web. To do this, first we want to remove the existing contents of `_site`, so that nothing is unintentionally carried over from a previous build.

Let’s write a _clean_ script and use the [rm](https://www.ibm.com/support/knowledgecenter/en/ssw_aix_72/r_commands/rm.html) command, which removes the entries for the specified file parameter from a directory.

```
"clean": "rm -rf _site/*",
```

Notice we’re using the `-rf` flag, where `r` permits recursive removal of directories and `f` prevents a prompt before removing a write-protected file. Next we specify the folder name, `_site/` and use the global operator, `*`, to target all files.

Now we have our _clean_ script which removed the contents of our `_site` folder, the final thing left to do is create a _build_ script which runs our _clean_ script, then builds our production ready site.

```
"build": "npm run clean && eleventy"
```

Our scripts object now looks like this:

```javascript
"scripts": {
    "scss": "node-sass --output-style compressed -o src/site/_includes/css src/scss",
    "watch:css": "onchange 'src/scss' -- npm run scss",
    "serve": "eleventy --serve",
    "start": "run-p serve watch:css",
    "clean": "rm -rf _site/*",
    "build": "npm run clean && eleventy"
  },
```

Now we have six scripts, however in most cases we’ll only ever need to run our _start_ and _build_ script, as these act as the entry point to the others.

We can now use the command `npm run build` anytime we want to build a fresh copy of the site to the `_site` folder.

## Adding the finishing touches

Before we finish we still need to do a couple of things. If you haven’t already done so, you will want to initiate Git, so you can keep track of changes in your project and push your work to Github.

```
git init
```

Next let’s add a `.gitignore` file at the project root. Inside the file add the following two lines:

```
node_modules
_site
```

The first line will prevent Git from tracking our _node modules_ directory. Our project only requires dev dependencies, which help us with the development stage of our our website, so we don’t want to accidentally upload them to the server when the time comes to upload our site.

Likewise we don’t want to upload our _\_site_ directory to Github as this will be created when we run our scripts or automated by a deployment tool such as Netlify. So the second line takes care of that.

Finally, let’s create a [README.md](https://github.com/harrycresswell/eleventy-starter/blob/master/README.md) file. This acts as helpful documentation, both for us – so we remember how to install and use our project – and for other developers who might want to [clone a copy from Github](https://github.com/harrycresswell/eleventy-starter) and build something with it.

## Conclusion

What we’ve built here is far from a complete website, but the concepts covered, such as templating, working with data, setting up collections and building a Sass pipeline should provide a good starting point to help you hit the ground running with Eleventy powered websites.

What I love most about Eleventy is it’s simplicity and lack of opinion. Structuring your project however you wish and not having to rely on a framework to do it is satisfying. While writing HTML, CSS and JavaScript, in conjunction with your preferred templating language feels like the way it should be.

With the addition of a few NPM Scripts we can maintain a minimal build process which relies on very few dependencies. As our project matures this should hopefully mean less time spent fixing broken dependencies and more time improving our website.

Until recently [Hugo](https://gohugo.io/) has been my go-to SSG of choice, primarily because it’s super fast and has zero dependencies, which makes it a solid choice. But writing JavaScript over Go is certainly appealing, and perhaps the more familiar language for many of us.

Web development has become increasingly complex over the years, but it doesn’t have to be. There are some great tools out there to help you [keep it simple](https://harrycresswell.com/articles/intentions-2020/#keep-it-simple) and Eleventy sure fits that bill.

## Further reading and credits

I wanted to add this last part to give credit where credit is due. Most of what I know about Eleventy I’ve learnt from the following resources.

- [Introducing Eleventy](https://www.zachleat.com/web/introducing-eleventy/) by Zach Letherman
- [Official Eleventy Docs](https://www.11ty.io/docs/) by Zach Letherman
- [What I like about Eleventy](https://daverupert.com/2019/08/what-i-like-about-eleventy/) from Dave Rupert
- [Creating a blog with Eleventy](https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/) from Jon Keeping
- [Turn Jekyll up to Eleventy](https://24ways.org/2018/turn-jekyll-up-to-eleventy/) from Paul Lloyd

I also found Brian Robinson’s video series [Building a Static Site with Eleventy](https://www.youtube.com/watch?v=p7TkCS01lI8&t=1358s) helpful, and generally just poking around in a ton of Git repos to see how things are done.

There’s a great list of [sites using Eleventy](https://www.11ty.io/docs/sites/) in the docs. Some include links to their source code, so make sure you check a few out.

My understanding of NPM Scripts and the script workflow I used was heavily inspired by two fantastic articles:

- [A modern front-end workflow](https://css-irl.info/a-modern-front-end-workflow-part-1/) by Michelle Barker
- [Why NPM Scripts](https://css-tricks.com/why-npm-scripts/) by Damon Bauer

_I’ve done my best to crosscheck everything in this article, but if you spot any mistakes or have any issues [please let me know](mailto:studio@harrycresswell.com) and I will endeavor to make the necessary changes or help you out where I can._
