+++
title = "Set up a Gatsby project with Sanity"
date = "2019-08-05T11:32:35+02:00"
description = "How to configure Gatsby to play nice with Sanity. Including configuring the gatsby-source-sanity plugin and some cool extra development features that ship with Sanity."
slug = "new-gatsby-site-sanity-cms"
tags = ["Today I Learned", "Sanity", "Gatsby"]
draft = "false"
type = "note"
syndicate = "true"
+++

## Step 1: Create new Gatsby project

Create new folder for new Gatsby site.

`mkdir gatsby-sanity-frontend`

Move into that folder and create a fresh Gatsby project using the default Gatsby starter.

`cd gatsby-sanity-frontend && gatsby new .`

## Step 2: Install Sanity dependency

Install Gatsby Source Sanity plugin to your project.

`npm install --save gatsby-source-sanity`

Inside `gatsby-config.js` add plugin:

```javascript
{
	resolve: 'gatsby-source-sanity',
		options: {
		projectId: '<yourProjectId>',
		dataset: '<yourDatasetName>',
	},
}
```

You will find your `projectId` and `dataset` inside `sanity.json` found within your studio project.

If you chose to make your dataset private you will also need to add a permissions token like this:

```javascript
{
	resolve: 'gatsby-source-sanity',
	options: {
		projectId: '<yourProjectId>',
		dataset: '<yourDatasetName>',	// a token with read permissions is required
		// if you have a private dataset
		token: process.env.MY_SANITY_TOKEN,
	},
}
```

## Step 3: (optional) Enable Gatsby watch mode for drafts

Sanity has a cool feature which allows for realtime content updates in local development. So if you have your content studio and front end side-by-side in two different browser windows, you will see any changes you make to the content in the studio change in realtime in Gatsby.

To get this set up correctly

- go to `manage.sanity.io` and find your project (or run the command `sanity manage` in the studio folder).
- Head to `Settings > API`, then scroll down to the Tokens section
- Add a new token and give it read privileges.
- Back in the root of your `/web` project locate `.env.development.template` and rename it to `.env.development`.
- Add your new token to the key: `SANITY_READ_TOKEN="<token here>"`
- Inside `gatsby-config.js` make sure you have `token: process.env.SANITY_READ_TOKEN,` as one of the options in your `gatsby-source-sanity` plugin config.

Restart your development environment for the changes to propagate. Make some changes in your studio and watch them appear in realtime in Gatsby.

## Further resources

- [Blazing fast development with Gatsby and Sanity.io](https://www.gatsbyjs.org/blog/2019-01-25-blazing-fast-development-with-gatsby-and-sanity-io/) from Knut Melvær.
- [Enable Gatsby Watchmode for Drafts](https://github.com/sanity-io/example-company-website-gatsby-sanity-combo#enable-gatsby-watch-mode-for-drafts) from Sanity.io
