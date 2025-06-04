---
title: "Hugo Version Manager"
date: 2025-06-04T11:29:45+01:00
draft: false
slug: "hugo-version-manager"
topics: ["Hugo", "Tools"]
description: "With `hvm`, it’s now possible to manage multiple versions of Hugo and switch between them on a project-by-project basis."
---

If your site uses an old version of Hugo and you’re happy with the features it offers, then you can happily stick with it as long as you like. Hugo will continue to work without any issues. This is one of the many great things about working with Hugo, as it means there’s no real need to upgrade your version, unless you want to.

If you want the latest features, however, then you’ll need to upgrade Hugo to the latest version. In the past, [upgrading Hugo](/writing/upgrading-hugo-warnings-breaking-changes/) was a global affair. Update the Hugo binary and your  version of Hugo updates everywhere, in every project. Although the process was fairly straight forward, it often meant [fixing breaking changes](/writing/breaking-changes-upgrading-hugo/) by working through each of your projects, one by one. Personally, I never experiences any major issues when upgrading Hugo, but the process always took some time.

I now run and manage ~20 Hugo websites. And, that doesn’t include the various tools and demo projects that I’ve also built with Hugo. With every new site I create, the thought of upgrading becomes that little bit more daunting. And, process of upgrading Hugo becomes that little bit more time consuming.

The good news is that these issues have now been resolved. Thanks to long-time Hugo contributor Joe Mooring, we now have a fantastic little command line interface (CLI) tool called [Hugo Version Manager](https://github.com/jmooring/hvm). 

Similar to other versions managers, `hvm` allows you to download and manage multiple versions of Hugo and switch between them on a project-by-project basis. If you manage any more than a handful of Hugo sites, then this is extremely helpful. It means you can continue to use old versions of Hugo in older projects, whilst using newer versions in newer projects. No further need to worry about what might break when you upgrade Hugo. 

Once `hvm` is installed and configured, all it takes is a `.hvm` file containing the version number you wish to use in the root of your project. Run the `hugo` command and Hugo will install and use that version in that particular project.

If you need a hand getting `hvm` set up and working on your machine, then I highly recommend reading [Using Hugo Version Manager (hvm) to Switch Between Different Hugo Versions](https://navendu.me/posts/hugo-version-manager/) by Navendu Pottekkat.
