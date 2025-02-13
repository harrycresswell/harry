---
title: "Generate pages from Google Sheets using Hugo’s Content Adapters"
date: 2025-02-13T10:52:48Z
draft: true
slug: "generate-pages-from-google-sheets"
topics: ["Hugo"]
description: "Dynamically generate pages on your Hugo site from CSV data in a Google sheet."
---

For a long time, building pages from remote data sources felt like one of those killer features that was missing from Hugo[^1]. A hard pill to swallow, made worst by the fact that the Eleventy community have had this feature, as standard, from day one. 

Lucky for us, all this changed with the release of [Content Adapters](https://gohugo.io/content-management/content-adapters/) in Hugo [0.126.0](/writing/upgrading-hugo-warnings-breaking-changes/). Now, with a few lines of code in a go template (.gotmpl), it’s possible to dynamically generate pages from remote data sources – like JSON, CSV, TOML, YAML and XML.

The Hugo Docs have a great example of [how to generate pages from remote JSON data](https://gohugo.io/content-management/content-adapters/#example) using a content adapter, but there’s not much written about working with other data types, from other remote places. 

With that in mind, I thought I’d share how I used content adapters to generate pages from CSV data held in a Google Sheet, for a recent client project. But, before we get into the build, first it might help to learn more about the project.


## A quick overview of the project

My client operates in various states and counties across the USA. Part of their marketing effort is creating targeted, location-based, landing pages for each county, in each state. As you can imagine, creating all these page is a fair amount of work.

To make this process easier, the data for each page is stored in a single Google Sheet, where each row in the sheet holds the content for each page. 

The goal of the project was to use this Sheet to generate pages for each location. Fortunately, each page required the exact same design and layout, meaning all that actually changes page-to-page is the content itself. 

There were some other challenges to consider. For example, my client needed the ability to regularly update each page from the sheet. And, also, control whether pages would publish on their website, or not. Essential the goal is to use Google Sheets as a content management system for this part of their website. The thinking behind this is that it’s much easier to manage these pages on mass, from a single sheet, rather than individually, via a traditional CMS.

Ok. Now we have a rough idea of the project requirements, let’s look at how to make it happen.


## Create a Google sheet with some data in it

To kick things off, the first step is to create a Google Sheet with some data in it. For the purposes of this post, I’ve made [an example sheet](https://docs.google.com/spreadsheets/d/11uVKGlWucpT31cc_by595yOaNSW_qpa4B1mTvP8nW5k/edit?usp=sharing) with a couple of entries in it.

The next step is to publish your Sheet to the web. That way Hugo can work with the data. To do this, open your Google Sheet, then head to `File > Share > Publish to web` from the top menu. This will open a modal called *Publish to the web*. From here, find the *Link* tab. It should be the one already selected. From the Link tab, select **Entire Document** and change the format from *Web page* to **Comma-seperated values (.csv)**.

Below those two selects you’ll find a URL for the sheet. You’ll need this URL to get hold of the data, when you build your content adapter.


## Create a Content Adapter to generate pages

A Content Adapter is a Go template used to generate pages. It has access to all the usual functions as a regular layout template. But, there are some differences to consider, from your typical layout template.

### Keep Content Adapter templates in the /content folder

First of all, unlike regular layout templates, content adapter templates live in the content folder, inside the section you wish to create pages for. As explained in [Content adapters in the Hugo docs](https://gohugo.io/content-management/content-adapters/#overview):

> “When a content adapter creates a page, the page’s [logical path](https://gohugo.io/getting-started/glossary/#logical-path) will be relative to the content adapter.”

For our project, we want to build pages under the path `/locations`, one level down from the root domain. That means creating a `locations` folder with a content adapter template inside.

```
content/
  locations/  
    _content.gotmpl
```

Unlike layout templates, you’ll notice the file extension is `.gotmpl` instead of `.html`. Don’t forget, if you want your content adapter to work,  prefix the file name with an underscore, and always name the file `content`.

With your content adapter file set up, the next thing to do is open the file you’ve just named `_content.gotmpl` and add the code required to build your pages.

### Get the data from your Sheet and store it in a variable

First, initialise a [dictionary](https://gohugo.io/functions/collections/dictionary/) (`dict` for short) by assigning it to a variable, in this case called `$data`. This creates an empty map which we’ll use to hold the data.

Next, copy that URL from earlier, that one found in your Google Sheet’s *Publish to web* settings, then assign it to another variable. In this case a variable called `$url`.

```go
{{/* Get remote data. */}}

{{ $data := dict }}
{{ $url := "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdSubfXxQx6-2Lqiforf1ySbEloD4arxbPkSAA8TWifYRwq9xMQda4G63kaV_JKpgxBFW-VIpR7Ugu/pub?gid=0&single=true&output=csv" }}
```

Now it’s time to grab the actual remote data. You can do this using the [resources.GetRemote](https://gohugo.io/functions/resources/getremote/) function.

```go
{{ with resources.GetRemote $url }}
  {{ with .Err }}
    {{ errorf "Unable to get remote resource %s: %s" $url . }}
  {{ else }}
    {{ $data = . | transform.Unmarshal }}
  {{ end }}
  {{ else }}
  {{ errorf "Unable to get remote resource %s" $url }}
{{ end }}
```

The code above looks more complicated than it actually is. All we’re doing here is passing our `$url` to the function and using  `with` to make the code inside execute base on a condition. In plain english, that condition says something like; ”if data exist at the URL provided, then our expression is *truthy* and the code will execute. If the expression returns *falsy*, because there’s no data, then we will get an error message in our terminal”. 

As per the Hugo Docs:

> “Error handling is essential when using the [`resources.GetRemote`](https://gohugo.io/functions/resources/getremote/) function to capture remote resources such as data or images.”

So, the code within the expression makes sure we handle any errors correctly.

Now, if the expression returns *truthy* (as we expect it to), then the empty map we previously assigned to the `$data` variable will update to include the data found at our URL.

Great! We now have our data stored somewhere. Notice we only have to pass in the Dot (`.`) for this to work. This is because [with](https://gohugo.io/functions/go-template/with/) changes the context (the data available to us) to whatever is passes into it – in this case the data found in our `$url`.

You’ll also notice we’re applying a [pipe](https://gohugo.io/quick-reference/glossary/#pipeline) to our data in the form of [transform.Unmarshal](https://gohugo.io/functions/transform/unmarshal/). If you’re new to this function, then what it does is to convert serialised data (a byte stream) into a data structure Hugo can work with. In our case, that means CSV data to JSON.

### Range through the data and generate pages

With the code from the previous section in our content adapter template, we now have our data assigned to the `$data` variable, in a format we can work with.

The next step is to loop through each item in the `$data` object (each row in our Sheet), then store all the values (each column in each row) so we can pass the data to a layout template.

We can do this using the [range](https://gohugo.io/functions/go-template/range/) function.

```go
{{ range after 1 $data }}

  {{ $title := index . 0 }}
  {{ $slug := index . 1 }}
  {{ $body := index . 2 }}
  {{ $keyword := index . 3 }}
  {{ $city := index . 4 }}
  {{ $state := index . 5 }}
  {{ $publish := index . 6 }}
  {{ $imageUrl := index . 7 }}
  {{ $imageAlt := index . 8 }}
  
{{ end }}
```

Notice we’re including the [After](https://gohugo.io/functions/collections/after/) function, and passing it a value of `1`.  This tells range to begin looping through our data object *after* the first item. In plain english, and in the context of our sheet, that means “ignore the first row in the sheet”. This is an important step, as we don’t want Hugo to generate a page from the top row in our sheet, which only exists to label the data in our sheet. This is simply there for our own reference, so we understand the data found in each column, when we look at the sheet.

Next, let’s talk about all those variables. Each one stores the data found in each column of the sheet, so to make life easier, it makes sense to give them the same name as you have in your sheet. Use [Index](https://gohugo.io/functions/collections/indexfunction/) to return each value, where 0 is the first column, 1 the second, 2 the third, and so on. Don’t forget to include the Dot as it holds the data object!

With each value stored in a variable, it’s time to generate our pages and pass the data to the Page object. This will allow us to use the data in a layout template.

We can generate pages use the [AddPage](https://gohugo.io/content-management/content-adapters/#addpage) method. However, first we need to map our data to the method, so our templates can access the data.

### Mapping data to the AddPage method

Still inside the range function, first set up a `dict` to map the data you want to make available when you use `.Content` in your layout templates.  This is equivalent to the markdown you’d usually write in the body of markdown files. For the sake of clarity, it makes sense to assigned this to a variable called `$content`. 

Next, we need to specify the `mediaType`, in this case *text/markdown* and a `value`, which is the data itself. I want the data held in the `$body` variable to be accessible using `.Content`, so this is the value I’m using.

```go
{{ range after 1 $data }}

  {{ $title := index . 0 }}
  {{ $slug := index . 1 }}
  {{ $body := index . 2 }}
  {{ $keyword := index . 3 }}
  {{ $city := index . 4 }}
  {{ $state := index . 5 }}
  {{ $publish := index . 6 }}
  {{ $imageUrl := index . 7 }}
  {{ $imageAlt := index . 8 }}

  {{/* Add page. */}}

  {{ $content := dict 
    "mediaType" "text/markdown" 
    "value" $body 
  }}

{{ end }}
```

Now we need to map any other data we want to expose to the Page object as `.Params`. Again, set up set up a new `dict`, assign it to a variable – `$params` would make sense – then add the data as key-value pairs. In this case, the *key* will be the name of the Param, for example, `.Params.city`, and the value will be the corresponding variable which holds the data.

```go
{{ range after 1 $data }}

  {{ $title := index . 0 }}
  {{ $slug := index . 1 }}
  {{ $body := index . 2 }}
  {{ $keyword := index . 3 }}
  {{ $city := index . 4 }}
  {{ $state := index . 5 }}
  {{ $publish := index . 6 }}
  {{ $imageUrl := index . 7 }}
  {{ $imageAlt := index . 8 }}

  {{/* Add page. */}}

  {{ $content := dict 
    "mediaType" "text/markdown" 
    "value" $body 
  }}
    
  {{ $params := dict 
    "title" $title 
    "keyword" $keyword 
    "city" $city 
    "state" $state 
    "imageUrl" $imageUrl 
    "imageAlt" $imageAlt 
  }}

{{ end }}
```

The final step is to pass our two maps to the [AddPage](https://gohugo.io/content-management/content-adapters/#addpage) method. To do this, we can create one last `dict`, assign it to a new variable – which I’m calling `$page` – and include our maps stored in `$content` and `$params`. Then we can pass the `$page` variable as the argument of AddPage.

```go
{{ range after 1 $data }}

  {{ $title := index . 0 }}
  {{ $slug := index . 1 }}
  {{ $body := index . 2 }}
  {{ $keyword := index . 3 }}
  {{ $city := index . 4 }}
  {{ $state := index . 5 }}
  {{ $publish := index . 6 }}
  {{ $imageUrl := index . 7 }}
  {{ $imageAlt := index . 8 }}

  {{/* Add page. */}}

  {{ $content := dict 
    "mediaType" "text/markdown" 
    "value" $body 
  }}
    
  {{ $params := dict 
    "title" $title 
    "keyword" $keyword 
    "city" $city 
    "state" $state 
    "imageUrl" $imageUrl 
    "imageAlt" $imageAlt 
  }}

  {{ $page := dict
    "content" $content
    "kind" "page"
    "params" $params
    "path" $slug
    "title" $title
  }}

  {{ $.AddPage $page }}

{{ end }}
```

A few things to point out here. First, as we’re inside a Range (where the context is our remote data), we’ll need to prefix  the `.AddPage` method with a `$`. This gives us access to Page context from within our range. Now we have access to the `.AddPage` method. 

Notice in our `$page` dict, we’re also including a value for `path`. This is a require field, so don’t forget it. Hugo needs it to [generate the logical path](https://gohugo.io/content-management/content-adapters/#page-map) of pages relative to where the content adapter is set up. In my sheet, this path is stored in `$slug`. The Hugo docs also recommend including the page `kind` and a `title` for each page.

### Passing media resources for image processing

If you wish to process your image content using Hugo’s [Image processing](https://gohugo.io/content-management/image-processing/) capabilities, then, in a similar way as before, you will need to map your image URL, image alt text, and so on, to the [AddResource](https://gohugo.io/content-management/content-adapters/#resource-map) method. 

```go
{{ with resources.GetRemote $imageUrl }}
  {{ $content := dict
    "mediaType" .MediaType.Type
    "value" .Content
  }}
  {{ $params := dict "alt" $imageAlt }}
  {{ $resource := dict
    "content" $content
    "params" $params
    "path" (printf "%s/cover.%s" $slug .MediaType.SubType)
  }}
  {{ $.AddResource $resource }}  
{{ end }}
```

As before, first we open up a With statement and use the GetRemote function to get hold of our indexed image URL. Next we set up a map for image content. Notice that for *mediaType*, we’re now using`.MediaType.Type` and passing `.Content` as the *value*. Then we set up another map for our Params. In this case, I only have an image alt. Both these maps then get passed to our `$resource` map, where we also build the `path` to the resource. Our indexed `$slug` builds the first part of the path, then we give the resource itself the name cover and use `.MediaType.SubType` to define the image format.

With that, our content adapter is set up and ready to generate pages.

At this point, you probably will have realised that content adapters don’t create the page layout itself. All they do is generate the pages and pass the associated data ready to use in a layout template. 

The next step, then, is to build a layout template for our pages, so that we can render our page content on each page. Let’s look at that next.


## Build a `single.html` layout template to render the data

As we’re generating single pages with our content adapter, we’ll need to create a `single.html` layout template. For the template to work, we need to make sure it  lives is a folder named after the folder where the content adapter can be found within the content folder.

My content adapter lives is inside a [section](https://gohugo.io/content-management/sections/) (a subdirectory of the content folder) called *locations*. So I’ll create a folder in the layouts directory that’s also called `locations`. Next I’ll create the `single.html` template inside this new folder.

```
layouts/
  locations/
    single.html
```

Now we have a layout template for our content adapter, we’re ready to pull the data into the template and render our pages.

### Setting up variables to store your data

I like to set up variables at the very top of my templates. These variables hold any data used in the template. That way I can easily access that data regardless of the current context.

```go
{{ define "main" }}

  {{ $title := .Title }}
  {{ $content := .Content }}
  {{ $keyword := .Params.keyword }}
  {{ $city := .Params.city }}
  {{ $state := .Params.state }}
  {{ $imageUrl := .Params.imageurl }}
  {{ $imageAlt := .Params.imagealt }}

{{ end }}
```

In our content adapter, we mapped the *title* and *content* of our pages to the .`Title` and `.Content` methods, respectively. The rest of the data we mapped to the Page object as custom parameters. That means we can access it using the [Params](https://gohugo.io/methods/site/params/) method.

Given that it’s not always easy to remember the shape of your data, the [debug.Dump](https://gohugo.io/functions/debug/dump/) function can be useful in this situation.

```html
<pre>{{ debug.Dump .Params }}</pre>
```

Pass in the Dot or `.Params` to see a nice JSON object of the available data.

```json
{
  "city": "",
  "imagealt": "Roofsimple GAF Moisture Barrier",
  "imageurl": "https://res.cloudinary.com/roofsimple/image/upload/f_jpg,w_1400/Moisture_Barrier_2400_x_1600_ez3uj1.jpg",
  "keyword": "Virginia Roofing Company",
  "publish": "yes",
  "state": "Virginia",
  "title": "The Best Virginia Roofing Company"
}
```

This prevents the need to constantly head back to your content adapter to remind yourself how you named your Params. 

### Building your page layout

Now our Page data is conveniently stored in variables, we can use these variables to build our page layout, as required.

```go
{{ define "main" }}

  {{ $title := .Title }}
  {{ $content := .Content }}
  {{ $keyword := .Params.keyword }}
  {{ $city := .Params.city }}
  {{ $state := .Params.state }}
  {{ $imageUrl := .Params.imageurl }}
  {{ $imageAlt := .Params.imagealt }}

  {{ with $title }}<h1>{{ . }}</h1>{{ end }}

  {{ "<!-- Image as static asset -->" | safeHTML }}
  <img src="{{ .Params.imageUrl }}" alt="{{ .Params.imageAlt }}">

  <ul>
    <li><strong>City</strong>: {{ $city }}</li>
    <li><strong>State</strong>: {{ $state }}</li>
    <li><strong>Keyword</strong>: {{ $keyword }}</li>
    <li><strong>Image URL</strong>: {{ $imageUrl }}</li>
    <li><strong>Image Alt</strong>: {{ $imageAlt }}</li>
  </ul>

  {{ with $content }}<div>{{ . }}</div>{{ end }}
	
{{ end }}
```

I’m sure your templating needs will be more sophisticated than the example above, but hopefully you get the idea.

Notice that image data passed via Params can only be used *as-is*, without image processing. However, any media passed [using the AddResource method](/#passing-media-resources-for-image-processing), can be fetched with the [resources method](https://gohugo.io/methods/page/resources/) and manipulated using [Image processing](https://gohugo.io/content-management/image-processing/). Just as you might do with any other page resource found inside a page bundle.

```go
{{ "<!-- Image as a Page resource -->" | safeHTML }}
{{ with .Resources.GetMatch "cover.*" }}
	<img src="{{ .RelPermalink }}" width="{{ .Width }}" height="{{ .Height }}" alt="{{ .Params.alt }}">
{{ end }}
```

It’s worth pointing out that templating pages generated using content adapters doesn’t end with the `single.html` template. You can also create a `list.html` template to design the layout of the list view your pages inherit. This works exactly as you’d expect, so in the interest of brevity, I’ll leave that for you to explore further.

## Dealing with final challenges

Before I wrap this one up, I’ll briefly explain how we solved the challenges this particularly project presented, which I touched on earlier.

### Adding cache busting to refresh the data with every site build

As mentioned, my client needed the ability to update each page, directly from the sheet where the data is stored. Essentially, using Google Sheets as a content management system. 

The main challenge with making regular updates via a Sheet is that Google caches requests to Sheets. This means that if we keep making requests to the same URL, then any updates made to the sheet won’t necessarily be visible and we’ll continue to see the previously cached data.

The solution is to cache bust the sheet by appending a random string to the original URL. This creates a unique request and pulls in the latest data from the sheet. 

Consider the following updates to my `_content.gotmpl` file:

```go
{{ $seed := now.Unix }}
{{ $randUrl := (printf "&rando=%s" (printf "%.10s" (sha256 $seed)) | printf "%s%s" $url | printf "%s") }}

{{ with resources.GetRemote $randUrl }}
  {{ with .Err }}
    {{ errorf "Unable to get remote resource %s: %s" $url . }}
  {{ else }}
    {{ $data = . | transform.Unmarshal  }}
  {{ end }}
{{ else }}
  {{ errorf "Unable to get remote resource %s" $url }}
{{ end }}
```

First we create a *seed* using the [time.Now](https://gohugo.io/functions/time/now/) function. This returns the current time as a Unix timestamp, which for our purposes provides a random set of numbers we can work with. Next we pass our `$seed` value to the [crypto.SHA256](https://gohugo.io/functions/crypto/sha256/) function. This generates a random string which we append to the original URL provided by Google Sheets. This random string is stored in our `$randUrl` variable. Finally, we pass `$randUrl`  to the GetRemote function instead of the original URL.

For more on this method, check out [How to use Google Sheets as source data for Hugo SSG content](https://www.youtube.com/watch?v=_PlDMok-yUg). Bryan explains this stuff far better than I ever could.

### Conditionally generate pages

The second challenge we faced during this project was figuring out a way to control whether pages publish on the live website, or not.

The rather rudimentary solution we came up with was to add a *Publish* column to the sheet, where possible values are either *yes* or *no*. With this we could create a condition in the *_content.gotmpl*, where the AddPage function only runs (and so creates the page) *if* the value of `$publish` is *true*. 

```go
{{ if eq $publish "yes" }}
{{ $.AddPage $page }}
{{ end }}
```

In case you had wondered, this explains why the following line of code exists within the Range function we use to loop through the data in the sheet.

```go
{{ $publish := index . 6 }}
```

Perhaps there’s a better way to approach this problem, but it’s effective and work just fine for now.


### Triggering a site build from Google Sheets

The final challenge was to create an easy way for the client to trigger a site build once they’ve made changes to the Google Sheet. This is a crucial step, as without it we wouldn’t be able to generate new pages or update any existing content on the site, as data in the sheet changes.

Getting this set up and working involved the following steps:

1. Create a button in the sheet.
2. Create a script that triggers a build.
3. Assign the script to your button.
4. Set up a build hook with your deployment service (Netlify etc).

Spreadsheet.dev has [a great post on creating buttons in a Google Sheets](https://spreadsheet.dev/buttons-in-google-sheets) (step 1). This post also covers step 2 – how to create a script via **Extensions →Apps Script** - and step 3 – assigning a script to the button.

The script required to trigger the build will look something like this:

```javascript
function runBuild() {
  UrlFetchApp.fetch("https://api.netlify.com/build_hooks/67af30cf8435ff6927017aef?clear_cache=true",  {
    'method': 'post',
  });
}
```

Where the URL in the script is the build hook provided by the deployment service (step 4), in this case Netlify.

Keep in mind, when you first click your button, you will need to grant the required authorisation for the script to run. Following this, the script will run anytime the button is clicked, which will trigger the build hook and re-deploy the website.

### Troubleshooting issues

Debugging a content adapter isn’t always easy, as before you build a layout template, you won’t see any output or error messages in the browser. 

A quick and dirty way around this problem is to temporarily move your content adapter code to am existing layout template. Then use the [debug.Dump](https://gohugo.io/troubleshooting/inspection/) function again to inspect your data object.

```go
{{ with resources.GetRemote $url }}
    {{ with .Err }}
      {{ errorf "Unable to get remote resource %s: %s" $url . }}
    {{ else }}
      {{ $data = . | transform.Unmarshal  }}
      <pre>{{ debug.Dump $data }}</pre>
    {{ end }}
  {{ else }}
    {{ errorf "Unable to get remote resource %s" $url }}
  {{ end }}
```

While this won’t generate your pages, it will return the data object. From here you can figure out the shape of your data.

## Wrapping up

Well done if you’ve made it this far. The good news is that you can now use Google Sheets as a CMS for your Hugo websites. Exciting times!

I’ve put together a [repository](https://github.com/harrycresswell/hugo-content-adapters) and [demo site](https://hugo-content-adapters.netlify.app/) to accompany this post. Hopefully this will help you hit the ground running.

I want to wrap this one up by pointing out an important distinction to make when building pages using content adapters. And, that is that these pages are *dynamically* generated. In other words, content adapters will not create a bunch of markdown files in your content folder. This can feel a little strange at first, as, with Hugo, we’re used to working with markdown files and building pages statically. But, if you’re familiar with dynamic website tools, then this shouldn’t be too much to wrap your head around.

If, for whatever reason, you do want to create markdown files from remote data sources, then I recommend looking into Regis Philibert’s [pre-build and mount method](https://www.thenewdynamic.com/article/toward-using-a-headless-cms-with-hugo-part-2-building-from-remote-api/). I’ve been using this approach to generate Markdown files for Obsidian from Airtable data. It’s super useful, but more on that another day.


[^1]: This isn’t entirely true, as we did have some clever work arounds. Notably the [pre-build and mount method](https://www.thenewdynamic.com/article/toward-using-a-headless-cms-with-hugo-part-2-building-from-remote-api/) which I mention in the conclusion of this post.