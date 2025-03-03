---
title: "Using Hugo to turn Airtable data into Markdown files for Obsidian"
date: 2025-03-03T10:19:51Z
draft: false
slug: "using-hugo-to-turn-airtable-data-into-markdown-files-for-obsidian"
topics: ["Hugo", "Tools", "Obsidian"]
description: "Building a tool that takes an Airtable base, formats the data and generates markdown files for Obsidian."
---

Airtable is a fantastic tool. I’ve used it for years, mainly to bookmark useful design and development resources, good typefaces and websites I like. But, the more I use [Obsidian](https://obsidian.md/), the more appreciate the importance of Steph’s [file over app](https://stephango.com/file-over-app) philosophy and the fast, resilient, secure nature of [local-first software](https://www.inkandswitch.com/local-first/).

Don’t get me wrong, cloud apps still have their place in my workflow. When there’s a need to collaborate with others then I’ll continue to use them. But for managing content that only I need access to, I see few reasons to depend on cloud-first software [^1]. 

Why gate your content behind an internet connection if you don’t really need one? Why store your data in a centralised database, at the mercy of a company you have zero control over? SaaS companies come and go, [it’s happened in the past](https://killedbygoogle.com/) and it will happen again. What’s to say they won’t take your content with them?

To make strides against this sort of thing happening, I’ve been working on a tool that takes data from an Airtable base and turns it into Markdown files. The goal is to move these files to a folder on my local machine, which I can then access using Obsidian. Local-first, file over app! If Obsidian ever disappears, then at least I’ll still have my Markdown files.

Like with most things I build, I doing this with Hugo, because it’s great at generating markdown files from a variety of data sources. 

The rest of this post details how to build a tool like this for yourself.

## Preparing the data for Hugo

The first step is to export an Airtable base so we have some data to convert to Markdown files. Airtable doesn’t make it all that obvious how to export data, so here are the steps to do this manually:

1. Open the Data view of a database in Airtable that you want to export data from.
2. In the top nav, next to where it says *Views*, click on the view, for example *Grid view* to reveal the contextual dropdown menu.
3. From the menu click *Download CSV*.
4. Save the exported `.csv` file to your desktop.

The next step is to convert the CSV data to JSON data. This will arguably will make life easier when working in Hugo. Again, we can do this part manually.

Head to [CSVJSON](https://csvjson.com/csv2json), then where it says **Upload a CSV file**, click the *Choose file* button and select the `.csv` file you just saved to your desktop. 

With the CSV data now loaded into the textarea on the left-hand side, scroll down the page and click the big blue *Covert* button, found below the textarea. This will convert your CSV data to JSON and populate the right-hand side textarea with the data. Hit the big blue *Download* button below the textarea to download a `.json` version of your Airtable data.

The final step is to set up a new Hugo project, then add the JSON file to the `assets/data` folder. That way, we can work with it from within a template. 


## Building a template that generates markdown files 

Now we have our data in a Hugo project ready to work with, the goal is to turn this JSON data into markdown files that can be used in Obsidian. Along with generating the files themselves, we also need to consider how to handle the data associated with each file. In the context of our Airtable database, this is the data found in each row of the table.

Obsidian has a feature it calls [Properties](https://help.obsidian.md/Editing+and+formatting/Properties), which can be added to the top of a note to add structured data to it. This is just a fancy name for front matter data, which you will already be familiar with if you’ve ever used Hugo before. Properties are stored as YAML data, so when we generate our Markdown files, we will need to convert the data associated with them to YAML front matter.

Before we get into all that, though, first we need to create a layout template. 

### Create a layout template

In a Hugo project, open the layouts folder and create a new template called `index.html`.

```
touch layouts/index.html
```

Inside `index.html`, initialise a [dictionary](https://gohugo.io/functions/collections/dictionary/) (`dict` for short) by assigning it to a variable, in this case called `$data`. This creates an empty map which we’ll use to hold the data.

### Grab the data from your data file

Next, set up another variable, `$path`, to hold the path to your data. As we added our JSON data file to the `assets/data` folder, the path should be `data/the-name-of-your-file.json`. In my case, the name of my file is `nicesites.json`

```go
{{ $data := dict }}
{{ $path := "data/nicesites.json" }}
```

Now it’s time to grab the actual data so we can do stuff with it. We can do this using the [resources.Get](https://gohugo.io/functions/resources/get/) function, which returns a global resource from a given path.

```go
{{ with resources.Get $path }}
  {{ with . | transform.Unmarshal }}
    {{ $data = . }}
  {{ end }}
{{ else }}
  {{ errorf "Unable to get global resource %q" $path }}
{{ end }}
```

The given path, in this case, is the value of our `$path` variable, which holds the data. We’re using [with](https://gohugo.io/functions/go-template/with/#article) to execute this code based on whether or not the data exists. If it doesn’t exist, Hugo will log an error, which is handled by [fmt.Errorf](https://gohugo.io/functions/fmt/errorf/#article).

With the data available, we pipe it to the [transform.Unmarshal](https://gohugo.io/functions/transform/unmarshal/) function, which ensures serialised data (a byte stream) is converted into a data structure Hugo can work with – JSON. Our `$data` variable is then reassigned with the unmarshaled data.

### Range through the data

Now we’ve unmarshaled the data, the next step is looping through the `$data` object and store each item in the object so we can manipulate it. We can do this by passing `$data` to the [range](https://gohugo.io/functions/go-template/range/) function.

```go
{{ range $data }}
  {{/* Validate and store the data */}}
  {{ $object := . }}
  {{/* Render data in the browser for debugging */}}
  <pre>{{ debug.Dump $object }}</pre>
{{ end }}
```

You’ll notice we’re storing this data in a new variable called `$object`, then using [debug.Dump](https://gohugo.io/functions/debug/dump/#article) to render this data in the browser. You don’t have to render data in the browser, but it can be helpful to see the data your working with.

Don’t forget to run `hugo server` to see your code in the browser.

```json
{
  "category": "[[Websites]]",
  "description": "New Interface Lovers",
  "name": "Lovers Magazine",
  "tags": "Big type",
  "url": "https://www.loversmagazine.com/"
}

{
  "category": "[[Websites]]",
  "description": "",
  "name": "Offscreen Mag",
  "tags": "Minimal,Sans serif,Illustration",
  "url": "https://www.offscreenmag.com/"
}

{
  "category": "[[Websites]]",
  "description": "",
  "name": "Low Tech Magazine",
  "tags": "Low Tech",
  "url": "https://solar.lowtechmagazine.com/"
}

{
  "category": "[[Websites]]",
  "description": "",
  "name": "Vitamin",
  "tags": "Illustration,Whimsical,scroll-based,Animation,Big type,Sans serif",
  "url": "https://vitamin2.ch/"
}
```

A couple of things to point out here. 

In each item in the object above,  you’ll notice a field called *category*. In Airtable, this corresponds to a [Single Select field](https://support.airtable.com/docs/single-select-field). The value of *category* in each item is `[[websites]]`. This is just a preference for how I want the category property to behave in Obsidian. In Obdisian, anything in double square brackets (`[[]]`), creates a link to another note. So, once these Markdown files have been created and moved over to Obsidian, this will allow the ability to click through to a note called *Websites* from any of these Markdown files,

The second thing to notice is that the *tags* field in each item above, is a comma-delimited (comma-separated) string. I’m not exactly sure why the [Multiple select filed](https://support.airtable.com/v1/docs/multiple-select-field) in Airtable formats data in this way. But, it means we will need to do some work in our template, to convert these tag strings to an array. That way, our YAML will be formatted correctly and we’ll be able to work with our tags in Obsidian. 

While we’re at it, I’d like to make it possible to add new tags to each item directly from this tools we’re building in Hugo. So let’s tackle these things next. 

### Add new tags, format as YAML and merge back into original object

First we need to get hold of the tags in our object. Then we can add new tags and format them correctly.

Still inside the range (that part is very important), first we create a new variable called `$tags`, then assign it with the value `.tags` (the name of the key in our object) . If you’ve called your tags something else in Airtable, then you would store that key name instead of `.tags`

```go
{{/* Grab tags and format lowercase for Obsidian */}}
{{ $tags := .tags | lower }}
{{/* Optionally see shape of data in the browser */}}
<pre>{{ debug.Dump $tags }}</pre>
```

You’ll notice I’m using the [strings.ToLower](https://gohugo.io/functions/strings/tolower/#article) pipe (alias `lower`) to make sure all the tags are lowercase. Again, this is a personal preference for how I like things set up in Obsidian.

If you wish to, use the `debug.Dump` function again to see the shape of the data in the browser:

```
"big type"
"minimal,sans serif,illustration"
"low tech"
"illustration,whimsical,scroll-based,animation,big type,sans serif"
```

You’ll see we’ve now got hold of just the comma-separated strings, instead of the entire data object. This is exactly what we want.

#### Create slices from tag strings

The next thing to do is turn these comma-separated strings into slices, so we can add our new tags. We can do this using the [strings.Split](https://gohugo.io/functions/strings/split/#article) function, which will split each tag string by the comma delimiter and return a slice of those tags. 

To make this happen, first we set up a new variable called`$tagsSlice`, then pass `$tags` to the `split` function and include a comma delimiter as the argument.

```go
{{/* Convert comma-seperated tags string into a slice */}}
{{ $tagsSlice := split $tags "," }}
{{/* Optionally see shape of data in the browser */}}
<pre>{{ debug.Dump $tagsSlice }}</pre>
```

Again, we can use the `debug.Dump` function to see how the shape of our data changes when using split function.

```
[
  "big type"
]
[
  "minimal",
  "sans serif",
  "illustration"
]
[
  "low tech"
]
[
  "illustration",
  "whimsical",
  "scroll-based",
  "animation",
  "big type",
  "sans serif"
]
```

Great, we now have arrays of slices. We’re making progress here.

---

**Quick tip**: Where the `split` function creates a slice from a string, `delimit`  does the exact opposite, creating a string from a slice. So if you ever need to convert a slice to a string, use the [collections.Delimit](https://gohugo.io/functions/collections/delimit/) function. 

```go
{{/* Convert back to a comma-separated string */}}
{{ $tagsString = delimit $tags "," }}
```

Which would createe the following:

```
"big type"
"minimal,sans serif,illustration"
"low tech"
"illustration,whimsical,scroll-based,animation,big type,sans serif"
```
---

#### Add new tags to each slice

In my case, I want to add an extra tag called *references* to each slice. To do this, first set up a new variable called `$newTags`, then pipe `$tagsSlice` to the [append](https://gohugo.io/functions/collections/append/#article) function and pass in a value as the argument. In my case that value is `references`. 

```go
{{/* Append a new tag to the tags slice */}}
{{ $newTags := $tagsSlice | append "references" }}
```

If you wanted to append multiple tags to the slice, you could do that just as easily by appending a slice of two values, to the slice.

```go
{{/* Append a slice of more than one new tag to the tags slice */}}
{{ $newTags := $tagsSlice | append (slice "websites" "references") }}
{{/* Optionally see shape of data in the browser */}}
<pre>{{ debug.Dump $newTags }}</pre>
```

Again, using `debug.Dump`  we can see that our new tag *references* has been appended to each slice.

```
[
  "big type",
  "references"
]
[
  "minimal",
  "sans serif",
  "illustration",
  "references"
]
[
  "low tech",
  "references"
]
[
  "illustration",
  "whimsical",
  "scroll-based",
  "animation",
  "big type",
  "sans serif",
  "references"
]
```

At this point our tag data is in the correct shape and our new tag(s) are appended to the original slice. Perfect.

#### Merge tags slice back into original object

The next step is to merge our tags back into the original data object, which is stored in the `$object` variable. We can do this using the [collections.Merge](https://gohugo.io/functions/collections/merge/#article) function, which merges two or more maps.

```go
{{/* Merge newTags back into orginal object */}}
{{ $updateObject := merge $object (dict "tags" $newTags) }}
{{/* Optionally see shape of data in the browser */}}
<pre>{{ debug.Dump $updateObject }}</pre>
```

First we create a new variable called `$updateObject`, then pass `$object` – which holds the original data object – to the merge function. It’s important that `$object` is the first argument as this is the data we want to merge our tags *into*. Next, as our tags are a slice, we need to turn them into a map (a key-value pair). We can do this by creating a dictionary and passing *tags* as the key and our `$newTags` data as the value. That way, merge will work as expected and our tag data will be correctly formatted in JSON, as an array of tags held in a key called `tags`.   

Again, using `debug.Dump`  we can see that our tags data is formatted exactly as intended. 

```json
{
  "category": "[[Websites]]",
  "description": "New Interface Lovers",
  "name": "Lovers Magazine",
  "tags": [
    "big type",
    "references"
  ],
  "url": "https://www.loversmagazine.com/"
}
{
  "category": "[[Websites]]",
  "description": "",
  "name": "Offscreen Mag",
  "tags": [
    "minimal",
    "sans serif",
    "illustration",
    "references"
  ],
  "url": "https://www.offscreenmag.com/"
}
{
  "category": "[[Websites]]",
  "description": "",
  "name": "Low Tech Magazine",
  "tags": [
    "low tech",
    "references"
  ],
  "url": "https://solar.lowtechmagazine.com/"
}
{
  "category": "[[Websites]]",
  "description": "",
  "name": "Vitamin",
  "tags": [
    "illustration",
    "whimsical",
    "scroll-based",
    "animation",
    "big type",
    "sans serif",
    "references"
  ],
  "url": "https://vitamin2.ch/"
}
```

Awesome. We’ve managed to manipulate our data by adding new tags, then merge those tags back into the original data object.

### Remarshal data to format as YAML

The next step is to turn this JSON into a string of YAML. That way, it will be formatted correctly when we generate our markdown files for Obsidian.

First, let’s set up a variable called `$lang` that holds the language we want to transform our data into. As Obsidian uses YAML for front matter properties, we’ll set the value to `yaml`. 

```go
{{/*  Set lang you want data as, e.g. yaml, toml, json or xml */}}
{{ $lang := "yaml" }}
```

Next, we’ll set up another variable called `$transformData`, then assign it with our updated data object, `$updateObject`. The final step is to pipe it to the [transform.Remarshal](https://gohugo.io/functions/transform/remarshal/#article) function and pass in our `$lang` variable, so Remarshal knows what language to transform our data to.

```go
{{/* Transform data to the specified format */}}
{{ $transformData := $updateObject | transform.Remarshal $lang }}
{{/* Render data in the browser for debugging */}}
<pre>{{ debug.Dump $transformData }}</pre>
```

Once again, let’s use `debug.Dump` so we can take a look in the browser and see how our data has changed.

```
"category: '[[Websites]]'\ndescription: New Interface Lovers\nname: Lovers Magazine\ntags:\n- big type\n- references\nurl: https://www.loversmagazine.com/\n"

"category: '[[Websites]]'\ndescription: \"\"\nname: Offscreen Mag\ntags:\n- minimal\n- sans serif\n- illustration\n- references\nurl: https://www.offscreenmag.com/\n"

"category: '[[Websites]]'\ndescription: \"\"\nname: Low Tech Magazine\ntags:\n- low tech\n- references\nurl: https://solar.lowtechmagazine.com/\n"

"category: '[[Websites]]'\ndescription: \"\"\nname: Vitamin\ntags:\n- illustration\n- whimsical\n- scroll-based\n- animation\n- big type\n- sans serif\n- references\nurl: https://vitamin2.ch/\n"
```

Ok, looks a little crazy at first glance, but for the most part everything is good. Our data has been transformed to strings of YAML which is exactly what we want. 

Those `\n`’s littered all over the place are nothing to worry about. All they do is create a new line, which is what we would expect when this YAML ends up as front matter in our markdown files.

The only thing we need to figure out is how to add delimiters, a.k.a the three dashes (`---`), which signify the beginning and end of YAML front matter. 

The goal is to format our data like this:

```yaml
---
category: '[[Websites]]'
description: New Interface Lovers
name: Lovers Magazine
tags:
  - big type
  - references
url: https://www.loversmagazine.com/
---
```

Let’s tackle this next.


### Add YAML delimiters to validate frontmatter

The [fmt.Printf](https://gohugo.io/functions/fmt/printf/#article) function can help us out here. It allows you to format the structure of a string by adding additional content. Exactly what we need to add delimiters to our YAML.

```go
{{/* Add dashes for YAML delimiters */}}
{{/*  ---\n adds the opening YAML delimiter followed by a newline (\n).  */}}
{{/*  %s acts as a placeholder for the value of $transformData.  */}}
{{/*  \n--- adds another newline followed by the closing YAML delimiter.  */}}
{{/*  Note: if $lang is set to TOML, change `---` to `+++`.  */}}
{{ $yamlContent := printf "---\n%s\n---" $transformData }}
{{/* Render data in the browser for debugging */}}
<pre>{{ debug.Dump $yamlContent }}</pre>
```

The comments in the code above should help explain what each part does.

Now let’s take a look at our strings in the browser using `debug.Dump`.

```
"---\ncategory: '[[Websites]]'\ndescription: New Interface Lovers\nname: Lovers Magazine\ntags:\n- big type\n- references\nurl: https://www.loversmagazine.com/\n\n---"

"---\ncategory: '[[Websites]]'\ndescription: \"\"\nname: Offscreen Mag\ntags:\n- minimal\n- sans serif\n- illustration\n- references\nurl: https://www.offscreenmag.com/\n\n---"

"---\ncategory: '[[Websites]]'\ndescription: \"\"\nname: Low Tech Magazine\ntags:\n- low tech\n- references\nurl: https://solar.lowtechmagazine.com/\n\n---"
```

Notice the three dashes have now been added to the beginning and end of each string, meaning our YAML front matter is formatted correctly.

Now we’re in good shape to generate some markdown files.

### Generate Markdown files

OK, we’re on the home straight here. All that’s left to do now is to turn this data into markdown files.

```go
{{/* Generate the target path and filename */}}
{{ with .name }}
  {{ $filename := printf "nicesites/%s.md" (urlize .) }}
  {{/* Create resource from the string */}}
  {{ $resource := resources.FromString $filename $yamlContent }}
  {{ $file := $resource.RelPermalink }}
{{ else }}
  {{/* Log an error or handle missing .Name appropriately */}}
  {{ errorf "Missing .Name for data: %v" $object }}
{{ end }}
```

Let’s quickly run through this code so we understand what’s going on.

First we create a condition using `with`, where our code will only run if a value of `name` exists. Note, *name* is one of the keys in our data, which is taken from our Airtable database. If `name` doesn’t exist, then we get Hugo to log an error using the `errorf` function.

Assuming our code will return *truthy* and therefore execute, the next step is to create a file name for each markdown file. To do this, we set up a variable called `$filename`, then once again use the `printf` function to create the path to our file. In the example above, we specify a folder name called `nicesites`, then use `%s` which acts as the placeholder for the data we pass in. Notice all we’re passing in is the dot (`.`), as `with` binds the context to whatever you pass to it. As we passed `.name` to `with`, that means the dot contains the data held in `.name`, which will be used to create our file name. We’re using [urls.URLize](https://gohugo.io/functions/urls/urlize/#article) (alias `urlize`) to ensure names are formatted in lowercase and multiple words are connected by dashes (a.k.a kebabcase).

The final step is to create the markdown file itself, which we can do using the [resources.FromString](https://gohugo.io/functions/resources/fromstring/#article) method. First we pass in the target path, `$filename`, then the strings we want to turn into resources, `$yamlContent`. [RelPermalink](https://gohugo.io/methods/resource/relpermalink/#article) publishes the resource and returns its relative permalink.

Ok, that it. We’re ready to generate our pages.

From the root of your project, run the `hugo` command to generate a public folder.

Now head to your public folder, found at the root of your project. Inside you will find a new folder. It my case, that folder is called *nicesites*. Inside that folder you’ll find a markdown file for each row in your Airtable database. 

```
public/
  nicesites/
    099-supply.md
    500.md
    accolade.md
    adaptable.md
    ...
```

Inside each markdown file you’ll find YAML front matter data corresponding to the data within each row.

```yaml
---
category: '[[Websites]]'
description: ""
name: 099 Supply
tags:
- monospace
- grid
- dark mode
- references
url: https://099.supply/

---
```

Fantastic. Now we’re ready to move these markdown files to Obsidian.

## Working with your files to Obsidian

How you work with your markdown files in Obsidian is obviously highly subjective. Personally, I wanted to replicate a system similar to Airtable. 

To make this happen I’m using the [DB folder plugin](https://rafaelgb.github.io/obsidian-db-folder/), creating a separate database for each subject, just like I did in Airtable. 

![My Nicesites DB in Obsidian](https://res.cloudinary.com/harrycresswell/image/upload/v1741023302/hc/obsidian-nicesites-database-folder.png "My Nicesites DB in Obsidian")

I consider this type of data *reference* data, as it’s not created by myself. So to distinguish it from other notes in my Obsidian vault, surprisingly enough, I keep it in a folder at the root of my vault called *references*.

```
references/
  nicesites/
    📓 nicesites DB
    099-suppy
    500
    accolade
    adaptable
    ...
```

I also like to distinguish my DB notes from regular notes by prefixing the file name with an emoji. This ensures my databases sit at the top of the folder they reside in and are easy to access. I also suffix the file name with the letters “DB” for a little extra clarity.

I’m a few weeks in with this new system and so far it’s been fun to work with.

## Final words

The goal of this project was to convert Airtable data into Markdown files, for use in Obsidian. However, there’s nothing stopping you from using these Markdown files elsewhere. 

You could even turn your Markdown files into web pages, should you wish to. That’s one of the benefits of building this tool with a static site generator like Hugo. 

The first step would be to move your Markdown generating template to a `/prebuild` folder. You would then need to move into the prebuild folder to run the `hugo` command when generating your pages. Once you’ve done this, you can mount the folder generated in your `prebuild/public` folder to your `/content` folder.

```yaml
# mount directory into project
[module]
[[module.mounts]]
source = 'content'
target = 'content'
[[module.mounts]]
source = 'prebuild/public/[your-folder-name]'
target = 'content/[your-folder-name]'
```

As mentioned in my previous Hugo post, Regis Philibert’s [pre-build and mount method](https://www.thenewdynamic.com/article/toward-using-a-headless-cms-with-hugo-part-2-building-from-remote-api/) will take you though this step-by-step.

Don’t forget to create some regular layout templates in your `/layouts` folder. That way you can actually generate web pages. 

Ok, that’s all for now. You can find all the code used in this project over on [Github](https://github.com/harrycresswell/airtable-hugo-markdown).

[^1]: Marina Stanisheva gives a good breakdown of [Local-first vs. Cloud-first](https://blog.connecterapp.com/local-first-vs-cloud-first-49e7433cde8a) software.

