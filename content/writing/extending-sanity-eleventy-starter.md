---
title: "Extending the Sanity Eleventy Blog Starter"
date: 2021-03-26T09:58:19Z
draft: false
description: "Learn about GROQ, the Vision plugin, templating in Eleventy and how to add a few key features which are missing from the starter."
slug: "extending-sanity-eleventy-starter"
topics: ["Sanity", "Eleventy"]
---

The [Sanity Eleventy Blog Starter](https://www.sanity.io/create?template=sanity-io%2Fsanity-template-eleventy-blog) over on [sanity.io/create](https://www.sanity.io/create) is a great way to test the water with a Sanity+Eleventy workflow.

Bryan Robinson has written a couple of good articles to help you make your first modifications to the project.

- [How to get started with the 11ty (Eleventy) Blog Starter](https://www.sanity.io/guides/how-to-get-started-with-the-11ty-eleventy-blog-starter)
- [How to add promotional images to the 11ty Blog Starter](https://www.sanity.io/guides/how-to-add-promotional-images-to-the-11ty-blog-starter).

But from then on it’s down to you to dig around and figure things out for yourself. I was at this point myself a while back, so I decided to document a few customisations I made whilst getting to grips with a Sanity-Eleventy workflow.

If you’re looking to modify the starter with category pages, add a dynamic navigation or generally learn more about writing GROQ queries and displaying the data in Eleventy, then this one’s for you.

## Before we begin

- This will be easiest to follow with a fresh install of the [Sanity Eleventy Blog Starter](https://www.sanity.io/create?template=sanity-io%2Fsanity-template-eleventy-blog), where all the starter content is still in place.
- I only focus on content modelling in Sanity, writing GROQ queries and rendering the data in Eleventy. I’ll leave any CSS styling or front-end JavaScript stuff down to you.

## Adding links to authors in post meta

With a fresh install of the Sanity Eleventy Blog Starter you’ll find the author name displaying below the main image on single blog posts. At this point the author name doesn’t link to a single author page. Let’s change that now.

This one’s nice and easy, as an author query is already set up in `web/_data/authors.js`.

_Tip: Everything you find in the data folder is essential a GROQ query–Sanity’s own query language–to the corresponding data stored in Sanity studio. For example; `authors.js` queries the author content type; `*[_type == "author"]`._

The single author pages are also set up. Test this out by visiting `http://localhost:8080/authors/my-name/`. You should see the single author page for `My Name`.

Whilst you’re here you might want to head to Sanity Studio (you should find this at http://localhost:3333/) and change “My name” to your actual name. I did that, so I now have this page: `http://localhost:8080/authors/harry/`. If you don’t have a new page yet then restart the server and it should appear.

Now to get the name below the post linking to the author page, all you need to do is locate `_includes/layouts/post.njk` and find the following:

```html
<p>Written by {% for author in post.authors %}{{author.name}}{% endfor %}</p>
```

Next update it to:

```html
<p>
  Written by {% for author in post.authors %}
  <a href="/authors/{{ author.slug.current | slug }}/"> {{author.name}} </a>
  {% endfor %}
</p>
```

As you can see, all we’re doing is wrapping the author name in an `<a>` tag and setting the `href` attribute to the current author slug, taken from the GROQ query. Simple stuff.

## Display categories on blog posts

In Sanity Studio you’ll notice all the existing blog posts have a category assigned to them. This is a reference to the Categories content type, which you’ll see in the Content panel alongside blog posts, etc.

To get these categories showing up on the blog posts, we need to head into the Eleventy project (./web) and write a GROQ query to expose the data to the templates.

But before doing that, it will help to install the [Vision Plugin](https://www.sanity.io/docs/the-vision-plugin) to the studio project. This lets you test GROQ queries right from inside the Studio.

To install it, move into the studio project and run:

```
sanity install @sanity/vision
```

When you restart the dev server Vision will now show up in the navigation bar of your Studio, alongside where you see Dashboard and Desk.

Now open Vision and write a query for the post type.

```groq
*[_type == 'post']{

}
```

In GROQ, a query typically starts with `*`, which represents every document in your dataset. This is followed by a _filter_, in brackets. We’re filtering by document type, in this case the _post_ type.

But nothing will show when the query runs, as we haven’t asked for any data. To return data we need to write a projection. This happens between the curly braces.

To explicitly return all attributes we can use three dots:

```groq
*[_type == 'post']{
  ...
}
```

Now when you run the query you will see all the attributes associated with the post type.

```
// For brevity this example shows the first entry only
"result":[
  0:{
    "_createdAt":"2019-03-29T21:57:52Z"
    "_id":"1a558cde-16fb-4362-8082-634468a1cc20"
    "_rev":"ZPPkB10QE7F5cldubFx0BY"
    "_type":"post"
    "_updatedAt":"2021-02-23T11:36:43Z"
    "authors":[...]
    "body":[...]
    "categories":[...]
    "excerpt":[...]
    "mainImage":{...}
    "publishedAt":"2017-11-12T23:00:00.000Z"
    "slug":{...}2 items
    "title":"Picture Perfect Cropping with Hotspots"
  }
]
```

Now open the categories array. You should see something like this.

```
"categories":[
  0:{
    "_key":"7335155ca2ad"
    "_ref":"8ea115b0-f3d1-4515-abe3-7c7b2e38365f"
    "_type":"reference"
  }
]
```

You’ll notice the data returned isn’t quite what we want. We just get the `_type`, `_ref` and a `key` value but not the actual category names or urls, which is what we really want.

To access the data we want, we need to [expand the reference](https://www.sanity.io/docs/how-queries-work#expanding-references-8ca3cefc3a31). To do this we can use the _dereferencing operator_ `->` which asks Sanity to follow the reference and replace it with the actual content of the document referenced.

We need to combine this with [a join](https://www.sanity.io/docs/how-queries-work#our-first-join-52023b22ca05) as we want to return categories associated with the parent content type, in this case _post_. To do this we can use the parent-operator `^`.

Now lets update the query to only return the data we want.

```groq
*[_type == 'post']{
  categories[]{
    ...,
  }
}
```

This returns the categories array. But we still need to expand the reference and join the content types, as mentioned above.

```groq
*[_type == 'post']{
  categories[]{
    "title": ^->title,
    "slug": ^->slug.current
  }
}
```

In the results, open the categories array again and you should now have the title and the slug in a format we can work with.

```
"categories":[
  0:{
    "slug":"planet"
    "title":"Planet"
  }
]
```

At this point we’re ready to copy and paste the query from Vision into the projection inside `web/_data/posts.js`. This is the query responsible for rendering the posts.

In the projection, find the line that says `"authors": authors[].author->`, add a comma after the `>`, then add the query:

```groq
"categories": categories[]{
  "title": ^->title,
  "slug": ^->slug.current
}
```

The full projection should look like this:

```javascript
const projection = groq`{
    _id,
    publishedAt,
    title,
    slug,
    excerpt,
    mainImage,
    body[]{
      ...,
      children[]{
        ...,
        // Join inline reference
        _type == "authorReference" => {
          // check /studio/documents/authors.js for more fields
          "name": @.author->name,
          "slug": @.author->slug
        }
      }
    },
    "authors": authors[].author->,
    "categories": categories[]{
      "title": ^->title,
      "slug": ^->slug.current
    }
  }`;
```

Now, when you restart the server with `npm run dev`, the data will be exposed to the templates.

The final thing to do is to open `postslist.njk` and somewhere inside the for loop add the following:

```html
{% for category in currentPost.categories %}
<div class="post-meta">
  <a href="/categories/{{ category.slug | slug }}">{{ category.title }}</a>
</div>
{% endfor %}
```

Here we’re looping through the categories in the post data and returning the category title and slug.

Right now the categories display but the link will be broken, as the category pages don’t exist yet. Let’s create those next.

## Build category pages

To build out the category pages in Eleventy, the first thing to do is set up a new query in the data folder so we can grab the data that already exists in Sanity Studio. Out the gate there are a couple of categories already set up and assigned to posts so we won't need to do anything further in the Studio.

Head to `./web/_data/` and create a new file called `categories.js`. As with the other data files this is for our query.

Next add the following:

```javascript
const groq = require("groq");
const client = require("../utils/sanityClient.js");
const overlayDrafts = require("../utils/overlayDrafts");

const hasToken = !!client.config().token;

function generateCategory(category) {
  return {
    ...category,
  };
}

async function getCategories() {
  const filter = groq`*[_type == "category"]`;
  const projection = groq`{
    // grab category data
    ...,
    // grab posts that reference category id
   "posts": *[_type == "post" && references(^._id)]{
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "categories": categories[]{
        "title": ^->title,
        "slug": ^->slug.current
      }
    }
  }`;
  const query = [filter, projection].join(" ");
  const docs = await client.fetch(query).catch((err) => console.error(err));
  const categories = docs.map(generateCategory);
  const reducedCategories = overlayDrafts(hasToken, categories);
  return reducedCategories;
}

module.exports = getCategories;
```

You’ll notice most the code is very similar to what you see in `authors.js`. The main difference is that the query is now for the _category_ data type, rather than _author_. And now we’ve added a projection that grabs all the data associated with the category. We’re also including all _posts_ which reference the category _id_. We do this [using a Join](https://www.sanity.io/docs/how-queries-work#our-first-join-52023b22ca05).

With the query set up we can display posts that have been assigned a category on that specific category landing page.

Another thing you’ll notice, now we have a projection we need to join the filter and the projection. We do that using [JavaScript’s Join method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).

```javascript
const query = [filter, projection].join(" ");
```

_Note: this is nothing to do with a Join in GROQ, they just share the same name._

Next, we need to make sure we’re passing the new _query_ variable to the fetch function instead of _filter_, as you see in `authors.js`.

```javascript
const docs = await client.fetch(query).catch((err) => console.error(err));
```

Ok, now we’re ready to generate the category pages.

At the route of the project, create a new file called `category.njk`. This is the template that will generate the category pages.

Add the following:

```yaml
---
layout: layouts/category
tags:
  - myCategories
pagination:
  alias: category
  data: categories
  size: 1
  addAllPagesToCollections: true
permalink: categories/{{ category.slug.current | slug }}/index.html
---

```

The main thing here is the `pagination` key, which has a data property assigned `categories`. This tells Eleventy the source of the data we want to create the pages with comes from the `categories.js` file in our data folder.

By setting `size` to `1` we tell Eleventy to generate one page for each item. In other words, each category item in the data gets it’s own page.

The `permalink` allows you to set the URL you want Eleventy to build the pages with.

_Head to the [Eleventy Docs for more on pagination](https://www.11ty.dev/docs/pagination/#pagination)._

Now we’re ready to restart the server and generate some pages. If you did this, then I’m guessing you got an error? It’s probably because we set `layout: layouts/category` which doesn’t exist yet. Let’s create the category layout template now.

```html
---
layout: layouts/base.njk
templateClass: tmpl-category
---

<h1>{{ category.title }}</h1>

{% if category.description %} {{ category.description | markdownify | safe }} {%
endif %}

<ul class="posts">
  {% for post in category.posts | reverse %}
  <li class="postlist-item">
    <img
      src="{% croppedUrlFor post.mainImage, 600, 600 %}"
      alt="{{ post.mainImage.alt }}"
    />
    <div class="post-content">
      <h3><a href="/posts/{{post.slug.current | url }}">{{post.title}}</a></h3>
      <time class="postlist-date" datetime="{{ post.publishedAt }}"
        >{{ post.publishedAt|readableDate }}</time
      >
    </div>
    {% for category in post.categories %}
    <div class="post-meta">
      <a href="/categories/{{ category.slug | slug }}">{{ category.title }}</a>
    </div>
    {% endfor %}
  </li>
  {% endfor %}
</ul>

<p><a href="{{ '/' | url }}">← Home</a></p>
```

Now restart the server and click on one of the post categories. If everything is set up correctly, the link should take you to the category page, which displays all posts assigned that category.

## Add a dynamic navigation

In Sanity Studio add two new files to `/studio/schemas/objects`/. One for `link.js` and another for `navItem.js`.

Inside `Link.js` add the following:

```javascript
export default {
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    {
      name: "externalContent",
      title: "Content is from an external source",
      type: "boolean",
    },
    {
      name: "linkUrl",
      title: "Link URL",
      description:
        "Use this field to add a link to the source. For external links use full url e.g. ‘https://google.com/’. For internal links use the page path e.g. ‘companies’",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "_type",
      subtitle: "title",
    },
  },
};
```

Inside `NavItem.js` add the following:

```javascript
export default {
  name: "navItem",
  type: "object",
  title: "NavItem",
  fields: [
    {
      name: "text",
      type: "string",
      title: "Text",
    },
    {
      name: "navItemUrl",
      type: "link",
      title: "Nav Item URL",
    },
  ],
  preview: {
    select: {
      title: "text",
      text: "text",
    },
  },
};
```

Next, inside `schemas/documents/siteSettings` add:

```javascript
{
  name: 'navItems',
  type: 'array',
  title: 'Navigation items',
  of: [{type: 'navItem'}]
},
```

Now inside your Studio, add some nav items by clicking settings and scrolling down to navigation items.

Back in our Eleventy blog, delete existing navigation inside `layouts/base.njk`:

```html
{%- for nav in collections.nav | reverse -%}
<li class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}">
  <a href="{{ nav.url | url }}">{{ nav.data.navtitle }}</a>
</li>
{%- endfor -%}
```

And replace it with:

```html
{% for navitem in metadata.navItems %}
<li
  class="nav-item{% if navitem.navItemUrl.linkUrl == page.url %} nav-item-active{% endif %}"
>
  <a href="{{ navitem.navItemUrl.linkUrl | url }}">{{ navitem.text }}</a>
</li>
{% endfor %}
```

Now you have a dynamic navigation.

_Tip: For more detail on the Sanity part of this check out [Building a navigation schema in Sanity](https://harrycresswell.com/articles/sanity-building-naigation-schema/)._

## Add site wide social links

In Sanity studio create new object called `SocialLinks.js`.

```javascript
export default {
  name: "socialLinks",
  type: "object",
  title: "Social Links",
  fields: [
    {
      name: "facebook",
      type: "url",
      title: "Facebook",
      description:
        "Add a Facebook URL. For example, https://www.facebook.com/BuxtonThreeTwo",
    },
    {
      name: "twitter",
      type: "string",
      title: "Twitter",
      description:
        "Add a Twitter URL. For example, https://twitter.com/BuxtonThreeTwo",
    },
    {
      name: "instagram",
      type: "string",
      title: "Instagram",
      description:
        "Add an Instagram URL. For example, https://www.instagram.com/buxtonthreetwo/",
    },
    {
      name: "linkedIn",
      type: "url",
      title: "LinkedIn",
      description:
        "Add a LinkedIn URL. For example, https://www.linkedin.com/company/buxtonthreetwo/",
    },
  ],
};
```

In the `siteSettings.js` document add:

```javascript
{
  name: 'socialLinks',
  type: 'socialLinks', // references socialLinks object
  title: 'Social Links'
}
```

Social Links will now appear on the settings page in the studio.

Next head to `./web/_includes/layouts/base.njk` and add the following inside the `<footer>`.

```html
{% if metadata.socialLinks %}
<ul class="SocialLinks">
  {% set facebook = metadata.socialLinks.facebook %} {% set instagram =
  metadata.socialLinks.instagram %} {% set linkedin =
  metadata.socialLinks.linkedIn %} {% set twitter = metadata.socialLinks.twitter
  %} {% if linkedin %}
  <li class="SocialLinks-item">
    <a
      class="SocialLinks-itemLink"
      href="{{ linkedin }}"
      target="_blank"
      rel="noopener noreferrer"
      >LinkedIn</a
    >
  </li>
  {% endif %} {% if instagram %}
  <li class="SocialLinks-item">
    <a
      class="SocialLinks-itemLink"
      href="{{ instagram }}"
      target="_blank"
      rel="noopener noreferrer"
      >Instagram</a
    >
  </li>
  {% endif %} {% if facebook %}
  <li class="SocialLinks-item">
    <a
      class="SocialLinks-itemLink"
      href="{{ facebook }}"
      target="_blank"
      rel="noopener noreferrer"
      >Facebook</a
    >
  </li>
  {% endif %} {% if twitter %}
  <li class="SocialLinks-item">
    <a
      class="SocialLinks-itemLink"
      href="{{ twitter }}"
      target="_blank"
      rel="noopener noreferrer"
      >Twitter</a
    >
  </li>
  {% endif %}
</ul>
{% endif %}
```

This should work straight out the gate because the `metadata.js` query is already returning all the data in `siteSettings`, as denoted by the 3 dots `...`. If you remember, `siteSettings.js` is where we added the `SocialLinks.js` object, so we’re good to go.

## Add author social links

In the studio project find `schemas/documents/author` and add:

```javascript
{
  name: 'socialLinks',
  type: 'socialLinks', // references socialLinks object
  title: 'Social Links'
}
```

If you didn‘t create the `socialLinks` object in the last section, then do that first.

Now, back in the web project open `_data/authors.js` and add `socialLinks` to the data projection:

```javascript
async function getAuthors() {
  const filter = groq`*[_type == "author"]`;
  // https://www.sanity.io/docs/how-queries-work#our-first-join-52023b22ca05
  const projection = groq`{
    // grab author data
    _id, name, bio, socialLinks,
    // grab posts that reference author
   "posts": *[_type == "post" && references(^._id)]{title, slug, mainImage}
  }`;
  const query = [filter, projection].join(" ");
  const docs = await client.fetch(query).catch((err) => console.error(err));
  const authors = docs.map(generateAuthor);
  const reducedAuthors = overlayDrafts(hasToken, authors);
  return reducedAuthors;
}
```

Next locate `lauyouts/author.njk` and add the following:

```html
{% if author.socialLinks %}
<ul>
  {% set facebook = author.socialLinks.facebook %} {% set instagram =
  author.socialLinks.instagram %} {% set linkedin = author.socialLinks.linkedIn
  %} {% set twitter = author.socialLinks.twitter %} {% if facebook %}
  <li>
    <a href="{{ facebook }}" target="_blank" rel="noopener noreferrer">
      Facebook
    </a>
  </li>
  {% endif %} {% if instagram %}
  <li>
    <a href="{{ instagram }}" target="_blank" rel="noopener noreferrer">
      Instagram
    </a>
  </li>
  {% endif %} {% if linkedin %}
  <li>
    <a href="{{ linkedin }}" target="_blank" rel="noopener noreferrer">
      LinkedIn
    </a>
  </li>
  {% endif %} {% if twitter %}
  <li>
    <a href="{{ twitter }}" target="_blank" rel="noopener noreferrer">
      Twitter
    </a>
  </li>
  {% endif %}
</ul>
{% endif %}
```

## Adding external links to the blog

Inside the studio folder, find the objects folder and open `bodyPortableText.js`.

Find the marks object, then inside the annotations array, add the following:

```javascript
annotations: [
  {
    name: "link",
    type: "object",
    title: "URL",
    fields: [
      {
        title: "URL",
        name: "href",
        type: "url",
      },
      {
        title: "Open in new window",
        name: "blank",
        type: "boolean",
      },
    ],
  },
];
```

If you restart the server you’ll get an error, because Eleventy doesn’t understand how to display this kind of nested data.

The error will ask you to add a serialiser for `link` inside of `serializers.js` which you can find in the _utils_ folder.

So inside `serializers.js` add the following:

```javascript
module.exports = {
  marks: {
    link: ({ children, mark }) => {
      if (mark.blank)
        return `<a href="${mark.href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      else return `<a href="${mark.href}">${children}</a>`;
    },
  },
};
```

The hardest part with serializing marks is figuring out the data structure and remembering the node is actually `children` and `mark` and not just `node` as you might have used in other serializers. [This video from Knut](https://www.youtube.com/watch?v=9ipNrJlIj_I) will help you get your head around this.

## Wrapping up

Hopefully this has given you some ideas of how to build on the Sanity Eleventy Blog starter project to make it your own. Going through these motions is a great way to learn more about the GROQ query language and how Sanity works together with Eleventy.

Most of the time, when you’re working with these tools, you’ll find yourself following a very similar pattern:

- Create the Schema in the studio if it doesn’t exist yet
- Add data in Sanity Studio so you have something to query
- Return the data with the Vision plugin to figure out the query
- Set up the query in the Eleventy web project, inside `_data`
- Render the data inside your templates

Once you’ve done it a few times you start to get the hang of it. Yes, there’s a slight learning curve with GROQ and Nunjucks, or whatever templating engine you use, but it’s not particularly difficult and it’s worth putting in the time because the workflow is really powerful and most importantly, a lot of fun.

## Further reading

I’ve written [a few other articles on Eleventy](/tags/eleventy/), so make sure you check those out too.
