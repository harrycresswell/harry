---
title: "Filtering content in Gatsby by date and deadline"
date: 2020-03-17T00:00:00Z
draft: false
description: "A problem I’ve been facing is how to remove content in Gatsby that has a deadline. Here I’ll show you the approach I’m using to filter content at query time using GraphQL and then automate the build process."
slug: "filtering-content-in-gatsby-by-date-and-deadline"
tags: ["Gatsby", "GraphQL", "Automation"]
syndicate: "false"
---

On [the jobs board prototype](https://www.jobs.angelinvestmentnetwork.co.uk/) I’ve been working on, all jobs have a deadline. As you might expect, the idea is that whenever a deadline is reached, the job listing is no longer active and therefore should no longer display on the website.

This presents us with an interesting problem. We need a way to remove any piece of content (in this case a job) from the site that has reached it’s deadline.

But this isn’t a dynamic site built with PHP or whatever else, this is Gatsby, and for all the fun React-what-not used to build these sites, the output is still very much static HTML. So removing these jobs dynamically isn’t as easy as it sounds.

We could just remove this content manually. It’s a viable option for a small site. But as the site grows, which we expect it will, this will involve sifting through every single job post, checking to see whether the deadline has expired or not. Tedious stuff.

A better alternative is to create a filter at query time, that remove this content when we build the site. This filter will remove any content that has reached the deadline, by checking whether the deadline (set in the front matter of the document) exceeds the current date.

However, this still leaves us with one final problem. Running the build is still a manual process. Ideally, we’d like to automate this step, so that the site rebuilds itself every time a deadline expires. I have an idea for this, but let’s leave that until we get to it.

First things first. Let’s recap these steps, to get a clear picture of what we want to do.

## Steps to reproduce

- **Step 1:** [Add deadline to content frontmatter](#add-deadline-to-content-frontmatter)
- **Step 2:** [Create a function to get current date](#create-a-function-to-get-current-date)
- **Step 3:** [Pass current date to component to use in query](#pass-current-date-to-component-to-use-in-query)
- **Step 4:** [Filter content where deadline is greater than current date](#filter-content-where-deadline-is-greater-than-current-date)
- **Step 5:** [Build site to run query and update output](#build-site-to-run-query-and-update-output)
- **Step 6:** [Automate the build process](#automate-the-build-process)

## Add deadline to content frontmatter

First, we need to add a `deadline` to the front matter of every content markdown file that we might want to filter. Use a key value pair, where the value is a date.

```yaml
---
title: Marketing Director
company: Buengo
slug: marketing-director-at-buengo
date: 2019-12-03T13:00:00.000+00:00
published: true
deadline: 2020-02-06T13:39:59Z
---

```

Now we have a way to filter the document based on the deadline date. Easy enough.

## Create a function to get current date

The next step is to create a function which grabs the current date. We’ll need to pass this to the page template, so we can use it in the query.

Luckily for us, [Steven Mercatante has written a great article](https://stevenmercatante.com/publish-posts-after-date-in-gatsby) where he does something similar, but in his case for scheduling posts. We can use Steven’s `getCurrentDate` function, as it’s exactly what we need.

Full credit to Steven for this. Without his article I’d probably be scrounging around still looking for answers.

As Steven comments; the function “Returns the current date in YYYY-MM-DD format.” This is what we want.

```javascript
// gatsby-node.js
/**
 * Returns the current date in YYYY-MM-DD format
 */
function getCurrentDate() {
  const d = new Date();
  let month = (d.getMonth() + 1).toString();
  if (month.length < 2) {
    month = `0${month}`;
  }
  let day = d.getDate().toString();
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${d.getFullYear()}-${month}-${day}`;
}
```

We need to add this function to our _gatsby-node.js_ file, so it’s available to use as `context` when we create content pages.

## Pass current date to component to use in query

Now we need to pass the `currentDate` data to the page layout. We can do this using [context object](https://www.gatsbyjs.org/docs/gatsby-internals-terminology/#pagecontext), which is created by calls to [createPage](https://www.gatsbyjs.org/docs/actions/#createPage). This is what Gatsby uses to generate pages on the website.

The _context_ object is passed to GraphQL queries as the context parameter. But more on this later.

Depending on how your project is set up this might look slightly different. Perhaps you want to pass context to a different page layout. Either way, the process is the same. This is what it looks like in our case.

```javascript
// gatsby-node.js
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  createPage({
    path: `${node.frontmatter.slug}/`,
    component: path.resolve("./src/components/postLayout.js"),
    context: {
      slug: node.frontmatter.slug,
      currentDate: getCurrentDate()
    }
  });
};
```

Notice the value of `currentDate` in the _context_ object is a call to the `getCurrentDate()` function we created earlier.

This will pass `currentDate` as a parameter to our _postLayout.js_ component, so we can use it in our GraphQL query.

## Filter content where deadline is greater than current date

Now we’ve done the hard work, this step should be fairly easy.

We need to add the filter to our GraphQL query (found inside the page layout), to check if `deadline` is _greater than or equal to_ the current date. Remember the current date is held in the `currentDate` parameter, which we just passed into the component using the _context_ object.

Here’s the full query:

```graphql
query($company: String, $currentDate: Date!) {
  allMarkdownRemark(
    filter: {
      frontmatter: {
        company: { in: [$company] }
        published: { eq: true }
        deadline: { gte: $currentDate }
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
    edges {
      node {
        frontmatter {
          title
          company
          date(formatString: "MMMM DD, YYYY")
          slug
        }
      }
    }
  }
}
```

Ok, let’s break this down.

The first part to pay close attention to is where it says `deadline: { gte: $currentDate }`, found in the filter part of the query.

We’re using the [gte operator](https://www.gatsbyjs.org/docs/graphql-reference/#complete-list-of-possible-operators), meaning ”greater than or equal to”, and passing in the current date parameter. We do this by setting it as the value of deadline.

In other words, we’re telling GraphQL to filter any content where `deadline` is greater than or equal to the current date.

Makes sense.

The second thing we need to do is make sure we pass the parameter into the query itself. We do this by passing the query an argument: `$currentDate: Date!`.

Now we’re ready to rebuild our site and run the query.

## Build site to run query and update output

Depending on how you’re set up, you should be able to build your site by running `gatsby build` in the terminal.

Gatsby will rebuild the site, the query will run and any jobs where the deadline has expired will be filtered out of the content that’s returned.

Restart your local development server (usually `gatsby develop`, `gatsby serve` or `npm start`), so you can see the changes.

Though nice and easy, this step is still very manual, at this stage. So the final part is to figure out how we can automate this process, so the site rebuilds itself when deadlines expire.

## Automate the build process

There are a bunch of ways to trigger a build, but the easiest way is using a Webhook.

If you’re using Netlify, this is straight forward. Head to [Netlify’s site settings](https://docs.netlify.com/configure-builds/build-hooks/) and select _Build & Deploy_. Now scroll down to _Build Hooks_ and hit the _Add build hook_ button.

Give your new build hook a name – I called mine ”Filter expired deadlines” – then choose the branch (most likely master) that your site is deploying from.

Netlify will generate a unique URL, which you can use to send a POST request to, and trigger a deploy. Now to figure out a way to trigger this Webhook.

For this we can look to an automation tool called [IFTTT](https://ifttt.com/), which connects different apps and services so they can pass data to one another.

IFTTT has a service called [Date & Time](https://ifttt.com/date_and_time) which we can set up to run on an hourly, daily, weekly, monthly or yearly basis. By choosing the daily option and setting the time to 12.00am, we can run our build at a time that makes sense.

Next we need to connect this to the [Webhook](https://ifttt.com/maker_webhooks) service, so we can provide IFTTT with our Webhook URL and trigger a build using the POST method.

You can even tell IFTTT to send you a notification when the automation completes. Not bad, it gets the job done.

## Resources

- [Publish Posts After a Date in Gatsby](https://stevenmercatante.com/publish-posts-after-date-in-gatsby) by Steven Mercatante
- [page.context](https://www.gatsbyjs.org/docs/gatsby-internals-terminology/#pagecontext) from the Gatsby docs
- [createPage](https://www.gatsbyjs.org/docs/actions/#createPage) from the Gatsby docs
- [Complete list of possible operators](https://www.gatsbyjs.org/docs/graphql-reference/#complete-list-of-possible-operators) from the Gatsby docs
- [Netlify Build hooks](<(https://docs.netlify.com/configure-builds/build-hooks/)>) from the Netlify docs
