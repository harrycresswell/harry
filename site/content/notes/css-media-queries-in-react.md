+++
title = "Using CSS Media Queries in React"
date = "2019-08-21T15:41:48+01:00"
description = "Using a library called React Media to make CSS media queries possible with React components."
slug = "css-media-queries-in-react"
tags = ["React", "CSS"]
draft = "false"
type = "note"
syndicate = "yes"
+++

Being more comfortable with HTML and CSS, than JavaScript and React, I still like the idea of using good ol' media queries to show and hide content at certain viewport widths. But how do media queries work with React?

I found a library called [React Media](https://github.com/ReactTraining/react-media) which is essentially a media query component for React that listens for matches to a CSS media query and renders stuff based on whether the query matches or not.

## Getting started

Install from the root of your project using NPM.

```
npm install --save react-media
```

Using `react-media` within `create-react-app`:

```jsx
import React from 'react';
// Import the media component into your project using ES modules
import Media from 'react-media';

class App extends React.Component {
  render() {
    return (
      <div>
      // Render a media component with a query prop whose value is a valid CSS media query. 
        <Media query="(max-width: 599px)">
        // The children prop should be a function whose only argument will be a boolean flag that indicates whether the media query matches or not.
          {matches =>
            matches ? (
              <p>The document is less than 600px wide.</p>
            ) : (
              <p>The document is at least 600px wide.</p>
            )
          }
        </Media>
      </div>
    );
  }
}

```

So what’s going on here? React Media uses a conditional operator to determine what to display based on the query prop, in this case whether the viewport is less than 600px or at least 600px wide.

This is helpful for rendering different components at different viewports. For example you might have a hamburger icon you want to show on smaller screens but hide on larger screens and an inline navigation which you want to hide on smaller screens but show on larger screens. 

React Media provides a quick solution to help solve this problem.

## Further Resources

- [React Media](https://github.com/ReactTraining/react-media) from React Training.