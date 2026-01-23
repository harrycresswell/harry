---
title: "The config directory"
date: 2026-01-23T11:33:01Z
draft: false
slug: "config-directory"
topics: ["Hugo", "Cloudcananon"]
description: "For bigger projects, with large configurations, it’s often a good idea to split your `hugo.toml` file into multiple files using the config directory."
---

For simple Hugo sites, a single configuration file is usually all you’ll need. However, for bigger projects, with large configurations, it’s often a good idea to split your `hugo.toml` file into multiple files using the [configuration directory](https://gohugo.io/configuration/introduction/#configuration-directory). 

The config directory is helpful for managing how your config behaves across different environments, as well as for organising multilingual menus, params, modules, build options and various other site configuration settings.

In this post we’re going to look at how it works.

## Create a `/config` directory

To get going, you’ll need to create a `./config` directory at the root of your project. Then add a sub directory called `_default` inside. 

```bash
config/
└── _default/
```

Next, create a file called `hugo.toml` inside the `_default` folder for your default configuration. 

```bash
my-project/
└── config/
    └── _default/
        └── hugo.toml
```

Now, head back to the `hugo.toml` file found at the root of your project and copy everything that typically lives at the top of the file. Then paste it into your new default config file found at `config/_default/hugo.toml`.

Assuming you’re working with a fresh Hugo project, then you’ll most likely be copying over the following three lines of TOML data:

```toml
baseURL = 'http://example.org/'
languageCode = 'en-gb'
title = 'My New Hugo Site'
```

It’s important to note that `config/_default/hugo.toml` will now override your original config file. So you might as well transfer everything across and delete the original file from the root of your project.

In theory, you could then use `config/_default/hugo.toml` for the whole of your config. For example:

```toml
baseURL = 'http://example.org/'
languageCode = 'en-gb'
title = 'My New Hugo Site'

[menus]
  [[menus.main]]
    name = 'Home'
    pageRef = '/'
    weight = 10
  [[menus.main]]
    name = 'About'
    pageRef = '/about'
    weight = 20

[params]
  subtitle = 'Reference, Tutorials, and Explanations'
  [params.contact]
    email = 'info@example.org'
    phone = '+1 206-555-1212'
```

But, storing all of your configuration inside `config/_default/hugo.toml` kind of defeats the point of using the config directory altogether. 

You’re likely here because you’re configuration is large and unwieldy. Or you’re looking to create environment specific configs (which we’ll get to shortly). So the best option is to split up your configuration to make it easier to manage. 

## Create individual files for each root object

The idea is to create a file for each root object found in your original config file. When creating a new file, it’s important to name the file after the root configuration key.

For example, let’s say you have a bunch of params stored under the `[params]` root configuration key. That means you’ll need to create a new file called `params.toml` inside `config/_default/`, where those particular configuration settings will live.

```bash
my-project/
└── config/
    └── _default/
        ├── hugo.toml
        ├── params.toml
        ├── menus.toml
        └── pagination.toml
```

As you can see above, the same goes for any other root configuration keys you might have in your original config file.  You can find a list of [all the possible configuration keys](https://gohugo.io/configuration/introduction/#configuration-directory) in the Hugo Docs.

## Omit the root key

When you add configuration content to each file, make sure you omit the root key from the file. The name of the file replaces the root key.

For example, where you menu configuration in your original `hugo.toml` file might have looked like this: 

```toml
[menus]
  [[menus.main]]
    name = 'Home'
    pageRef = '/'
    weight = 10
  [[menus.main]]
    name = 'About'
    pageRef = '/about'
    weight = 20
```

Your  `./config/_default/menus.toml` file should look like this:

```toml
[[menus.main]]
  name = 'Home'
  pageRef = '/'
  weight = 10
[[menus.main]]
  name = 'About'
  pageRef = '/about'
  weight = 20
```

Almost exactly the same, except the file no longer contains the `[menus]` root key at the top of the file.

## Configure languages and localised files

Using the config directory for multilingual websites involves storing configuration settings across various files. 

The first step is to add base language settings inside `config/_default/hugo.toml`. This tells Hugo what the default language should be when someone lands on your website. For example:

```toml
baseURL = 'http://example.org/'
languageCode = 'en-gb'
title = 'My New Hugo Site'

# Language base settings
defaultContentLanguage = 'en'
defaultContentLanguageInSubdir = false
disableDefaultLanguageRedirect = false
disableLanguages = []
```

You can read more about [language base settings](https://gohugo.io/configuration/languages/#base-settings) in the Hugo Docs.

The next step is to create a new `languages.toml` file in the `_default` directory. This file will contain any settings usually found under the `languages` key.

```bash
my-project/
└── config/
    └── _default/
        ├── hugo.toml
        ├── params.toml
        ├── menus.toml
        ├── pagination.toml
        └── languages.toml
```

Your `config/_default/languages.toml` file might look like this, for example:

```toml
[languages.en]
  contentDir = 'content/english'
  languageName = 'English'
  languageCode = 'en-GB'
  languageDirection = 'ltr'
  weight = 10
[languages.de]
  contentDir = 'content/deutsch'
  languageName = 'Deutsch'
  languageCode = 'de-DE'
  languageDirection = 'ltr'
  weight = 20
```

Notice, just as before, the `[languages]` root configuration key has been omitted.

With languages configured, files can now be localised to become language specific. 

For example, if your site supports English and German, you might wish to translate menu items for each language. To do this, you’ll need to create two files for the different menus. One for English translations and one for German. You’d name each file `menus.<language>.toml`, using a valid BCP 47 language tag in the file name. 

Consider the following, for example:

```bash
my-project/
└── config/
    └── _default/
        ├── hugo.toml
        ├── params.toml
        ├── languages.toml
        ├── menus.en.toml
        └── menus.de.toml
```

See [RFC 5646](https://datatracker.ietf.org/doc/html/rfc5646#section-2.1) for more details on how to construct language tags.

Your `config/_default/menus.en.toml` might look like this, for example:

```toml
[[menus.main]]
  name = 'About'
  pageRef = '/about'
  weight = 10
[[menus.main]]
  name = 'Services'
  pageRef = '/services'
  weight = 20
[[menus.main]]
  name = 'Contact'
  pageRef = '/contact'
  weight = 30
```

While your `config/_default/menus.de.toml` file might look like this, for example:

```toml
[[menus.main]]
  name = 'Über Mich'
  url = '/ueber-mich/'
  pageRef = '/about'
  weight = 10
[[menus.main]]
  name = 'Leistungen'
  url = '/leistungen/'
  pageRef = '/services'
  weight = 20
[[menus.main]]
  name = 'Kontakt'
  url = '/Kontakt/'
  pageRef = '/contact'
  weight = 30
```

Simple stuff!

## Working with different environments

Adding configuration settings for different environments involves setting up sub directories for each environment. 

First create a sub directory named after each environment, then add environment specific configuration files to the respective sub directory.

```bash
my-project/
└── config/
    ├── _default/
    │   ├── hugo.toml
    │   ├── languages.toml
    │   ├── params.toml
    │   ├── menus.en.toml
    │   └── menus.fr.toml
    ├── production/
    │   ├── hugo.toml
    │   └── params.toml
    └── staging/
        ├── hugo.toml
        └── params.toml
```

Hugo will continue to use your  `_default` configuration, then merge the non-default environment settings on top for the respective environment. That means you don’t need to include default settings in your non-default environment files. Only include settings specific to the environment.

### Conditionally render analytics based on environment

To give you an example of how this works, let’s say you wish to implement [Fathom Analytics](https://usefathom.com/) on a website. A typical way to do this is to add the Fathom Site ID under the `[params]` configuration key in your `hugo.toml` file.

```toml
[params]
fathom_id = 'ZYSUYIBA'
```

From here you might open either your `baseof.html` template or perhaps a `head.html` partial, depending on where your site `<head>` is stored. Then, somewhere inside the `<head>`, you can render the Site ID in the script tag that Fathom provides.

```html
{{ $fathomId := .Site.Params.fathom_id }}
{{ with $fathomId }}
  <script src="https://cdn.usefathom.com/script.js" data-site="{{ . }}" defer></script>
{{ end }}
```

The issue with this approach is that the script tag will render and send tracking data to Fathom, no matter the environment. But, you don’t really want to render the script tag when working in development, as this will skew the tracking data.

To solve this problem, the next step would be to exclude the Fathom related config from `config/_default/hugo.toml`, which happens to be the config file used for development.

Taking this step will prevent the the Site ID rendering in the script tag. Therefore, when you run `hugo server` and work on the site locally, no data will be sent back to Fathom and you’re production data will remain unaffected by your work.

But you’ll still need to make sure the tracking script and Site ID render for the production website. To make that happen you can move the Fathom related config to `config/production/hugo.toml`:

```toml
[params]
fathom_id = 'ZYSUYIBA'
```

You could then update the template with some conditional logic, so the script tag  only renders when the environment is set to *production*.

```html
{{ $fathomId := .Site.Params.fathom_id }}
{{ if eq hugo.Environment "production" }}
  {{ with $fathomId }}
    <script src="https://cdn.usefathom.com/script.js" data-site="{{ . }}" defer></script>
  {{ end }}
{{ end }}
```

Now you can include the specific environment flag when running the `hugo` command. 

```yaml
hugo --environment production
```

This will build the site with your default configuration, then merge any production environment settings on top.

It’s worth noting that you can also set the environment when using `hugo server`. 

```yaml
hugo server --environment production
```

This will help you check everything is set up and working correctly, locally in a browser.

### Configuring base URLs for staging and production

Another good use case for the config directory is to control the `baseurl` of your website across different environments.

For example, let’s say you’re deploying a site using [Cloudcannon](https://cloudcannon.com/). Once your site has built, Cloudcannon automatically provides [a testing domain](https://cloudcannon.com/documentation/articles/what-is-a-testing-domain/) so you can see your site live on the web. 

To configure your site, so that it renders as expected and nothing breaks during deployment, the first thing to do is add this testing domain as the value of `baseurl` inside `config/staging/hugo.toml`. 

```toml
baseurl = "https://crimson-piano.cloudvent.net/"
```

Next, you’ll need to [configure the environment variable](https://cloudcannon.com/documentation/articles/configure-your-environment-variables/) in your Cloudcannon project site settings. That way, Cloudcannon will know the correct build command to run when deploying the site.

```
hugo --environment staging
```

Now, whenever you push your changes, Cloudcannon will redeploy your website and replace the `baseurl` found inside `config/_default/hugo.toml` with the testing domain found inside `config/staging/hugo.toml`. 

Of course, if you also have a production version of your project on Cloudcannon, then the domain for that project (most likely a custom one) should populate the `baseurl` field inside your `config/production/hugo.toml` file.

```toml
baseurl = "https://fancy-custom-domain.com/"
```

Just as you did with your staging site, you’ll also need to configure the environment variable in your Cloudcannon project site settings.

```
hugo --environment production
```

Simple stuff, made easy by the configuration directory.

## Summary

That was a quick look at how organising your configuration using the config directory. This approach is particularly helpful when working with different environment settings, or simply when you wish to make a large config file more manageable.

The final thing to point out is that you don’t have to use TOML for your config files, as I have done in this post. You may prefer to use the YAML or JSON format, both of which are perfectly valid. If, however, you wish to expose your configuration settings to a content management system like Cloudcannon (see [How to set up a Hugo menu in Cloudcannon](https://harrycresswell.com/writing/hugo-menus-in-cloudcannon/) for more on this), then you may, in fact, need to use YAML or JSON, as the TOML format isn’t supported.

