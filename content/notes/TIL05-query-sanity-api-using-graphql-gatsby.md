+++
title = "Query data from Sanity using GraphQL"
date = "2019-08-14T09:32:35+02:00"
description = "Learn how to query structured content in Sanity with GraphQl and display the content in a Gatsby website"
slug = "query-data-from-sanity-using-graphql-and-gatsby"
tags = ["Today I Learned", "Gatsby", "GraphQL", "Sanity"]
syndicate = "true"
+++

I’m making 2 assumptions here, the first is that you have a Sanity project set up, you’ve added at least one content type and you’ve entered some content before [deploying a GraphQL API](/notes/til-03-deploy-graphql-api-sanity/). The second is that you’ve configured a Gatbsy project to work with Sanity, by installing the `gatsby-source-sanity` plugin.

With those steps complete we can now run our site in development mode using `gatsby develop`, then head to `http://localhost:8000/___graphql` to launch GraphiQL and explore our schema.

## Writing your first Sanity query in GraphiQL

Type `allSanity` to launch the options and explore the available document schemas in your API.

One of the available options in my API is `allSanityEvent` which contains all the data associated with a document type I have created called ‘Event’.

```GraphQL
{
	allSanityEvent
}
```

We can make a basic query for an event title like this:

```GraphQL
{
	allSanityEvent {
		edges {
			node {
				title
			}
		}
	}
}
```

*Tip: Hit `alt + space` to see the available options at each level of your query*

In the particular project I’m working on right now my full query grabs the title, excerpt, slug and image from all events. It looks like this:

```
{
	allSanityEvent {
		edges {
			node {
				title
				excerpt
				slug {
					current
				}
				image {
					asset {
						fluid {
							src
						}
					}
				}
			}
		}
	}
}
```

And returns the following JSON object:

```json
{
  "data": {
    "allSanityEvent": {
      "edges": [
        {
          "node": {
            "title": "My second event",
            "excerpt": "This is the excerpt for the second event",
            "slug": {
              "current": "my-second-event"
            },
            "image": {
              "asset": {
                "fluid": {
                  "src": "https://cdn.sanity.io/images/k5nyspnm/production/20ef5df9ed8dac42c2ec50b474a46726143ceb4f-2250x1500.png?w=800&h=533&fit=crop"
                }
              }
            }
          }
        },
        {
          "node": {
            "title": "My first event",
            "excerpt": "This is the excerpt for the first event",
            "slug": {
              "current": "my-first-event"
            },
            "image": {
              "asset": {
                "fluid": {
                  "src": "https://cdn.sanity.io/images/k5nyspnm/production/1c6f3cee364b6cf5bfcad46539b0a9cf82ace1c5-800x400.png?w=800&h=400&fit=crop"
                }
              }
            }
          }
        }
      ]
    }
  }
}
```

## Query your schema in Gatsby

Now we have our query we want to show the content in our Gatsby site.

In `index.js` first we need to import `graphql`.

```
import { Link, graphql } from 'gatsby'
```

Next we can write our query and export it as a variable. Make sure you switch out the image `src` for the ￼image fragment reference.

```
export const queryEvent = graphql`
{
	allSanityEvent {
		edges {
			node {
				title
				excerpt
				slug {
					current
				}
				image {
					asset {
						fluid {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
}
```

Now we can grab the data in our layout.

```
const IndexPage = ({ data }) => (
<Layout>
	<h1>Events</h1>
	<ul>
		{data.allSanityEvent.edges.map(({ node: event }) => (
			<li key={event.slug.current}>
				<h2>{event.title}</h2>
				<Image fluid={event.image.asset.fluid} alt={event.title} />
				<p>{event.excerpt}</p>
			</li>
		))}
	</ul>
</Layout>
)
```

We now have a list of events on our page, including the event title, image and excerpt.

The next step will be to generate the single pages for each event.

## Further resources

- [Sourcing from Sanity](https://www.gatsbyjs.org/docs/sourcing-from-sanity/) in the Gatsby Docs.
- [Build a portfolio site with Sanity and Gatsby](https://www.youtube.com/watch?v=SLGkyodumKI) from Jason Lengstorf.
