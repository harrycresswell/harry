---
title: "Working with Data in Hugo"
date: 2018-07-18T14:35:58+02:00
tags: ["Hugo"]
slug: "data-hugo"
description: "Learn how to utilise Data in Hugo to keep your code clean and your projects well organised."
---

{{< intro >}}This articles demonstrates a practical use case of working with data files in Hugo. It will show you where to store your data and how to call your data into a template in order to render it on your site.{{< /intro >}}

Whilst front-end prototyping the design of a [system of content search filters](http://www.harrycresswell.co.uk/client/ain/ain-filters/), I found myself in a situation where I needed to list the major countries in each inhabited Continent. The countries would take the form of checkboxes in a filter dropdown.

A basic solution might be to list each country manually in an unordered list on the page. But that sound like a time consuming task and unnecessarily repetitive. No one wants a cluttered template with a verbose amount of code.

Ideally I could abstract the data away from the page and leave my template clean and concise. Instead, storing the data in a separate data file which I could call in my template wherever needed.

Enter Data files.

## Data files and the data folder

In Hugo, [data files](https://gohugo.io/templates/data-templates/) are stored in the data folder. Think of the data folder as a mini database where you can keep lists of data to use in your pages.

Inside the data folder you can organise files into any number of sub-folders.

Hugo accepts `JSON`, `YAML` and `TOML` files, just like the front matter in your posts and pages.

### Data structure

In my data folder I have a sub-folder called `countries` and inside that folder I have a another folder called `continent` where I keep 5 `YAML` files: `africaa.yaml`, `asia.yaml`, `europe.yaml`, `northamerica.yaml` and `southamerica.yaml`.

For all the geography nerds out there; I combined Australia with Asia as it didn’t make sense to have a data file containing one country.

```
└── countries
    └── continent
        ├── africa.yaml
        ├── asia.yaml
        ├── europe.yaml
        └── northamerica.yaml
      	└── southamerica.yaml
```

I called the top level sub-folder countries so the data type was clearly organised and easy to understand.

### Inside the data file

Inside each continent `YAML` file, I listed the countries in that continent under `country`, using an object `name` where the value is the country name.

```yaml
country:
  - name: Algeria
  - name: Angola
  - name: Cameroon
  - name: Comoros
  - name: Gambia
  - name: Ghana
  - name: Ivory Coast
  - name: Kenya
  - name: Lesotho
  - name: Madagascar
  - name: Malawi
  - name: Mauritius
  - name: Morocco
  - name: Nigeria
  - name: Namibia
  - name: Senegal
  - name: Sierra Leone
  - name: South Africa
  - name: Swaziland
  - name: Tanzania
  - name: Tunisia
  - name: Uganda
  - name: Zambia
  - name: Zimbabwe
```

### Using the data

By using the [range](https://gohugo.io/functions/range/#readout) function you can loop through the content, accessing the data folder with `.Site.Data` followed by the name of the file and the nested data structure.

To retrieve data from my `africa.yaml` data file I used the following code:

```go
{{ range .Site.Data.countries.continent.africa.country }}
  <li>
    <input class="material-icons" type="checkbox" />
    <label>{{ .name }}</label>
    </input>
  </li>
{{ end }}
```

Where `{{ .name }}` prints out the name of the country.

To see this in action [check out this prototype](http://www.harrycresswell.co.uk/client/ain/ain-filters/) and hit the filter button above the search called `country`.

If you are applying this to your own data be sure to update `countries.continent.africa.country` with your specific data structure.

## Conclusion

Data files in Hugo make working with large amounts of data a whole lot less cumbersome. Abstracting repetitive code away from templates keeps file clean and lightweight and managing content a somewhat easier task.

For more on data in Hugo head to the docs, where you can learn about “data-driven content” data features, which lets you load any `JSON` or `CSV` file from nearly any resource.

## Further reading

- [How to use Data Files in Hugo: an example](https://novelist.xyz/tech/hugo-data-files/) by Peter Y. Chuang
- [Data Templates](https://gohugo.io/templates/data-templates/) fro the Hugo Docs
