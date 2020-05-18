+++
title = "Content schema in Sanity"
date = "2019-07-18T11:17:25+02:00"
description = "When modelling your data try and think about your content not as ‘pages’ but as content ‘types’ and establish what fields each of those content types will need."
slug = "content-schema-in-sanity"
tags = ["Today I Learned", "Sanity"]
draft = "false"
type = "note"
syndicate = "true"
+++

This is the bit where you define your data model, meaning the way you structure your content.

The Sanity team recommend “you start by modelling your data logically, without thinking too much about how it's going to be presented.”

When modelling your data try and think about your content not as ‘pages’ but as content ‘types’ and establish what fields each of those content types will need.

So instead of creating a content type called `Homepage`, think about the type of content that might exist _on_ your homepage, and potentially elsewhere on your site.

For example, your homepage might feature latest posts and you might also have a dedicated page for these posts too. In this case it makes sense to create a content type called `post`.

Next we need to consider the fields associated with our new content type. Think of these as the data attached to the content type. Things like `title`, `slug`, `excerpt` and `publishedAt` are fairly typical requirements for a post.

It’s also worth thinking about the relationships between different data types and modelling your content according to what they mean.

For example the `post` content type may also have an author and perhaps a category attached to it. Maybe in the future you decide to add another content type called `note`, which also requires an author and a category. This is a good reason to create a content type for both `author` and `category` and make a reference it from both content types.

Thinking about your content in this way creates a more flexible data model, as you’re not associating content too tightly to the presentation layer.

It’s worth reading [Dont’s and Dos](https://www.sanity.io/docs/the-schema/donts-and-dos) in the Sanity docs for more on this. Next we’ll put this into practice in a Sanity project.

## Understanding schema.js

To begin, fire open `schemas/schema.js` from inside your Sanity project. The first import you see is the `createSchema` function which allows us to create a schema.

```
import createSchema from 'part:@sanity/base/schema-creator
```

Next you’ll see `schemaTypes` which imports any schema types required from plugins. To see what plugins are used head to `sanity.json`.

The part we’re most concerned with is the `createSchema` object. The array inside this object called `types` is where we define content types.

```javascript
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
});
```

You can see we have 3 content types `post`, `author`, and `category`. As we started this project using the Blog template these are already defined. If you started with a blank template you won’t see any content types defined.

Above this block of code you’ll see each content type is stored in an external file and then imported. As our schema grows this will keep our project well organised.

```javascript
// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import post from "./post";
import author from "./author";
```

The comment tell us that we are importing both `object` and `document` schemas. We’ll get to this next.

## Building a basic schema

Let’s create a new content type for notes. Create a new file `schemas/note.js` and create a new object. We’ll also need to export the object so we can use it elsewhere.

```javascript
export default {};
```

Next we need to name our content type and define what type of content it is. In this case it’s a `document`.

```javascript
export default {
  name: "note",
  type: "document",
};
```

Now we need to import our new content type to the `schema.js` file and add it to the types array so Sanity can see it.

Back in `schema.js` add the following below the `author` import:

`import note from './note`

Then we need to update the types array to include the `note` content type:

```javascript
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,
    note,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
});
```

Now run the studio locally, head to the browser and you’ll notice a few errors. We need a title for our new content type and an array of fields.

```javascript
export default {
  name: "note",
  type: "document",
  title: "Note",
  fields: [],
};
```

Our notes will need a `title`, which will be a basic text string type and of course a title so we can identity the field in the studio.

```javascript
export default {
  name: "note",
  type: "document",
  title: "Note",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
  ],
};
```

Hit save and studio should reload and we can now see our new content type. We can create a new Note and fill in the note Title field.

## Referencing other document content types.

Earlier I mentioned creating relationships between content types. The `reference` type make this possible.

Inside `note.js` let’s add a reference that points to the `author` content type, `author` should already exist if you started with the Blog template.

To specific what content type we want author to reference we can use the `to` field. This takes one rule, that the type is `author`. Now author will only allow references to the author content type.

```javascript
export default {
  name: "note",
  type: "document",
  title: "Note",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },
  ],
};
```

Back in Sanity studio we can see a new field titled Author which allows us to select an Author. If you haven’t added an author yet you’ll need to do this in the Author type first.

## Further resources

- [The Schema](https://www.sanity.io/docs/content-studio/the-schema) from the Sanity Docs
