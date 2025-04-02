---
title: "Rendering links in Hugo projects using Cloudcannon’s Rich Text Editor"
date: 2025-03-19T11:52:30Z
draft: false
slug: "rendering-links-in-hugo-projects-using-cloudcannons-rich-text-editor"
topics: ["Hugo", "Cloudcannon"]
description: "When working with Hugo, you may run into issues when attempting to format text content using Cloudcannon’s ink option. This post provides a solution."
---

Cloudcannon’s Rich Text Editor, like most rich text editors, allows you to format – or ”markup” – your content via the [WYSIWYG toolbar](https://cloudcannon.com/documentation/articles/rich-text-editor-reference/#wysiwyg-toolbar), found at the top of the [Rich Text Editor](https://cloudcannon.com/documentation/articles/what-are-rich-text-editors/).

The various formatting options found in the toolbar can be enabled, disable, and configured from inside your `cloudcannon.config.yml` file. All you need to do is add your options under the `_editables` key. 

By default, the following text formatting options are enabled:

```yaml
_editables:
  content:
    blockquote: true
    bold: true
    format: p h1 h2 h3 h4 h5 h6 pre address div
    italic: true
    link: true
    strike: true
    subscript: true
    superscript: true
    underline: true
```

Providing your project includes a basic CSS file that contains global styles for your typical text formatting options, then most of the options above will work without issue.

However, when working with Hugo, you may run into issues when attempting to format text content using Cloudcannon’s `link` option. When using a Rich Text Editor, you’ll find it’s possible to select text and create an anchor link to another webpage. But, when you save your changes and your site has rebuilt, if you view your page in a browser, you will notice that the link has been stripped from the text. 

If this is the case, then open your browsers Inspect tool and navigate to the offending element to identify the problem. 

```html
<p>
"Here’s "
<!-- raw HTML omitted -->
"a link to my website"
<!-- raw HTML omitted -->
</p>
```

Here you’ll find the code typically used to create a link has been replaced with two `<!-- raw HTML omitted -->` comments, which surround the text you are trying to turn into a link. 

The reason for this is because, behind the scenes, Cloudcannon’s *link* option inserts HTML into markdown[^1]. However, Goldmark – the markdown engine used by Hugo – disallows HTML in Markdown files, by default. Goldmark does this to prevent possible breaking changes, where, for example, an editor with little experience authoring HTML may accidentally insert a `<div>` and forget to close it with a closing tag (`</div>`), which could in theory break the layout of the page.

Assuming you are happy to expose these potential risks to content editors, then the simple solution to this problem is to add the following to the root of your `hugo.toml` (or `config.toml`) configuration file.

```toml
# Allow HTML in markdown (use with caution)
[markup.goldmark.renderer]
unsafe = true
```

This tells Goldmark to allow the rendering of any potentially “unsafe” HTML that may be added to markdown files - links included. With these two lines added to your Hugo configuration, Cloudcannon’s Link formatting option will work as expected. 

Happy linking!


[^1]: **02-03-25**: Since publishing this post and sharing it with the Cloudcannon community, Ross Phillips has offered further insights about [how Cloudcannon handles links in Markdown](https://community.cloudcannon.com/t/rendering-links-in-hugo-projects-using-cloudcannon-s-rich-text-editor/197/2?u=harrycresswell). Basically, Cloudcannon will try to save links in Markdown, however, if anchor elements have attributes that cannont be preserved using Markdown, then HTML is used instead.
