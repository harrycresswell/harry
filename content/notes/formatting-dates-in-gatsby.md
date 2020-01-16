---
title: "Formatting dates in Gatsby with GraphQL"
date: 2020-01-16T11:41:11Z
draft: false
description: "Perhaps the easiest way to format dates in Gatsby is at query-time using Gatsby’s GraphQL layer."
slug: "formatting-dates-gatsby"
tags: ["Gatsby", "GraphQL"]
syndicate: "false"
---

Perhaps the easiest way to format dates in Gatsby is at query-time using Gatsby’s GraphQL layer.

```graphql
{
  date(formatString: "MMMM Do, YYYY")
}
```

`cmd + click` on the `formatString` function in your query to open the schema documentation explorer.

You’ll see the date is formatted using Moment.js date tokens.

Head to [the MomentJS docs](https://momentjs.com/docs/#/displaying/format/) to see the various format options.

For a current project I’m using a fairly minimal config.

```graphql
{
  date(formatString: "DD MMM")
}
```

Which prints out something along the lines of:

`25 Jul`.

## Adding the time

For another project I needed to grab the time, not just the date.

```graphql
{
  date(formatString: "dddd MMMM Do, YYYY hh:mma")
}
```

This returns something along the lines of:

`Thursday January 16th, 2020`

## Further reading

- [GraphQL Concepts – Formatting dates](https://www.gatsbyjs.org/docs/graphql-concepts/#formatting-dates) from Gatsby Docs.
- [GraphQL Reference - Dates](https://www.gatsbyjs.org/docs/graphql-reference/#format) from Gatsby Docs.
- [Moment.js Display formats](https://momentjs.com/docs/#/displaying/format/)
