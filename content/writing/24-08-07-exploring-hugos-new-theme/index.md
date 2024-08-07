---
title: "Exploring Hugo’s new starter theme and updates to the `new site` command"
date: 2024-08-07T11:29:57+01:00
draft: false
slug: "exploring-hugos-new-theme"
topics: ["Hugo"]
description: "Get your head around the features you’ll find in the new starter theme."
---

As part of the Hugo v0.118.0 release, the Hugo team made some improvements to both the `hugo new site` and `hugo new theme` commands.

The big change, as [Joe has pointed out](https://discourse.gohugo.io/t/creating-new-site-and-theme-skeletons-with-v0-118-0-and-later/46018), is that `hugo new theme` command now creates a functional theme with sample content. The new theme demonstrates some of the typical features of Hugo, so it’s a great way to learn how Hugo works and a helpful starting point for theme development.

In this post I run through these improvements and explain some of the more advanced features that you’ll find in the new starter theme. But, before we get to that, first let’s take a brief look at the updates to the `hugo new site` command.


## Running the `hugo new site` command

Running `hugo new site [site-name]` from the command line will set up a new site, as expected, but with a handful of notable improvements.

Firstly, the documentation returned to the terminal has been improved with clearer steps and more emphasis on creating a new theme. 

```
Congratulations! Your new Hugo site was created in /Users/harrycresswell/code/hugo/hugo-new.

Just a few more steps...

1. Change the current directory to /Users/harrycresswell/code/hugo/hugo-new.
2. Create or install a theme:
   - Create a new theme with the command "hugo new theme <THEMENAME>"
   - Or, install a theme from https://themes.gohugo.io/
3. Edit hugo.toml, setting the "theme" property to the theme name.
4. Create new content with the command "hugo new content <SECTIONNAME>/<FILENAME>.<FORMAT>".
5. Start the embedded web server with the command "hugo server --buildDrafts".

See documentation at https://gohugo.io/.
```

Open the site skeleton that Hugo generates and you’ll notice the directory structure is similar to before. All the project files and folders you’ll be familiar with remain, however there are two updates.

```
- archetypes
  - default.md
- assets
- content
- data
- i18n
- layouts
- static
- themes
- hugo.toml
```

Hugo now includes the `/i18n` folder, which is used to store [translation tables](https://gohugo.io/functions/lang/translate/#translation-tables). You’ll only find a need to use this folder when working with [multilingual mode](https://gohugo.io/content-management/multilingual/), for sites that offer more than one language.

In case you were wondering, **i18n** is a [numeronym](https://en.wikipedia.org/wiki/Numeronym) which stands for [internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization).

The `archetypes/default.md` file has also changed slightly. The value for the front matter *title* is now generated using `.File.ContentBaseName` instead of `.Name`, which was used previously.

```
+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
draft = true
+++
```

Reading the docs, it seems [ContentBaseName](https://gohugo.io/methods/page/file/#contentbasename) will generated the title of the content from the name of the containing directory. That is, if the page is a [branch bundle](https://gohugo.io/content-management/page-bundles/#branch-bundles) (/some-directory/\_index.md) or a [leaf bundle](https://gohugo.io/content-management/page-bundles/#leaf-bundles) (/some-directory/index.md). See [page bundles](https://gohugo.io/content-management/page-bundles/) for more. If the page is neither, the title will be generated using [TranslationBaseName](https://gohugo.io/methods/page/file/#translationbasename), which takes the file name, excluding the extension and language identifier.

The rest of the files and folders either remain empty or as they were before the v0.118.0 release.

With the updates to `hugo new site` covered, let’s now take a look at the `hugo new theme` command.

## Running the `hugo new theme` command pre Hugo v0.118.0 upgrade

Until Hugo v0.118.0, running `hugo new theme [theme-name]` from the command line would set up a new theme directory inside `/themes`, consisting of a basic theme structure and mostly empty files.

```
my-site/
  - archetypes/
    - default.md
  - layouts/
    - _default/
      - baseof.html
      - list.html
      - single.html
    - partials/
      - footer.html
      - head.html
      - header.html
    404.html
    index.html
  - static/
    - css/
    - js/
  - LICENCE
  - theme.toml
```

There were, however, two files that weren’t empty. The `_default/baseof.html_` file, which demonstrated how to include partial templates and register a block. And the `theme.toml` file, which offered an example theme file configuration.

We won’t bother exploring these legacy files, instead let’s jump ahead to the improvements. 

## Running the `hugo new theme` command with Hugo v0.118.0 or later

Following an upgrade to Hugo v0.118.0 or later, running `hugo new theme [theme-name]` now sets up a fully functional theme with sample content.

Here’s the new theme directory structure:

```
my-theme/
  - archetypes/
    - default.md
  - assets/
    - css/
      - main.css
    - js/
      - main.js
  - content/
    - posts/
      - post-3/
        - bryce-canon.jpg
        - index.md
      _index.md
      post-1.md
      post-2.md
    _index.md
  - data/
  - i18n/
  - layouts/
    - _default/
      - baseof.html
      - home.html
      - list.html
      - single.html
    - partials/
      - head/
        - css.html
        - js.html
      - footer.html
      - head.html
      - header.html
      - menu.html
      - terms.html
  - static/
    - favicon.ico
  - hugo.toml
  - LICENCE
  - README.md
  - theme.toml
```

The two parts of the new theme I want to focus on most are content structure and layout templates, however before we get into that let’s quickly run through the directory structure, so we know what’s what. 

## Understanding the directory structure

The `/archetypes` folder, used for content templates, now contains a working *default.md* archetype template, instead of an empty *default.md* file, as before. This archetype template is no different from the template Hugo generates when running the `hugo new site` command and will generate the front matter for any file created using `hugo new content [name]`, however this one is obviously specific to the theme, whereas the one at the root of the project isn’t.

The `/assets` folder, which is used store files to be processed with Hugo Pipes, now contains two sub folders – *css* and *js*. The *css* folder contains a `main.css` file containing basic styles and the *js* folder a `main.js` file, which simply logs *“This site was generated by Hugo”* to the console.  We’ll get to how the theme consumes these files shortly.

The `/content`folder, which is used to store page content, contains a various content files and folders, which we’ll look at in detail later.

Both the `/data` folder – used to store files of structured data much like a conventional database – and the `i18n` folder – used to store translation tables for multilingual mode sites (as discussed earlier) – are empty, so we’ll skip over these. 

The `/layouts` folder contains a *_default* folder, which stores bunch of *default* layout templates. It also contains a *partials* folder, which stores partial layout templates. We’ll look at these templates in more detail shortly. 

The `/static` folder – used to store any static asset that don’t require processing by Hugo – contains a `favicon.ico` file, which creates a favicon visible in browser tabs, usually to the left of the site name.

`hugo.toml` contains the theme configuration, including the menu item which we’ll also look at later.

The `LICENSE` file contains the standard MIT License template.

The `README.md` file contains a few headings to help you get started writing a readme.

The `theme.toml` file contains information about the theme.

Ok, let’s tackle the content folder.


## Content structure and page bundles

Inside the `/content` folder we find an `_index.md` file at the root. This file supplies this content to the [homepage template](https://gohugo.io/templates/homepage/) found at `layouts/_default/home.html`. You’ll see from the [homepage lookup order](https://gohugo.io/templates/lookup-order/#home-page) that `home.html` is more specific than `index.html`, but otherwise the two templates are pretty much interchangeable. In other words, they do the same thing – render the homepage.

In the root of the `/content` folder you’ll find a [content section](https://gohugo.io/content-management/sections/) called *posts*. We know this is a content section primarily because it contains an `_index.md` file, which, in this case, is used to add content to a page on our site found at `/posts`. 

The `/posts` folder also contains two other files; `post-1.md` and `post-2.md`   and a folder called `/post-3`. This demonstrates that you can either store your post content as simple markdown files in the root of a content section, or instead create [page bundles](https://gohugo.io/content-management/page-bundles/), as we see with `post-3`. 

One advantage of using page bundles is that we can keep resources associated with a specific page alongside the markdown file used for the content of the page. An example of this is the `bryce-canyon.jpg` file, found inside the `post-3` folder. 
These [page resources](https://gohugo.io/content-management/page-resources/) can be accessed using the [Resources](https://gohugo.io/methods/page/resources/) method (not to be confused with [resources functions](https://gohugo.io/functions/resources/get/)) and can be processed in a variety of ways.

Together, the contents of the *posts* section form a [collection](https://gohugo.io/quick-reference/page-collections/) of posts. Collections are rendered as a list using [list templates](https://gohugo.io/templates/lists/).

Open `layouts/_default/list.html` and you’ll see this in action:

```html
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}
  {{ range .Pages }}
    <h2><a href="{{ .RelPermalink }}">{{ .LinkTitle }}</a></h2>
    {{ .Summary }}
  {{ end }}
{{ end }}
```
 
The default list template is used to list content found within content sections at a URL path that matches the name of the content section. The pages in the content sections are stored in the Page object, so that’s why we find [Pages](https://gohugo.io/methods/page/pages/) passed to the [Range function](https://gohugo.io/functions/go-template/range/), which loops through the object and returns a collection of regular pages within the current section.

As `posts` is the only content section inside the default theme content folder, by default the list template is only used to list out the content within this section. The result is a list of blog posts found at `/posts` in the browser. 


## Date localization

Opening `layouts/_default/single.html` you’ll find an example of date localization.

```
{{ $dateMachine := .Date | time.Format "2006-01-02T15:04:05-07:00" }}
{{ $dateHuman := .Date | time.Format ":date_long" }}
<time datetime="{{ $dateMachine }}">{{ $dateHuman }}</time>
```

Here we find a human readable date and a date specifically for crawlers. Both are generated using the [time.Format function](https://gohugo.io/functions/time/format/) which returns the date/time found in the front matter of markdown files as a formatted and localized string.

What this means is that should you decide to expand on the theme by adding [multilingual mode](https://gohugo.io/content-management/multilingual/), dates will render in the correct language, depending on what languages you set up in the site configuration. See the [Date localization](https://gohugo.io/content-management/multilingual/#dates) docs for more.


## Taxonomies

Inside the `terms.html` partial you’ll find the code used to render tags on single post pages.

```html
{{- /*
For a given taxonomy, renders a list of terms assigned to the page.

@context {page} page The current page.
@context {string} taxonomy The taxonomy.

@example: {{ partial "terms.html" (dict "taxonomy" "tags" "page" .) }}
*/}}

{{- $page := .page }}
{{- $taxonomy := .taxonomy }}

{{- with $page.GetTerms $taxonomy }}
  {{- $label := (index . 0).Parent.LinkTitle }}
  <div>
    <div>{{ $label }}:</div>
    <ul>
      {{- range . }}
        <li><a href="{{ .RelPermalink }}">{{ .LinkTitle }}</a></li>
      {{- end }}
    </ul>
  </div>
{{- end }}
```

Let’s break this down so we understand what’s happening here.

At the top of the partial file, right below where you see the commented code, two variables have been set up which store the values `.page` and `.taxonomy`. 

As you can see from the commented `@example` at the top of the `single.html`, the values of these two variables are being passed into the partial using the [Dictionary or “dict” function](https://gohugo.io/functions/collections/dictionary/), which creates a map of key-value pairs. In this case, the value of `.taxonomy` is `tags`, which is the name of the taxonomy found in the front matter of each _post_ markdown file. The value of `.page` is simply the dot (`.`), which holds the context of the page (the data available to it). Without these two variables we have no data to work with in the partial, so they are both very important.

Directly below where these two variables have been declared we find both variables used.

```
{{- with $page.GetTerms $taxonomy }}
	...
{{- end }}
```

Here, `$page` gives the [GetTerms](https://gohugo.io/methods/page/getterms/) method access to the page context. This step is important, as GetTerms is a page method, so it requires the page context in order to work. `$taxonomy` passes the `tags` data to the method, so it has data to work with.

If this were directly inside the `single.html` template (where the context is already set to Page by default) and not within a partial, then you could achieve the same results with the following:

```
{{- with .GetTerms "tags" }}
	...
{{- end }}
```

Ok. Now that `terms.html` has access to the page context and the `tags` data stored in the front matter of the posts, it can render some content.

Inside the `with` statement, where the context has now changed to `tags`, first we find the following:

```
{{- $label := (index . 0).Parent.LinkTitle }}
```

Here, a variable has been set up called `$label` which stores the key associated with the `tags` data. In other words, the word “Tags”.

To grab the key, first the [Index function](https://gohugo.io/functions/collections/indexfunction/) is used to get hold of the first value found in the tags data. Notice the dot (`.`) after the word *index*, this is important as it holds the tags data.

```
{{ index . 0 }} // Page(/tags/red)
```

 Remember, in programming, the first value in an array is 0 and not 1, so 0 is used. If you have a look at the front matter of each post you will find that, in each case, this value is “red”.  But “red” isn’t what we’re after here, the goal in fact is to render the key (“Tags”). 

With the [Parent page method](https://gohugo.io/methods/page/parent/), it’s possible to get the Page object of the parent section. In other words `tags` instead of `/tags/red`. 

```
{{ (index . 0).Parent }} // Page(/tags)
```

But this would return `Page(/tags)`, which isn’t formatted quite right. Instead we want “Tags” as plain text, in title case. This is where the [LinkTitle](https://gohugo.io/methods/page/linktitle/)  page method comes in.

```
{{ (index . 0).Parent.LinkTitle }} // Tags
```

Now all that’s left to do is call the variable to render the content, which we find here:

```
<div>{{ $label }}:</div> // Tags:
```

The final bit of logic in this partial should be fairly familiar.

```html
{{- range . }}
  <li><a href="{{ .RelPermalink }}">{{ .LinkTitle }}</a></li>
{{- end }}
```

Here, the Range function loops through the `tags` data and renders the relative permalink and the title. Simple stuff.

Now let’s turn our attention to scripts and styles.


## CSS and JavaScript inclusion

The theme skeleton includes both the CSS and JavaScript in the `<head>`. 

Opening the `baseof.html` template, we can see that the contents of the `<head>` is included as a partial.

```html
<head>
  {{ partial "head.html" . }}
</head>
```

If we open the `head.html` partial we can see that the CSS and JavaScript have also been included as partials, but this time as [cached partials](https://gohugo.io/templates/partials/#cached-partials).

```
{{ partialCached "head/css.html" . }}
{{ partialCached "head/js.html" . }}
```

This means Hugo will cache the result, which will significantly improve performance. It only makes sense to cache partials if they don’t need to be re-rendered.

If we open up `partials/head/css.html`, we find the following code used to render CSS.

```html
{{- with resources.Get "css/main.css" }}
  {{- if eq hugo.Environment "development" }}
    <link rel="stylesheet" href="{{ .RelPermalink }}">
  {{- else }}	
    {{- with . | minify | fingerprint }}	
      <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
    {{- end }}
  {{- end }}
{{- end }}
```

The [resources.Get](https://gohugo.io/functions/resources/get/) function returns a global resource from the given path, which in this case is `css/main.css`. For this to work correctly, resources need to be stored in the `/assets` folder.

If we head to the `/assets` folder, we find `css/main.css` as expected:

```css
body {
  color: #222;
  font-family: sans-serif;
  line-height: 1.5;
  margin: 1rem;
  max-width: 768px;
}

header {
  border-bottom: 1px solid #222;
  margin-bottom: 1rem;
}

footer {
  border-top: 1px solid #222;
  margin-top: 1rem;
}

a {
  color: #00e;
  text-decoration: none;
}
```

Heading back to  `partials/head/css.html`, the next bit of logic to wrap our heads around is the *if else* statement.

Here, the [hugo.Environment](https://gohugo.io/functions/hugo/environment/) function is used to qualify whether the current environment is *development* or not. In other words, is `hugo server` currently running a local development server? If this statement evaluates *true*, then the CSS is rendered without any processing. If the statement evaluates *false*, then the CSS will be [minified](https://gohugo.io/hugo-pipes/minification/) and [fingerprinted](https://gohugo.io/hugo-pipes/fingerprint/) with a hash string, which is useful for cache busting when caching assets. Exactly the sort of processing what we want in production. 

If we open up `partials/head/js.html`, we find a very similar approached used used to render JavaScript:

```html
{{- with resources.Get "js/main.js" }}
  {{- if eq hugo.Environment "development" }}
    {{- with . | js.Build }}
      <script src="{{ .RelPermalink }}"></script>
    {{- end }}
  {{- else }}
    {{- $opts := dict "minify" true }}
    {{- with . | js.Build $opts | fingerprint }}
      <script src="{{ .RelPermalink }}" integrity="{{- .Data.Integrity }}" crossorigin="anonymous"></script>
    {{- end }}
  {{- end }}
{{- end }}
```

And similar to the CSS, if we head to the `/assets` folder, we find `js/main.js`, as expected:

```
console.log('This site was generated by Hugo.');
```

The main difference here is that JavaScript is processed using [js.Build](https://gohugo.io/hugo-pipes/js/). 

```html
{{- with . | js.Build }}
  <script src="{{ .RelPermalink }}"></script>
{{- end }}
```

It also shows how to abstract options to a variable, then include them in a statement:

```
{{- $opts := dict "minify" true }}
{{- with . | js.Build $opts | fingerprint }}
  ...
```

Which is just another way to express the following:

```
{{- with . | js.Build | minify | fingerprint }}
  ...
```

With the CSS and JavaScript covered, let’s turn our attention to partials.


## Partial templates

We’ve already touched on cached partials, which are used to render the CSS and JS partials in the theme. These partials are cached because they presumably don’t need to be re-rendered.

```
{{ partialCached "head/css.html" . }}
{{ partialCached "head/js.html" . }}
```

There are two other approaches to partials used in the theme which we haven’t looked at yet – how to work with regular partials (that don’t need to be cached) and how to work with inline partials.

Regular partials are used when templates need to be re-rendered, usually because of content changes. For example, you wouldn’t want to cache a partial that contained the code that renders the `<head>` section of your website, because the chances are high that the `<title>` will change on a page-by-page basis.

In this case, you would include the partial as a regular partial include (without the word `Cached` prepending the word partial):

```
{{ partial "head.html" . }}
```

Other than that, there isn’t much difference between the two. Partial templates still live in the `layouts/partials` folder and everything works exactly the same.

Inline partials are different. As the name suggests, Inline partials don’t live inside their own named file within the `layouts/partials` folder, but instead live inline within the template in which they are used.

We can see an example of an inline partial inside the `menu.html` partial. 

```
// Include the partial code
{{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}

// Define the partial code
{{- define "partials/inline/menu/walk.html" }}
  ...
{{- end }}
```

I’ve taken the code above directly from this file and simplified it to show how inline partials work. 

First the partial is defined with the [define function](https://gohugo.io/functions/go-template/define/), then named within dumb quotes. Following this, the code to be added as a partial is included (which I’ve omitted here for clarity). Finally, as this is logic it’s important to close it out with `{{ end }}` at the end. You’ll notice this works in the exact same way as [defining a block](https://gohugo.io/functions/go-template/block/).

```
// Define the partial code
{{- define "partials/inline/menu/walk.html" }}
  S...
{{- end }}
```

Now the partial is defined, it can be included anywhere in the same template as you would a regular partial.

```
// Include the partial code
{{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}
```

It’s important to remember that template namespace is global, so you need to make sure that the names of your partials are unique to avoid conflicts.

Now we’ve warmed up, let’s tackle what’s possibly the most complicated part of this starter theme – the logic found inside the `menu.html` template.


## Menus

In a project using the Hugo starter theme, run `hugo server` then head to http://localhost:1313/ in a browser and you’ll see the menu right below the site title at the top of the page. 

Assuming you haven’t changed any of the menu items from their defaults, the menu consists of three links; Home, Posts and Tags. The code responsible for this menu of links can be found in the `menu.html` partial.

### Including the menu and passing data to the partial

Before we jump into the `menu.html` partial, first let’s take a look inside the `header.html` partial, as this is where the `menu.html` partial is included in the templates.

Open the `header.html` partial and you’ll find the following line of code:

```
{{ partial "menu.html" (dict "menuID" "main" "page" .) }}
```

If you read the previous section on partials then the code above will look familiar. To render the partial, the [partial function](https://gohugo.io/functions/partials/include/) is used followed by the name of the partial within double quotes. 

In this instance, we also find the following appended to the code:

```
(dict "menuID" "main" "page" .)
```

So what’s going on here?

In Hugo projects, the [Dictionary function](https://gohugo.io/functions/collections/dictionary/) – or its alias form *dict*, as we see here – can be used to return a map of given key-value pairs. When used in a partial include like this, *dict*  passes a map of key-value pairs into the partial (in this case `menu.html` ), so that the data is available to use from inside the partial. In this case, the first key in the map is `menuID` which holds the value of `main` and corresponds to the menu ID used to identify the menu items found within the `hugo.toml`:

```toml
[[menus.main]]
name = 'Home'
pageRef = '/'
weight = 10

[[menus.main]]
name = 'Posts'
pageRef = '/posts'
weight = 20

[[menus.main]]
name = 'Tags'
pageRef = '/tags'
weight = 30
```

Of course, if,  for example, we had a *footer* menu instead of a *main* menu, then the value of `menuID` would be *footer*.

Passing the menu ID to the partial is important as it allows the `menu.html` partial to render the *main* menu items. Without specifying ”main” Hugo wouldn’t find any menu items to render on the page.

The second key in the *dict* map is `page` and this holds the dot (`.`) as its value. In this case, the dot passes the current page context to the `menu.html` partial. Without passing the page context to the partial, it wouldn’t be possible to work with any of the [page methods](https://gohugo.io/methods/pages/) from inside the partial. So menu features which typically require page methods, such as labelling the current page item as “active”, wouldn’t be possible. 

Now we have a grasp of how to include the menu and passing data to the partial, let’s head over to the `menu.html` partial itself and figure out how this menu is working.

### Rendering the inline menu partial

At the top of the `menu.html` partial, right below the commented code, you will notice two variables have been declared. Both of which should look familiar. The first variable, `$page`, stores the page context and the second, `$menuID`, stores the menu ID (main). These are storing the data passed into the partial via the dict function, as we just discovered. 
 
```
{{- $page := .page }}
{{- $menuID := .menuID }}
```

Now it’s possible to work with this data anywhere within the `menu.html` template.

Directly below these two variable definition we find the following code:

```html
{{- with index site.Menus $menuID }}
  <nav>
    <ul>
      {{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}
    </ul>
  </nav>
{{- end }}
```

 This is used to render the navigation, part of which has been abstracted to an inline partial, which we will look at shortly. 
 
 Before we do that, first let’s get a better understanding of what’s going on in the code above.

Here, the [With function](https://gohugo.io/functions/go-template/with/) is used to render the code inside the expression *if* `site.Menus` and `$menuID` returns *true*. We know there are menu items in the `hugo.toml` file and that the partial has access to `$menuID`, as it’s been passed in, so we expect the expression to return *true*. If, let’s say, the menu items were removed, along with the menu ID, then we would expect the expression to return *false* and nothing inside the expression would render. Essentially, the With function creates a conditional statement and changes the context to whatever is passed to it.

Notice the [Index function](https://gohugo.io/functions/collections/indexfunction/) is also included. This is used to return the value of `$menuID`. 

Another way to think about this is the following:

```
{{- with index site.Menus "main" }}
```

Without the Index function, it would only be possible to return a hard coded value, as you’ve probably seen in menus found in other themes:

```
{{- with site.Menus.main }}
```

While this approach works just the same, the issue is that it wouldn’t allow for reusability of the `menu.html` partial (for example if we decided to also add a footer menu to our site some time in the future), so that’s why we find the `$menuID` stored in a variable.

Before I digress any further, let’s turn our attention to the code that the With statement renders:

```html
<nav>
  <ul>
    {{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}
  </ul>
</nav>
```

Here we find a `<nav>` element and nested `<ul>` which is typically used in most menus. The main difference to what you usually might expect is that the code we’d typically find within the `<ul>` element has been abstracted into an inline partial called `inline/menu/walk.html`. Remember the one we looked at in the partials section earlier?. 

```
{{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}
```

Before we look at the code within this inline partial, first let’s take a look at the data that’s passed to the inline partial, again via *dict*, a.k.a the Dictionary function.

The first key in the dict map is `page`, which holds the value of our `$page` variable. If you remember, `$page` holds the page context. By passing the page context to the inline partial, page methods can be used within it. It can be confusing when we get into partial inception like this, but the important thing to remember is that data and/or context needs to be passed to every partial that requires it. That includes inline partials.

The second key in the *dict* map is `menuEntries`,  which is an arbitrary name used to describe the value it holds - the dot (`.`). 

It’s important to note that the With function binds context (the dot) to the expression. What this means is that as soon as you use With, the context changes to whatever you pass in to the function. In this case, the context is no longer Page, but instead `site.Menus`, and more specifically the `main` menu. So the value of `menuEntries` actually holds the structured main menu data that we find inside the `hugo.toml` file. The inline partial now has access to the main menu data.

Ok, it’s the final push. Now let’s look at the inline partial itself.

### Defining the inline menu partial

We’ve already looked at how to define an inline partial in the partials section of this post, so I won’t go over that again. What we‘re interested in now is the code inside the partial definition found in the `menu.html` partial.

```html
{{- define "partials/inline/menu/walk.html" }}
  {{- $page := .page }}
  {{- range .menuEntries }}
    {{- $attrs := dict "href" .URL }}
    {{- if $page.IsMenuCurrent .Menu . }}
      {{- $attrs = merge $attrs (dict "class" "active" "aria-current" "page") }}
    {{- else if $page.HasMenuCurrent .Menu .}}
      {{- $attrs = merge $attrs (dict "class" "ancestor" "aria-current" "true") }}
    {{- end }}
    {{- $name := .Name }}
    {{- with .Identifier }}
      {{- with T . }}
        {{- $name = . }}
      {{- end }}
    {{- end }}
    <li>
      <a
        {{- range $k, $v := $attrs }}
          {{- with $v }}
            {{- printf " %s=%q" $k $v | safeHTMLAttr }}
          {{- end }}
        {{- end -}}
      >{{ $name }}</a>
      {{- with .Children }}
        <ul>
          {{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}
        </ul>
      {{- end }}
    </li>
  {{- end }}
{{- end }}
```

Quite a bit of complicated looking code here, but it’s fairly straight forward once you get your head around it. I’ll do my best to walk you through it.

Before we begin, the important thing to realise is that all this code is actually doing is rendering the menu list items, the links within these list items and child menu items (should they exist). The brunt of complexity in this code is the logic which builds the link attributes and translates the name of the menu item (should you decide to set up multilingual mode on your site). 

To make sense of all this, let’s start at the top of the partial definition, on the line right below where we find the define function in use. 

Here we find a variable called `$page`, which stores the value `.page`, a.k.a the
the page context, which has been passed into the partial via the dict function found in the partial include we looked at previously.

```
 {{- $page := .page }}
```

If you follow `.page` backwards you’ll notice that it’s been passed all the way down from the `header.html` partial, where the context is Page. With page context stored inside `$page`, it’s now available to the inline partial.

Next we find a [Range function](https://gohugo.io/functions/go-template/range/), which is used to iterate over collections, in this case `.menuEntries`.

```
{{- range .menuEntries }}
  ...
{{- end }}
```

If you remember from the previous section, `.menuEntries` stores the *main* menu data, which was also passed into the inline partial via the dict function in the partial include. So here Range is iterating over the menu items found in the `hugo.toml` config file, similar to how a *forEach* might in JavaScript.

Now the context has changed to the menu items, all data associated with the menu items is available. The item `name`, `identifier` and `URL`,  for example, can all be used inside the inline partial.

With that in mind, let’s look at the next chunk of code in the inline partial.

```
{{- $attrs := dict "href" .URL }}
{{- if $page.IsMenuCurrent .Menu . }}
  {{- $attrs = merge $attrs (dict "class" "active" "aria-current" "page") }}
{{- else if $page.HasMenuCurrent .Menu . }}
  {{- $attrs = merge $attrs (dict "class" "ancestor" "aria-current" "true") }}
{{- end }}
```

This is the logic that determines which attributes should be added to the`<a>` element found further down in the partial definition. We’ll look at this anchor tag in more detail, but first let’s breakdown this logic.

On the first line in the code above a variable called `$attrs` has been declared which stores `.URL` as the value.

```
{{- $attrs := dict "href" .URL }}
```

[URL](https://gohugo.io/methods/menu-entry/url/) returns the relative permalink of the page associated with the given menu entry. In this case, the Dictionary function (dict) is used to create a map with a key called “href” used to label the URL. The reason for this is that `href` is the HTML attribute used to render URL’s in links, so by providing *href* as the key, Hugo will be able to build the link attributes correctly. 

Next we find the logic itself:

```
{{- if $page.IsMenuCurrent .Menu . }}
  {{- $attrs = merge $attrs (dict "class" "active" "aria-current" "page") }}
{{- else if $page.HasMenuCurrent .Menu . }}
  {{- $attrs = merge $attrs (dict "class" "ancestor" "aria-current" "true") }}
{{- end }}
```

Which we might interpret in plain english as the following:

```
{{ if this evaluates true }}
  {{ do this }}
{{ otherwise, if this evaluates true }}
  {{ do this instead }}
{{ end }}
```

In the first part of the logic, [IsMenuCurrent](https://gohugo.io/methods/page/ismenucurrent/) is used to check if the current page matches the current menu item. Notice `IsMenuCurrent` is appended to the `$page` variable from earlier. This is important as `IsMenuCurrent` is a page method, so will only work within the Page context. `$page` provides the context. 

OK, so if the statement on the first line in the code above evaluates *true*, then the `$attrs` variable is reassigned with a new value:

```
{{- $attrs = merge $attrs (dict "class" "active" "aria-current" "page") }}
```

Notice `=` is used to assign a new value to the variable, whereas when the variable was initialised,  `:=` was used. This is an important distinction – `:=` is used to initialise a variable and `=` is used to update or reassign its value.

So what is the value that’s being assigned? It’s two more attributes; a `class` with the value of `active` and `aria-current` with the value of `page`. As before, both are passed as a map of key-value pairs, using the Dict function. Notice the [Merge function](https://gohugo.io/functions/collections/merge/) is used to merge this new map with the original `$attrs` map, rather that replace it entirely.

Again, in plain english we might interpret this as the following:

```
{{ if the current page matches the current menu item }}
  {{ update $attrs from `dict "href" .URL` to `dict "href" .URL "class" "active" "aria-current" "page"` }}
{{ otherwise, if this evaluates true }}
  {{ do this instead }}
{{ end }}
```

Now let’s take a stab at the second part of this logic. This should be much easier, now that we have a good grasp of what’s going on in the first part.

```
{{- else if $page.HasMenuCurrent .Menu . }}
      {{- $attrs = merge $attrs (dict "class" "ancestor" "aria-current" "true") }}
  ...
```

Here, we we find an else statement with a new condition. This is what will happen if the first statement evaluates *false*. This time, the [HasMenuCurrent](https://gohugo.io/methods/page/hasmenucurrent/) is passed to check whether the page matches the page associated with one of the child menu entries. If this statement evaluates *true*, then similar to how we saw before, `$attrs` is updated to include a slightly different map of key-value pairs, then merged with the original `$attrs` map.

Let’s look at this in plain english once again:

```
{{ if the current page matches the current menu item }}
  {{ update $attrs from `dict "href" .URL` to `dict "href" .URL "class" "active" "aria-current" "page"` }}
{{ otherwise, if the page matches the page associated with one of the child menu entries }}
  {{ update $attrs from `dict "href" .URL` to `dict "href" .URL "class" "ancestor" "aria-current" "true"` }}
{{ end }}
```

At this point you may have realised that, by default the starter theme doesn’t have any child menu entries. So you’d be right in thinking that the second part of this logic won’t ever evaluate *true*. 

That is, unless we add a child menu item to the menu configuration found in the `hugo.toml` file. Take the below for example.

```toml
[[menus.main]]
name = 'Posts'
pageRef = '/posts'
weight = 20
identifier = 'posts'

[[menus.main]]
name = 'Post 1'
pageRef = '/posts/post-1'
parent = 'posts'
```

Notice we’ve added an `identifier` key to one of the menu items, in this case the `posts` item. The value matches the name of the item, but could be anything. Next we add a new menu item and add a `parent` key to it with a value that matches the `identifier` of the menu item we want it to be the child of. 

With this new menu configuration in place, the second statement in the logic in question will now evaluate *true* for the *Posts* menu item.

It’s important to realise that, at this stage, all the logic is doing is updating the value of `$attrs` variable, depending on how each statement evaluates. The attributes haven’t been applied to the link tag yet, where we would usually expect to find them. We’ll get to the part where this happens shortly. 

First, let’s take a brief look at the following code, found inside the `menu.html` partial, directly below the logic we’ve just addressed.

```
{{- $name := .Name }}
{{- with .Identifier }}
  {{- with T . }}
    {{- $name = . }}
  {{- end }}
{{- end }}
```

First we find a new variable, `$name`, which stores the value of `.Name`. As we’re still inside the Range, the current context is still `.menuEntries` (our menu items). Therefore, it’s clear that `.Name` is the name of our menu item, taken from our menu object in `hugo.toml`.

Next we find a [With function](https://gohugo.io/functions/go-template/with/) which changes the context to whatever is passed into it and will execute if the expression returns *true*. In this case, `.Identifier` is passed in. By default, no menu item in the menu configuration includes an `Identifier`, so this is our first clue to what’s happening here – absolutely nothing, unless an Identifier is added to any of the menu items.

Within this logic we find another With function. This time the dot (a.k.a the current context) is passed in, which remains unchanged – the `.Identifier`. Here the [Translate function](https://gohugo.io/functions/lang/translate/) is used (in its alias form “T”) to translate the Identifier value, should it exist. Here’s our second clue – this logic will only execute if we decided to set up a [multilingual site](https://gohugo.io/content-management/content-adapters/#multilingual-sites) and create translation tables for our content. You can learn more about [creating simple translations](https://gohugo.io/functions/lang/translate/#simple-translations) in the Hugo docs, so I won’t go into any more detail about that now. All we need to understand right now is that `.Identifier` is used to identify the content to be translated.

Finally, if the two With expressions evaluate *true*, then the value of the `$name` variable is reassigned (using `=`) to the translated menu item. 

As with the `$attrs` variable, which we looked at earlier, it’s important to realise that all this logic does is conditionally update the value of the `$name` variable. It’s doesn’t actually manipulate or apply anything to the HTML found in the theme. Instead, it simply prepares these variables so they are ready to be used.

Now we’ll look at how these variables are actually applied to the HTML in the theme. To do that, let’s consider the list item and everything found within it.

```html
<li>
  <a
  {{- range $k, $v := $attrs }}
    {{- with $v }}
      {{- printf " %s=%q" $k $v | safeHTMLAttr }}
    {{- end }}
  {{- end -}}
  >{{ $name }}</a>
  {{- with .Children }}
    <ul>
      {{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}
    </ul>
  {{- end }}
</li>
```

The first thing to point out is we’re still inside the Range here and the context is still `.menuEntries` (the menu items). So we’re expecting this code to return a list item for each menu item in the menu configuration found inside `hugo.toml`.

Let’s take a closer look at the anchor tag in the code above.

```html
<a
  {{- range $k, $v := $attrs }}
    {{- with $v }}
    {{- printf " %s=%q" $k $v | safeHTMLAttr }}
    {{- end }}
  {{- end -}}
>{{ $name }}</a>
```

First we find the logic which builds the link attributes held in the `$attrs` variable. For this to work, `$attrs` is passed into the Range function which [ranges over the map](https://gohugo.io/functions/go-template/range/#maps) of data and stores it in two variables `$k` and  `$v`. We can assume these variables represent the *key* and the *value*. 

The With function then changes the context to the value and is used to ensure this code only executes if a value exists. If the With expression evaluates *true*, the [fmt.Printf function](https://gohugo.io/functions/fmt/printf/) is then used to format the attributes correctly. It’s worth taking a look at [Go’s Fmt package](https://pkg.go.dev/fmt#hdr-Printing), specifically the printing verbs  `%s` and `%q` to better understand how this is comes together. 

With the attributes formatted correctly, the [safeHTMLAttr function](https://gohugo.io/functions/safe/htmlattr/) is piped to declare that the key-value pairs are safe HTML attributes and ensure everything renders without errors.

The final thing to note in the anchor tag is the `$name` variable, which is used to render the link text. Simple stuff.

All that’s left to look at now before we wrap up this breakdown of the `menu.html` partial is the following:

```html
{{- with .Children }}
  <ul>
    {{- partial "inline/menu/walk.html" (dict "page" $page "menuEntries" .) }}
  </ul>
{{- end }}
```

The big give away here is the [Children function](https://gohugo.io/methods/menu-entry/children/), which is used to return a collection of child menu entries, should any exist. As we established earlier, no child menu items exist in the theme by default, so we don’t expect this code the execute. However, should we add child menu items to the theme, then this code would run and build a nested unordered list containing existing child list items. 

Notice that these potential list items are rendered via the inline partial that we’ve just been dissecting. What this tells us is that you can include an inline partial within itself, again performing a partial inception of sorts, should the need present itself, as it has here. This is a great example of why it makes sense to build partials with flexibility and reusability in mind. 

The `menu.html` partial is easily the most complicated part of the Hugo starter theme, so don’t stress too much if you’re still struggling to get your head around it. I’ve written about [working with menus in Hugo](https://harrycresswell.com/writing/menus-in-hugo/) in detail, so check that post out if you’re looking for a slightly easier implementation.


## Final words

Great effort if you’ve made it this far. I wasn’t planning on writing over seven thousand words about Hugo improvements but here we are.

I want to wrap this one up by saying that it’s great to see more emphasis on building themes from scratch, or at least, building sites by using a functional barebones theme as a starting point. It might seem like a trivial thing, but this is a big step in the right direction for Hugo development.

Before now, installing a theme from [Hugo Themes](https://themes.gohugo.io/)  often felt like the recommended next step after setting up a new site. While this might make sense if you want to get a Hugo site up and running quickly, personally I’m not sure if it’s always the most sensible approach. Existing Hugo themes are typically built by experienced developers. Often they’re complex and not the most beginner friendly.

If you really want to learn Hugo then nothing beats building your own theme. My hope is that these changes will encourage more of us to do just that. 

Hopefully this post has helped you get your head around some of the complexities of the default starter theme and has provided you with some encouragement to give theme development a go.

If you spotted any mistakes whilst reading this post then please let me know and I will do my best to rectify them.