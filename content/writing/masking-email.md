---
title: "Masking email"
date: 2022-06-30T09:31:13+01:00
draft: false
description: "How to protect your privacy, fight spam and reclaim control of your email address."
slug: "masking-email"
topics: ["Privacy", "Tools"]
---

I’ve started using email aliases. They help you stay anonymous when signing up for things, and give you control over who can send you email.

Various terms are flying around for this technology, but I’ve been calling it email masking. Whatever you choose to call it, the concept is simple.

With the click of a button, generate a random email address for every account you create. These disposable addresses are configured to forward email to your real email address. So you never have to reveal your private address. 

The idea is you create a unique, anonymous address for any app, website or newsletter you wish to sign up for.

Adding an extra step to the signup process might seem convoluted. But, the advantages of doing so are well worth a little extra effort.

  
## Taking back control of your inbox

When you reveal your real email address, there’s little you can do to prevent inbox abuse. Spam, phishing, data breaches, account hacks are all real problems. These problem only gets worse, the longer you use your address.

The solution is to create accounts using a unique, anonymous forwarding address. That way, the integrity of your real address always remains intact. By “masking” your private email, it remains a secret and it’s safe from abuse.

This is huge for privacy, but also security.

Discovered a data breach or sick of spam? Delete the forwarding address for that account, and you’ll never hear from the offender again. Problem solved.

With a unique email address for each account, tracing the source of spam is also more manageable. A quick look at the “sent to” address and you’ll identify exactly who shared, leaked or sold your address.

Now you’re using a random email address for every account–none of which follow a recognisable pattern. Think about how much harder it will be for hackers to guess your login details.

Combined with a generated password, password manager and two-factor authentication (2FA). And your setup is almost impenetrable.

Many services can help you with email masking.

  
## Email masking services

[Simple Login](https://simplelogin.io/) premium allows you to create an unlimited number of email aliases. And use custom domains. The software is open source and very well documented. It’s also possible to add PGP Encryption to your aliases.

[AnonAddy](https://anonaddy.com/) is another open source option. With unlimited aliases, their free tier is generous. If you’re not bothered about setting up a custom domain, then AnonAddy may be all you need.

[Apple’s Hide my Email](https://support.apple.com/en-gb/HT210425) is a great choice for Apple users. The service is a feature of Sign In with Apple and iCloud+. And allows you to spin up as many random email addresses as you need.

[1Password + Fastmail](https://1password.com/fastmail/) looks like a slick option. That is, if you’re lucky enough to use both of these services.

[Firefox Relay](https://relay.firefox.com) from the team at Mozilla offers unlimited aliases for $0.99/month. 

[burnermail](https://burnermail.io/) and [Forward Email](https://forwardemail.net/en) are two more options worth looking into.

I've been using SimpleLogin for the past few months. Here’s how it works.

  
## Kicking the tires with SimpleLogin

Before generating forwarding addresses for all your accounts. You first need to set up a primary email address that all emails will forward to.

You do this by adding a default Mailbox from inside the SimpleLogin app. This should be a private email address that you never reveal. So, make sure you don’t give to anyone. Its sole purpose is for use as a forwarding address. And it should remain a secret, at all times. 

Now you’re ready to generate a forwarding address.

SimpleLogin has a browser extension, available for [blink-based browsers](https://chrome.google.com/webstore/detail/simpleloginreceive-send-e/dphilobhebphkdjbpfohgikllaljmgbn), Safari and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/simplelogin/). 

Whenever you land on a website and want to create an account. Fire up the browser extension and generate a new forwarding address. Then use it to sign up with, instead of your real address. It works the same as generating a password using a password manager.

By default, SimpleLogin will create an email address based on the domain name of the website open in your current browser tab. To give you an example, let’s say you’re on the notion.so website. And you want to create an account. In this case, SimpleLogin might suggest: notion.ds5s@aleeas.com.

You also have the option to use a random word or a random string of numbers. This is useful if you prefer a random forwarding address, which doesn’t contain the URL of the website you’re on.

biblen_acetylgalactosamine@aleeas.com is one I created to book a table last week. Once I’d received an email confirmation for the booking, and I’d been for dinner. The address had served its purpose, so I deleted it.

Using a random forwarding address has its benefits. In particular, surrounding the name of the address. For example, a contact of mine recently asked if the email address I shared with him was correct. The address contained the name of his company, which isn’t typical for an external email address. He found this confusing, which is understandable. 

In this case, it may have been more sensible to create a random alias. Rather than creating one using the name of his company.


### Dealing with spam, phishing and data breaches

So how do you know when a forwarding address has been compromised? Well, as mentioned, you can cross-check the sender address with the reciepient address. Is something amiss? If so, delete the address.

But SimpleLogin also puts other measures in place.

The [anti-phishing feature](https://simplelogin.io/docs/getting-started/anti-phishing/) will do its best to check sender authenticity, before forwarding email to your mailbox. If authentication fails, the email will contain a warning or go into quarantine.

SimpleLogin also includes an [intergration with Haveibeenpwned](https://www.reddit.com/r/Simplelogin/comments/nn476w/haveibeenpwned_is_now_integrated_in_simplelogin/). This feature will notify you if one of your forwarding addresses has been part of a data breach. At which point you can delete the offending address and deal with the problem.

  
### Reverse aliases

One aspect of email masking which can be confusing is how to send emails *from* a forwarding address.

Most services handle this automatically. Where a reverse alias is set up for any email address that sends an email to one of your forwarding addresses. In my case, when I reply to one of these emails. My email is sent to the SimpleLogin server. Then forwarded to the recipient from my forwarding address.

But, what if you’re composing a new email, to a new contact, and want to use a forwarding address as the sender address?

In this case, you need to set up a reverse alias yourself. As far as I understand, this is a manual process.

In SimpleLogin, you need to add your new contact to the forward address you want to send from. For example, let’s say I want to contact elon@tesla.com from a new forwarding address. First I generate the forwarding address. Then add Elon’s email address as a contact of that forwarding address. This generates a reverse alias. It will usually look like a long string of random letters. 

kutcaqldjyywoxyfrlsmneathjpnjjzpwqlgmqb@simplelogin.co, for example.

Now if I email the reverse alias, SimpleLogin will catch the email and send it to elon@tesla.com for me. It will send my email from the forwarding address I set up and assigned Elon as a contact for. 

It’s a little confusing at first, but you soon get the hang of it.

The key is to generate a reverse alias for each contact you add. That way you can manage each one of your contacts independently. 

What you don’t want is to have a bunch of independent contacts all using the same forwarding address. Because at some point you might want to cut ties with one, but not the other. Then you’ll have a problem, as you can’t delete the address without loosing both contacts. 

If the contacts are all within the same company, then the chances are this won’t be such a problem. As you’ll most likely want to cut ties with the company rather than the individual.

  
### Random alias vs custom domain

For most accounts, a random forwarding address is all you need. For your security and privacy, it’s the best approach. However, there might be occasions where you want to keep your identity visible. But still maintain control over who can email you.

To give you an example, a couple of different estate agents recently valued my apartment. I decided to create a random forwarding address for each. But this time I used a custom domain (also set up with SimpleLogin) which contains my full name. That way they could take a look at the address and recognise it’s me.

As soon as the valuation process was complete, I turned off the aliases I had set up for each agent. Now, I no longer receive the constant flow of emails about properties for sale in my area.

Of course, this wouldn’t be possible if I provided my private email address. Then I’d have to unsubscribe from each mailing lists, one by one. Not much fun.

But, it’s possible to do this without a custom domain, too. You can personalise a forwarding address using SimpleLogin’s default domain names. For example, harrycresswell.vv6j9@aleeas.com achieves the same results.

Notice the random string of letters and numbers before the @ sign. This creates a unique address. Meaning you can create as many personalised addresses as you like. 

With this approach, I reveal my identity, but maintain control over who has access to my inbox. The best part – I don’t need a custom domain name to do it.

  
## It’s all the same thing

I mentioned the various terms out there. All attempting to make this technology approachable and descriptive.

From a technical perspective, creating email aliases is what this *is*. But the term “alias” doesn’t exactly describe what it *does*. That is unless you’re a real tech nerd and you know your stuff.

To appeal to the broadest range of people, this technology needs a better sales pitch. And, there are several attempts to do that. 

Here are some to look out for:

- Disguising email
- Anonymous emails
- Anonymous email forwarding
- Email masking
- Email forwarding
- Disposable email addresses
- Hidden emails
- Burner emails

If you hear any of these terms, they most likely mean the same thing. No doubt there are more out there, but these are the ones I’m currently aware of.
  

## The hard part

How nice it would be to have zero footprint online. With a brand new email address, that we can mask from the start. In reality, most of us aren’t lucky enough to be in a position where we’re starting out fresh. 

Like me, you probably have a bunch of existing subscriptions and accounts. Most of which you’ll need to work your way through. Updating every username to a random forwarding address, one by one. It’s a manual process, which will take a good bit of time.

This isn’t about password managers. But using one will make the process of identifying all your accounts less painful. It also means you won’t have to remember all your forwarding addresses. Win win.

I currently have 643 accounts stored in my password manager. Most of which I need to update using this email masking method. It’s going to take a while. But, it’s also a great chance to evaluate which services I no longer use and therefore which I can delete.

Yes, I’m also looking at that number in disbelief. I’m not quite sure how it got to this, but I’m aiming to slice it in half by the end of the year.

{{< message >}}
<a href="https://bitwarden.com/help/generator/" rel="noopener noreferrer">Bitwarden has a API intergration</a> with SimpleLogin, AnonAddy and Firefox Relay. So you can generate aliases directly from your password manager.
{{</ message >}}
  
## Final thoughts

I’m sure you’ve grasped the basics of email masking by now. At least, you’ll have a good idea about the problem this technology solves and why it’s so exciting.

So I’ll leave you with a few rules I’ve laid out for myself. A mindset, if you like. 

My aim is to adopt this mindset when creating accounts:

- Create a unique, anonymous forwarding address for every single account
- Always use a password manager to save your details
- Never reveal your real email address unless it’s a trusted contact
- Use [Haveibeenpwned](https://haveibeenpwned.com) to identify misuse of any forwarding address
- Use a tool like SimpleLogin to make the process above easier

My final piece of advice is to be ruthless about which emails you allow into your inbox. Email can be tiring. It’s often the last thing you want to spend your time on. So the less you have of it, the less you have to manage.


Personally, I’ve got a way to go before I have full control of my inbox. But, right now, email masking seems like the best way to get there.