---
title: "Menus in Hugo"
date: 2022-04-22T11:12:10+01:00
draft: false
description: "Section menus, front matter menus, config menus. This covers the lot. Including menu highlighting, working with sub menus and adding external links."
slug: "menus-in-hugo"
topics: [ "Hugo"]
syndicate: "false"
---

There are many ways to build a menu with Hugo. As is often the case, it’s this flexibility which makes Hugo one of the more powerful static site generators. But, it’s not always obvious which approach is best suited to your project. And, you’re often left scratching your head, wondering which approach to choose.

This article will guide you through the different approaches. From a simple list of hard-coded links, right through to an advanced config menu. We’ll also cover some of the more challenging aspects of building menus. Including highlighting current items, working with sub-menus, and adding external links. 

I’ve done my best to highlight the nuances of each approach, where appropriate. And, provide some insight into how I prefer to do things.


## Creating a `nav.html` partial

Site navigation tends to look the same on most pages, so the obvious place to start is by creating a component for it. That way we can manage our menu code in one place, then add it to any template, wherever we like.

In Hugo, components are known as _partials_, and they live in a dedicated folder at _layouts/partials_.

I like to create a partial called  `nav.html`, but you might prefer to call your partial `menu.html`, or something similar.

Inside this new partial, one approach would be to hard code a list of links to our pages. Just like you would when creating a website with regular HTML.

```html
<nav> 
 <ul> 
  <li><a href="/">Home</a></li> 
  <li><a href="/about">About</a></li> 
  <li><a href="/contact">Contact</a></li> 
 </ul> 
</nav>
```

This works well for a small site, or one you plan on managing yourself. But with non-technical stakeholders involved, managing a hard-coded menu isn’t usually the best solution.

In this situation, using Hugo’s [Menus](https://gohugo.io/content-management/menus/) feature would be a better approach.


## Working with `.Site.Menus`

The [Hugo docs define a menu](https://gohugo.io/content-management/menus/#what-is-a-menu-in-hugo) as “a named array of menu entries accessible by name via the `.Site.Menus`  [site variable](https://gohugo.io/variables/). We’ll look at this in depth shortly, but for now, let’s focus on the `.Site` bit.

If you’re familar with Hugo, you’ll know that the `.Site` object gives you access to global settings stored in the _config.toml_ file. This tells us that we can manage menus from our site configuration.

The easiest way to get started with “config menus” is by creating a Section Menu with a single line of code.

### Section menus

[Section Menus](https://gohugo.io/templates/menu-templates/#section-menu-for-lazy-bloggers), a.k.a “menu for Lazy bloggers”, allow you to create a simple menu, based on the section structure of your */content* folder. 

The first thing to do is add the following line of code to the top of the `config.toml` file, found at the root of your Hugo project.

```
sectionPagesMenu = "main"
```

Here we’ve decided to call our menu “main”, but you could call your menu anything you wish.

The next step is to open up your `nav.html` partial (or wherever you decide to keep the code for your menu), and replace those hard-coded links from earlier with the following.

```html
<nav>
 <ul>
  {{ range .Site.Menus.main }}
   <li><a href="{{ .URL }}">{{ .Name }}</a></li>
  {{ end }}
 </ul>
</nav>
```

We’ll get to exactly what’s going on in this code a little later. But, that’s pretty much all we need. 

If we include this code somewhere in our templates, our Section Menu will _just_ work. No need to add our menu items anywhere, or configure anything else in the config file. That’s because Section Menus are based on content structure. 

So. Section Menus quick and easy to build. But, they depend on our content structure, meaning we have to structure our content in a particular way. This creates certain limitations, which we’ll look at next.

The first limitation is that we can’t structure pages as top level markdown files. 

```
├── content/
│   ├── about.md
│   ├── contact.md
```

I often do this, but, it won’t work with Section Menus. 

Instead, we need to make sure our pages are structured as content Sections.

```
├── content/
│   ├── about/
│   │   ├── index.md
│   ├── contact/
│   │   ├── index.md
│   ├── posts/
│   │   ├── _index.md
│   │   ├── first-post.md
│   │   ├── second-post.md
```

Sections require their own named folder, which contains either an *index.md* file, or a collection of pages, with or without an *index.md* file. As illustrated above.

What’s the difference between  `index.md` and `_index.md`? The former creates a [Leaf Bundle](https://gohugo.io/content-management/page-bundles/) (used for single pages) and the latter a [Branch Bundle](https://gohugo.io/content-management/page-bundles/) (used for section pages). But, I digress.

More to the point, without Section folders, your Section Menu will not work. 

For a small site, we might decided to reorganise the content folder to get a Section Menu working. But, for a big site, with a mature content structure, this process could take some time, and might not be worthwhile.

The second limitation of Section Menus is that they only work for top level pages. To illustrate this, imagine we have a *projects* section with two projects inside.

```
├── content/
│   ├── projects/
│   │   ├── _index.md
│   │   ├── first-project.md
│   │   ├── second-project/
│   │   ├── ├── index.md
```

*Projects* will display in our Section Menu, as it’s a top level page. But, notice `first project.md` and `second-project/` are pages within the section. These are known as a *shadow members* and they won’t display in our Section menu, as neither are top-level pages.

For reasons outlined, it’s my view that Section Menus are best suited to small sites with a modest menu structure. Perhaps where you don’t need much control over how your menu is represented, or simply need a quick way to navigate between a handful of top-level pages.

When you need granular control over each menu item. Or, you want to make changes to menu items without digging through your templates. That’s a good sign it’s time to build a custom menu.


### Managing menus from the `config.toml` file

Custom menus, or “Config Menus” are managed via the site configuration. 

Managing a menu from the `config.toml` file makes it easier to customise menu items and give editable access to non-developers. Perhaps via a content management system (CMS), should we decide to set one up, for those aforementioned stakeholders.

Here’s what that might look like.


```toml
[menu]
[[menu.main]]
  name = 'Home'
  url = '/'
  weight = 10
[[menu.main]]
  name = 'About'
  url = '/about'
  weight = 20
[[menu.main]]
  name = 'Contact'
  url = '/contact'
  weight = 30
```

Before we continue, let’s take a moment to dissect the code above, to get a better understanding of what’s going on.

Inside our `config.toml` file we’ve added some TOML data to create a menu with three menu items. 

At the top we initiate a menu using the `[menu]` key. For each item in our menu we add `[[menu.main]]`, where “main” is the name we choose for the menu. If, for example, we had a different menu in the footer, then we might decide to use `[[menu.footer]]`, instead.

For each menu item we’re adding 3 key-value pairs:

- **name** is use for the link text. That’s the bit that will display in our menu.
- **url** should contain the relative path to the page you wish to link to.
- **weight** specifies the order of the menu items, as they appear in the menu. Items with a lower weight value will appear earlier in the sequence of items.

There’s no hard and fast rule about how you format the weight of each menu item, they just need to increase as you progress through the menu order. For example, the following weights would be just as valid, as above.

```toml
[menu]
[[menu.main]]
  name = 'Home'
  url = '/'
  weight = 1
[[menu.main]]
  name = 'About'
  url = '/about'
  weight = 2
[[menu.main]]
  name = 'Contact'
  url = '/contact'
  weight = 3
```

Increasing weight values by 1 works. But, I tend to avoid it. Otherwise you end up having to update the weight of every menu item, anytime you want to add a new item, somewhere in the middle of your menu.

For this reason, my prefered method is using increments of 10. Doing so makes it much easier to add menu items later, anywhere in your menu. 

Consider the menu item with the name *Posts* in the example below. 

```toml
[menu]
[[menu.main]]
  name = 'Home'
  url = '/'
  weight = 10
[[menu.main]]
  name = 'About'
  url = '/about'
  weight = 20
[[menu.main]]
  name = 'Posts'
  url = '/posts'
  weight = 25
[[menu.main]]
  name = 'Contact'
  url = '/contact'
  weight = 30
 ```

We can add the menu item in sequence by giving it a weight of 25. No need to update the weight of any other item in the menu.

OK. Enough about weight. Let’s do something with this menu data.

### Rendering our config menu

With menu data now set in the site config, our ”main” menu is accessible using the [.Site.Menus](https://gohugo.io/variables/site/#get-the-site-object-from-a-partial) method.

The next step is to open up `/layouts/partials/nav.html` and replace the code we added earlier with the following.

```html
<nav aria-label="Main Navigation">
 <ul>
  {{ range .Site.Menus.main }}
   <li>
    <a href="{{ .URL }}">{{ .Name }}</a>
   </li>
  {{ end }}
 </ul>
</nav>
```

Let’s run through this code to get a better idea of what’s going on.

As mentioned earlier, `.Site` gives us access to data in the config file. `.Site` includes a bunch of different methods we can use, one of which is _Menus_. 

So. To access our menu data, we use `.Site.Menus` followed by the name of the menu. In our config, we called our menu _main_, so, in this case, we use `.Site.Menus.main`.

By passing these variables into the [range function](https://gohugo.io/functions/range/), we can iterate (or loop) through the array of menu items and return the data. The same sort of thing as using _forEach_ statement in other programming languages.

Range loops through our menu items, changing the context (the data available to us) to the data associated with each menu item. Now we have access to both the _url_ and the _name_, found within the data of each menu item. 

We use the `.URL` variable to pass the _url_ from each menu item to the `href` in the anchor tag. Then `.Name` to pass _name_ as the link text.

```html
<a href="{{ .URL }}">{{ .Name }}</a>
```

_**Note:** `.Name` and `.URL` are predefined variables built into Hugo, so you’ll need capitalise the first letter of the variable for them to work as expected. As URL is an acronym (Uniform Resource Locator), in this case the whole variable is capitalised–as you’d expect from an acronym._

It’s important to remember, when using the range function, we open logic. Whenever we open logic, we will need to end this logic to return to the default page context. We can do that with `{{ end }}`. If we fail to end the logic, Hugo will throw an error and our template will break. 

Here’s that code once again, so you can see it in full.

```html
<nav aria-label="Main Navigation">
 <ul>
  {{ range .Site.Menus.main }}
   <li>
    <a href="{{ .URL }}">{{ .Name }}</a>
   </li>
  {{ end }}
 </ul>
</nav>
```

Notice we’ve also added an `aria-label` to our opening `<nav>` tag. This tells screen readers and other assistive technologies to announce the navigation as “Main Navigation”. But, now we’re going down another road entirely, so I’ll leave it at that for now.

Instead, let’s get our menu displaying on our website somewhere.



## Add your `nav.html` partial to your templates

With a menu set up in the `config.toml` file, and the code used to render the menu in a partial. The final thing left to do is to include the partial somewhere in your templates.

The `_default/baseof.html` template might be the obvious place, as we want it to appear on all pages. But, if you have a `header.html` partial already included in your base template, then it might make more sense to add it here, instead.

```go
{{ partial "nav.html" . }}
```

Remember to pass the dot (`.`) into the partal, just before the closing curly brackets. The dot passes context to the partial. Without it, the partial won’t have access to the menu data.

At this point we have a working menu. So let’s look at some other ways to add content to it.


## Front matter menus

Managing menus from the `config.toml` file is typically the way I like to do things. But, we can also add content to a menu directly from the front matter of any content file.

Assuming we have something similar to below in one of our templates.

```html
<nav aria-label="Main Navigation">
 <ul>
  {{ range .Site.Menus.main }}
   <li>
    <a href="{{ .URL }}">{{ .Name }}</a>
   </li>
  {{ end }}
 </ul>
</nav>
```

We could add the following to the front matter of any content file, to add it to our main menu.

```toml
menu = 'main'
```

One advantage of front matter menus is that we can quickly add content to any number of menus.

```toml
menu = ['main', 'footer']
```

The code above will add our content to both the *main* and *footer* menu. That is, assuming we also have the a footer menu rendered somewhere in our templates.


```html
<nav aria-label="Footer Navigation">
 <ul>
  {{ range .Site.Menus.footer }}
   <li>
    <a href="{{ .URL }}">{{ .Name }}</a>
   </li>
  {{ end }}
 </ul>
</nav>
```

But this doesn’t give us much control over how our content appears in the menu. For advanced control we can use the same approach as in the `config.toml`.

```toml
[menu]
 [menu.main]
  weight = 20
  parent = "About"
```

Front matter menus won’t give quite the same level of control as you get from the *config.toml* file. But, you can order your content in a menu by adding a *weight*. Or, nest your content as sub menu, by adding a value for *parent*.

You may find reason to add content to a menu via front matter. However, I tend to avoid them, as I find it easier to manage menu items all in one place–from the `config.toml` file.

Now we’ve looked at rending menus, and the various ways to add content them, let’s look at some of the challenges we might face.


## Highlighting the current menu item

Adding a visual indicator to the menu item of the current page is common practice. It’s a helpful way to show site visitors which page they are on.

A typical way to do this is to add a class to the menu item which corresponds to the current page. That way, we can target the class with CSS, and style our active menu item to indicate the page is the current one. 

In HTML that might look like this: 


```html
<nav> 
 <ul> 
  <li><a href="/">Home</a></li> 
  <li><a href="/about" class="is-active">About</a></li> 
  <li><a href="/contact">Contact</a></li> 
 </ul> 
</nav>
```


But, getting this working in Hugo hasn’t always been easy. The real challenge was finding a way to highlight sub menu items, whilst maintaining the highlight of the parent item. We’ll get to that shortly.

Thanks to the Hugo team, [v0.86.0](https://github.com/gohugoio/hugo/releases/tag/v0.86.0) makes highlighting current menu items a whole lot easier. 

In this section we‘ll run through the steps to get menu highlighting working for both top-level navigation and nested children, a.k.a sub menus.

Let’s start by adding `class="is-active"` to the anchor tag in our list item.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ range .Site.Menus.main }}
      <li>
        <a class="is-active" href="{{ .URL }}">{{ .Name }}</a>
      </li>
    {{ end }}
  </ul>
</nav>
```

The problem now is that `is-active` is being applied to every one of our menu items. That’s because range is looping through our menu items and adding the class to each one. We’ll need to use some logic to tell Hugo to only add the class if the menu item matches the current page.

Hugo provides a method on the `Page` object called [.IsMenuCurrent](https://gohugo.io/functions/ismenucurrent/) which can help us achieve this functionality. 

`.IsMenuCurrent` will return _true_ if the current page is the same as the page in our menu item.

Update your menu with the following code:

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ range .Site.Menus.main }}
      <li>
        <a 
        class="{{ if .IsMenuCurrent "main" . }}is-active{{ end }}"
        href="{{ .URL }}">
          {{ .Name }}
        </a>
      </li>
    {{ end }}
  </ul>
</nav>
```


So. What’s going on in that class above?

Using an if statement, we create a condition to check if the current page matches the menu item in our _main_ menu. But, our code won’t work just yet, because now we have another problem.

If you remember, `.IsMenuCurrent` is a method on the `Page` object. So, in order to use it, the context (the data available to us) needs to be Page. 

However, when we used the range function, we changed the context from Page to our menu data. We did this by passing `.Site.Menus.main` into the function. Subsequently, we no longer have access to `.IsMenuCurrent`.

So, how do we access the `Page` context, so we can use `.IsMenuCurrent` from inside our range logic?

The easiest way to do this is by creating a custom variable outside of our range logic, where the context is still `Page`. Then, we can assign the current context to this variable and access it from inside our range logic.

In Hugo, current context is stored in the dot, and the default context of templates is set to `Page`. So, all we need to do is assign our variable with the dot (`.`).

```
{{ $currentPage := . }}
```

We can name this custom variable anything we like, we just need to remember to prefix the name with `$` and assign a value to the variable by using `:=`, rather than simply `=`.


Let’s add our new variable just above the range function in our `nav.html` partial. We can add this anywhere, as long as it’s outside the range function where the context is still `Page`.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
      <li>
        <a 
        class="{{ if .IsMenuCurrent "main" . }}is-active{{ end }}" 
        href="{{ .URL }}">
          {{ .Name }}
        </a>
      </li>
    {{ end }}
  </ul>
</nav>
```


Now we can prefix `.IsMenuCurrent` with our new `$currentPage` variable and we will have access to the Page context from inside our range logic.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
      <li>
        <a 
        class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
        href="{{ .URL }}">
          {{ .Name }}
        </a>
      </li>
    {{ end }}
  </ul>
</nav>
```

Head back to the browser and you’ll notice that Hugo still isn’t applying the `is-active` class to our menu items, yet. That’s because we need to make a slight change to each menu item in the config.

In [v0.86.0](https://github.com/gohugoio/hugo/releases/tag/v0.86.0) Hugo introduced the [pageRef](https://github.com/gohugoio/hugo/releases/tag/v0.86.0) variable to make menu highlight much easier to work with. All we need to do is assign the value of _pageRef_ for each item to the path of our page.


```toml
[menu]
[[menu.main]]
  pageRef="/"
  name = 'Home'
  url = '/'
  weight = 10
[[menu.main]]
  pageRef="about"  
  name = 'About'
  url = '/about'
  weight = 20
[[menu.main]]
  pageRef="team"  
  name = 'Team'
  url = '/team'
  weight = 25
  parent = "About"
[[menu.main]]
  pageRef="contact"
  name = 'Contact'
  url = '/contact'
  weight = 30
```


Now Hugo adds our `is-active` to whichever page we navigate to.

At this point, everything is working as intended. All that’s left to do is add some styling to our `is-active` class, to indicate that the current page is active. 

I’ve leave that part up to you. But a nice, simple place to begin, might be to style the active link with `text-decoration: underline`.

Ok. Our current menu highlighting is working as expected. So, now let’s turn our attention to sub menus.


## Working with nested children

Not all menus will require nested children, a.k.a sub menus. But content heavy projects, such as documentation sites, often will.

Let’s take a moment to clarify exactly what we mean when we talk about sub menus. So we’re all on the same page. 

What do sub menus look like?

Here’s two examples of websites I’ve built with Hugo, both of which include menus with sub menus:

- [Noba International](https://nobainternational.com/) displays a sub menu when you hover over an item in the header navigation.
- The [AIN Brand Guidelines](https://design.angelinvestmentnetwork.co.uk/) reveal sub menus when a parent item in the sidebar is clicked.

Allthough the design in these examples varies, both the code, and the UX is very much the same–you hover or click on the top level menu item and a nested menu is revealed. 

Ok, now we’re on the same page, how do we build this functionality in Hugo?


### Addding `parent` keyword to sub menu items

We can create child menu items (or nested items) but heading to `config.toml`, and assigning a menu item with the *parent* keyword. 

The value of `parent` must match the name of another item in our menu. The one we want to make the parent.

```toml
[menu]
[[menu.main]]
  pageRef="/"
  name = 'Home'
  url = '/'
  weight = 10
[[menu.main]]
  pageRef="about"  
  name = 'About'
  url = '/about'
  weight = 20
[[menu.main]]
  pageRef="team"  
  name = 'Team'
  url = '/team'
  weight = 25
  parent = "About"
```


Note, if you’re menu items include an `identifier`, then the value of `parent` will need to match the value of `identifier`, rather than the value of `name`. 


```toml
[menu]
[[menu.main]]
  pageRef="/"
  name = 'Home'
  url = '/'
  weight = 10
[[menu.main]]
  pageRef="about" 
  identifier = "About us" 
  name = 'About'
  url = '/about'
  weight = 20
[[menu.main]]
  pageRef="team"  
  name = 'Team'
  url = '/team'
  weight = 25
  parent = "About us"
```

My understanding is that an `identifier` is only necessary if two or more menu entries have the same `name`. In which case you will need to add a unique identifier to identify each.

This can get confusing, so I usually avoid using an `identifier` altogether. As it’s not often I need to add two menu item, with the exact same name.

Ok, back to our template. How doe we render our child items in our menu?


### `.HasChildren`, `.Children` and the `range` function

Hugo has a method on menu called `.HasChildren` which returns `true` if a menu item contains children. We can use an if statement to check the condition.

If the condition returns `true`, we loop through the child menu items by passing `.Children` into the range fuction.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ range .Site.Menus.main }}
      {{ if .HasChildren }}
        <li>
          <a 
          class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
          href="{{ .URL }}">{{ .Name }}</a>
          <ul>
            {{ range .Children }}
              <li>
                <a href="{{ .URL }}">{{ .Name }}</a>
              </li>
            {{ end }}
          </ul>
        </li>
      {{ end }}
    {{ end }}
  </ul>
</nav>
```


Now, any menu item with a *parent* keyword that matches the *name* of another menu item, will display in a sub menu (`<ul>`), nested within the parent `<li>`.

The final thing to do is add some CSS to style our sub menu.


## Highlighting sub menu items

What if we want to highlight these child pages in the menu, when the page is active?

Well, we can add the exact same logic we used to add the `is-active` class to the link on the parent item. 

```go
{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}
```

Altogether that looks like this:

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ range .Site.Menus.main }}
      {{ if .HasChildren }}
        <li>
          <a 
          class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
          href="{{ .URL }}">{{ .Name }}</a>
          <ul>
            {{ range .Children }}
              <li>
                <a
                class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
                href="{{ .URL }}">
                  {{ .Name }}
                </a>
              </li>
            {{ end }}
          </ul>
        </li>
      {{ end }}
    {{ end }}
  </ul>
</nav>
```


But, now we have another issue. 

Our `is-active` class dissapears from the parent menu item, whenever we navigate to the child item in the sub menu. 

To fix that, we can use the `.HasMenuCurrent` method, which will return `true` for any descendant of that section.

In our top level menu item, we use `or` to check the second condition. Wrapping each condition in parentheses.

```go
{{ if or ($currentPage.IsMenuCurrent "main" .) ($currentPage.HasMenuCurrent "main" .) }}
```

And, here it is in the context of our menu.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ range .Site.Menus.main }}
      {{ if .HasChildren }}
        <li>
          <a 
          class="{{ if or ($currentPage.IsMenuCurrent "main" .) ($currentPage.HasMenuCurrent "main" .) }}is-active{{ end }}"
          href="{{ .URL }}">
          {{ .Name }}
          </a>
          <ul>
            {{ range .Children }}
              <li>
                <a
                class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
                href="{{ .URL }}">
                  {{ .Name }}
                </a>
              </li>
            {{ end }}
          </ul>
        </li>
      {{ end }}
    {{ end }}
  </ul>
</nav>
```

Finally, we include an else statement, to return any menu item that doesn’t have child menu items attached to it.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ range .Site.Menus.main }}
      {{ if .HasChildren }}
        <li>
          <a 
          class="{{ if or ($currentPage.IsMenuCurrent "main" .) ($currentPage.HasMenuCurrent "main" .) }}is-active{{ end }}"
          href="{{ .URL }}">
          {{ .Name }}
          </a>
          <ul>
            {{ range .Children }}
              <li>
                <a
                class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
                href="{{ .URL }}">
                  {{ .Name }}
                </a>
              </li>
            {{ end }}
          </ul>
        </li>
      {{ else }}
        <li>
          <a
          class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
          href="{{ .URL }}">
          {{ .Name }}
          </a>
        </li>
      {{ end }}
    {{ end }}
  </ul>
</nav>
```

But do we actually need this else statement? Can we be more concise in the way we write our code? 

### Refactoring our code

Turns out we can ditch that else statement altogether. 

All we need to do is move the `{{ if .HasChildren }}` logic to wrap the nested child `<ul>`, rather than the parent `<li>`.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ range .Site.Menus.main }}
      <li>
        <a 
        class="{{ if or ($currentPage.IsMenuCurrent "main" .) ($currentPage.HasMenuCurrent "main" .) }}is-active{{ end }}"
        href="{{ .URL }}">
        {{ .Name }}
        </a>
        {{ if .HasChildren }}
          <ul>
            {{ range .Children }}
              <li>
                <a
                class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}"
                href="{{ .URL }}">
                  {{ .Name }}
                </a>
              </li>
            {{ end }}
          </ul>
        {{ end }}
      </li>
    {{ end }}
  </ul>
</nav>
```

Now, we’re producing the exact same results in fewer lines of code.


## Using `.Params` for external links

There are times when you’ll need to add external links to your menu. These could be any links to external websites, or your social media accounts.

The easiest way to achieve this is to head to the `config.toml` file. Then use [Params](https://gohugo.io/content-management/menus/#params) to add custom data to our menu configuration. 

Params should be nested within the menu item you wish to turn into an external link. In TOML this is done by chaining menu with your menu name, followed by the params keyword: `[menu.main.params]`. 

Consider the following:

```toml
[menu]
[[menu.main]]
  name = 'Hugo'
  url = '<https://gohugo.io/>'
  weight = 10
  [menu.main.params]
    external = true

```

To specify that our link is to an external source we add a param key called `external` , with the value of `true`. We’ll also need to add the external link itself, as the the value of the `url` key in the menu item.

Now we head back to our template, to update the code that renders our menu.

When creating external links, it’s common practice to add the `target` attribute to a link with the value `_blank`. It’s also recommended to include `rel="noopener noreferrer` in the link, to provide better security for the page that links to an external source.

```html
<nav aria-label="Main Navigation">
  <ul>
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
      <li>
        <a 
        class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}" 
        href="{{ .URL }}"
        target="_blank" rel="noopener noreferrer"
        >
          {{ .Name }}
        </a>
      </li>
    {{ end }}
  </ul>
</nav>
```


If we add the code to our link as above, all our menu items will be treated as external links. But, this isn’t what we want. We only want to add this code to menu items where the param key called “external”, is set to `true` in our config.

We’ll need to write some logic that checks if the Param *external* is set to `true` for any of our menu items. We can use the [eq function](https://gohugo.io/functions/eq/) to check the condition is met. 

We already changed context to our menu when we entered the range function, (`.Site.Menus.main`). So, all we need to do is pass `.Params.external` as the first argument and `true` as the second. If the the condition return *true*, then the code will be added to that particular menu item.

```go
{{ if eq .Params.external true }}
  target="_blank" rel="noopener noreferrer"
{{ end }}
```

In english you might read this as: 

> “if `.Params.exteral` equals `true`”

Now together with the rest of our menu code:

```go
<nav aria-label="Main Navigation">
  <ul>
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
      <li>
        <a 
        class="{{ if $currentPage.IsMenuCurrent "main" . }}is-active{{ end }}" 
        href="{{ .URL }}"
        {{ if eq .Params.external true }}
          target="_blank" rel="noopener noreferrer"
        {{ end }}
        >
          {{ .Name }}
        </a>
      </li>
    {{ end }}
  </ul>
</nav>
```

Run `hugo server` and you will find that the link of any menu item–which includes a Param called `external` that’s set to `true`–will open in a new browser tab, whilst all others links remain internal.


## Wrapping up

Setting up a menu in Hugo isn’t too difficult, but there are various approaches to consider. Which one you choose will depend on the size of your project, and the complexity of its content structure.

The most challenging aspect is highlighting current menu items. But, since Hugo v0.86.0, the [pageRef](https://github.com/gohugoio/hugo/releases/tag/v0.86.0) variable makes the process much easier. For that reason, I highly recommend keeping your Hugo version up-to-date.

With the ability to assign Params, we can do all sorts of things to customise our menu items. We’ve looked at creating external links. But you might consider adding custom icons, to illustrate your menu items. Or, even add custom classes, to change the style of a menu item based on a certain condition. I’ll leave that for you to explore.

There’s lots more to cover on the topic of menus. Managing menus from a `config/menus.toml` file and dealing with multi-lingual site navigation both come to mind. But these topics could easily be articles in themselves, so I’ll leave it there for today. 


## Resources
- https://gohugo.io/content-management/menus/
- https://gohugo.io/templates/menu-templates/

