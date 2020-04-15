---
title: "Static search with Algolia and Hugo 2"
date: 2018-07-27T09:24:22+01:00
tags: ["Hugo", "API"]
slug: "hugo-algolia-2"
description: "Implement Instantsearch.js on your Hugo site and provide users with instantaneous search results using Algolia."
---

{{< intro >}}This is Part 2 in a short series on getting started with Algolia search on a site built with Hugo, the static site generator.{{< /intro >}}

<p class="Message">You can download <a href="https://github.com/harrycresswell/hugolia">the project files</a> for this article over on Github.</p>

In [Part 1](https://harrycresswell.com/articles/hugo-algolia/) we configured Algolia’s search API to index content from a Hugo site and provide instantaneous search results, whenever a search takes place.

In this part we’ll implement [Algolia Instantsearch.js](https://community.algolia.com/instantsearch.js/), a framework of prepackaged widgets which will help us design the perfect search experience.

By the end of the article visitors to our site will be able to interface with the search, searching and filtering content at near instantaneous speeds.

## What we’ve done so far

So far we configured Hugo to generate a JSON index of our content and update the index in Algolia every time we add a new post to our site. We then used a Serverless Webtask function to update the content on our site.

A lot to chew, but if you’re still with me then now’s the time to add the actual interface to our website, so visitors can search our posts.

So how do we make this good stuff happen?

## Next steps

- Install Algolia InstantSearch JavaScript library
- Display content from our JSON index (Hits in Algolia talk)
- Add a search bar to allow for searches
- Set up post filtering by tag

With that, let’s get right to it.

## Step 1: Installing InstantSearch.js

In the head of your Hugo site add the Algolia stylesheet and default theme:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.8.1/dist/instantsearch.min.css"
/>
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.8.1/dist/instantsearch-theme-algolia.min.css"
/>`
```

This will deliver the necessary styles from the [jsDeliver](https://www.jsdelivr.com/) CDN.

Next, add the following JS before the closing body tag:

```html
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.8.1"></script>
```

Great, now we have access to the `instantsearch` function

## Initialization

To initialize InstantSearch.js, you need an Algolia account with a configured and non-empty index.

Get hold of your `appID`, Search-Only `APIkey` and `indexName`. You can find these in your Algolia dashboard.

In `app.js` or wherever you store your pre compiled Javascript add the following:

```javascript
// Set Algolia options
const options = {
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
  indexName: "YOUR_INDEX_NAME",
  hitsPerPage: 10,
  routing: true,
};

// Parse options to instantsearch
const search = instantsearch(options);
```

Making sure you replace all instances of `YOUR_...` as you go.

Awesome! Your Hugo site is now connected to Algolia.

## Step 2: Display index hits (Search results)

Now we need to display our search results and bring this beast to life. Using the hit widget we can display all the results returned by Algolia.

Creating a container with an id `hits` will tell Algolia where to display your hits.

```html
<div id="hits">
  <!-- Hits widget will appear here -->
</div>
```

In my site I put this in my `list.html` template inside `layouts/_default/` but yours might be different, depending on your theme structure.

Now you’ll need to add your hits widget to your instantsearch instance, using `addWidget`. So open up your JS file and add:

```javascript
// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    // define container
    container: "#hits",
    // add classes for styling
    cssClasses: {
      root: "Search-hits",
      empty: "Search-hits--empty",
    },
    templates: {
      // call custom hit template
      item: hitTemplate,
      empty: 'Didn’t find any results for the search  <em>"{{query}}"</em>',
    },
  })
);
```

Notice I’ve specified the variable `hitTemplate` for my template item. Setting up this will allow me to parse a [Mustache](https://community.algolia.com/instantsearch.js/v1/documentation/) template string and some HTML to customise the view of the hit. Let’s create that variable now.

```javascript
// create variable for custom hit template
var hitTemplate =
  '<a href="{{ permalink }}" class="List-item">' +
  '<div class="List-image">' +
  '<img src="https://res.cloudinary.com/harrycresswell/image/upload/w_auto,dpr_auto,c_scale/{{{featuredimage}}}" />' +
  "</div>" +
  '<div class="List-title">{{{_highlightResult.title.value}}}</div>' +
  "</a>" +
  '<div class="List-summary">{{{summary}}}</div>';
```

A few things to notice here; values pulled from the Algolia index should be wrapped in 3 curly braces, this prevents conflicts with Hugo templating, as seen in `permalink` which is wrapped in 2 braces.

Using the `_highlightResult` attribute will, by default, add `<em>` tags to your search results to give feedback on any matching results.

My particular template pulls in a featured image, which I specified in the post front matter. You’ll notice I’m using [Cloudinary](https://cloudinary.com/) to host my images. By abstracting images away from the repo, build times remain super fast, as now there are no images to process. I’ve added options in the URL for retina and responsive sizing. I cover a lot of these features in [resposives images with Cloudinary](articles/cloudinary/).

## Step 3: Configure hits in Algolia

For this part you need to head back to your Algolia Dashboard to set searchable Attributes:

_Indices > Ranking > Searchable Attributes > Add a Searchable Attribute_

This will tell Algolia what you want it to pick up in search results. In my case I kept it simple and stuck with `title` by choosing it from the dropdown list.

Great, title searches should now be configured.

## Step 4: Add a Search bar (..and Algolia logo)

In order to querying our index we’re going to need a search bar. To do this add the Searchbox widget to your template:

```html
<div id="search-box">
  <!-- SearchBox widget will appear here -->
</div>
```

Back in your `app.js` file, add the following:

```javascript
// Parse options to instantsearch
const search = instantsearch(options);

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "Search for post",
    reset: false,
    cssClasses: {
      root: "Search-box-container",
      input: "Search-box-input",
    },
  })
);

// make all this stuff happen
search.start();
```

Now we can search our index and see what matches our query.

## Step 5: Add a refinement list (filtering by Tag)

Finally, you might want to provide filters based on the structure of your content. We can do this by adding the refinement list widget and configuring it to work with our tags in Hugo. Let’s start by setting up Hugo so we can assign tags to our posts.

### Setting up tags in Hugo

If you have been following from [Part 1](articles/hugo-algolia/), inside your `config.toml` file you should have the following:

```yaml
[params.algolia]
  vars = ["title", "summary", "date", "publishdate", "expirydate", "permalink"]
  params = ["categories", "tags"]
```

It’s important we have `tags` set in the Algolia Params.

Then within your post front matter, add the following to a few of your posts to make sure everything is set up correctly when you re-index your site:

```yaml
tags:
  - your_first_tag
  - your_second_tag
```

## Re-indexing search and configuring Algolia

Now, from the terminal run `npm run build` to rebuild your site, then deploy your site how you normally would.

This will trigger your search index to be updated.

Next head to _Indices > Browse > Preview_ in your Algolia Dashboard and providing all went well you should see your new tags listed in your JSON search index.

At this point we need to tell Algolia to filter our tags when we set up our refinement list widget in the next step. To do this head to:

_Indices > Display > Faceting > Attributes for faceting_

Hit _Add an Attribute_.

You should see `tags` appear in the dropdown list. Make sure you select them and you’re good to go.

### Adding the refinement list widget

The final thing to do is add a refinement list widget so we can filter our results on the font end.

Similar to before, add a container with an `id="refinement-list"` to your chosen template:

```html
<div id="refinement-list">
  <!-- RefinementList widget will appear here -->
</div>
```

This is where your refinement list will appear.

Just above `search.start();` in your `app.js` file, add the following:

```javascript
// initialize RefinementList
search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#refinement-list",
    attributeName: "tags",
  })
);
```

Your tags should now appear on your site and filter your index.

## Taking it further

This is as far as I’m going with this one but you could now add pagination to your index and a filter reset which clears your search. Check out the [getting started](https://community.algolia.com/instantsearch.js/v2/getting-started.html) article for more on this.

## Wrapping up

Great job. You should now have an InstantSearch results page working with your blog posts on a Hugo static site.

Of course you can use InstantSearch with any static site generator, or on any webpage, it doesn’t have to be Hugo. There’s a ton of great resources and tutorials to help you get going on the [Algolia Community](https://community.algolia.com/) page .

A great place to begin is the [Getting Started with InstantSearch.js](https://community.algolia.com/instantsearch.js/v2/getting-started.html) tutorial. I’ll also list some resources I found helpful below.

## Further reading

- [Getting Started with InstantSearch.js](https://community.algolia.com/instantsearch.js/v2/getting-started.html)
- [Instant Search v1 Documentation](https://community.algolia.com/instantsearch.js/v1/documentation/)
- [Thread on Hacker News](https://news.ycombinator.com/item?id=16502918) which gave me reason to write this article.
- [Regis Philibert’s Github repo](https://github.com/regisphilibert/benmerde/blob/search/themes/benmerde/src/js/main.js) helped me get my head around `hitTemplate`
