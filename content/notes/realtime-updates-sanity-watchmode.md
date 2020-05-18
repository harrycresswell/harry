+++
title = "Real-time updates with Sanity watch mode"
date = "2019-08-20T10:57:26+02:00"
description = "Watch mode allows you to see realtime content updates without having to manually re-run the build process."
slug = "real-time-updates-sanity-watch-mode"
tags = ["Today I Learned", "Sanity", "Gatsby"]
draft = "false"
type = "note"
syndicate = "true"
+++

Watch mode allows you to see realtime updates without having to manually restart the build process.

Set `watchMode: true` in your `gatsby-sanity-source` plugin options, to set up a listener which watches your project for changes.

Take it further by setting `overlayDrafts: true` to immediately apply any changes you make to draft content.

You will then need to generate a token from the Sanity manage console.

Navigate to `manage.sanity.io` > settings > API > Add New Token.

Create a Read token called Gatsby and add to your `gatsby-config.js.`

```javascript
{
	resolve: "gatsby-source-sanity",
	options: {
		projectId: "your_project_id",
		dataset: "your_dataset_name",
		overlayDrafts: true,
		watchMode: true,
		token: 'your_token_id'
	}
}
```

Restart `gatsby develop`.

Now when you edit content in the Studio CMS you will see changes occur in Gatsby in realtime.
