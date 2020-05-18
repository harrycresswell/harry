+++
title = "Starting a new Sanity project"
date = "2019-07-09T15:11:58+02:00"
description = "Sanity is a headless CMS that allows you to structure your content by building custom schemas and deliver it as a flexible API, which you can then query using a front-end of your choice. "
slug = "new-sanity-project"
tags = ["Today I Learned", "Sanity"]
syndicate = "true"
+++

[Sanity.io](https://www.sanity.io/) is a headless CMS that allows you to structure your content by building custom schemas and deliver it as a flexible API, which you can then query using the front-end technology of your choice.

## Install Sanity

Install Sanity studio globally:

```
npm install -g @sanity/cli
```

This will allow you to use the `sanity` CLI and scaffold new projects directly from the command line.

## Create a new project

To start a new project create a new project directory and move into it:

```
mkdir new-project && cd new-project
```

Run `sanity init` to log in Sanity, set up a dataset, and generate the files needed to run the editing environment locally.

If this is your first project choose `Create new project`, then give your project a name and name your dataset, this can be anything you like. If you leave blank it will be given the default name `production`.

Next select dataset visibility, choose the output path and select a template. It’s a good idea to choose `blog` if this is your first project as it will give you a clue how to structure your schema. You can always delete the default schema later.

Sanity will resolve dependencies then you will be ready to start the project.

## Next steps

Launch the project in VSCode, using `code .` from the root directory, then use `sanity start` to run a locally instance of the studio in your browser.

Now you‘re ready to start building your content schema.

## Further reading

- [Getting started with Sanity](https://www.sanity.io/docs/introduction/getting-started) from the Sanity Docs.
