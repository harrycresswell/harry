---
title: "Accessing HTML data attributes in JavaScript with dataSet"
date: 2021-02-24T10:15:48Z
draft: false
description: "You can easily add custom data to any HTML element using custom data attributes. By how do you access those attributes using JavaScript?"
slug: "accessing-data-attributes-with-dataset"
tags: ["JavaScript"]
syndicate: "false"
---

You can easily add custom data to any HTML element using custom data attributes.

Data attributes can be anything you like as long as you prefix your custom attribute with `data-`.

As per the MDN web docs:

> “It must contain only letters, numbers, and the following characters: dash (-), dot (.), colon (:), underscore (\_)—but NOT any ASCII capital letters (A to Z).”

For example, say we have multiple images and we want to add some data to label their position in a slideshow, we could create a ‘position’ attribute like this:

```html
<img class="image-1" data-position="1" src="image-1.jpg" />
<img class="image-2" data-position="2" src="image-1.jpg" />
<img class="image-3" data-position="3" src="image-1.jpg" />
```

In our JavaScript we can use `dataset` to either get the data property or set the data property.

Dataset returns an object containing all the property values on an element.

```javascript
// Get the element
const element = document.querySelector(".image-1");

// Log position of the element
console.log(element.dataset.position);
```

In JavaScript the naming convention is converted from kebab-case to camelCase. In other words, any dashes in your attribute names will be converted to camelCase

```javascript
// Get attribute called “data-first-name“
console.log(element.dataset.firstName);
```

Setting a data attribute value is very similar.

```javascript
// Set value to something new
element.dataset.firstName = "Harry";
```

The data attribute of the element would now look like this:

```html
<div data-first-name="Harry"></div>
```

## Summary

Dataset is useful when you need to work with custom data attributes.

## Resources

- [Mozilla Docs - dataSet](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset)
