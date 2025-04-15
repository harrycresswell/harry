---
title: "Flexible data capture"
date: 2021-12-09T12:00:01Z
draft: false
description: "My course needed a dedicated signup form, so I improved the one in the footer of my site so it can be changed on a page-by-page basis. Here’s how I did it."
slug: "flexible-data-capture"
topics: ["Updates", "Side Projects"]
---

I just improved the sign up form in the footer of my site 👇. Now it can be modified on a page by page basis. What does this mean? 

Well, depending on the context of the page, I can now change the *title*, *description*, *list URL* and *group* to send subscribers to, [directly from the frontmatter of any page](https://github.com/harrycresswell/harry/blob/8eaca8ef17164109de8774839e87ec5440db3f80/content/learn-hugo/_index.md?plain=1#L8). 

```yaml
---
title: "Learn Hugo"
date: 2021-12-06T11:37:59Z
draft: false
description: ""
slug: "learn-hugo"
layout: "page"
signup_title: "Subscribe for Hugo course content"
signup_desc: "If you’d like to be the first to receive Hugo course content by email, as it’s published, then please leave your details below."
signup_button_text: "Learn Hugo"
signup_group: "hugo"
---
```

If no ”signup” params are specified in the frontmatter, then the sign up form will default to capturing subscribers for my newsletter, as usual. Consider the example below.

```html
<h2 class="Newsletter-title">
  {{ with .Params.signup_title }}
    {{ . }}
  {{ else }}
    {{ .Site.Data.settings.signup.title | markdownify }}
  {{ end }}
</h2>
<p>
  {{ with .Params.signup_desc }}
    {{ . | markdownify }}
  {{ else }} 
    {{ .Site.Data.settings.signup.desc | markdownify }}
  {{ end }}
</p>
<form 
  class="NewsletterForm validate" 
  action="
  {{ with .Params.signup_listURL }}
    {{ . }}
  {{ else }}
    {{ .Site.Data.settings.signup.list_url }}
  {{ end }}" 
  method="post" 
  name="mc-embedded-subscribe-form" 
  target="_blank" 
  novalidate
>
```

I decided to abstract the default *title*, *description*, and *list_url* text away from the template and into a signup data file located at [data/settings/signup.yaml](https://github.com/harrycresswell/harry/blob/master/data/settings/signup.yaml). This isn’t 100% necessary, but it makes the template cleaner as the text is no longer hard coded into the template directly.

Accessing this data is as simple as using `.Site.Data` followed by the directory name, the folder name and then the YAML key I’m looking to return the value of.

```
{{ .Site.Data.settings.signup.list_url }}
```

Now I have control over the signup form from the frontmatter of a page, I can do some pretty cool stuff with it. 

For example, in the frontmatter of the page for [my Hugo course](/learn-hugo/), I’ve set *signup_group* to `hugo` .

Now if you [sign up to receive my Hugo course content](/learn-hugo/#signup), you automatically get added to a group I set up in Mailchimp called “Learn Hugo”. That way I know you’re here for Hugo content and I will only send you emails related to the course. Clever huh?

To make this work I’m using the [ne](https://gohugo.io/functions/ne/) (not equal) and [eq](https://gohugo.io/functions/eq/) (equal) functions to check if `signup_group` is set to Hugo in the frontmatter. If this evaluates true, then the checkbox that represents the Learn Hugo group is checked and the subscriber is added to the group. If the condition returns false, then the subscriber will be added to my Newsletter group, as normal.

```html
<div class="Form-options" style="display:none">
    <strong>Product</strong>
    <ul>
        <li>
            <input 
              type="checkbox" 
              value="4" 
              name="group[6417][4]" 
              id="mce-group[6417]-6417-0" 
              {{ if ne .Params.signup_group "hugo" }}
                checked
              {{ end }}
            >
            <label for="mce-group[6417]-6417-0">Newsletter</label>
        </li>
        <li>
            <input 
              type="checkbox" 
              value="8" 
              name="group[6417][8]" 
              id="mce-group[6417]-6417-1" 
              {{ if eq .Params.signup_group "hugo" }}
                checked
              {{ end }}
            >
            <label for="mce-group[6417]-6417-1">Learn Hugo</label>
        </li>
    </ul>
</div>
```

I might need to refactor this code if I ever want to add more groups in the future. But it does the job for now and that’s what matters.