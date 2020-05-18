+++
title = "Deploy a GraphQL API for a Sanity project"
date = "2019-07-19T10:38:59+02:00"
description = "If you want to consume your Sanity dataset from a front-end the you will need to set up an API. You can do this using Sanity’s custom query language GROQ or GraphQL. These notes focus on the latter."
slug = "deploy-graphql-api-sanity"
tags = ["Today I Learned", "GraphQL", "Sanity"]
draft = "false"
type = "note"
syndicate = "true"
+++

If you want to consume your Sanity dataset from a front-end the you will need to set up an API. You can do this using Sanity’s custom query language GROQ or GraphQL. These notes focus on the latter.

With an API set up you will be able to query your data in any application you create.

**Note: Anytime you make changes to your content schema, you will need to redeploy the GraphQL API**

## Deploying the GraphQL API

First make sure your running the latest version of Sanity:
`sanity upgrade`

Run `sanity graphql deploy` to deploy a GraphQL API for the dataset configured in `sanity.json`.

You will then be asked the following:

`Do you want to enable a GraphQL playground? (Y/n)`

Hit `Y` and you’ll be able to explore the Schema in a GraphQL Playground.

## Explore the Schema from a Gatsby project

Explore `￼http://localhost:8000/___graphql` after running `gatsby develop` to understand the created data and create a new query and checking available collections and fields by typing `CTRL + SPACE`.

## Further Resources

For more on this step [check out the docs](https://www.sanity.io/docs/data-store/graphql#deploying-the-graph-ql-api).
