---
title: "Page, Site and Params"
date: 2022-07-26T10:29:42+01:00
draft: false
description: "Methods and parameters play a major role in storing, accessing and returning data in Hugo projects. So understanding how they work is critical."
slug: "page-site-params"
topics: ["Hugo"]
syndicate: "false"
---


Methods and parameters play a key role in storing, accessing and returning data in Hugo projects. So understanding how they work is critical.

Page and Site are two categories of methods you’ll find yourself using in every project. Both exist for different reasons and give you access to different types of data.

This post looks at the difference between the two, including how Params fit into the equation, and the nuances to look out for when working with each.


## Page methods

Page methods give you access to the Page object, which gathers all the data associated with content files into a single object.

Most often that means any data found in the front matter of a content file. But it can also mean data derived from the content’s file location, or data extracted from the content body, itself.

Consider the following *content/_index.md* file, for example. This file is reserved explictly for homepage content.

```markdown
---
title: My new Hugo website
date: 2022-06-22T12:39:30+01:00
---

Some home page content
```

Notice the file consists of both front matter (the structured data at the top), and body content, otherwise known as markdown.

To render this content you might have a *layouts/index.html* template, that looks something like this.

```go
{{ define "main" }}
<article>
  <header>
    <h1>{{ .Title }}</h1>
    <time>{{ .Date }}</time>
  </header>
  {{ .Content }}
</article>
{{ end }}
```

Here you’ll find three Page Methods; `.Title`, `.Date` and `.Content`. Notice all of these Methods are prefixed with a dot.

Before we go any further, it’s important to understand what that dot is doing and why it’s there.

In Hugo, the dot holds the current context. Context or *scope*, as it’s often referred to, is the object of data available to you at certain points in your templates. Hugo stores this object of data in the dot, so it’s easy for you to get hold of. 

By default, the context of all layout templates is set to Page. Meaning, by default, the data you can access within your layout templates is Page data. Or, put simply, the data associated with the files in your content folder. 

So, to access this data, we use the dot, followed by the Page method that stores the data we want to return.

Returning to the example above, the first Page method we encounter is `.Title`, which returns the title found in the front matter of the *content/_index.md* file.

```html
<h1>My new Hugo website</h1>
```

`.Date` is the next Page method, which returns the publish date of a piece of content. Notice that the *date* is also set in the front matter of the content file, just like the title.

`.Content` does something similar to these two methods. But rather than pull the data from the front matter, it returns the markdown from the body of the file. In other words, anything found in the page, that falls outside of the front matter. 

Using the example from earlier again, `.Content` returns the following:

```html
<p>Some homepage content</p>
```

In all of the scenarios above, we’re working with Page data, which is accessible using Page methods.

### Page Methods are pre-defined

It’s important to note that `.Title`, `.Date` and `.Content` are all pre-defined Page methods. In other words, these methods are built-in to Hugo. They serve a specific purpose and return specific data. 

You will notice pre-defined Page methods are written in camel case and all start with an uppercase letter.

```
.Title // correct
.title // incorrect
.Content // correct
.content // incorrect
.RegularPages // correct
.regularpages // incorrect
```

There are many more pre-defined [Page Methods](https://gohugo.io/methods/page/) we can use to access data from content files. Let’s look at a few more examples.

#### Access certain Pages with `.Pages`

`.Pages` is used to access data from content files, based on their location. In other words, files in certain folders, and the data they contain.

As per the Hugo docs, `.Pages` returns: 

>  [a] collection of *regular* pages and *only first-level* section pages under the current *list* page.

To make sense of this, consider the current structure of the content folder on my personal website:

```
content/
  learn-hugo/
    index.md
  newsletter/
    _index.md
    01.md
    02.md
    [...]
  page/
    uses.md
    now.md
    contact.md
    [...]
  updates/
    _index.md
    21-12-06-sharing-more.md
    [...]
  writing/
    _index.md
    5-question-problem-solving-strategy.md
    [...]
```

Let’s say I want to display a list of these sections on my homepage. I do this from my *layouts/index.html* template, where I pass `.Pages` into the [Range](https://gohugo.io/functions/range/#prose) function to loop through the data:

```go
<ul>
  {{ range .Pages }}
    <li>{{ .Title }}</li>
  {{ end }}
</ul>
```

When I run `hugo server`, I find a list of only the first-level section pages on my homepage. But only the first-level pages, none of the pages inside these section.

```html
- Learn Hugo
- Updates
- Page
- Newsletter
- Writing
```

At this point, I might use the `.Permalink` Page Method to return the path to a content file and create an anchor link.

```go
{{ range .Pages }}
  <h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
{{ end }}
```

Like `.Title`, `.Permalink` is another pre-defined Method. But, this time the data doesn’t need to be defined in the page front matter, as it’s formed using the name of the content file. 

For example, `my-latest-post.md` becomes:

```
<h2><a href="my-latest-post">My latest post</a></h2>
```

With the Range over `.Pages` included, here’s what my *layouts/index.html* file looks like:

```go
{{ define "main" }}
<article>
  <header>
    <h1>{{ .Title }}</h1>
    <time>{{ .Date }}</time>
  </header>
  {{ .Content }}
  <ul>
  {{ range .Pages }}
    <li>
      <h2>
        <a href="{{ .Permalink }}">{{ .Title }}</a>
      </h2>
    </li>
  {{ end }}
  </ul>
</article>
{{ end }}
```

Notice I’m using the `.Title` method twice in my *index.html* template. The one found in the `<header>` returns the value of *title*, found in my *content/_index.md* file. However, the one found inside the Range logic returns the title of each Page in the `.Pages` object.

So, why is that?

The simple answer is that Range changes the context (the data available to you) to whatever you pass into the function. 

In this case, we passed in `.Pages`, so `.Title` returns the title of each Page in the Pages object.

It’s important to remember this when working with Page methods. The data you can access depends on where you happen to be in your templates, and what logic you happen to write.

The With function is another example of a function that changes the context. But, we’ll leave that for another day, and instead, look at the Page Method you can use to access custom data.


### Using the Params Method to access custom Page data

There are times when you’ll want to add custom data to a page. You can do this by defining your own front matter in your content files.

These are known as Page-level Parameters and to access this custom data you use a Page method called `.Params`, which returns a map of these custom parameters.  Let’s take a look at an example.

Here I’ve added my Twitter handle to the front matter of my *content/_index.md* file. The data consists of a key-value pair, just like *title* and *date*.

```markdown
---
title: My new Hugo website
date: Add a date
twitter: https://twitter.com/harrycresswell
---

Some homepage content
```

I’d like to return the value (the absolute URL to my Twitter profile) on my homepage, in the form of a link.

To do this, I’ll return to my *layouts/index.html* template. Here I append my custom key (twitter, in this case) to the `.Params` Method.

```html
{{ define "main" }}
  <article>
    <header>
        <h1>{{ .Title }}</h1>
    </header>
    {{ .Content }}
    <footer>
    	<a href="{{ .Params.twitter }}">Twitter</a>
    </footer>
  </article>
{{ end }}
```

Notice `.twitter` is written all in lowercase. It’s important to note that whereas Page methods are written using uppercase (e.g .Params), a custom parameter itself must always be written in lowercase.

In the generated website, Hugo renders the URL value in the `href=""` attribute of the anchor element, as expected.

```html
<footer>
  <a href="https://twitter.com/harrycresswell">Twitter</a>
</footer>
```

It’s worth noting that custom parameters can also be nested.

```
---
title: My new Hugo website
date: Add a date
social:
  twitter: https://twitter.com/harrycresswell
  github: https://github.com/harrycresswell
  polywork: https://www.polywork.com/harrycresswell
---

Some homepage content
```

Nested parameters are accessed by concatenating the field names together:

```html
<footer>
  <a href="{{ .Params.social.twitter }}">Twitter</a>
  <a href="{{ .Params.social.github }}">Github</a>
  <a href="{{ .Params.social.polywork }}">Polywork</a>
</footer>
```

Now you have a good grasp of Page methods and custom parameters. Let’s turn to Site Methods, so we can understand the differences.

## Site Methods

Site Methods give you access to global data that applies to your entire website. Global data is typically defined in the *config.toml* or *hugo.toml* file, but not always. Like Page Methods, there are various Site Methods which have been built-in to Hugo’s core, for convenience.   

Hugo provides `.Site` to give you access to this global object of data from a Page context. In other words, from inside your layout templates. So, [.Site is a Page Method](https://gohugo.io/methods/page/site/), in fact, that you use to get hold of Site Methods. Kinda confusing, right? 

The most important thing to remember is that *`.Site` exposes your global Methods to the Page context*.

To get a better understanding of `.Site`, let’s consider an example. 

Below you’ll find my *layouts/index.html* template, again. 

```html
{{ define "main" }}
  <article>
    <header>
        <h1>{{ .Site.Title }}</h1>
    </header>
    {{ .Content }}
  </article>
{{ end }}
```

Notice I’ve updated the `<h1>` element, from `.Title` to `.Site.Title`. 

Now, my *index.html* template no longer returns the title from my *_index.md* file. But instead returns the title from the *config.toml* file, where site settings are stored.

`.Site.Title` is a pre-defined site method, meaning it’s built-in to Hugo and serves a specific purpose: to return the title of your website, as defined in your configuration file.

### Site Methods are pre-defined

Just like with Page Methods, there are many more pre-defined [Site Methods](https://gohugo.io/methods/site/) you can use.

`.Site.baseURL`, for example, is returns the root URL of your website, as defined in the site configuration. You’ll find yourself using it to built absolute paths in your templates.

Consider the following code found in the `<head>` of my personal site.

```html
<link rel="apple-touch-icon" href="https://harrycresswell.com/img/apple-touch-icon.png" sizes="180x180">
<link rel="icon" href="https://harrycresswell.com/img/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="https://harrycresswell.com/img/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="shortcut icon" href="https://harrycresswell.com/img/favicon.ico" type="image/x-icon">
```

Notice each `<link>` tag contains the root URL https://harrycresswell.com/. Similar code appears on most websites. But, as you’d expect, this root URL changes for each site.

Updating this URL in many different places is inefficient. Ideally, you want to make it as easy to reuse as possible. 

To achieve this, it makes sense to store the URL in a variable and manage it from one place – the config file. 

```toml
baseURL = "https://harrycresswell.com/"
```

With the baseURL stored in the config file, you can access the value in your templates using the `.Site.BaseURL` variable. Now you have a reusable piece of code, that you don’t need to update on each site.

```html
<link rel="apple-touch-icon" href="{{ .Site.BaseURL }}img/apple-touch-icon.png" sizes="180x180">
<link rel="icon" href="{{ .Site.BaseURL }}img/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="{{ .Site.BaseURL }}img/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="shortcut icon" href="{{ .Site.BaseURL }}img/favicon.ico" type="image/x-icon">

```

It’s worth remembering there will be many more places in your templates where you will require your `baseURL`. And it might well change when you launch your site.  So storing it in the config file, will make working with it trivial.

#### Grab menus from the config file with `.Site.Menus`

`.Site.Menus` is another pre-defined Site Method. It’s used to return the menus you define in your config file. As menus usually apply to an entire website, it makes sense to store this data with the rest of your site configuration.

Consider the **main** menu I’ve defined in [my *config.toml*](https://github.com/harrycresswell/harry/blob/master/config.toml), as an example.

```toml
[menu]
[[menu.main]]
  name = "Index"
  url = "/"
  weight = 5
[[menu.main]]
  name = "Writing"
  url = "/writing/"
  weight = 10
[[menu.main]]
  name = "Newsletter"
  url = "/newsletter/"
  weight = 15
[[menu.main]]
  name = "Topics"
  url = "/topics/"
  weight = 20

```

In my templates, I can loop through the data by passing `.Site.Menus` into the Range function.  

```go
 <nav aria-label="Main Navigation">
  <ul>
  {{ $currentPage := . }}
  {{ range .Site.Menus.main }}
    <li>
      <a href="{{ .URL }}">{{ .Name }}</a>
    </li>
  {{ end }}
  </ul>
</nav>
```

Now, to access my **main** menu data, all I need to do is append the name of the menu to the Method.

```
.Site.Menus.main
```

Notice the parameter “main” is written in lowercase. That’s because it’s user-defined. In other words, a custom definition, defined by me and not a Method in and of itself.

Within the Range function, the context changes to main menu data and I now have access the `.Name` and `.URL` of each menu item. 

{{< message >}}
On a side note; I’ve written in detail about <a href="/writing/menus-in-hugo/">Menus in Hugo</a>.
{{</ message >}}

#### Access all pages with `.Site.Pages`

Site doesn’t only expose settings defined in the *config.toml* file. It also gives you access to an array, or collection of certain content.

`.Site.Pages`, for example, returns a collection of **all** pages found in a site: *regular* pages, sections, taxonomies, etc.

Pass it into the Range function, the same as you do with `.Pages`.

```html
{{ range .Site.Pages }}
  <h2>{{ .Title }}</h2>
{{ end }}
```

But, unlike `.Pages`, which can only be used in list templates (including the homepage) where the context is Page. You can access `.Site.Pages` from any context in your templates – a *single.html* templates or partial file, for example. This is because `.Site` exposes  the global context.

#### Access all taxonomies with `.Site.Taxonomies` 

`.Site.Taxonomies` is another Site Method that exposes global data. But this time, an object of taxonomies (categories, tags and so on), found across your entire website.

This object of taxonomies depends on what data you define in the front matter of each page. Let’s take a look at an example.

Below you will find the front matter from a recent article I wrote about De-Googling. 

```
---
title: "De-Googling"
date: 2022-05-13T16:00:14+01:00
description: "I’m doing what I can to minimise my dependence on Google services."
slug: "de-googling"
topics: ["Privacy", "Tools"]
---
```

And, here’s another about working with data in Hugo.

```
---
title: "Working with Data in Hugo"
date: 2018-07-18T14:35:58+02:00
description: "Learn how to utilise Data in Hugo to keep your code clean and your projects well organised."
slug: "data-hugo"
topics: ["Hugo"]
---
```

In both cases you’ll find a *topics* key, with an array of values. Like any taxonomy, this attempts to organise the content into associated groups.

Hugo natively supports two taxonomy types, *categories* and *tags*. However, in this case, *topics* is a custom taxonomy. For Hugo to recognise this custom taxonomy, I will need to tell Hugo about it by defining it in my *config.toml* file.

```toml
[taxonomies]
  topic = "topics"
```

To create a list of all the topics found across my website, I’ve made a *layouts/taxonomy/list.html* template.

```html
{{ range .Site.Taxonomies.topics }}
  <h2>{{ .Page.Title }}</h2>
{{ end }}
```

To loop through the data, I pass the method into a Range function and append the *topics* key to the end. To return the title of each topic I use `.Page.Title`, rather than `.Title` alone.

Taking this further is perhaps outside the scope of this article, however it’s worth looking at my [topic single page template](https://github.com/harrycresswell/harry/blob/master/themes/hc-starter/layouts/taxonomy/topic.html), if you want to create a page for each topic and list the content pages within the taxonomy.

#### Access Data files with `.Site.Data`

As we’ve seen in the previous two examples, not all `.Site` Methods expose data from the config file. Some Site Methods are used to access data from elsewhere. 

One such method is `.Site.Data`, which is used to fetch data from the data folder. The data folder is a place to store data files that contain data associated with your website, which don’t necessarily require a dedicated page.

The *data/settings/signup.yaml* file I use on my personal website is a good example of this. 

```
assets/
content/
data/
settings/
  signup.yaml
themes/
  config.toml
...
```

This file contains the text content and list URL associated with the newsletter sign up form, found in the footer of my site.

```yaml
---
title: Monthly Newsletter
desc: Once a month I curate a newletter for designers and developers interested in static sites, CSS and web performance. Check out [past issues](/newsletter) to get an idea.
list_url: https://harrycresswell.us14.list-manage.com/subscribe/post?u=4e8fba8d0ab4a857159c0104e&amp;id=d6ad2b65ca
```

In theory, I might have hardcoded this data directly into my *newsletter.html* partial template. But it’s much easier to manage this content, if the data is written in YAML and abstracted away from the template, to it’s own dedicated file.

To access this data from my templates, I can use the `.Site.Data` method, then concatenate the folder name, followed by file name, and finally the title field.

```go
{{ .Site.Data.settings.signup.title | markdownify }}
```

Notice how this approach follows a similar pattern to working with nested Page-level Params. Where all the parameter keys are written in lowercase, as, like Page parameters, they are custom data.

### Using the Params Method to access custom Site data

Just as you can create custom Page-level parameters, you can do the same on a Site-wide level, by defining custom parameters in your *config.toml* or *hugo.toml* file. 

These are often referred to as Site Params, and are handy for storing anything that applies to your entire website. Default SEO meta data is a good example.

Consider my `config.toml` file. 

```toml
baseURL = "https://harrycresswell.com/"
title = "Harry Cresswell"
[params]
  description = "Harry Cresswell is a professional designer and front-end web developer from London, England."
  strapline = "Design and front-end web development"
  location = "London, UK"
  card_image = "img/card-image.png"
```

Notice these custom Site parameters are stored under the `[params]` keyword, whereas pre-defined Site parameters, such as `baseURL`, sit at the top level. 

For the sake of clarity, when working with TOML data I prefer to indent any params I add. However, it’s not necessary and won’t effect the structure of your data. 

To access Site parameters, Hugo provides the [`.Site.Params` Method](https://gohugo.io/variables/site/#the-siteparams-variable).

Consider the *layouts/partials/head.html* template below.

```html go
<head>
  <title>
    {{ .Site.Title }} – {{ .Site.Params.strapline }}
  </title>
  <meta name="description" content="{{ .Site.Params.description }}">
</head>
```

Just like with Page-level Params, append the custom parameter (written in all lowercase) to the `.Site.Params` Method, to access a specfic value.

### Accessing global data from anywhere 

There are times when you want to access global data, but, by default, you can’t. An example of this is from partial files, which have no context, by default.

In this case, you have two options. 

#### Passing the context and using the .Site Method

You can either pass the Page context into the partial using the dot.

```go
{{ partial "footer.html" . }}
```

Remember: **current context is stored in the dot**. And, the default context of templates is set to Page. So the dot passes Page context into the partial, giving you access to Page data. 

Now, you can use `.Site`  inside the partial to access Site variables. As mentioned, the reason for this that `.Site` is, in fact, a Page Method. And, so exposes a sites global data to the Page context. 

But there’s also another way to access global data, from anywhere.

#### Using the global `site` function

The  global [site function](https://gohugo.io/functions/global/site/) gives you access to your sites global data stored in the `config.toml` file, when the `Page` object isn’t available.

To give you a similfied example of how this works, let’s say I include a partial inside one of my template, but this time without passing the Page context to it (notice the dot is left out).

```go
{{ partial "footer.html" }}
```

By using the  `site` function instead of `.Site`, I can still access global data inside my `layouts/partials/footer.html` file. 

Here I’m returing the title stored in my config.toml file:

```go
<h2>{{ site.Title }}</h2>
```

Notice the lack of a dot before site and a lowercase “s” in the word site.

If I tried to use the `.Site` variable instead, my title wouldn’t rended.

```go
{{ .Site.Title }}
```

This is because `.Site` is a Page Method, which gives us access to Site Methods. But, in this case, I haven’t passed the Page context to the partial, so the variable isn’t available.

## Combining .Site and .Page

Remember my newsletter sign up form, from earlier? Recently I decided I wanted to be able to change the content in this form on a Page by Page basis. 

Consider, my now depreciated [Learn Hugo](https://harrycresswell.com/learn-hugo/) page, where the title says “Sign up for Hugo course”. On every other page you will find “Monthly newsletter”, instead.

To acheive this, I added key-value pairs to the front matter of my *learn-hugo/index.md* file. That way I could override the initial values found in *data/settings/signup.yaml*:

```yaml
---
title: "Learn Hugo"
date: 2021-12-06T11:37:59Z
draft: false
description: ""
slug: "learn-hugo"
layout: "page"
signup_title: "Sign up for Hugo course"
signup_desc: "If you’d like to be the first to receive content for my Hugo course by email, as it’s published, then please leave your details below."
signup_button_text: "Learn Hugo"
signup_group: "hugo"
---
```

Inside my *newsletter.html* partial, I wrote some simple logic using the With function, which returns the Page-level data, should it exist.

```html
<h2>
  {{ with .Params.signup_title | markdownify }}
    {{ . }}
  {{ else }}
    {{ .Site.Data.settings.signup.title | markdownify }}
  {{ end }}
</h2>
```

In cases where these Page-level params don’t exit (which is most cases), Hugo will be return data from *data/settings/signup.yaml*. But, for Pages where these Params do exist, Hugo will render this data from the content file.

It’s worth noting, you can achieve the exact same results with a more structured front matter. To stay orgainsed, this might, in fact, be the better approach.

```yaml
---
title: "Learn Hugo"
date: 2021-12-06T11:37:59Z
draft: false
description: ""
slug: "learn-hugo"
layout: "page"
settings:
  signup:
    title: "Sign up for Hugo course"
    desc: "If you’d like to be the first to receive content for my Hugo course by email, as it’s published, then please leave your details below."
    button_text: "Learn Hugo"
    group: "hugo"
---
```

Notice, the data structure now reflects the format of the data found in the data/settings/signup.yaml file. Meaning, you can return the data by concatenating the Method and the parameters in the exact same way.

```go
<h2>
  {{ with .Params.settings.signup.title | markdownify }}
    {{ . }}
  {{ else }}
    {{ .Site.Data.settings.signup.title | markdownify }}
  {{ end }}
</h2>
```

Let’s look at one final example. 

Here I’m returning to the `head.html` partial, from earlier. 

```html go
<head>
  <title>
    {{ .Site.Title }} | {{ .Site.Params.strapline }}
  </title>
  <meta name="description" content="{{ .Site.Params.description }}">
</head>
```

This works great for the homepage. But, to improve SEO, you’d most likely want to change both the *title* and the *description* on a page-by-page basis.

With some simple logic, you can look for a Page-level description, should it exist. Then fallback to your global site description Param, if not.

```html go
<head>
  <title>
    {{ if .IsHome -}}
      {{ .Site.Title }} | {{ .Site.Params.strapline }}
    {{- else -}}
      {{ .Title }} | {{ .Site.Title }}
    {{- end }}
  </title>
  <meta 
    name="description" 
    content="
    {{ with .Params.description }}
      {{ . }}
    {{ else }}
      {{ .Site.Params.description }}
    {{ end }}
  ">
</head>
```

Now for the *title*. If the current page is the homepage, we’ll show the `.Site.Title` from the *config.toml*. And, if not, we’ll return the Page-level title, followed by the Site title.

Now my Homepage will display this:

```html
<head>
  <title>Harry Cresswell | Design and front end web development</title>
  <meta name="description" content="Harry Cresswell is a professional designer and front-end web developer from London, England.">
</head>
```

Whereas a post page display something like this:

```html
<head>
  <title>Masking email | Harry Cresswell</title>
  <meta name="description" content="How to protect your privacy, fight spam and reclaim control of your email address.">
</head>
```

I’ve shown you these examples to help illustrate how Page Methods, Site Methods and in both cases Params, are often used together. But there are no hard and fast rules here. How you combine Site and Page Methods depends on what you are trying to build and what data you want to access.

## Wrapping up

[Page Methods](https://gohugo.io/variables/page/) give you access to page data that Hugo stores in the Page object. That means any data associated with your content files, which are used to build the pages of your website.

[Site Methods](https://gohugo.io/methods/site/) give you access global data that Hugo stores in Site objects. This often means data defined in your site configuration, but it can also mean data defined as custom data stored in Data files. Site Methods are nuanced because they are also used to access global objects of data, such as all pages and all taxonomies.

Most Page and Site Methods are used for returning pre-determinded types of data. However the `.Page.Params` and `.Site.Params` Methods can be used for returning custom data.

The former will give you access to custom data that you have defined in the front matter of content files. Whereas the latter will give you access to custom data stored in your configuration file. Both Methods are very useful when you have specific needs that Hugo doesn’t cater for, out of the box.