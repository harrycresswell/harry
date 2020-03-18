+++
tags = ["Hugo", "JavaScript", "API", "Automation"]
title = "Send form data to an inbox using Zapier"
date = "2017-03-06T21:34:41+01:00"
slug = "form-data-with-zapier"
description = "A simple way to receive form data directly to your inbox using Webhooks and Zapier."
Author = "Harry Cresswell"
+++

{{< intro >}}Have you ever felt overwhelmed by the amount of code it takes to get a simple contact form working on a website?{{< /intro >}}

Part of the reason I built my site static was because I didn’t want the hassle of having a to deal with a database, a server and PHP. Dealing with all that stuff adds a layer of complexity to a website, particularly when it comes to processing form data, if it’s not a necessity I’d rather avoid it.

But where do you even start with processing form data on a static site?

At times the options can feel limited, like the only way is to pay for a form provider and embed a form into your site. Whilst there’s nothing wrong with this solution you might want to consider another way, which you have full control over and you don’t have to pay for.

{{< message >}}
I now use <a href="/articles/forms-with-netlify/">Netlify to handle form submissions</a> on this site. Saying that, this Zapier solution still works great if you’re not using Netlify.
{{< /message >}}

[On this site](/contact/) I’m using [Zapier](https://zapier.com/) to collect form data and send it directly to my email. No servers, no database, no PHP. In this article we’ll look at how you can use the same technique to build a simple contact form for your own website, using Webhooks to collect data submitted and automatically send it to you in an email.

_If you’re building a static website with a generator like Jekyll, Hugo, Middleman or even just in vanilla HTML, then this is a great solution to get a form working on your site with minimal fuss._

The good news is it’s pretty simple to implement and it’s free.

## Why Zapier

[Zapier](https://zapier.com/) is an awesome tool which allows you to connect different apps in order to automate tasks. Using an automation tool like Zapier can save you a ton of time and make boring admin tasks a whole lot more fun.

Zapier recommends several workflows you can use to integrate different apps, but there’s really no limitation to what you can do with it. Your only limitation is what you can think up, so you can get quite creative with what you do with it.

### What are Webhooks

[Webhooks](https://zapier.com/zapbook/webhook/) are a powerful Zapier feature which collect `POST` or `JSON` data and send it to a URL. You can then process this data pretty much however you like.

If you are a developer then you might be familiar with endpoints. Webhooks are pretty much the same thing. If you have no idea what I’m talking about, don’t worry, it’s really quite straight forward to implement.

### Why not use a static form provider instead

I initially looked into a few different ways to process form data on static sites before deciding to go with Zapier. The main two I looked at were FormKeep and Formspree.

[FormKeep](https://formkeep.com/) looks like a great solution, but it’s not cheap. Formkeep might be worth considering for client projects but for a personal website I’d rather keep my costs to a minimum.

[Formspree](https://formspree.io/) is another great option. One I really quite like in fact. It’s free and does exactly what we are trying to achieve, it is probably even quicker to implement. Although Formspree and our Zapier method are very similar, in the end I choose to go with Zapier for a couple of reasons:

### Familiarity

I kept coming back to Zapier because it’s familiar. I already use Zapier for several other automated sequences in my business — for social media, for my email list and a whole bunch of other stuff. It’s also super quick and easy to set up automation connecting different apps.

### Flexibility

Zapier is the most flexible solution.

Although the form we’re about to build is a very simple one, if we wanted to add further steps to process our form data, then Zapier makes this easy.

Say for example, we wanted to send the data via an email and then afterwards add the form submitter to our mailing list (pretty cool right?). We can do this easily with [multi-step Zaps](https://zapier.com/learn/getting-started-guide/multi-step-zaps/).

Then, let’s say, we wanted to send an automated email response, or send a “Getting started with the service” PDF when someone fills out our form. Zapier makes this possible too.

With Zapier our form can trigger any series of automated occurrences we want and connect our form up to a variety of different apps.

As cool as this stuff is, it’s not something we’ll be covering right now. But hopefully it gives you an idea of the power and possibilities Zapier can bring to a contact form.

## Building the form

We’re almost ready to start building our form, but first lets take a moment to break down what we would like to do. Here are the steps:

- Build a simple HTML form for our static website.
- Collect the data submitted and store it in a URL using a Zapier Webhook.
- Use Zapier to automagically send ourselves the data in an email, any time someone submits the form.
- Finally, redirect the user to a success page after they complete the form.

Before we get started, you might want to [jump over here](http://harrycresswell.co.uk/tutorials/zapier-contact/) to see the end result.

## Step 1: Writing the HTML

Let’s take a look at the HTML we’re going to use to build the form.

{{< message >}}If you’d rather skip ahead you can get hold of the source code for this tutorial on <a href="https://github.com/harrycresswell/zapier-contact-form">Github</a>.{{< /message >}}

For the purpose of this tutorial our form will have two input fields — one for a name and one for an email address — and a button to submit the data.

The end result should look something like this:

```html
<form id="myForm" action="#" type="POST">
  <input type="text" name="full-name" placeholder="What's your name?" />
  <input
    type="email"
    name="email-address"
    placeholder="What's your email address?"
  />
  <input type="submit" value="Submit" id="Form-submit" />
</form>
```

Let’s break this down. First make sure you give your form a suitable `id`.

```html
<form id="myForm"></form>
```

We’re using `id="myForm"` here to keep things nice and simple. We’ll need this later when we use some Ajax to redirect the page.

Next, make sure you add an `action` attribute. Leave it blank for now, we will come back to this later.

```html
<form id="myForm" action="#"></form>
```

Finally add `type="POST"`. This is our HTTP request which submits the data to Zapier to be processed.

```html
<form id="myForm" action="#" type="POST"></form>
```

### Adding name attributes

Remember to assign a `name=""` attribute to all the form elements you want to collect data from _(that pretty much means all of them)_. You can name them however you like, but just make sure they are there.

Let’s add one for our name input and one for our email input:

```html
<input type="text" name="full-name" placeholder="What's your name?" />
```

Here I’ve used `name="full-name"` and `email="email-address"`.

```html
<input
  type="email"
  name="email-address"
  placeholder="What's your email address?"
/>
```

Zapier will look out for the `name=""` attribute when it tries to grab the values inputed by the user, so it’s important you remember to add them or your form won’t work.

### Add a submit button

Finally we’ll need to add a very basic button, so the user can submit their data. Let’s give our button an `id` of `Form-submit`:

```html
<input type="submit" value="Submit" id="Form-submit" />
```

The rest should be fairly obvious — `type="submit"` declares what type of `input` we would like to use, and the value declares the text shown on our button. In this case `Submit`.

_Note: I’ve removed all CSS classes used to style the form for this tutorial, however you would probably want to add some classes to style your form elements otherwise they won’t look all that pretty._

## Step 2: Setting up Zapier to collect the data

If you haven’t already got a Zapier account, then before you do anything else you will need to [sign up for a free account](https://zapier.com/).

### Create a new Zap

Next you will need to make a new Zap. Give your new Zap a name, then search for the **Webhooks by Zapier** trigger.

{{< mp4 src="v1531988549/hc/zapier-contact-form-create-a-zap" caption="Create a Zap" >}}

Make sure you select **Catch Hook**, then hit **save and continue**.

As we want to collect all the data submitted in our form, we’ll leave **Pick off a child key** blank and then hit **continue**.

{{< mp4 src="v1531988543/hc/zapier-contact-form-webhook-url" caption="Grab your webhook URL" >}}

Zapier then generates a custom webhook URL. Copy this URL to your clipboard. We will need to add it in our form so that Zapier can store any data submitted.

### Update form with webhook URL and test

Head back to your form and replace the **#** symbol in `action="#"` with the Webhook URL Zapier just generated for you.

Your form should now look something like this:

```html
<form
  id="myForm"
  action="https://hooks.zapier.com/hooks/catch/1707140/msf6zi/"
  type="POST"
>
  <input type="text" name="full-name" placeholder="What's your name?" />
  <input
    type="email"
    name="email-address"
    placeholder="What's your email address?"
  />
  <input type="submit" value="Submit" id="Form-submit" />
</form>
```

Now we need to test our form to see if it’s working. Fill out your form and hit submit.

If all went well your browser window should be redirected to the Zapier Webhook URL. You’ll see a string of data. Something like this:

```json
{
  "status": "success",
  "attempt": "58b94713-f62a-4f1b-a418-9a4a992774c0",
  "id": "a0139409-2c05-4adb-a33c-111dd0e3e895",
  "request_id": "Nx5Ew2eUJxPBY1p5"
}
```

Now let’s head back to Zapier to see if our data was received.

Hit **Ok I did this** to test the connection. You should now see a nice green banner confirming your test was successful. Great job!

{{< mp4 src="v1531988545/hc/zapier-contact-form-webhook-succesful" caption="Test Succesfull. Woohoo!" >}}

## Step 3: Automate an email response

By now we should have a fully functional form, which sends the data to Zapier each time our form is submitted.

The next step is to automate an email to our inbox, which sends every time someone fills out our form. We want this email to contain the name and email address of the person who submitted our form. Let’s do this now.

### Create an outbound email action

Search for **Email by Zapier** in the "Choose an action app" step.

Hit **save and continue** on Send an outbound email. This will create your action step sequence and bring up the email template where we can decide what our automated email will say.

{{< mp4 src="v1531988549/hc/zapier-contact-form-add-outbound-email-action-step" caption="Add outbound email action step" >}}

### Build the email template

This is the part where we add the data Zapier received via the webhook to our automated email.

We will need to specify an email address which we would like the data sent to. You’ll most likely want to make this your own email address.

Then we want to create a subject line and pull the data into the body of the email.

Hit continue once you are happy. Zapier will summarise your email template then fire off a test.

{{< mp4 src="v1531988550/hc/zapier-contact-form-set-up-email-template" caption="Build the automated email template" >}}

### Check your inbox for the email

Now go check your inbox. You should have received an email containing the data, nicely laid out in the template you just set up.

{{< cld src="v1550264893/hc/zapier-contact-form-automated-email-inbox.jpg" alt="Zapier is now sending us an automated email" caption="Zapier is now sending us an automated email" >}}

You might want to filter your automated emails from Zapier by marking them with a label. This way you can easily identify where they have come from. I’ve called my label Zapier and coloured it orange so it’s easy to spot.

At this point everything should be set up correctly, so that Zapier sends an automated email to your inbox when someone fills out your form.

## Step 4: Using Ajax to redirect the URL

The final step is to redirect the user when they fill out our form.

Right now, anyone who submits the form is redirected to a nasty Webhook URL showing the string on data.

Ideally we’d like to be able to tell the person who submits the form that their information was submitted successfully, and keep them on our website, rather than directing them away from it.

We can do this with a few lines of Ajax.

Before the closing `</body>` tag in the footer of your page, load a copy of jQuery.

```html
<!-- Load jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
```

Beneath that you will need the following Javascript:

```javascript
// POST form data to zapier on submit
$("#myForm").submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: "YOUR_ZAPIER_WEBHOOK_URL_GOES_HERE",
    type: "post",
    data: $("#myForm").serialize(),
    success: function() {
      // Redirect to another success page
      window.location = "http://google.com";
    }
  });
});
```

Make sure you replace the Webhook URL with the one Zapier generated for you and the redirect URL with the page you want the submitted form to redirect to. For this example I’ve just used Google which is probably not what you want.

Finally, let’s head back to our form and remove the `action=""` and `type=""` attributes from the html. We don’t need this anymore as Ajax is now taking care of posting our form data to Zapier.

The HTML for our form should now look something like this:

```html
<form id="myForm">
  <input type="text" name="full-name" placeholder="What's your name?" />
  <input
    type="email"
    name="email-address"
    placeholder="What's your email address?"
  />
  <input type="submit" value="Submit" id="Form-submit" />
</form>
```

<p class="Message">
<em>Update (30th July 2018): After switching to the Ajax method you’ll need to go back to your Zap in Zapier and re-test the webhook to pull in fresh data. Then make sure you update your email template with your new data. Finally, turn your Zap back on and you’re good to go.</em>
</p>

## Taking it further

In this article we’ve looked at submitting form data to an email address using Zapier. This is an ideal low cost solution for static sites, where you want to avoid writing server side code or paying for a form provider. There are of course ways we can make this better.

### Validation

Something I haven’t tackled in this article is form validation. Validating your form with success or error prompts would require some extra Javascript and a bit more HTML markup, but it's perfectly possible.

However you might find a very basic bit of validation is enough. By adding the `required` attribute to the end of any required form elements, you can ensure the form submitter is warned of those fields that are required, in order to submit the form.

```html
<input type="email" name="email-address" required />
```

This will prevent a user from submitting your form without inputting the necessary data.

### Accessibility

To make sure your forms are accessible to everyone and to prevent your site from getting penalised by Google, you will want to add labels to your form elements. Make sure you add a `for` attribute equal to the `id` attribute of the related element to each label. This will bind them together.

With this in mind, our might look like this:

```html
<form id="myForm">
  <label for="Form-name">Name</label>
  <input
    type="text"
    id="Form-name"
    name="full-name"
    placeholder="What's your name?"
  />
  <label for="Form-email">Email Address</label>
  <input
    type="email"
    id="Form-email"
    name="email-address"
    placeholder="What's your email address?"
  />
  <label for="Form-submit" class="u-visually-hidden">Submit</label>
  <input type="submit" value="Submit" id="Form-submit" />
</form>
```

Notice I’m using a class called `u-visually-hidden` to hide the button label from everyone except screen readers and crawlers.

### Adding more fields

Although I only used a first name and an email address in this example, you might want to process a whole lot more data with your form. Just remember to include a `name` attribute on every form element in order for Zapier to catch the data.

I hope this has been a helpful introduction into using Zapier to process form data on static sites. You can find all the resources I used for this technique below.

<p class="message">If you want to grab the source code from this tutorial you can get hold of that on <a href="https://github.com/harrycresswell/zapier-contact-form">github</a>.</p>

If you have any questions or problems with this method then [drop me a tweet](https://twitter.com/harrycresswell), I’d be happy to help.

### Further reading

- [How to use Webhooks](https://zapier.com/blog/how-use-zapier-webhooks/)
- [A Hugo thread on static contact forms](https://discuss.gohugo.io/t/is-it-possible-to-add-a-contact-form-to-a-site/1550)
- [Paul Jarvis' article on user onboarding](https://pjrvs.com/a/onboarding/)
- [Page redirects using JS](http://stackoverflow.com/questions/4744751/how-do-i-redirect-with-javascript)
