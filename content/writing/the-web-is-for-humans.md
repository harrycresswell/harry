---
title: "The web is for humans"
date: 2022-06-22T12:39:30+01:00
draft: false
description: "Thanking the people I’ve drawn inspiration from when building this website."
slug: "web-for-humans"
topics: ["Daily"]
syndicate: "false"
---

I just added [a humans.txt file](https://harrycresswell.com/humans.txt) to my personal site. 

It’s just a simple plain text file at the root of my site, which you probably wouldn’t ever find, unless you enjoy poking around in Github repos.

Along with my contact info, and the technology used to build this site, this file contains a growing list of people who have influenced how I build websites.

In the grand scheme of things, this isn’t all that important. But it’s been on my list of things to add to my site for a while, so I’m pleased to finally get it live. 

Whilst at it, I jotted down a few thoughts about humans.txt files – how they differ from robots.txt and how I’m approaching mine – and a quick 3 step tutorial to show you how to create one for yourself.



## Express your gratitude

Whereas [a robots.txt file](https://www.cloudflare.com/en-gb/learning/bots/what-is-robots.txt/) is for search engines, a humans.txt file is for humans. 

It’s a small way to acknowledge the people who helped build your website, in one way or another. Even though few people will ever discover it, it’s one of those website easter eggs that makes the web that little bit more fun to be a part of.

Typically, a *humans.txt* file includes a list of team members who have contributed to the project. However, you may prefer to list those who you’ve taking inspiration from, or who you’ve learnt most from over the years. The choice is yours, but its purpose remains the same.

Personally, I’m using this as a chance to pause for a moment, reflect and express some gratitude towards the people who have helped me get to where I am today.


## Create your own humans.txt file

If you’re interested in making a *humans.txt* file for your own site, here’s how it works. It’s very simple and you can put one together within a few minutes.

### 1. Create a text file called `humans.txt`

First you need to create a text file called *humans.txt* and put something in it. Use whichever plain text editor you prefer.

Here’s the format I’m using:

```
/* TEAM */
                      
Your title: your name.                           
Site: email, link to a contact form, etc.  
Url: your website address                          
Social: your social media handle.                          
Location: City, Country.

[...]
    							
/* THANKS */

Name: their name
Twitter: their Twitter handle
Url: their website address    

[...]
                        
/* SITE */
                     
Last update: YYYY/MM/DD                                 
Standards: HTML5, CSS3,..                          
Components: Modernizr, jQuery, etc.                  
Software: Software used for the development
```

I pinched this from [](https://humanstxt.org/)[https://humanstxt.org/](https://humanstxt.org/). You’re welcome to do the same.


### 2. Put it in the right place

Now you need to make sure your *humans.txt* file is in the right place.

If your site is built with Hugo, like mine, then put your *humans.txt* file in your _./static_ folder and Hugo will do the rest when you build your site.

Otherwise, make sure you add your *humans.txt* file to the root of your site. For example, https://harrycresswell.com/humans.txt.

### 3. Link to your file

Finally, place a reference to the file in the `<head>`of the site like this:

```
<link rel="author" href="humans.txt" />
```

You may also like to link to your *humans.txt* file from somewhere else on your website. 

```
<a href="/humans.txt">My humans.txt file</a>
```

Personally, I’ve decided against linking to my humans.txt file (except from within this short post). I rather like that it’s hidden and takes some digging to discover.

Anyway, that’s it. You’re all done.

## humans.txt files in the wild

Given the nature of *humans.txt* files, they’re not always easy to discover. But here are some I’ve managed to find, which might help inspire your own.

- [Danny de Vries’s humans.txt file](https://www.dandevri.es/humans.txt)
- [GitHub Actions humans.txt file](https://actions.github.io/humans.txt/)
- [The Lovely Geek’s humans.txt file](https://thelovelygeek.com/humans.txt)
- [Google’s humans.txt file](https://www.google.com/humans.txt)
- [Jason Tipton’s humans.txt file](https://frontlinedev.com/humans.txt)

If you have a humans.txt file, then please let me know. I’d love to take a look and add it to the list above.

## Final thoughts

To the best of my knowledge, a *humans.txt* file won’t get you more followers, help you grow your email list, improve your search ranking or  increase your conversion rate. So what’s the point, I here you say? 

I like to think of my *humans.txt* file as a small reminder that *the web is for Humans*, and not just for bots. It’s easy to forget sometimes.

Oh...and it’s just a bit of fun, because that’s important, too.

## Resources

If you want to learn more about humans.txt files, here are a few places to start.

- [Humans TXT: We Are People, Not Machines.](https://humanstxt.org/)
- [humans.txt file basic tutorials with example | Cloudhadoop](https://www.cloudhadoop.com/humans-txt-file-example/)