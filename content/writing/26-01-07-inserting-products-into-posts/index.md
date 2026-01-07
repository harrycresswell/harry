---
title: "Inserting products into posts"
date: 2026-01-07T10:47:05Z
draft: false
slug: "inserting-products-into-posts"
topics: ["Hugo", "Cloudcannon"]
description: "How to render content from a page found in one content section (or collection) inside a page found in another content section."
---

There are times when you might wish to insert content from one page into the content of another. This could be any type of content really, but to give you a better idea of what I mean by this, take the project I’m currently working on as an example.

In this project, my client wants to be able to insert content from product pages intermittently into the content of blog posts.

Here’s how this content is organised in the Hugo project:

```bash
content/
  products/
    product-name.md
  posts/
    blog-post-one.md
```

Notice I have a content collection (or [Section](https://gohugo.io/content-management/sections/#article) in Hugo terminology) set up for *products* and another collection for *posts*. Each collection contains markdown files which store the content for individual products and posts, respectively.

So how would we go about inserting products into posts?

## Shortcodes and the `.Site.GetPage` method 

If you’re already thinking [Shortcodes](https://gohugo.io/content-management/shortcodes/) then you’re on the right track. 

Shortcodes are a useful mechanism in Hugo which allow you to insert templating logic into the content of markdown files, whilst abstracting the complexity of that templating logic, so as not to expose it to content editors.

Hugo conveniently also includes the [.Site.GetPage](https://gohugo.io/methods/site/getpage/) method, which allows you to get hold of a specific page you pass to it as an argument. This is perfect for inserting page content from a content file stored in one section into the page from another.

For `.Site.GetPage` to function correctly, it requires the logical path of the content to be passed as the argument. That is, the path relative to the content folder minus the file extension. For example:

```go
{{ with .Site.GetPage "/products/love-me-do-light-nourishing-oil" }}
  do something with page content...
{{ end }}
```

Here’s what that looks like in my `product.html` shortcode, which can be found in the `layouts/shortcodes` folder:

```go
{{ $title := .Get "title" }}
{{ $page := .Get "path" }}
{{ with .Site.GetPage $page }}
  <h2 class="h3">{{ with $title }}{{ . }}{{ else }}{{ .Title }}{{ end }}</h2>
  ...
{{ end }}
```

Notice that instead of hard coding the page path as in the previous example, I’m now passing it to the shortcode using the `path` key, which is stored in a variable. This make the shortcode infinitely more useful.

As you can see by how the shortcode is used in a content file, it’s now possible for content editors to pass any content file as the path.

```go
{{ < product title="Love Me Do Light Nourishing Oil" path="products/love-me-do-light-nourishing-oil" > }}
```

_**Note**: Hugo will try to render shortcodes even when they’re found within codeblocks, as above. So I’ve left a space between `{{` and `<`, and likewise `>` and `}}`, simply to prevent Hugo from rendering the shortcode. These spaces should be removed in production use cases._

This solves our problem, but we can’t expect content editors to manually type out the relative path of a product. At this point we need to consider our CMS configuration.

I use [Cloudcannon](https://cloudcannon.com/) to allow my client to edit the content on their websites. So the next step is figuring out how to make this shortcode play nice with Cloudcannon. That way content editors will be able to insert pages from one collection into pages in another, without ever touching any code.

## Configuring Cloudcannon

In Cloudcannon, shortcodes are rendered using [Snippets](https://cloudcannon.com/documentation/articles/what-is-a-snippet/). Cloudcannon has excellent documentation on how to set up [Snippets using Hugo Shortcodes](https://cloudcannon.com/documentation/articles/snippets-using-hugo-shortcodes/), so I won’t cover that in detail here. 

What I will say is that you need to configure a [Custom Hugo Shortcode](https://cloudcannon.com/documentation/articles/snippets-using-hugo-shortcodes/#custom-hugo-shortcodes) using the `hugo_shortcode_named_args` template for this to work correctly. Then you want to [populate the options of a select input with pages from a collection](https://cloudcannon.com/documentation/articles/populate-a-select-input/#collections). 

We can do this by adding an `_inputs` configuration for `path`, to the shortcode configuration. 

```yaml
_inputs:
  path:
    type: select
    label: Choose a product
    comment: Choose a product from the products collection.
    options:
      values: collections.products
```

But we’re not quite there yet. Without any further configuration, Cloudcannon will insert the file relative to the site root, including the file extension. For example:

```bash
/content/products/product-name.md
```

If you remember, Hugo’s `.Site.GetPage` method requires that the path is relative to the content folder, rather than to the site root. It’s also necessary to remove the file extension from the path. For example:

```bash
/products/product-name
```

So we need to configure how Cloudcannon handles the path. In other words, we need to remove the content folder and file extension from the path.

The solution is to add the `value_key` field to our `_input` configuration and make sure the value is set to `url`.

```yaml
_inputs:
  path:
    type: select
    label: Choose a product
    comment: Choose a product from the products collection.
    options:
      values: collections.products
      value_key: url # Use relative path that the file would appear at once site is built
```

Now consider the full snippet configuration:

```yaml
_snippets:
    product:
      template: hugo_shortcode_named_args
      inline: false
      preview:
        text: Product
        subtext: Insert a product from the products collection.
      definitions:
        shortcode_name: product
        named_args:
          - source_key: title
            editor_key: title
            type: string
          - editor_key: path
            type: string
      _inputs:
        title:
          type: text
          label: Heading
          comment: Give your product a heading.
        path:
          type: select
          label: Choose a product
          comment: Choose a product from the products collection.
          options:
            values: collections.products
            value_key: url # Use relative path that the file would appear at once site is built
```

With the full configuration in our `cloudcannon.config.yml` file, content editors can now insert content from product pages found inside the *products* collection into the body of post pages found in the *posts* collection.

A special thanks to Ryan at Cloudcannon for helping get this final part set up correctly.