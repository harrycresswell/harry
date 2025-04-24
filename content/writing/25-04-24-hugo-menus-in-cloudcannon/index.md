---
title: "How to set up a Hugo menu in Cloudcannon"
date: 2025-04-24T11:13:53+01:00
draft: false
slug: "hugo-menus-in-cloudcannon"
topics: ["Hugo", "Cloudcannon"]
description: "Clients usually want the ability to update menu items from within their CMS. So we need a solution that makes menus editable from Cloudcannon."
---

There are [various ways to create menus in Hugo](/writing/menus-in-hugo/). But, in most cases, Cloudcannon won’t automatically detect these menus and make them editable in its interface.

I can understand why this decision may have been made. Cloudcannon supports a bunch of static site generators (not just Hugo), each, I assume, with its own opinions on how menus should function. It’s my guess that creating a “one size fits all” approach for managing menus isn’t an easy problem to solve. 

Whatever the actual reasons may be, this doesn’t change that fact that clients usually want the ability to update menu items from within their CMS. So we need a solution that makes it possible to edit menus from Cloudcannon.

## Assess the options

A popular way to create menus in Hugo is to set them up directly in the site configuration file - `config.toml` or `hugo.toml`[^1]. This is usually what I do for simple sites, like my own.

```toml
baseurl = "https://harrycresswell.com/"
languageCode = "en-gb"
title = "Harry Cresswell"

[[menu.main]]
name = "Index"
url = "/"
weight = 5

[[menu.main]]
name = "Writing"
url = "/writing/"
weight = 10

[[menu.main]]
name = "Links"
url = "/links/"
weight = 15

[[menu.main]]
name = "Topics"
url = "/topics/"
weight = 20
```

With a set up like this, the most obvious option would be to expose the entire config file to Cloudcannon. But that might not be the best idea. 

Config files tend to contain settings you wouldn’t want content editors to have access to. The site *title*, *languageCode* and *permalinks* all being good examples. Additionally, although you can create Hugo configuration files in TOML, YAML or JSON, Cloudcannon only supports YAML and JSON. So if your config file is TOML, you may find that you run into issues.

Ok, so if the config file option is off the table, then what else could we do?

An alternative option is to move your menu configuration to a data file. Then you could expose it in Cloudcannon, in the _Site Navigation_, as a data [Collection](https://cloudcannon.com/documentation/articles/what-is-a-collection/) .

In theory, this sounds like a good idea, but there’s a serious issue with this approach.

Using the `.Data` object to store a menu config means we can’t then make use of Hugo’s powerful menu functionality. `.Site.Menus` becomes something like `.Data.menus.somemenu`. And we no longer have access to methods –
like `.Children`, `.Name`, `.Identifier`, `.Params` – which are only available to the `.Menus` object. This is a problem.

So what’s should we be doing instead?

## Use the config directory for your menus 

The simple solution I’ve found is to move menus to a [configuration directory](https://gohugo.io/configuration/introduction/#configuration-directory), which is typically used in Hugo projects to organise larger configurations.

This approach involves creating a `config` folder at the root of the project, adding a `_default` folder within it, setting up a `menus` folder within that, then adding your menu YAML files.

```text
my-project/
└── config/
    ├── _default/
    │   ├── hugo.toml
    │   ├── menus/
    │   │   ├── menus.en.yaml
    │   │   └── menus.de.yaml
    │   └── params.toml
    └── production/
        └── params.toml
```

A side benefit of the config folder approach is that it’s nice and easy to create different menu translations for multilingual sites. Notice the `.en` and `.de` extensions in the file name for English and Deutsch, respectively.

When authoring the menu file itself, there are two important things to remember.

1. Cloudcannon doesn’t recognise TOML, so ensure menus are created in YAML.
2. Make sure you [omit the root key](https://gohugo.io/configuration/introduction/#omit-the-root-key) from the file, as Hugo takes this from the file name when using a configuration directory.

```yaml
main:
  - name: "Index"
    url: "/"
    weight: 5
  - name: "Writing"
    url: "/writing/"
    weight: 10
  - name: "Links"
    url: "/links/"
    weight: 15
  - name: "Topics"
    url: "/topics/"
    weight: 20
```

With the menu set up in your Hugo project, the next step is to make the menu editable for content editors. To do this we need to expose it to the Cloudcannon interface.

## Create a menu collection in Cloudcannon

As we identified earlier, it probably makes the most sense to add menus as a data [Collection](https://cloudcannon.com/documentation/articles/what-is-a-collection/). That way, they’re easy to access from the sidebar site navigation in Cloudcannon. But before we do that, first we have to tell Cloudcannon about any menus we might have and where to find them. 

Inside your `cloudcannon.config.yaml` file, add `collections_config` if it doesn’t already exist. Then set up a `menus` key and include the `path` to your menus folder, relative to the root of your Hugo project.

```yaml
collections_config:
  menus:
    # Accepts Google icon keys as value
    icon: menu
    # Folder where the files in this collection are stored
    path: config/_default/menus
    # Disable add buttons to prevent creation of files or folders
    disable_add: true
    disable_add_folder: true
```

Pay close attention to indentation, as this is important for Cloudcannon to understand your configuration. Notice we’ve also set `disable_add` and `disable_add_folder` as *true*. This will prevent content editors from being able to create new menus *and* new folders, within the menus collection.

With that, Cloudcannon is aware of our menu and knows where to find it.

## Adding your menu to the site

The next thing to do is to [configure your site navigation](https://non-unified.cloudcannon.com/documentation/articles/configure-your-site-navigation/) so Cloudcannon displays your menus and they’re easy to find. 

My preference is to display menus under the Data section in the _Site Navigation_. We can do this by setting up `collection_groups` (if it doesn’t exist already), then adding the `menus` collection we configured earlier under the Data heading.

```yaml
collection_groups:
  - heading: Collections
    collections:
      - writing
      - pages
  - heading: Data
    collections:
      - menus
```

With the above configuration in place, Cloudcannon will discover your menus and display an item called *Menus* in the site navigation that links to your menus.

## Customising menu item array inputs

In your Cloudcannon site, click on *Menus* in the site navigation, then click on your Menu file to open your menu. The data view will open and you will see your menu items.

Cloudcannon has used the format of the existing menu to correctly determine that it’s an [array input](https://cloudcannon.com/documentation/articles/array-inputs/). In other words, a list of [inputs](https://cloudcannon.com/documentation/articles/what-are-inputs/). Without describing these inputs Cloudcannon does it’s best to correctly render the fields it finds. In my case, those fields are `name`, `url` and `weight` - the three keys that currently make up each menu item.

As the creator of the website, there’s a high chance you’re familiar with these terms and what they refer to, but you can’t expect content editors to have the same level of  understanding. With this in mind, it makes sense to configure collection specific `_inputs` under your *menus* `collection_config`, which describe each input *type* and its intended purpose. We can do this by adding the name of the input, then using the the `type` and `comment` keys, respectively. In a Cloudcannon config, `type` determines how the interface is structured for the input and `comment` adds a visible text description beneath the input name in the interface.

```yaml
collections_config:
  menus:
    # Accepts Google icon keys as value
    icon: menu
    # Folder where the files in this collection are stored
    path: config/_default/menus
    # Disable add buttons to prevent creation of files or folders
    disable_add: true
    disable_add_folder: true
    # custom inputs only associated with this collection
    _inputs:
    # _inputs found within each menu item array
      name:
        type: text
        comment: Add the name of the menu item.
      url:
        type: url
        comment: URL that this menu item should link to.
      weight:
        label: Order
        type: number
        comment: Order menu item should appear in the menu.
```

Now each input type has been explained, we need to give Cloudcannon a template of sorts, so it knows how to populate the array, whenever a new menu item is added. 


## Tell Cloudcannon how to populate new menu item array inputs

This part isn’t essential, as Cloudcannon will always fallback to using the previous entry to populate new array items. But it will give you more control, as we’ll find out later when we look at how to add submenus.

As per the Cloudcannon docs: ”A [structured array](https://cloudcannon.com/documentation/articles/array-inputs/#structured-arrays) allows your team to select a predefined template to populate the inputs.” So the next step is to create a structured array.

To do this, add a new key under the `_inputs` key that matches the name of your menu in your Hugo config. My menu is called `main`, so that’s the key I’m using.

Next add `type: array` and another key called `options` one tab indentation in. Make another indentation underneath `options` and add a key called `structures`. The value for this key needs to be `_structures` followed by `.`, then your menu name. In my case, `_structures.main`.

```yaml
collections_config:
  menus:
    # Accepts Google icon keys as value
    icon: menu
    # Folder where the files in this collection are stored
    path: config/_default/menus
    # Disable add buttons to prevent creation of files or folders
    disable_add: true
    disable_add_folder: true
    # custom inputs only associated with this collection
    _inputs:
    # _inputs found within each menu item array
      name:
        type: text
        comment: Add the name of the menu item.
      url:
        type: url
        comment: URL that this menu item should link to.
      weight:
        label: Order
        type: number
        comment: Order menu item should appear in the menu.
      main:
        type: array
        comment: The main menu found at the very top of the site.
        options:
          # Reference the array item in _structures.
          structures: _structures.main
```

What we’re doing here is referencing a [structure](https://cloudcannon.com/documentation/articles/what-is-a-structure/) (a template) used to determine how our menu array should be populated. We haven’t defined it yet so we’ll need to do that next. 

Structures are defined underneath the `_structures` key and can be defined at any level of the [configuration cascade](https://cloudcannon.com/documentation/articles/using-the-configuration-cascade/). Here I’ve defined a structure for my `main` menu at the [collection level](https://cloudcannon.com/documentation/articles/structures-in-the-configuration-cascade/#define-a-structure-at-the-collection-level). This makes sense as this structure is only used by my menus collection. 

```yaml
collections_config:
  menus:
    # Accepts Google icon keys as value
    icon: menu
    # Folder where the files in this collection are stored
    path: config/_default/menus
    # Disable add buttons to prevent creation of files or folders
    disable_add: true
    disable_add_folder: true
    # custom inputs only associated with this collection
    _inputs: 
      # _inputs found within each menu item array
      name:
        type: text
        comment: Add the name of the menu item.
      url:
        type: url
        comment: URL that this menu item should link to.
      weight:
        label: Order
        type: number
        comment: Order menu item should appear in the menu.
      main:
        type: array
        comment: The main menu found at the very top of the site.
        options:
          # Reference the array item in _structures.
          structures: _structures.main
    _structures:
      # See _structures.main in menus specific _inputs
      main:
        values:
          - value:
              name:
              url:
              weight:
```

The [Cloudcannon documentation on creating a structure](https://cloudcannon.com/documentation/articles/create-a-structure/) thoroughly explains how to correctly build a structure. But essentially, you need to specify the values of the inputs that make up the array. In my case, `name`, `url` and `weight`. We don’t need to add any more context as these inputs have already been described in the `_inputs` configuration.

With a structure in place for the menu, Cloudcannon will populate new menu items with the correct inputs and everything should work as expected.

Now we’ve got a menu set up and functioning correctly in Cloudcannon, let’s take a look at some of the other cases you may encounter.

## Dealing with multiple menus

If you have multiple menus on a site, assuming they are structured with the same keys/inputs, then the first step is to get the extra menu added to your `menus.en.yaml` configuration file.

```yaml
main:
  - name: "Index"
    url: "/"
    weight: 5
  - name: "Writing"
    url: "/writing/"
    weight: 10
  - name: "Links"
    url: "/links/"
    weight: 15
  - name: "Topics"
    url: "/topics/"
    weight: 20
footer:
  - name: "Privacy Policy"
    url: "/privacy-policy/"
    weight: 1
  - name: "Terms of service"
    url: "/terms-of-service/"
    weight: 2
  - name: "Warranty"
    url: "/warranty/"
    weight: 3
  - name: "Sitemap"
    url: "/sitemap/"
    weight: 4
	
```

Next, register the name of the menu underneath your `menus` collection config `_inputs`. In my case, I’ve defined a new array type called `footer` to reflect the name of my second menu.

```yaml
collections_config:
  menus:
    # Accepts Google icon keys as value
    icon: menu
    # Folder where the files in this collection are stored
    path: config/_default/menus
    # Disable add buttons to prevent creation of files or folders
    disable_add: true
    disable_add_folder: true
    # custom inputs only associated with this collection
    _inputs:
      # _inputs found within each menu item array
      name:
        type: text
        comment: Add the name of the menu item.
      url:
        type: url
        comment: URL that this menu item should link to.
      weight:
        label: Order
        type: number
        comment: Order menu item should appear in the menu.
      main:
        type: array
        comment: The main menu found at the very top of the site.
        options:
          # Reference the array item in _structures.
          structures: _structures.main
      footer:
          type: array
          label: Legal
          comment: The menu found at very bottom of the site.
    _structures:
      # See _structures.main in menus specific _inputs
      main:
        values:
          - value:
              name:
              url:
              weight:
```

As all the inputs used in my *footer* menu are the same as my *main* menu, there’s nothing else to do. The second menu is set up and will be editable in Cloudcannon just like the first.

## Handling menu items with children (submenus)

In Hugo projects, submenus are relatively easy to create. The [HasChildren](https://gohugo.io/methods/menu-entry/haschildren/) method can be used to check if a menu item has child menu item. And, the [Children](https://gohugo.io/methods/menu-entry/children/) method can be used to return a collection of child menu items.

Consider the following for example:

```go
<ul>
  {{ range .Site.Menus.main }}
    <li>
      <a href="{{ .URL }}">{{ .Name }}</a>
      {{ if .HasChildren }}
        <ul>
          {{ range .Children }}
            <li><a href="{{ .URL }}">{{ .Name }}</a></li>
          {{ end }}
        </ul>
      {{ end }}
    </li>
  {{ end }}
</ul>
```

Of course, the above code won’t render anything, unless you create at least one child item in your menu configuration. 

Child items are created by adding the [parent](https://gohugo.io/methods/menu-entry/parent/) key to a menu item, where the value matches the `name` of another item in your menu that you wish to be the parent.

Consider the following updates to my *main* menu configuration:

```yaml
main:
  - name: "Index"
    url: "/"
    weight: 5
  - name: "Writing"
    url: "/writing/"
    weight: 10
  - name: "Links"
    url: "/links/"
    weight: 15
  - name: "Topics"
    url: "/topics/"
    weight: 20
  - name: "Cloudcannon"
    parent: "Topics"
    url: "/topics/cloudcannon/"
    weight: 5
```

Assuming you have a menu set up similar to this in your templates, then there are a few extra steps we can take to offer an acceptable editing experience in Cloudcannon.

First, we’ll add a new key called `submenu` to any child items. This will be a boolean (true/false) with a value of `true`.  This has no impact in respect of Hugo, but will give us more control over the editing interface in Cloudcannon.

```yaml
main:
  - name: "Index"
    url: "/"
    weight: 5
  - name: "Writing"
    url: "/writing/"
    weight: 10
  - name: "Links"
    url: "/links/"
    weight: 15
  - name: "Topics"
    url: "/topics/"
    weight: 20
  - name: "Cloudcannon"
    submenu: true
    parent: "Topics"
    url: "/topics/cloudcannon/"
    weight: 5
```

The next step is to add two new `_inputs` to our `cloudcannon.config.yaml` file. These inputs describe `submenu` and `parent`.

```yaml
collections_config:
  menus:
    # Accepts Google icon keys as value
    icon: menu
    # Folder where the files in this collection are stored
    path: config/_default/menus
    # Disable add buttons to prevent creation of files or folders
    disable_add: true
    disable_add_folder: true
    # custom inputs only associated with this collection
    _inputs:
    # _inputs found within each menu item array
      name:
        type: text
        comment: Add the name of the menu item.
      submenu:
        label: Is submenu item
        type: switch
        comment: Enable if menu item is part of a submenu.
      parent:
        type: text
        comment: Parent menu item that submenu is a descendant of.
        # If submenu switch is enabled, then show this hidden field.
        hidden: '!submenu'
      url:
        type: url
        comment: URL that this menu item should link to.
      weight:
        label: Order
        type: number
        comment: Order menu item should appear in the menu.
      main:
        type: array
        comment: The main menu found at the very top of the site.
        options:
          # Reference the array item in _structures.
          structures: _structures.main
```

Before me move on, there are a couple of things to note here. 

*Submenu* has been given the type `switch`, so that the input appears as a switch-style checkbox in the editor. With this in place, any menu items in the configuration that have `submenu: true` will show an enabled switch in Cloudcannon. And, content editors will need to enable this switch for any new items they add which are part of a submenu. 

*Parent* is a text input, and should be configured in Cloudcannon by typing the name of the parent menu item, just as we did in our menu configuration file in Hugo. You’ll see we’ve added `hidden: '!submenu'` to hide this input unless the *submenu* switch is enabled. This is a simple way to keep the editor clear of extra inputs until they are required.

Now we’ve explained our inputs, Cloudcannon will render them in the editor correctly.

The final step is to update our menu structure to include `submenu` and `parent`. I’ve added these just below `name`, as this is the order I want them to appear in the array whenever a new menu item is added.

```yaml
# STRUCTURES
_structures:
  # See _structures.main in menus specific _inputs
  main:
    values:
      - value:
          name:
          submenu:
          parent:
          url:
          weight:
```

 Now, whenever new items are added to a menu in the Cloudcannon editor, the template used to populate the array will include our new *submenu* switch and the *parent* field. But, the *parent* input will remain hidden until the *submenu* switch is enabled by whoever is editing content.

## Final thoughts

As we’ve seen, there’s nothing too complicated about getting Hugo menus to play nice with Cloudcannon. Though, certain approaches are more suitable than others.

In my experience, Config directory menus seem to be the way to go. They definitely provide the most flexibility, especially if you plan on working with the [methods available to the Menu object](https://gohugo.io/methods/menu-entry/). Just remember to author your menu files in YAML so Cloudcannon can understand them.

That‘s all I know about setting up Hugo menus in Cloudcannon. If you have any of your own experiences that you’d like to share, then drop me an email, it would be great to hear from you.




[^1]: `config.toml` and `hugo.toml` are two different names for the same configuration file. The latter is the name used in later Hugo versions.

