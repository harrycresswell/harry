---
title: "Building a navigation schema with Sanity"
date: 2020-03-25T06:40:37Z
draft: false
description: "How to create a modular navigation builder. Modular, because you’ll be able to use it to create any number of navigations to use in your website or app."
slug: "sanity-building-naigation-schema"
tags: ["Sanity", "JavaScript"]
syndicate: "false"
---

[Sanity](https://www.sanity.io/) is a platform for structured content, built in React. It’s headless, meaning your content is decoupled from whatever front-end you decide to choose.

Sanity stores your content and compiles it to an API, which you can then query and render on the front-end of your website using [GraphQL](/tags/graphql) or Sanity’s own query language GROQ.

Unlike many monolithic CMS’, Sanity holds no opinions about your content. So, to create content, you first have to build a schema. This means you have to tell Sanity how your content should be structured. This is known as [Content Modelling](https://www.sanity.io/docs/content-modelling).

Content modeling happens in [Sanity Studio](https://www.sanity.io/docs/sanity-studio), which is basically Sanity’s content management system (CMS). For most projects, you’ll find yourself building a content schema from scratch by writing JSON objects. How your content is structured is very much up to you. You are in full control of the content types — and fields associate with those types — that will appear in the CMS.

If you’re new to modelling data in Sanity, make sure you read the [the documentation](https://www.sanity.io/docs/content-modelling), it’s detailed and well thought out. For my take on modelling content, read my notes; [Content schema in Sanity](/notes/til-02-content-schema-in-sanity/). This will help you hit the ground running.

In this article we’ll build a content schema for a modular navigation. Modular, because you’ll be able to use this content type to create any number of navigations, to use in a website or application. In a later article we’ll query the navigation we create, and render it on a Gatsby powered front-end.

To begin, let’s consider the content schema, so we know what we’re building.

## Understanding the schema structure

Before we jump in, we need to figure out how best to structure our content schema. To figure this out, it makes sense to understand the project requirements. So, what functionality do we want in our navigation?

We want the ability to:

- Create multiple navigations (e.g. main, footer, etc)
- Add any number of items (links) to each navigation
- Add either internal or external links to navigation items

In Sanity, the ”document” content type allows you to create repeatable content. Much like a post or a page. This will give us the ability to create multiple navigations.

That’s our first requirement sorted.

If we want to add any number of “nav items” to the navigations we create, we could do this by creating an array of links. More on this later.

For each nav item in the array, we then need a way to set whether or not the link is an internal link or an external link.

The reason we need to determine the source of the link is because the code in our front-end will be different, depending on the source of the link. We can use Sanity’s built in boolean type (essentially a toggle switch), which provides a simple way to make something `true` or `false`. This will allow us to write a condition in the front-end (when we get to it), to render the correct code.

Now we understand what we’re trying to build, let’s get on and build the schema.

## Building the schema

Assuming you have a Sanity project on the go (you can try out [a starter project](https://www.sanity.io/docs/starters-on-sanity-io-create) if you haven’t), open your project in your text editor and locate the studio directory.

Within `schemas/documents` create a new document type called `Navigation.js`, or `Nav.js`, for something short but descriptive.

Inside this file, we want to export a default object with three key value pairs: a _name_, a _type_ and a _title_. Make sure you provide a descriptive name, reflective of the file name. In this case “nav”. This will determine how our API is structured later.

Next make sure _type_ is set to “document”. This tells Sanity that our navigation is a top level content type, so it will appear in the Studio under Content. Finally, _title_ is the text we will actually see in Sanity Studio. In our case it will say “Navigation.”

```javascript
export default {
  name: "nav",
  type: "document",
  title: "Navigation"
};
```

Now we can head to `schema.js`, and register our new content type, by importing our document schema and passing it to the builder.

```javascript
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// document schemas
import post from "./documents/post";
import page from "./documents/page";
import siteSettings from "./documents/siteSettings";
import nav from "./documents/nav";

// Object types
import bodyPortableText from "./objects/bodyPortableText";
import bioPortableText from "./objects/bioPortableText";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "blog",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    page,
    post,
    nav

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
});
```

When you save the file with the development server running, Sanity Studio will refresh in the browser and you should now see “Navigation” listed under the Content panel.

Right now, our content type isn't much use. We need some fields, so we can give the navigations we create a `title` and `id`. The _title_ is for our own reference, so we can easily identify the navigations we build. We’ll use the _id_ when we query the data in the front-end.

```javascript
export default {
  name: "nav",
  type: "document",
  title: "Navigation",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "id",
      type: "string",
      title: "Id"
    }
  ]
};
```

Now we have an input field in Sanity Studio to provide a _title_ and an _id_ for a navigation. But we still need a way to add our nav item links.

If we give it some thought, a nav item is essentially another very simple object type with a few fields. One field for `text` — what our nav item says — and another field for a `link` — the source of the content.

Don’t forget, we also need a boolean switch. This will give our friends managing content an easy way to specify whether the link is linking to an internal page, or to a page somewhere else on the web.

Now create a new schema inside `schemas/objects` called `navItem.js`.

```javascript
export default {
  name: "navItem",
  type: "object",
  title: "NavItem",
  fields: [
    {
      name: "text",
      type: "string",
      title: "Text"
    },
    {
      name: "navItemUrl",
      type: "link", // references link object
      title: "Nav Item URL"
    }
  ]
};
```

Let’s break down what’s going on here.

We’ve given _type_ the value of `object`, as this schema will only ever be a reference from a document, in this case our `nav.js` document. And we’ve set a descriptive _name_, and _title_ to identify our object in Sanity.

We’re also adding two fields. The first has the _name_ `text`. This is a _string_ set to `type`, which gives us a text input field so we can name each nav item.

The other has the _name_ `navItemUrl`, and it has a _type_ of `link`. I’ve added a comment to make it clear exactly what this is. Link is actually a reference to another object type called `link`.

Ok, we’re going all Inception here, but we’ll thank ourselves later. Let’s create this link object now, so we have something to... um... link to.

Create a new file called `link.js` inside `schemas/objects`.

```javascript
export default {
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    {
      name: "externalContent",
      title: "Content is from an external source",
      type: "boolean"
    },
    {
      name: "linkUrl",
      title: "Link URL",
      description:
        "Use this field to add a link to the source. For external links use full url e.g. ‘https://google.com/’. For internal links use the page path e.g. ‘companies’",
      type: "string"
    }
  ]
};
```

As you can see, our link object takes care of the boolean (a switch to set whether the link is external or not) via a field named `externalContent`, which has a _type_ with the value `boolean`. It also handles the `linkUrl`, which is the URL our nav item will link to. This can be any link, internal or external.

Now we could have handled the link complexity directly in our `navItem` object, but by creating a new link object, we’ve made our schema modular. We can now use our link object in other documents and object types, should be wish to.

Ok, we’re almost there. All that’s left to do now is to register our new object types in `schema.js`, and add our new `navItem` object to our `navigation.js` document type. Let’s don that now.

Head back to `schema.js` and register `navItem` and `link`.

```javascript
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// document schemas
import post from "./documents/post";
import page from "./documents/page";
import siteSettings from "./documents/siteSettings";
import nav from "./documents/nav";

// Object types
import bodyPortableText from "./objects/bodyPortableText";
import bioPortableText from "./objects/bioPortableText";
import navItem from "./objects/navItem";
import link from "./objects/link";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "blog",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    page,
    post,
    nav,
    navItem.link

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
});
```

Now, inside `nav.js` we can add a new field for our `navItems`.

```javascript
export default {
  name: "nav",
  type: "document",
  title: "Navigation",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "id",
      type: "string",
      title: "Id"
    },
    {
      name: "navItems",
      type: "array",
      title: "Navigation items",
      of: [{ type: "navItem" }]
    }
  ]
};
```

Notice we’ve given _type_ the value of `array`, as we want to be able to create what’s essentially a list of nav items.

Finally we need to use the `of` keyword to set _type_ to `navItem`. This is a reference to our `navItem.js` object type and tells our `nav.js` object to use it.

## Taking it further

Now our navigation schema is set up and usable. But there are a few things we can do to our schema, to help clarify it’s purpose and make it visually identifiable.

The first is to add an icon to our document type, and the second is to configure the preview. This will change how Sanity renders our document type and navigation items in the studio.

### Adding an icon

The easiest way to add an icon to a document type in Sanity Studio is by using the NPM package [React Icons](https://react-icons.netlify.com/#/). This will allow you to use SVG icons from many of the most popular icon libraries.

Inside the root of your Sanity Studio project run `yarn add react-icons` to add React Icons to your `package.json`.

Now you can [choose the icon you wish to use](https://react-icons.netlify.com/#/) and import the icon at the top of your component file.

Make sure to specify the library name and the icon name. For example `md` from material design and `navigation` for the icon name.

In this case we want to import an icon to our `nav.js` document. Use the key value pair _icon_ and `ICON_IMPORT_NAME` to render the icon in the Studio.

```javascript
import Nav from "react-icons/lib/md/navigation";

export default {
  name: "navItem",
  type: "object",
  title: "NavItem",
  icon: Nav,
  fields: [
    {
      name: "text",
      type: "string",
      title: "Text"
    },
    {
      name: "navItemUrl",
      type: "link", // references link object
      title: "Nav Item URL"
    }
  ]
};
```

For more on icons in Sanity read up on [Icons for data types](https://www.sanity.io/docs/the-schema/icons-for-data-types).

### Configure the preview

A content preview is the representation of a document or object type in Sanity studio. Sanity will try to render the preview by default, based on the fields used in your content type. But you also have the option to customise which fields should be used to generate the preview.

You can do this using the `preview` key.

```javascript
import Nav from "react-icons/lib/md/navigation";

export default {
  name: "navItem",
  type: "object",
  title: "NavItem",
  icon: Nav,
  fields: [
    {
      name: "text",
      type: "string",
      title: "Text"
    },
    {
      name: "navItemUrl",
      type: "link", // references link object
      title: "Nav Item URL"
    }
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "navItemUrl"
    }
  }
};
```

Back in Sanity, we can see that the title is no longer undefined, but now rendering the value of `text`. Likewise, the subtitle is rendering the `navItemUrl`. We follow the same pattern for our navigation document.

```javascript
export default {
  name: "nav",
  type: "document",
  title: "Navigation",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "id",
      type: "string",
      title: "Id"
    },
    {
      name: "navItems",
      type: "array",
      title: "Navigation items",
      of: [{ type: "navItem" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "id"
    }
  }
};
```

For more on content previews check out [Previews / List Views](https://sanity.io/docs/the-schema/previews-list-views).

## Wrapping up

We now have a schema set up which allows us to build any number of custom navigations in Sanity Studio, and add nav items that allow for both internal and external linking.

In a follow up article we’ll take a look at building the front-end, and learn how to query our navigation schema, grab the data for a navigation we’ve created and render it on a website. For this part we’ll use [Gatsby](/tags/gatsby) and [GraphQL](/tags/graphql).
