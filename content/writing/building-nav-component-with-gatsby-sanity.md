---
title: "Building a dynamic navigation component with Gatsby and Sanity"
date: 2021-01-13T09:55:00Z
draft: false
description: "How to query data from a Sanity schema and use it to build a navigation component on a Gatsby powered website."
slug: "navigation-component-gatsby-sanity"
topics: ["Gatsby", "Sanity"]
syndicate: "false"
---

In a previous post I wrote about [building a navigation schema in Sanity](https://harrycresswell.com/articles/sanity-building-naigation-schema/).

In this one we’ll look at how to query the data from the schema we created in that post and render it inside a React component, using the popular static site generator Gatsby. If you haven’t done so already, then head back and read the previous article to build out your schema, before continuing with this one.

Styling the navigation falls outside the scope of the article, but I might cover it in a later one. Instead, our primary concern is learning how to consume the data we’ve added to Sanity Studio and render it in a Gatsby powered website.

Before we begin it’s worth mentioning exactly what I mean when I say “dynamic navigation”. A dynamic navigation in this case is essentially just a list of links which haven’t been hard coded directly into the component. Instead, a content admin will have the power to make changes to the navigation on the front-end via Sanity studio, just like any other piece of content. And they can do this whenever they like, adding and removing links as they wish.

Ok, let’s get going.

## Where we’re at with Sanity and Gatsby

I assume you already have a Gatsby project set up and you have the [gatsby-source-sanity](https://www.gatsbyjs.com/plugins/gatsby-source-sanity/) installed. If you haven’t done this yet you can find out how to do it in [Setting up a Gatsby project with Sanity](https://harrycresswell.com/notes/new-gatsby-site-sanity-cms/).

At this point you should also have a Sanity studio project set up, if you haven’t head over to [Starting a new Sanity project](https://harrycresswell.com/notes/new-sanity-project/) for more.

Finally, make sure you [create your navigation schema in Sanity](https://harrycresswell.com/articles/sanity-building-naigation-schema/) before continuing, without it you’ll struggle to make progress.

## Adding navigation content in Sanity Studio

The first thing we need to do is add some data in Sanity using our new navigation schema. That way we’ll have some data to consume in our Gatsby website. We’re going to create two navigations; one to dislay in the header of our website and one to display in the footer.

If everything is set up as per [the previous article](https://harrycresswell.com/articles/sanity-building-naigation-schema/) then you should see ‘Navigation‘ listed in the content panel on the left hand side of your Sanity project.

Inside the Navigation content type, create a new naviation by clicking the plus button to the right of the title in the middle column.

Give your new navigation a _name_ and an _id_. Make sure you create a memorable name. I’ll use ‘Header nav’ and make sure the _id_ reflects the name. Your _id_ should be lowercase with words separated by a dash. For example, `header-nav`.

Now we’re ready to add some navigation items. Add the _text_ you want to show as the link on the front-end and the _link url_ to the page. If it’s not entirely obvious the _link url_ is the URL you want to link the text to. Be sure to check ‘Content is from an external source’ if the page is external. In other words, if it’s not a page on your Gatsby site.

Once you are happy with your navigation items hit publish to save your new navigation.

Now follow the exact same steps to create your footer navigation. Replacing “Header” in the name and id with ”Footer”.

## Deploy the graphQL API

Once you’ve added your navigation content to Sanity you’ll need to deploy the GraphQL API. This is so the data can be consumed inside your Gatsby project.

If you’re doing this on a live site then this step will happen during the build process, however whilst working locally on a development project you will need to deploy the API manually.

We can do that by running the following from the command line, from inside our Sanity Studio project:

```
sanity graphql deploy
```

Check out my notes for more on [deploying a GraphQL API for a Sanity project](https://harrycresswell.com/notes/deploy-graphql-api-sanity/).

If you are having issues with this step then make sure you read the docs on [breaking changes between API generations](https://www.sanity.io/docs/graphql#migrating-from-the-beta-version-63c1424b5fc3). This could be the source of your problem.

If all went well and you successfully deployed a GraphQL API, then your data from Sanity is now ready to be consumed inside your Gatsby project.

## Query a sanity API and filter the results

Start your Gatsby server and head to GraphiQL by opening `http://localhost:8000/___graphql` in a browser.

In the GraphiQL Explorer you should find that `allSanityNav` is now available to query.

Click `allSanityNav` to start building your query. Next we’ll want to set up a filter on the query to target the specific data we want to return in a content type.

For our header navigation we’ll want to filter either the _id_ or the _title_ as seen in the example below. Click the `eq:` (or equals parameter) and type the name. The name must match the title exactly, so be aware of the case you’ve used in Sanity. I’ve used Title case so I’ve written “Header Nav”.

Now you’re ready to include the nodes in your query. Make sure you include everything from your schema.

```graphql
query HeaderNav {
  headernav: allSanityNav(filter: { title: { eq: "Header Nav" } }) {
    edges {
      node {
        navItems {
          text
          _key
          navItemUrl {
            linkUrl
            externalContent
          }
        }
      }
    }
  }
}
```

Follow the exact same steps for your footer navigation, this time filtering the _title_ or _id_ of your footer nav.

```graphql
query FooterNav {
  footernav: allSanityNav(filter: { title: { eq: "Footer Nav" } }) {
    edges {
      node {
        navItems {
          text
          _key
          navItemUrl {
            linkUrl
            externalContent
          }
        }
      }
    }
  }
}
```

The final thing to do is wrap both queries in a const variable so we can drop both queries into our Gatsby site and access the data from inside our component.

Our header code now looks like this:

```javascript
const HEADER_QUERY = graphql`
  query HeaderNav {
    headernav: allSanityNav(filter: { title: { eq: "Header Nav" } }) {
      edges {
        node {
          navItems {
            text
            _key
            navItemUrl {
              linkUrl
              externalContent
            }
          }
        }
      }
    }
  }
`;
```

Our footer code now looks like this:

```javascript
const FOOTER_QUERY = graphql`
  query FooterNav {
    footernav: allSanityNav(filter: { title: { eq: "Footer Nav" } }) {
      edges {
        node {
          navItems {
            text
            _key
            navItemUrl {
              linkUrl
              externalContent
            }
          }
        }
      }
    }
  }
`;
```

Now we’re ready to build each component and use the queries.

## Render the navigation in a component

It probably makes sense to render our navigation for the header in a header component. If you don’t have one yet then create a new file in your components folder and name it `header.js`.

First we need to create a [static query](https://www.gatsbyjs.com/docs/static-query/#how-staticquery-differs-from-page-query), then pass our query to the component.

Below we’re passing `HEADER_QUERY` which is the name of the const variable we stored our query in in the last part.

We also want to render the data inside an arrow function. For now we can can add some header tags which will eventually contain the rest of our code.

```
import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

const Header = () => (
  <StaticQuery
    query={HEADER_QUERY}
    render={data => (
    <header>
    </header>
    )}
  />
)

export default Header
```

Don’t forget to export your component.

Now we can can set up our navigation using a `<nav>` element and map through the data within `headernav` which we set in our query.

```
import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

const Header = () => (
  <StaticQuery
    query={HEADER_QUERY}
    render={data => (
    <header>
      <nav role='navigation'>
        {data && data.headernav.edges.map(({node: headernav}) => (
        ))}
      </nav>
    </header>
    )}
  />
)

export default Header
```

Next we need to check to see if any nav items exist in our navigation. If items exist we want to return them in an unordered list. If nothing exists we don’t want to return anything.

To do this we can use a conditional [ternary operator](https://reactjs.org/docs/conditional-rendering.html) which is essentially short hand for an if..else statement. The syntax looks like this:

```
condition ? true : false.
```

Consider the code below. Here we’re saying, if nav items in header nav exist, then map through the items and return the nav item text in a list item.

```
{headernav.navItems ? (
<ul role='menubar'>
{headernav.navItems.map(navItems => (
  <li key={navItems._key}>
    <Link to={`/${navItems.navItemUrl.linkUrl}>
      {navItems.text}
    </Link>
  </li>
))}
</ul>
) : null}
```

We also want to wrap the text in a link so we can navigate to the `linkURL` set in Sanity. Here we’re using Gatsby’s built in [Link component](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/) which you will need to import from Gatsby.

When we put all this together our code should look something like this:

```
import React from 'react'
import {Link, StaticQuery, graphql} from 'gatsby'

const Header = () => (
  <StaticQuery
    query={HEADER_QUERY}
    render={data => (
    <header>
      <nav role='navigation'>
        {data && data.headernav.edges.map(({node: headernav}) => (
           <>
            {headernav.navItems ? (
              <ul role='menubar'>
                {headernav.navItems.map(navItems => (
                  <li key={navItems._key}>
                    <Link to={`/${navItems.navItemUrl.linkUrl}>
                      {navItems.text}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ))}
      </nav>
    </header>
    )}
  />
)

export default Header
```

We still have one final problem. We haven’t accounted for any external links that might exist in our navigation.

If you remember `externalContent` is boolean data which we set up in our Sanity schema. In other words, it will return either `true` or `false` depending on whether the toggle switch in Sanity has been checked on not.

Using another [ternary operator](https://reactjs.org/docs/conditional-rendering.html) we can conditionally render a link with a `target` attribute set to `_blank` when `externalContent` returns _true_ and our regular link when it returns _false_.

Consider the example below.

```
{navItems.navItemUrl.externalContent ? (
  <a href={navItems.navItemUrl.linkUrl} target='_blank' rel='noopener noreferer'>
  {navItems.text}
  </a>
)
  : <Link to={`/${navItems.navItemUrl.linkUrl}`}>
      {navItems.text}
    </Link>
}

```

Now we can put all this together to form our header component with our navigation data included.
I’ve left some comments in the code below to help explain what’s going on when we use the ternary operator.

```
const Header = () => (
  <StaticQuery
    query={HEADER_QUERY}
    render={data => (
      <header>
        <Box>
          <Link to='/' aria-label='Home'>
            <Logo />
          </Link>
        </Box>
        <Box id='Nav'>
          <nav role='navigation'>
            {data && data.headernav.edges.map(({node: headernav}) => (
              <>
                {headernav.navItems ? (
                  <ul role='menubar'>
                    {headernav.navItems.map(navItems => (
                      <li key={navItems._key}>
                        {/* If externalContent returns true (i.e switched checked in sanity) then... */}
                        {navItems.navItemUrl.externalContent ? (
                          <a href={navItems.navItemUrl.linkUrl} target='_blank' rel='noopener noreferer'>{navItems.text}</a>
                        )
                        {/* else... */}
                          : <Link to={`/${navItems.navItemUrl.linkUrl}`}>{navItems.text}</Link>
                        }
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            ))}
          </nav>
        </Box>
      </header>
    )}
  />
)

export default Header

```

Without wanting to sound repetitive, follow the exact same steps for your footer navigation. Just make sure you’re query is set to `FOOTER_QUERY` and the data you render is from `footernav` and not `headernav`, as in the example code above. You’d most likely also want to create a Footer component to export as opposed to another Header component. At this point that should be fairly obvious.

## Using the component

The final piece of the puzzle is to include our new components somewhere in our website.

```
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children}) => (
  <>
    <section className='Skip'>
      <a className={styles.SkipToContent} href='#main-content'>Skip to main content</a>
    </section>
    <Header />
    <main id='main-content' className={styles.content}>{children}</main>
    <Footer />
  </>
)

export default Layout

```

I’m including both Header and Footer components in my layout template, just like I would any other component.

## Wrapping up

If all went well you should now see your header and footer navigation rendered on the front end of your Gatsby website.

By setting up a navigation schema which allows for multiple navigations, as we did in the first part, it’s possible create any number of new navigations on your website.

So now you can easily go back into Sanity, spin up a new navigation and follow the same steps to build the query and render the data inside a component. I’ll leave that part up to you.
