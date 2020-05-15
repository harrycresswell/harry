---
title: "Passing data to templates and tables in Hugo"
date: 2020-05-15T08:44:48+01:00
draft: false
description: "Using data files to generate lists and tables, which can then be managed and updated from Git-backed Forestry CMS."
slug: "passing-data-to-templates-hugo"
tags: ["Hugo"]
syndicate: "false"
---

It often makes sense to abstract large datasets away from your templates and into their own files. This keeps your templates concise and easy to manage.

You can store this type of data in the [Data folder](https://gohugo.io/templates/data-templates/#the-data-folder) at the root of your Hugo project, as either JSON, Yaml or Toml files. You can then pull this additional data into your templates and use it however you wish.

This article looks at two approaches to consuming data in Hugo templates. The first approach uses the [range](https://gohugo.io/functions/range/#readout) function to display a list of data in a form select. Whilst the second approach looks at creating an [index](https://gohugo.io/functions/index-function/#readout) of data, as a way to extract specific values in your dataset and render those values as data in an HTML table.

## Ranging through data

In a recent client project, I had to create a form select for every country organised by continent. This was essentially just a list of each and every country name.

Rather than add this dataset directly to my template, I outsourced it to several `.yaml` files, which split the countries of the world by continent. Each file was organised alphabetically by country name and each continent file was stored in the data directory, at the root of the Hugo project.

To get an idea of what this looks like, here’s the structure of the data directory.

```
└── countries
  └── continent
    ├── africa.yaml
    ├── asia.yaml
    ├── europe.yaml
    └── northamerica.yaml
    └── southamerica.yaml
```

Within each `.yaml` file, my data was represented in the the same format. Consider `southamerica.yaml` to get an idea of the format.

```yaml
country:
  - name: Argentina
  - name: Bolivia
  - name: Brazil
  - name: Chile
  - name: Colombia
  - name: Ecuador
  - name: Guyana
  - name: Paraguay
  - name: Peru
  - name: Uruguay
  - name: Venezuela
```

Inside my template I then used the range function to loop through every country and display the name of each country as an option in the form select.

```html
{{ range .Site.Data.countries.continent.southamerica.country }}
<li>
  <select name="south-america" />
   <option value="{{ .name }}">{{ .name }}</option>
  </select>
</li>
{{ end }}
```

This is a great way to simplify your templates. In this particular case it prevents the need to have to enter each country manually inside an option tag.

For a smaller dataset you may choose to do this by hand, directly inside the template. But there are disadvantages to this.

First, there’s no way of editing hard coded values unless you dig into the template itself. This writes of the idea of making changes via a CMS, which a non-coding site administrator can manage.

Second, I’d argue it’s much easier to maintain a separate `.yaml` file for storing larger datasets like this one. The idea of combing through a bunch of HTML inside a template to add and update values by hand doesn’t exactly fill me with joy. Whatsamore it’s more fiddly and time consuming.

Now let’s turn our focus to tabular data.

## Tabular data

More recently I was faced with a slightly different problem. This time it involved rendering data inside a table, which could then be updated by my client.

[Laura](http://lauralucas.london/) is a personal trainer, who offers one-on-one training sessions and group sessions for a maximum of two people. These sessions are offered as a package of either 1 session, 5 sessions or 10 sessions.

We needed a way to add this data to a table and display a breakdown of the total price, the price per session, and the price per session per person (based on two people sharing the session).

If that sounds confusing, well it kind of is. It took me far longer than I care to admit to make sense of the data.

So to make the data easier to visualise, have a quick look at [Laura’s pricing page](https://lauralucas.london/prices/) to see the final outcome of what we’re trying to achieve.

Laura also needed a way to update these prices via a CMS. [Forestry](https://forestry.io/) makes this step easy, but more on that bit later. For now, let’s focus on the data structure.

To structure the data in a suitable way, first I created a two yaml files in the data directory. One called `prices_for_one.yaml` and one called `prices_for_two.yaml`. Both files followed the exact same data format.

To give you an idea of what the format looked like, here’s the `prices_for_two.yaml` file:

```yaml
one_session:
  total_price: "£85"
  price_per_session: "-"
  price_per_session_per_person: "£42.5"
five_sessions:
  total_price: "£370"
  price_per_session: "£74"
  price_per_session_per_person: "£37"
ten_sessions:
  total_price: "£670"
  price_per_session: "£67"
  price_per_session_per_person: "£33.5"
```

This dataset differs slightly from the first example, where listed countries by continent. You will have noticed the main bulk of data is nested under different parent keys.

These three different parent keys represent each session package (one_session, five_sessions and ten_session) and each parent has three nested child data key value pairs associated with it. Each parent key is unique, but the nested keys are the same for each parent key.

So how might you access this data from a template file?

You could range through the child key data from your template file like this:

```
{{ range $.Site.Data.prices }}
  {{ .total_price }}
{{ end }}
```

In this case [range](https://gohugo.io/functions/range/#readout) would loop through all the `.total_price` keys and return their values:

```yaml
£65
£290
£540
```

Likewise, we can do the same for the other keys:

```
{{ range $.Site.Data.prices }}
  {{ .price_per_session }}
{{ end }}
```

And return those values:

```yaml
-
£58
£54
```

However, when it comes to tables, ranging through a set of data might not be the best option. It becomes apparent why, when we add the HTML markup to create the table.

The obvious thing to do would be to think of this much like an unordered list and using range to list out the data in `<td>’s`.

```html
<table>
  <tr>
    {{ range $.Site.Data.prices }}
    <td>
      {{ .price_per_session }}
    </td>
    {{ end }}
  </tr>
</table>
```

But of course unless you change the fundamental layout of a table with CSS, table rows display inline by default. This would cause our three session prices to flow horizontally across the table in a single row. [If you remember](https://lauralucas.london/prices/) isn’t how we want to represent the data.

Consider how the generated HTML would look if we used range on the `price_per_session` as above. Hugo would create three `<td>’s` in a single table row containing the price per session.

```html
<table>
  <tr>
    <td>-</td>
    <td>£58</td>
    <td>£54</td>
  </tr>
</table>
```

Not quite what we’re looking for.

Whilst there are ways to achieve what we want using a range method, an easier approach might be to target an [index](https://gohugo.io/functions/index-function/#readout) of each set of session data.

```html
<tr>
  {{ $prices_for_two := .Site.Data.prices_for_two }} {{ with index
  $prices_for_two "one_session" }}
  <td>{{ .total_price }}</td>
  <td>{{ .price_per_session }}</td>
  <td>{{ .price_per_session_per_person }}</td>
  {{ end }}
</tr>
```

First we target the `prices_for_two` data and assign it to a variable. Next we create an index of the `one_session` data within the dataset and the target each key within the index.

Now we can access the specific nested keys value and return their value directly into the corresponding table data cell.

We can use the exact same code for each session package and just update the index to target the right session package each time.

```html
<tbody>
  <tr>
    <td>1</td>
    {{ $prices_for_two := .Site.Data.prices_for_two }} {{ with index
    $prices_for_two "one_session" }}
    <td>{{ .total_price }}</td>
    <td>{{ .price_per_session }}</td>
    <td>{{ .price_per_session_per_person }}</td>
    {{ end }}
  </tr>
  <tr>
    <td>5</td>
    {{ $prices_for_two := .Site.Data.prices_for_two }} {{ with index
    $prices_for_two "five_sessions" }}
    <td>{{ .total_price }}</td>
    <td>{{ .price_per_session }}</td>
    <td>{{ .price_per_session_per_person }}</td>
    {{ end }}
  </tr>
  <tr>
    <td>10</td>
    {{ $prices_for_two := .Site.Data.prices_for_two }} {{ with index
    $prices_for_two "ten_sessions" }}
    <td>{{ .total_price }}</td>
    <td>{{ .price_per_session }}</td>
    <td>{{ .price_per_session_per_person }}</td>
    {{ end }}
  </tr>
</tbody>
```

The complete table looks like this:

```html
<table>
  <thead>
    <tr>
      <th>Session(s)</th>
      <th>Total price</th>
      <th>Price per session</th>
      <th>Price per session, per person</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {{ $prices_for_two := .Site.Data.prices_for_two }} {{ with index
      $prices_for_two "one_session" }}
      <td>{{ .total_price }}</td>
      <td>{{ .price_per_session }}</td>
      <td>{{ .price_per_session_per_person }}</td>
      {{ end }}
    </tr>
    <tr>
      <td>5</td>
      {{ $prices_for_two := .Site.Data.prices_for_two }} {{ with index
      $prices_for_two "five_sessions" }}
      <td>{{ .total_price }}</td>
      <td>{{ .price_per_session }}</td>
      <td>{{ .price_per_session_per_person }}</td>
      {{ end }}
    </tr>
    <tr>
      <td>10</td>
      {{ $prices_for_two := .Site.Data.prices_for_two }} {{ with index
      $prices_for_two "ten_sessions" }}
      <td>{{ .total_price }}</td>
      <td>{{ .price_per_session }}</td>
      <td>{{ .price_per_session_per_person }}</td>
      {{ end }}
    </tr>
  </tbody>
</table>
```

Ok. So it’s not the fewest lines of code we’ve ever written, but the solution works and it’s pretty easy to understand what’s going on.

For my particular needs, I created another table for the `prices_for_one.yaml` data and updated all instances of `prices_for_two` to `prices_for_one`:

```html
<table>
  <thead>
    <tr>
      <th>Session(s)</th>
      <th>Total price</th>
      <th>Price per session</th>
      <th>Price per session, per person</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {{ $prices_for_one := .Site.Data.prices_for_one }} {{ with index
      $prices_for_one "one_session" }}
      <td>{{ .total_price }}</td>
      <td>{{ .price_per_session }}</td>
      <td>{{ .price_per_session_per_person }}</td>
      {{ end }}
    </tr>
    <tr>
      <td>5</td>
      {{ $prices_for_one := .Site.Data.prices_for_one }} {{ with index
      $prices_for_one "five_sessions" }}
      <td>{{ .total_price }}</td>
      <td>{{ .price_per_session }}</td>
      <td>{{ .price_per_session_per_person }}</td>
      {{ end }}
    </tr>
    <tr>
      <td>10</td>
      {{ $prices_for_one := .Site.Data.prices_for_one }} {{ with index
      $prices_for_one "ten_sessions" }}
      <td>{{ .total_price }}</td>
      <td>{{ .price_per_session }}</td>
      <td>{{ .price_per_session_per_person }}</td>
      {{ end }}
    </tr>
  </tbody>
</table>
```

The only thing left to do from here was to use some CSS to create a tabbed table, which was made accessible through clever use of radio buttons.

To make this happen, I built a quick [Codepen prototype](https://codepen.io/harrycresswell/pen/zYxgeLJ), taking most of my inspiration from [this fantastic article by Kenan Yusuf](https://kyusuf.com/post/completely-css-tabs/).

Now we’re at the final hurdle. We need to make it possible to edit the pricing datain our table without having to dig into the data directory and edit `.yaml` files. This will make the data nice and easy to update and maintain.

This is where Forestry CMS comes in.

## Setting up Forestry front matter for use with table data

With your code deployed to Github or a similar remote repository, the first step is to link your repository to [Forestry CMS](https://forestry.io/).

From your Forestry dashboard click **Add Site**, select **Hugo** and choose the **Version** you have installed on your machine.

If you are unsure which version of Hugo you are running, from the command line run the following command to find out:

```
hugo version
```

Next, back in Forestry, set your **Git provider** and choose the **Repository** you wish to connect, making sure the branch is set to **Master**.

Forestry will then import your website.

### Create a front matter template

Now create a new front matter template to represent the pricing data structure. To do this click **Front Matter** in the Sidebar of your site from within Forestry, then click the **Add Template** button. Call it something descriptive like _Pricing_ or _Prices_.

Select **Create based on existing document** then select either `prices_for_one.yaml` or `prices_for_two.yaml`. It doesn’t matter which one you choose, as both are the exact same structure.

Forestry will now autogenerate the template form fields based on the document, saving us from having to set this up from scratch.

### Configure the sidebar

The final step is to configure the sidebar in your Forestry site settings, to show the two pricing `yaml` files stored in the data directory.

Go to _Settings_, then _Sidebar_ and click **Add Section**. Select **Directory** and add a **Label** to identify the two files. Calling it _Data_ is probably a good idea.

Then in the _Importing Content_ section, set **Content Directory** to `data`. This tell Forestry to add content from the data directory.

Make sure **File Match** is set to `**/*`, then in the _Creating Content_ section make sure **Content Types** is set to `Nothing`.

Finally, in the _Available Templates_ section select the _Pricing_ template we made earlier. Click **Save** and you should now see your data directory in the sidebar.

## Editing content in Forestry

Now everything should be set up correctly, so you can jump into Forestry any time. Just head to **Data** in the sidebar, select either `prices_for_one.yaml` or `prices_for_two.yaml` – depending on which you want to edit – then make the necessary changes.

When you click **Save**, Forestry will push the changes directly to your Git repository.

If you are using a tool like [Netlify](https://www.netlify.com/), then auto-deploying your site is made trivial. When Forestry updates your Git Repository, Netlify will spot the changes and deploy a new version of your site, updating the content in the process.

## Wrapping up

Using the data directory is a great way to bring custom datasets into your Hugo site, which may not directly relate to a content type in your content directory.

By abstracting this data away from the templates which use it, we can keep our templates concise and avoid hardcoding values. This is useful if we want to make the data editable via a CMS.

Using data files to render options in a form select or cells in a table are just two ways to consume data, but there are many more things we could do with data.

Currently data can only be consumed in templates, as demonstrated in this article. You can’t yet use data to generate standalone page content, which is a shame. But, I believe there are conversations happening about adding this as a future feature. It would make working with data in Hugo even more powerful.

_If you have questions, you can reach me on [Twitter](https://twitter.com/harrycresswell). If you spot any mistakes or factual inaccuracies, please [file a GitHub issue](https://github.com/harrycresswell/harry/issues)._

## Resources

- [Data templates](https://gohugo.io/templates/data-templates/)
- [Getting specific data in a range](https://discourse.gohugo.io/t/getting-specific-data-in-a-range/11597)
- [YAML | In One Video](https://www.youtube.com/watch?v=cdLNKUoMc6c) from Mike Dane
- [Extracting Specific Value from a Nested JSON Data File](https://discourse.gohugo.io/t/extracting-specific-value-from-a-nested-json-data-file/21973)
