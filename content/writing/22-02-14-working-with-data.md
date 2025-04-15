---
title: "Working with data"
date: 2022-02-14T16:45:14Z
draft: false
description: "A quick look at how to render nested data within Hugo templates."
slug: "working-with-data"
topics: ["Daily", "Side Projects"]
---

Last week I finally managed to get an early draft of the curriculum live on [practicalhugo.com](http://practicalhugo.com/). It’s by no means a complete curriculum,  just a rough outline of what I’ve figured out so far, including some of the lessons I’ve already written. As I mentioned before, the order is no way set in stone at this point. I’m still a long way off figuring out the final content structure, but it should give you a rough idea of where it’s heading.

In the meantime, I thought it might be helpful to explain how I implemented this data on the site, so I will do my best to do that in the rest of this update.

When thinking about how to deal with structured data like you see in the curriculum section of the [practicalhugo.com](http://practicalhugo.com/) homepage, it makes sense to first think about what you’re trying to achieve. Forgive me if that sounds obvious.

For example, all I want to do is spit this data out on the homepage, I don’t need pages for the content. Remember, by default, Hugo will generate an HTML page for any content it finds in the content folder. Therefore, in this case it’s best to avoid the content folder altogether, and reach fo the data folder instead. 

I decided to store all this data in a single file in the data folder called *curriculum.yaml.* This should make it nice and easy to work with the data.

At the time of writing this, here’s what that file looks like.

```yaml
---
title: Curriculum
module:
  - title: Introduction
    number: 0
    description: Everything you need to know about the course, before we get going.
    lesson_total: 5
    lessons:
      - title: What is Hugo?
      - title: Why use the Jamstack?
      - title: How this course works
      - title: What you’ll need
      - title: What you’ll be building
      - title: Making a project folder
  - title: Up & Running
    number: 1
    description: Learn the very basics of building websites with Hugo.
    lesson_total: 8
    lessons:
      - title: Installing Hugo
      - title: Using Hugo’s CLI
      - title: Creating a new site
      - title: Intro to the config file
      - title: Building a homepage
      - title: Running the web server
      - title: Creating pages
      - title: Generating output
  - title: Building a starter theme
    number: 2
    description: Learn how to organise your layouts and speed up your development process.
    lesson_total: 10
    lessons:
      - title: Creating a new theme
      - title: Building a base template
      - title: Working with partials
      - title: Adding a menu
      - title: Creating a list template
      - title: Improving the <head>
      - title: The static folder
      - title: Adding a 404 page
      - title: Styling basics
      - title: Intro to Hugo pipes
  - title: Working with data
    number: 3
    description: Learn how to construct pages from front matter data, use data files and work with external data source.
    lesson_total: 8
    lessons:
      - title: Building pages from front matter
      - title: Using data files for structed data
      - title: Working with external data sources
```

The `title` at the very top of the file represents the title for the entire data set; Curriculum. I’ll use it to render the section title on the homepage, as we’ll see shortly.

Notice I’ve created a `module` key below, which is essentially just an array of objects. Each object representing a different module in the course; *Introduction*, *Up & Running*, *Building a starter theme,* and so on. You will have spotted the `-` prefixing each `title` key. This indicates the start of each object. The same thing is happening in `lessons`, which you will find nested within each module.

With this data structure it should be easy enough to loop through each object and render the data in my *index.html* template.

Let’s take a look at the template now. Below you will find an extract of my index.html template, consisting of the relevant code.

```html
{{ $curriculum := .Site.Data.curriculum }}
{{ $module := $curriculum.module }}

<h2 id="{{ $curriculum.title | urlize }}">{{ $curriculum.title }}</h2>

{{ range $module }}     
  <article class="mt110 pb80">
    <div class="flex justify-between items-center">
      <span>Module {{ .number }}</span>
      <span class="Badge">{{ .lesson_total }} Lessons</span>
    </div>
    <h3 class="pt60 pb60">{{ .title }}</h3>
    <p>{{ .description }}</p> 
    <ul>
    {{ range .lessons }}
      <li><strong>{{ .title }}</strong></li>
    {{ end }}
    </ul> 
  </article>
{{ end }}
```

The first thing to do when working with slightly more complex data structures than usual, is to get hold of the data and store it in a variable. Notice I’ve done this for all the data in the curriculum file by assigning `.Site.Data.curriculum` to `$curriculum`. 

```
{{ $curriculum := .Site.Data.curriculum }}
```

To render the title in the `h2` tag, all I need to do now is append the key–in this case *title*–to the variable `$curriculum`. 

```html
<h2 id="{{ $curriculum.title | urlize }}">{{ $curriculum.title }}</h2>
```

Without the variable, you would be forced to write  `.Site.Data.curriculum.title` , which is the exact same thing, just a different way about it.  Using the variable is quicker and the code less verbose.

Notice the second variable below targets the module array from the data set. As we’ve already expressed the `$curriculum` variable, to get hold of the module array we can simply append the module key to the curriculum variable; `$curriculum.module`. 

```
{{ $module := $curriculum.module }}
```

Now we can loop through the array and return each module object by passing the module variable to the range function; `{{ range $module }}` . Note that any time we enter a statement of logic we need to close the statement using `{{ end }}`, otherwise Hugo will throw an error.

```html
{{ range $module }}     
  <!-- loop through data in module array -->
{{ end }}
```

Within our range function, context changes to the data found within the module array, so any data we want to return is accessible by prefixing the key with the dot; `.number`, `lesson_total` and so on. 


```html
{{ range $module }}     
  <article class="mt110 pb80">
    <div class="flex justify-between items-center">
      <span>Module {{ .number }}</span>
      <span class="Badge">{{ .lesson_total }} Lessons</span>
    </div>
    <h3 class="pt60 pb60">{{ .title }}</h3>
    <p>{{ .description }}</p> 
  </article>
{{ end }}
```


This is because Hugo stores current context in the dot, and context changes as soon as you step into some logic. This explains why `.title` within our `$module` logic returns the module title, rather than the curriculum section title.

This happens again when we use another range to access the nested array of *lessons*; `{{ range .lessons}}`. Notice we now have a range nested within a range. 


```html
{{ range $module }}     
    <ul>
    {{ range .lessons }}
      <li><strong>{{ .title }}</strong></li>
    {{ end }}
    </ul> 
{{ end }}
```

At this point Hugo will loop through the lessons array within each module. Now when we add `.title` within our lessons range, Hugo will return the lesson title rather than any other title in the data set, as context has now changed to the lessons array. 

We step out of our range logic using `{{ end }}`, just like did in the module range.