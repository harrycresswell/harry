---
title: "Process JSON data from the command line with JQ"
date: 2020-03-30T17:20:31+01:00
draft: false
description: "jq is a handy little utility for processing JSON in the command line. It’s useful for turning it into a more readable format when using curl"
slug: "process-json-data-with-jq"
tags: ["CLI", "JavaScript"]
syndicate: "false"
---

jq is a handy little utility for processing JSON in the command line. It’s useful for turning your data into a more readable format when using `curl`.

Without `jq`, using `curl` like this:

```
curl https://api.airtable.com/v0/app3fgXYOzsH7WeAf/Form%20data
```

Will return something like this:

```json
{"records":[{"id":"recFjEUzugysAyT1y","fields":{"Time zone":"GMT","Activity":"Reading","Social Channel":"Zoom","Location":"my kitchen ","When":"Saturday","Name":"James","Thing":"Poetry","Time":"4am"},"createdTime":"2020-03-22T15:29:34.000Z"},{"id":"recGP8i9VZUVOcHMt","fields":{"Time zone":"GMT","Activity":"Playing","Social Channel":"Periscope","Location":"my bathroom","When":"Wednesday","Name":"Ben","Thing":"Music","Time":"2am"},"createdTime":"2020-03-17T16:17:47.000Z"},{"id":"recPtO0aVYNyb7plD","fields":{"Time zone":"GMT","Activity":"Training","Social Channel":"Instagram","Location":"The Dagobah System","When":"Only on leap years","Name":"Yoda","Thing":"Jedi","Time":"12pm"},"createdTime":"2020-03-22T17:45:36.000Z"},{"id":"recVwaCfR7XTcPOGC","fields":{"Time zone":"GMT","Activity":"Eating","Social Channel":"Youtube","Location":"my living room","When":"Monday","Name":"Harry","Thing":"Chess","Time":"9am"},"createdTime":"2020-03-17T16:17:47.000Z"},{"id":"rectxMQbGwbcbsSOv","fields":{"Time zone":"GMT","Activity":"Teaching","Social Channel":"Snapchat","Location":"my garden","When":"Everyday","Name":"Sam","Thing":"Oragami","Time":"1am"},"createdTime":"2020-03-17T16:17:47.000Z"}]}%
```

To make this unwieldy data easier to read, you can [install jq](https://stedolan.github.io/jq/download/).

```
brew install jq
```

Then use the same command as before, but this time pipe it through jq, like this:

```
curl https://api.airtable.com/v0/app3fgXYOzsH7WeAf/Form%20data
| jq
```

jq will now return our JSON data in a more familiar format:

```json
{
  "records": [
    {
      "id": "recFjEUzugysAyT1y",
      "fields": {
        "Time zone": "GMT",
        "Activity": "Reading",
        "Social Channel": "Zoom",
        "Location": "my kitchen ",
        "When": "Saturday",
        "Name": "James",
        "Thing": "Poetry",
        "Time": "4am"
      },
      "createdTime": "2020-03-22T15:29:34.000Z"
    },
    {
      "id": "recGP8i9VZUVOcHMt",
      "fields": {
        "Time zone": "GMT",
        "Activity": "Playing",
        "Social Channel": "Periscope",
        "Location": "my bathroom",
        "When": "Wednesday",
        "Name": "Ben",
        "Thing": "Music",
        "Time": "2am"
      },
      "createdTime": "2020-03-17T16:17:47.000Z"
    },
    {
      "id": "recPtO0aVYNyb7plD",
      "fields": {
        "Time zone": "GMT",
        "Activity": "Training",
        "Social Channel": "Instagram",
        "Location": "The Dagobah System",
        "When": "Only on leap years",
        "Name": "Yoda",
        "Thing": "Jedi",
        "Time": "12pm"
      },
      "createdTime": "2020-03-22T17:45:36.000Z"
    },
    {
      "id": "recVwaCfR7XTcPOGC",
      "fields": {
        "Time zone": "GMT",
        "Activity": "Eating",
        "Social Channel": "Youtube",
        "Location": "my living room",
        "When": "Monday",
        "Name": "Harry",
        "Thing": "Chess",
        "Time": "9am"
      },
      "createdTime": "2020-03-17T16:17:47.000Z"
    },
    {
      "id": "rectxMQbGwbcbsSOv",
      "fields": {
        "Time zone": "GMT",
        "Activity": "Teaching",
        "Social Channel": "Snapchat",
        "Location": "my garden",
        "When": "Everyday",
        "Name": "Sam",
        "Thing": "Oragami",
        "Time": "1am"
      },
      "createdTime": "2020-03-17T16:17:47.000Z"
    }
  ]
}
```

That’s it.

## Resources

- [jq](https://github.com/stedolan) from Stephen Dolan
