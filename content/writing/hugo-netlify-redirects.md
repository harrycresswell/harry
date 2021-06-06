---
title: "Hugo and redirects"
date: 2021-06-03T09:00:00+01:00
draft: false
description: "Working with redirects on Hugo websites that deploy with Netlify. Why redirects are important if you make changes to the structure of your content, and how to set them up in less than 5 minutes."
slug: "hugo-netlify-redirects"
topics: ["Hugo", "Netlify"]
syndicate: "false"
---


With Hugo websites, the URL path of your pages mirrors the directory structure of your content folder. So when you make changes to where your markdown files live – let’s say by moving files to a subdirectory of the content folder – then you can expect the URL path for each piece of content to change too.

A few days ago I did exactly this and moved all articles on this site from `./content/articles` to `/content/writing`. I did the same for `./content/notes`. The process was as simple as dragging all the markdown files from the original directory into a new one. It took less than a minute.

Here’s what those paths looked like before the change, versus what they look like now.

```
https://harrycresswell.com/articles/some-content // old path
https://harrycresswell.com/notes/some-content // old path
https://harrycresswell.com/writing/some-content // new path
```

Although it’s easy to move content around in Hugo websites, before you do it’s worth considering the impact these changes will have. Arguably the most important thing to understand is that any change you make to a URL path will have a serious impact on both how your content appears in search results and backlinks to your content from other websites. 

## The impact of URL changes to search results and backlinks

Let’s assume a search engine hasn’t had time to reindex your website since you made changes to the structure of your content. This is highly likely as you can’t predict when it will crawl your website, unless you manually tell it to.

In this case your content will display in search results as you might expect, however if someone clicks on the link they’ll most likely find themselves staring at a 404 error page. This is because the browser is still pointing to the old path, rather than the new one. The link breaks as the browser is unaware of the changes you’ve made. It will remain this way until it reindexes your website. And that’s a real problem.

Now consider the impact on backlinks. Unlike with search engines which will eventually re-crawl your website, with backlinks it’s impossible for a bot to tell every single website that links to your site that the URL paths have changed. 

So once you make the changes to the URL path, any pre-existing link to your content from another website will break and remain broken, effectively forever. You’d have to know about every single link to the content in question, then contact the admin of each website and ask them to manually update the link to the new URL path. Hardly realistic.

Avoiding both these issues is simple. You can set up permanent redirects to tell the browser what to do when it tries to reach a dead link that no longer exists. In most cases, setting up redirects will take you less than 5 minutes. However there are a few different approaches to consider. 

What follows is my research into setting up redirects with Hugo and the approach I ended up using on this site.


## Hugo Aliases or Netlify Redirects

If your site is built with Hugo then you might consider using [Hugo Aliases](https://gohugo.io/content-management/urls/#aliases). For those using Netlify, you have the option of [Netlify Redirects](https://docs.netlify.com/routing/redirects/). Both these approaches pretty much do the same thing, but there are some caveats.

As [David points out on the Hugo Discourse](https://discourse.gohugo.io/t/hugo-aliases-vs-netlify-redirect/19364/3?u=harrycresswell):

> Netlify redirects are redirects via header, Hugo redirects load the page first, then the page redirects. So you should always use Netlify redirects if you can, they will save some milliseconds. 

That being said, if you don’t use Netlify or think you might move away from their service in the future, then Hugo Aliases might be the better option as they are part of your website project and not dependent on Netlify. 

I’m currently using Netlify Redirects for the reasons David mentions.

Next we have two more options. 

## _redirects file or redirects inside netlify.toml

You can choose to either set up a `_redirects` file in the static folder of your Hugo project, so it’s passed through to the public folder when deploying. As Netlify point out, [the _redirects file should end up in the folder you’re deploying](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file).

Alternatively you might decide to add the redirects to a [netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/) configuration file at the root of your project. 

Both approaches will result in the same outcome. However the benefit of the first option is that it’s portable and recognised outside of the Netlify ecosystem. This would make life much easier if you ever decide to move away from Netlify.

The downside is you can’t configure quite as much as you can inside your `netlify.toml`. In my case I don’t need to do much more than the very basics. I know I can do everything I need to do with a `_redirects` file, so I decided to go with that.

## Understanding the _redirects file syntax

Ok, so here’s my `_redirects` file. 

```
/articles/*   /writing/:splat     301
/notes/*      /writing/:splat     301
/tags/*       /topics/:splat      301
```

To break this down, picture the redirects above as a table. What follows will make more sense if you do.

- The first column (left) is the _from_ rule, or the path you want to redirect. 
- The second column (middle)  is the _to_ rule. In other words, the URL or path you want to redirect to. 
- The third and final (right) column is the _status_ rule, consisting of what’s called an [HTTP status code](https://docs.netlify.com/routing/redirects/redirect-options/#http-status-codes). There are quite a few status codes you can use, but for now we’re interested in the 301 status. 301 stands for a permanent redirect. It tells the client (browser) that the address for this resource has permanently changed and the URL in the browser will show the new address.

So what’s the asterisk (`*`) and `:splat` flag about?

The asterisk will redirect all paths found inside the folder it follows. So in the case of `/articles/*` that’s all paths under `/articles/`. Just like the CSS * selector selects all elements.

`:splat` specifies the new path for all the content. In other words, it tells the browser to use the existing URL or slug (if you prefer), and just change the directory from `/articles/` directory to `/writing/`.

As I mentioned earlier, make sure you put your `_redirects` file in your static folder. This is really important. That way, when you run the `hugo` build command, Hugo will copy the file over to the public folder and your redirects file will find itself at the root of your live site when you deploy. If it’s not, then your redirects won’t work.

## Wrapping up

Set up redirects when you want to make changes to your content structure without losing the integrity of the links to your content from around the web.

With Hugo sites you have the option of using Hugo Aliases, but if you use Netlify to host and deploy your website, then it seems like Netlify Redirects is the more favoured approach. 

Setting up a `_redirects` file in the static folder is the most portable approach, however you’ll have more configuration options if you set up your redirects in a `netlify.toml` file at the root of your project. 

If the changes you’re making to your URL paths aren’t intended to be temporary, then make sure you use the 301 status for all your redirects. 301 stands for permanent redirect and will tell browsers that the changes are indeed permanent. 

All this can be done very quickly (5 mins or so), so it’s well worth doing to avoid any broken links you might encounter and maintain an optimal experience for those discovering and reading your content.  

## Resources

- [Hugo Aliases](https://gohugo.io/content-management/urls/#aliases)
- [Redirects with Netlify](https://docs.netlify.com/routing/redirects/)
- [Using Splats to catch all cases](https://docs.netlify.com/routing/redirects/redirect-options/#splats)
