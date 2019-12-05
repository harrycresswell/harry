---
title: "Performant syntax highlighting in Hugo"
date: 2019-12-02T12:56:26Z
draft: false
description: "The quickest and most performant way to set up syntax highlighting in Hugo."
slug: "performant-syntax-highlighting-in-hugo"
tags: ["Hugo"]
syndicate: "false"
---

The quickest way to use syntax highlighting in Hugo is with [Chroma](https://github.com/alecthomas/chroma), the default syntax highlighter. Without any config, you can wrap a code block in the built in `highlight` Shortcode, pass in the language as a variable and you’re code will be highlighted:

```
{< highlight go >}
	// Html code to highlight
{< / highlight >}
```

_Note: to render the example above on the page I have used single curly braces. You will need to use double curly braces._

The advantage of using Chroma over other JavaScript libraries like [Highlight.js](https://highlightjs.org/) or [Prisma.js](https://prismjs.com/) is that it’s built right into Hugo and doesn’t require any external dependencies. This make it extremely fast and reliable. 

Out of the box, however, Chroma doesn’t give us much control over the style of our highlighted code. To change that all we need to do is add one line of code to the top level of our `config.toml` file:

```yaml
# Enable for syntax highlighting
pygmentsUseClasses = true
```

_Note: It’s important you add this line to the top level and not under `[params]` if you want it to work. Something like this should do it:_


```yaml
baseurl = "http://localhost:1313/"
theme="theme name"
languageCode = "en"
title = "your site title"

# Enable for syntax highlighting
pygmentsUseClasses = true
```


## Adding option for code fencing

It is also possible to add syntax highlighting to code within code fences. To enable this add the following to your `config.toml` file:

```yaml
pygmentsCodefences = true
```

Now you can wrap your code in two sets of triple backticks (```) and specify the language after the opening set to highlight the code correctly. Make sure you check the [list of supported langauges](https://github.com/alecthomas/chroma#supported-languages).

```
(```) yaml
pygmentsUseClasses = true
pygmentsCodeFences = true
(```)
```

_Note: Make sure you omit the parentheses as seen above. This is just to show you the code without it rendering._ 

Now you can highlight any syntax inside of code fences:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

## Customising your syntax theme

To change the theme of your syntax highlighting generate `chromastyles`. Then set the name of the theme you want using the `--style` flag. 

From the command line run:

```
hugo gen chromastyles --style=lovelace > syntax.css
```

This will generate the `syntax.css` file at the root of your project. 

See [https://xyproto.github.io/splash/docs/](https://xyproto.github.io/splash/docs/) for available themes. You can also run `hugo gen chromastyles -h` to see more options. 

Don’t forget to link to the stylesheet from the <head> of your document otherwise your theme won’t work!
