---
title: "Static search with Algolia and Hugo"
date: 2018-07-13T10:15:40+02:00
tags: ["Hugo", "API"]
slug: "hugo-algolia"
description: "Learn how to implement Algolia InstantSearch on a Hugo based static site."
---

<p class="Message">You can download <a href="https://github.com/harrycresswell/hugolia">the project files</a> for this article over on Github.</p>

{{< intro >}}We’re about to walk through setting up Algolia search on a Hugo static site with a Forestry CMS, so you can search your posts instantaneously and edit content directly from the browser.{{< /intro >}}

This first part is heavily based on [Chris Macrae’s awesome article on Forestry.io](https://forestry.io/blog/search-with-algolia-in-hugo/#creating-the-json-template), with some adaptations to fit my specific needs. In the second article we’ll implement Instantsearch.js on the front end, which aims to pick up where the Chris’s article left off.

## What’s Algolia?

[Algolia](https://www.algolia.com/) is a search API (SaSS; as in _Search_ as a Service) which allows you to index data and server it up at lightning speeds.

If you’re running a [JAMStack](https://jamstack.org/) build – a Hugo static site like this one perhaps – Algolia will allow you to implement rapid fire, instantaneous search, like you’ve seen on [Smashing Magazine](https://www.smashingmagazine.com/) and all those JS framework sites (think Vue, Gatsby, React).

This stuff isn’t really possible on static sites without using a 3rd party API like Algolia, largely because we don’t have a database to query. But lucky for us Aloglia takes care of all this backend stuff for us.

With that said, let’s break down the plan so you know what’s coming up.

## What are trying to do?

- Send a search index to Algolia when a new post is added (via [Forestry](https://forestry.io/) or a `git push` from the CLI).
- Update the search index on our site with a [webtask function](https://webtask.io/), whenever the index is update on Algolia.
- Build a front end search using Algolia’s [Instantsearch.js](https://community.algolia.com/instantsearch.js/) library, so visitors can interface with our content (we’ll do this bit in the second article).

For a very basic prototype of what we’re building, [head over here](https://heuristic-hoover-2ec537.netlify.com/).

I’m assuming you already have a Hugo site set up. If not, I recommend starting out with the [Forestry’s Hugo boilerplate](https://github.com/forestryio-templates/hugo-boilerplate). Here’s [a great how-to guide](https://forestry.io/blog/up-and-running-with-hugo/) which will help you get off on the right foot.

## Step 1: Generate JSON search index

Algolia deals with JSON, so we’ll need set up Hugo to output our content as JSON. We can do this with [Custom Output Formats](https://gohugo.io/templates/output-formats/).

Inside your `config.toml` file add the following:

```yaml
[outputFormats.Algolia]
  baseName = "algolia"
  isPlainText = true
  mediaType = "application/json"
  notAlternative = true

[params.algolia]
  vars = ["title", "summary", "date", "publishdate", "expirydate", "permalink"]
  params = ["categories", "tags"]
```

You’ll notice we also specified the `params` we want Algolia to work with – Categories and Tags.

## Step 2: Build a JSON template

A JSON template will allow Hugo to render the custom JSON output. This will replace the typical `_default/list.html` page.

Create a new file at `layouts/_default/list.algolia.json` and add the following:

```js
{{/* Generates a valid Algolia search index */}}
{{- $hits := slice -}}
{{- $section := $.Site.GetPage "section" .Section }}
{{- $validVars := $.Param "algolia.vars" | default slice -}}
{{- $validParams := $.Param "algolia.params" | default slice -}}
{{/* Include What Pages? */}}
{{/* range $i, $hit := .Site.AllPages */}}
{{- range $i, $hit := where (where .Site.Pages "Type" "in" (slice "posts")) "IsPage" true -}}
  {{- $dot := . -}}
  {{- if or (and ($hit.IsDescendant $section) (and (not $hit.Draft) (not $hit.Params.private))) $section.IsHome -}}
    {{/* Set the hit's objectID */}}
    {{- .Scratch.SetInMap $hit.File.Path "objectID" $hit.UniqueID -}}
    {{/* Store built-in page variables in iterable object */}}
    {{- .Scratch.SetInMap "temp" "content" $hit.Plain -}}
    {{- .Scratch.SetInMap "temp" "date" $hit.Date.UTC.Unix -}}
    {{- .Scratch.SetInMap "temp" "description" $hit.Description -}}
    {{- .Scratch.SetInMap "temp" "dir" $hit.Dir -}}
    {{- .Scratch.SetInMap "temp" "path" "temp" -}}
    {{- .Scratch.SetInMap "temp" "expirydate" $hit.ExpiryDate.UTC.Unix -}}
    {{- .Scratch.SetInMap "temp" "path" "temp" -}}
    {{- .Scratch.SetInMap "temp" "fuzzywordcount" $hit.FuzzyWordCount -}}
    {{- .Scratch.SetInMap "temp" "keywords" $hit.Keywords -}}
    {{- .Scratch.SetInMap "temp" "kind" $hit.Kind -}}
    {{- .Scratch.SetInMap "temp" "lang" $hit.Lang -}}
    {{- .Scratch.SetInMap "temp" "lastmod" $hit.Lastmod.UTC.Unix -}}
    {{- .Scratch.SetInMap "temp" "permalink" $hit.Permalink -}}
    {{- .Scratch.SetInMap "temp" "publishdate" $hit.PublishDate -}}
    {{- .Scratch.SetInMap "temp" "readingtime" $hit.ReadingTime -}}
    {{- .Scratch.SetInMap "temp" "relpermalink" $hit.RelPermalink -}}
    {{- .Scratch.SetInMap "temp" "summary" $hit.Summary -}}
    {{- .Scratch.SetInMap "temp" "title" $hit.Title -}}
    {{- .Scratch.SetInMap "temp" "type" $hit.Type -}}
    {{- .Scratch.SetInMap "temp" "url" $hit.URL -}}
    {{- .Scratch.SetInMap "temp" "weight" $hit.Weight -}}
	  {{- .Scratch.SetInMap "temp" "wordcount" $hit.WordCount -}}
    {{- .Scratch.SetInMap "temp" "section" $hit.Section -}}
    {{/* Include valid page vars */}}
    {{- range $key, $param := (.Scratch.Get "temp") -}}
      {{- if in $validVars $key -}}
        {{- $dot.Scratch.SetInMap $hit.File.Path $key $param -}}
      {{- end -}}
    {{- end -}}
    {{/* Include valid page params */}}
    {{- range $key, $param := $hit.Params -}}
      {{- if in $validParams $key -}}
        {{- $dot.Scratch.SetInMap $hit.File.Path $key $param -}}
      {{- end -}}
    {{- end -}}
    {{- $.Scratch.SetInMap "hits" $hit.File.Path (.Scratch.Get $hit.File.Path) -}}
  {{- end -}}
{{- end -}}
{{- jsonify ($.Scratch.GetSortedMapValues "hits") -}}
```

Here we loop through all of content inside of `content/posts`. So if, let’s say, your posts folder is called ‘articles’, make sure you update your code to reflect that. Chris’s tutorial loops through all content including pages, so I modified this to serve only post content as I didn’t want to include pages.

## Step 3: Output the Index

Now we have our custom output layout, variables and page-level params configured, we need to tell Hugo to create the actual JSON index.

Back inside your `config.toml` file, add the following:

```yaml
[outputs]
  home = ["HTML", "RSS", "Algolia"]
```

This tells Hugo to output the HTML document, the RSS Feed, and an Algolia index for your site’s homepage, which contain our list of content.

Build your site with `npm run build` and you should now find `algolia.json` in the root directory. We can use this to update our index in Algolia.

## Step 4: Create an index in Algolia

[Create an account](https://www.algolia.com/users/sign_up) on Algolia and click _New Application_. Make sure you choose a memorable application name. Next select the region closest to you. Then you’ll be redirected to the app dashboard.

Click the _Indices_ tab, and choose _Add New Index_. Give your new Index a unique name. I used ’hugolia’ for the hell of it, but you can use what you like; your domain name will do.

Finally, select the *API Keys* tab, and copy your *Application ID* and *Admin API Key*. We’ll need these later, to update the index.

## Step 5: Send search index to Algolia

To send our search index to Algolia, we can use [atomic-algolia](https://www.npmjs.com/package/atomic-algolia), an NPM package that does atomic updates to an Algolia index. This will insure our search index is always in-sync with our website’s content.

Run `npm install atomic-algolia --save`

This installs the atomic-algolia package to our local `node_modules` folder.

Next, open the newly created `package.json` file, find "scripts", and add the following:

`"algolia": "atomic-algolia"`

Now create a `.env` file at the root of your project to store our environment variables. Add the following:

```js
ALGOLIA_APP_ID={{ YOUR_APP_ID }}
ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }}
ALGOLIA_INDEX_NAME={{ YOUR_INDEX_NAME }}
ALGOLIA_INDEX_FILE={{ PATH/TO/algolia.json }}
```

Grab those details from your Algolia Dashboard (See Step 4). If you’re using a different theme the path to your Algolia index file might be in `dist/algolia.json`. Others might find the file in their public folder.

Now update your index by running:

`npm run algolia`

If all went well you should now have an index in Algolia synced with the content on your site.

## Step 6: Updating your index with serverless functions

Using Forestry’s [open-source serverless Webtask Function](https://github.com/forestryio-templates/serverless-atomic-algolia) we can automatically update our Algolia index each time our site is updated. That way we don’t have to run the NPM script above, each time we make changes.

To get started, clone the template to your local machine by running:

```
git clone https://github.com/forestryio-templates/serverless-atomic-algolia.git
```

Then install the dependencies:

```
cd serverless-atomic-algolia
npm install serverless -g && npm install
```

### Configuration

Next, set up a Webtasks profile if you don’t already have one. This can be done directly from the command line with:

`serverless config credentials --provider webtasks`

You’ll be asked for an email and you’ll immediately receive a verification code. Enter the verification code and your profile will be ready to use.

Next, you’ll need to configure the function with your Indices and Algolia app information.

First, copy `config/secrets.yml.stub` to `config/secrets.yml` and then open it up in your text editor.

```js
ALGOLIA_APP_ID: {
  {
    YOUR_APP_ID;
  }
}
ALGOLIA_ADMIN_KEY: {
  {
    YOUR_ADMIN_KEY;
  }
}
DEBOUNCE: 0;
```

Then, open `config/index.js` and update name to the name of your index that you set up earlier, and url to `yourdomain.com/algola.json`.

```js
module.exports = () => {
  var indexes = [
    {
      name: "YOUR_INDEX_NAME",
      url: "PUBLIC_URL_OF_INDEX",
    },
  ];
  return JSON.stringify(indexes);
};
```

### Deploying the function

Now deploy the function by running:

`serverless deploy`

In the terminal, you should receive an output for the success of your deployment, including the public URL for your new function.

We’ll need this URL for when we trigger a web hook when changes are made to the site.

### Setting up a Webhook in Forestry

All that’s left to do before we move on to the front end is set up a post-deployment web hook with Forestry. This will trigger the serverless deploy when you make a change.

If this is new to you, [Forestry](https://forestry.io/) is a lightweight CMS for Jekyll and Hugo sites which is very easy to set up, you just link your Git Repository and you’re good to go.

Once your connected to Forestry, find the *Settings* page of your site and scroll down to the *Webhook URL* setting.

Enter the URL you received when deploying your function and click *Save Settings*.

Now each time Forestry finishes deploying your site, your function will be invoked to update your Algolia index.

_Note: you can still make updates locally and push changes from the CLI, just make sure you do a `git pull` so you’re up-to-date with your production site._

## Wrapping up

At this point should have a working search index, which watches for any content changes you push to Git then re-indexes Algolia and updates our site.

If you need more details on this whole set up, I highly recommend reading [Chris’s tutorial on Forestry](https://forestry.io/blog/search-with-algolia-in-hugo/?q=&hPP=10&idx=blog&p=0) which goes into far more depth in certain places I raced through. Props to Chris for explaining in such detail.

I wrote this down as much for my own understanding as I hope it has been helpful for your own. This was my first real venture using serverless functions and I’m still wrapping my head around them.

With that said, any feedback you might have would be very welcome. [Drop me a tweet](https://twitter.com/harrycresswell) or [send me a message](/contact/). I’d be happy to hear from others exploring the world of serverless.

_Note: In [part 2 of this article](https://harrycresswell.com/articles/hugo-algolia-2/) we’ll build the front end, so users can interface with our content and see the power of Algolia on a Hugo static site._

<p class="Message">You can download the <a href="https://github.com/harrycresswell/hugolia">project files over on Github</a>. Bare in mind they also include code for the front end which is coming up in the next part.</p>

## Further reading

- [Static site search with Hugo + Algolia](https://forestry.io/blog/search-with-algolia-in-hugo/?q=&hPP=10&idx=blog&p=0) by Chris Macrae
- [Add Algolia Search To Hugo Static Website](https://code.luasoftware.com/tutorials/algolia/add-algolia-search-to-hugo-static-website/) by Desmond Lua
