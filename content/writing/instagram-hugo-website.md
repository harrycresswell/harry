---
title: "Instagram on Hugo websites"
date: 2021-06-22T09:49:34+01:00
draft: false
description: "How to build a lightweight, GDPR compliant Instagram feed using Hugo, JSON and Profile Page Images Loader."
slug: "instagram-hugo-websites"
topics: ["Hugo"]
syndicate: "false"
---

{{< intro >}}Using Instagram’s API to build a feed of content on a website is often more effort than it’s worth. {{< /intro>}}

The set up involves authenticating with Facebook to get a long-lived access token which will give you access to a JSON file containing all the data associated with your images. However access is only temporary and your token will need to be renewed periodically, every 60 days.

To solve this problem Companion Studio made [Instagram Token Agent](https://github.com/companionstudio/instagram-token-agent), a clever little Heroku app that will keep your token up to date automatically. It’s designed to play well with Steven Schobert’s [Instafeed.js](https://github.com/stevenschobert/instafeed.js), which you’ll be familiar with if you’ve attempted to build an Instagram feed before.

But even this isn’t foolproof. To fetch your content you’re still required to make calls to the Instagram API. This raises concerns about privacy and GDPR compliancy. In short, depending on your locality you run the risk of your feed content being blocked by certain browsers. 

As Joost Va der Schee points out in [Instagram on your website](https://www.usecue.com/blog/instagram-on-your-website/), not only can you content be blocked but you also risk a potential fine.

To combat this Joost has built a very slick solution which solves the problem of both expiring tokens and GDPR compliancy. 

## Profile Page Images Loader

[Profile Page Images Loader](https://profilepageimages.usecue.com/) or PPI Loader for short is a simple application that automates the process of downloading content from you instagram account. It does this on a daily basis, effectively creating a fresh feed of your content. When your token expires it will take care of the renewal for you.

To avoid the issue of GDPR, PPI Loader hosts your content on it’s own servers, meaning you never need to make a request to the Instagram API. 

If you’re wondering whether this is allowed, the answer is yes. Instagram actually gives you the ability to download your data directly from the security settings in your Instagram account. Depending on your circumstances, you may need to sign a DPA (Data Processing Agreement), so be sure to read [the FAQs](https://profilepageimages.usecue.com/faq) to find out more.

What’s nice about PPI loader is that it also creates a JSON object of all your data, so you can work with your data just as you would if you were using the Instagram API. 

For those of us using Hugo to build websites this makes it very easy to create an Instagram feed using Hugo’s built in [getJSON](https://gohugo.io/templates/data-templates/#get-remote-data) function. 

In under 5 minutes you can have a lightweight GDPR compliant Instagram feed set up and working on a Hugo website. Let’s look at the steps required to make it happen.

## Sign up for an account at PPI Loader

First you’ll need to follow [the getting started docs](https://profilepageimages.usecue.com/getting-started) to sign up for a PPI Loader account. 

During this process you’ll need to grant PPI permission to access your Instagram account. PPI Loader has [a stringent approach to privacy](https://profilepageimages.usecue.com/privacy) which should satisfy most, however if you’re concerned about sharing your data then make sure you do your own due diligence before using the PPI service.

Assuming you’re happy to share your data, you’ve signed up and granted access to your Instagram account, you’ll now be able to find all your images hosted on the PPI Loader servers and accessible via the following link: 

```
https://profilepageimages.usecue.com/images/[YOUR_USERNAME]/
```

This is great if you want to add images one by one to your website, however if you’d like to create a feed of your content, then for this you’ll need to use the JSON object containing all your posts, which PPI Loader creates for you. 

You can find this JSON file via following link:

``` 
https://profilepageimages.usecue.com/images/[YOUR_URSERNAME]/images.json
```


If you head to this URL in a browser you’ll struggle to make sense of the content as it hasn’t been formatted. Copy and paste the contents of the URL into [JSON Prettier](https://jsonprettier.com/) to format the JSON so it’s easier to read. Now you’ll be able to see what your working with.

You should see a bunch of JSON objects in an array. Something that starts like this:

``` json
[
  {
    "id": "17872665263392315",
    "caption": "Happy weekend  yoginis and yogis. On Sunday we're offering 4 amazing Yoga sessions with Roxana. Register on our website and join our beautiful yoga-classes. You can expect powerful and energizing flows as well as relaxing and peaceful Yin classes. Practicing yoga can easily be one of the most beneficial gifts we can give to ourselves. A regular practice can increase your wellbeing, boost your energy level, and improve your posture.\nMay you obtain exactly what you need @laselvahotyoga \ud83d\ude4f\ud83c\udffd\nNamaste\ud83c\udf3f\n.\n.\n.\n\n#yoga #yogavienna #viennayoga #wien #vienna #yogastudio #yogainwien #vinyasa #yogaeverydamnday #yogaaustria #yogainspiration #weloveyoga #yogastore #yogastorevienna #yogaclass #yogateacher #yogateachervienna",
    "media_url": "https://scontent-cdt1-1.cdninstagram.com/v/t51.29350-15/200391000_1890606887783705_4445098888812288553_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Z89RhWoUZDMAX8ykRSP&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=92050c883cd4ee258e18fa3ad904f3e5&oe=60CC2D6B",
    "media_type": "IMAGE",
    "permalink": "https://www.instagram.com/p/CQBwEndFrYV/",
    "timestamp": "2021-06-12T16:47:05+0000",
    "image": "https://profilepageimages.usecue.com/images/laselvahotyoga/0.jpg",
    "image_small": "https://profilepageimages.usecue.com/images/laselvahotyoga/small/0.jpg"
  },
  ...
  ]

```

This is what we’ll need to build the feed in our Hugo project, so let’s now turn to Hugo. At this point I’m assuming you have an existing Hugo project to work with.

## Building an Instagram feed in Hugo

Inside your Hugo, open the partials directory and create a new file called `instafeed.html`. Now include the partial in your template somewhere. 

I’ve added mine to `index.html` at the root of my project.

```golang
{{ partial "instagram.html" . }}
```

Open up `instafeed.html` and assign your JSON feed URL to a variable at the top of the file. The variable can be named anything you like. Make sure you surround the URL in quotes and include the [getJSON](https://gohugo.io/templates/data-templates/#get-remote-data) function before the URL. Be sure to set the variable value using `:=`, rather than `=` which in Hugo is saved for updating a variable. 

```golang
{{ $dataJ := getJSON "https://profilepageimages.usecue.com/images/laselvahotyoga/images.json" }}
```

Now you can use the range function to map through a specified number of items in the JSON. In this case we’re returning the first 10 items.

```html
{{ $dataJ := getJSON "https://profilepageimages.usecue.com/images/laselvahotyoga/images.json" }}
<ul class="instafeed">
  {{ range first 10 $dataJ }}
    <li>
    </li>
  {{ end }}
</ul>
```

Now head back to JSON Prettier to have another look at the JSON structure. If you’re new to JSON it’s essentially just structured data in the form of key value pairs. We’ll need to use these keys to return the values we want to render on our website.

``` json
[
  {
    "id": "17872665263392315",
    "caption": "Happy weekend  yoginis and yogis. On Sunday we're offering 4 amazing Yoga sessions with Roxana. Register on our website and join our beautiful yoga-classes. You can expect powerful and energizing flows as well as relaxing and peaceful Yin classes. Practicing yoga can easily be one of the most beneficial gifts we can give to ourselves. A regular practice can increase your wellbeing, boost your energy level, and improve your posture.\nMay you obtain exactly what you need @laselvahotyoga \ud83d\ude4f\ud83c\udffd\nNamaste\ud83c\udf3f\n.\n.\n.\n\n#yoga #yogavienna #viennayoga #wien #vienna #yogastudio #yogainwien #vinyasa #yogaeverydamnday #yogaaustria #yogainspiration #weloveyoga #yogastore #yogastorevienna #yogaclass #yogateacher #yogateachervienna",
    "media_url": "https://scontent-cdt1-1.cdninstagram.com/v/t51.29350-15/200391000_1890606887783705_4445098888812288553_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Z89RhWoUZDMAX8ykRSP&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=92050c883cd4ee258e18fa3ad904f3e5&oe=60CC2D6B",
    "media_type": "IMAGE",
    "permalink": "https://www.instagram.com/p/CQBwEndFrYV/",
    "timestamp": "2021-06-12T16:47:05+0000",
    "image": "https://profilepageimages.usecue.com/images/laselvahotyoga/0.jpg",
    "image_small": "https://profilepageimages.usecue.com/images/laselvahotyoga/small/0.jpg"
  },
  ...
  ]

```

Let’s take `caption`, `media_type`, `permalink` and `image_small` and assign each key to their own variable within the range. To keep things simple I’ve mirrored the key name for the variable name. 

```html
{{ $dataJ := getJSON "https://profilepageimages.usecue.com/images/laselvahotyoga/images.json" }}
<ul class="instafeed">
  {{ range first 10 $dataJ }}
    {{ $media_type := .media_type | lower }}
    {{ $image_small := .image_small }}
    {{ $permalink := .permalink }}
    {{ $caption := .caption }}
    <li>
    </li>
  {{ end }}
</ul>
```

As the [PPI Loader documentation](https://profilepageimages.usecue.com/documentation) suggests, the possible values of `media_type` are `IMAGE` , `CAROUSEL_ALBUM` or `VIDEO`.

We can use Hugo’s [lower](https://gohugo.io/functions/lower/) function to convert the values of `media_type` from uppercase to lowercase.

Now create an `<img>` tag inside the `<li>` to render each image in the feed. 

```html
{{ $dataJ := getJSON "https://profilepageimages.usecue.com/images/laselvahotyoga/images.json" }}
<ul class="instafeed">
  {{ range first 10 $dataJ }}
    {{ $media_type := .media_type | lower }}
    {{ $image_small := .image_small }}
    {{ $permalink := .permalink }}
    {{ $caption := .caption }}
    <li>
      <img class="{{ $media_type }}" src="{{ $image_small }}" {{ with $caption }}alt="{{ . }}"{{ else }}alt=""{{ end }}>
    </li>
  {{ end }}
</ul>
```

Here we’re using `media_type` as the class name to allow for different CSS styling depending on the media type. 

`image_small` returns the URL of the image, so we can use it for the image src.

We’ve used `caption` for the alt tag and included some logic to return an empty alt tag in cases where our Instagram post doesn’t have a caption. The empty alt tag will tell screen readers the image is for presentational purposes only.

The final thing to do is wrap the image in an anchor tag so we can link the image back to instagram using the `permalink`.

```html
{{ $dataJ := getJSON "https://profilepageimages.usecue.com/images/laselvahotyoga/images.json" }}
<ul class="instafeed">
  {{ range first 10 $dataJ }}
    {{ $media_type := .media_type | lower }}
    {{ $image_small := .image_small }}
    {{ $permalink := .permalink }}
    {{ $caption := .caption }}
    <li>
      <a href="{{ $permalink }}" target="_blank" rel="noopener noreferrer">
        <img class="{{ $media_type }}" src="{{ $image_small }}" {{ with $caption }}alt="{{ . }}"{{ else }}alt=""{{ end }}>
      </a>
    </li>
  {{ end }}
</ul>
```
 
With your Hugo server running you should now see the latest 10 images from your Instagram displaying on whichever page or pages use the template you added the `instafeed.html` partial to. The advantage of using a partial is that you can now add your Instagram feed to any template without duplicating code. 
 
## Styling the feed

All that’s left to do now is to introduce some styling to your feed. 

Joost has put together two helpful demos; one [simple](https://codepen.io/joosts/pen/NWbdMLW?editors=1100) and one [advanced](https://codepen.io/joosts/pen/bGBByOo) which should give you some ideas and help you get started.


## Wrapping up

Since GDPR became a thing and Facebook introduced expiring tokens, Instagram feeds have been frustrating to build and maintain. 

Thanks to Joost’s hard work on PPI Loader, we now have a low-tech and easy to implement solution which also happens to be a perfect fit for Hugo websites. If you like to keep things simple whilst also adhering to GDPR regulations then this approach is a very strong option. I’ll certainly be using it again in the future.

All the code from this tutorial can be found over on [Github](https://github.com/harrycresswell/instagram-hugo). I’ve also created [a simple demo site](https://instagram-hugo.netlify.app/) of the final working implementation. 

If I’ve made a mistake or got something wrong at any point during this article then please [drop me a message](mailto:studio@harrycresswell.com) or [open a pull request](https://github.com/harrycresswell/instagram-hugo/pulls). 

## Resources

- [Instafeed.js](https://github.com/stevenschobert/instafeed.js)
- [Instagram Token Agent](https://github.com/companionstudio/instagram-token-agent)
- [Advanced Instagram Feed (using PPI Loader)](https://codepen.io/joosts/pen/bGBByOo)
- [Instagram on your website](https://www.usecue.com/blog/instagram-on-your-website/)
- [PPI documentation](https://profilepageimages.usecue.com/documentation)
