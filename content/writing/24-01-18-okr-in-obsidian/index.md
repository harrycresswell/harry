---
title: "OKR in Obsidian"
date: 2024-01-18T09:41:29Z
publishdate: 2024-01-18
lastmod: 2024-01-18
draft: false
slug: "okr-in-obsidian"
topics: ["Obsidian", "Tools"]
description: "How to track (and reach) your goals in Obsidian with OKR and periodic notes."
---

I’ve tried various methods to stay on track and reach my goals, but OKR is the only goal setting framework I’ve really managed to make work. 

A large part of that success I put down to using OKR with [Obsidian](https://obsidian.md/). The ~~note taking and knowledge management~~ writing app which has become a major part of my workflow. Obsidian has a community plugin called Periodic Notes, which combined with templates, checklists and reoccurring reminders, really brings this OKR workflow together.

Here’s a little bit about OKR and how I‘m making it work in Obsidian. 

## OKR: a goal setting framework

OKR consists of Objectives and Key Results. 

The first step is to set clear objectives that you wish to accomplish. In other words, the goals you want to achieve. They should be significant, concrete, clearly defined, aspirational and motivating. 

You may decide to only use OKR for your work, in which case you would typically create one objective per calendar quarter. However, you may also wish to use OKR for your personal life too, in which case you would create one objective per life area, so two objectives in total per quarter.

The next step is to break these objectives into key results. Key results are benchmarks or milestones that lead you towards achieving your objectives. They should be specific and measurable, so you can easily track your progress and reflect on your success.

Each objective typically consists of 3-5 key results, which are often written out below the objective. However, another popular approach is to use the following statement:

I will (Objective) as measured by (Key Results).

OK, so how does this work in Obsidian?

## How I’m using OKR in Obsidian

The key to making OKR work in Obsidian is the [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) plugin, which helps you plan your OKRs across quarterly, weekly and daily notes. All of which are created from templates.  

Head to `Settings > Community Plugins > Browse` to install the plugin. 

You will also need to ensure the [Templates](https://help.obsidian.md/Plugins/Templates) Core Plugin is enabled. To do this, head to `Settings > Core Plugins > Templates`, then toggle the switch to active the plugin.

### The quarterly note

At the beginning of each quarter I create a quarterly note. 

With the aformentioned plugins installed, you can do this in Obsidian by using the shortcut `Cmd+P` to open the command palette, then by typing *quarterly*, followed by `Enter`. 

The Periodic Notes plugin generates a new note for the quarter using my `quarterly` template:

#### templates/quarterly.md

```
# {{title}}

## Objectives
_The overall goals you want to accomplish in this quarter._

### Professional

**Objective**: 

#### Key results
_How you will achieve your objective._


### Personal

**Objective**: 

#### Key results
_How you will achieve your objective._

## Weekly
_Add links to weekly notes here._

## OKR quarterly review

### Have you completed your key results?

### If you haven’t completed your key results, why was this?

### Did your key results lead to the overall objective?

### What did you learn this quarter?
```

Inside this note I list one *professional* objective and one *personal* objective for the quarter. For each objective I create key results which bring me closer to achieving the objective. 

There’s also a section where I list my weekly notes for reference, but more on this later.

At the end of each quarter I answer the questions in the *OKR quarterly review* section. This helps me reflect on my progress over the quarter and gets me thinking about the upcoming quarter. I have a reoccurring reminder set up in my calendar that reminds me to complete my quarterly review.

Here‘s an example of my *2024-Q1* quarterly note:

#### journal/quarterly/2024-Q1.md

```
# 2024-Q1 (Jan - Mar)

## Objectives
_The overall goals I want to accomplish in this quarter._

### Professional

**Objective**: Move my business in a product direction.

#### Key results
_How you will achieve your objective._

![[24-Q1 ERYN Launch SCSS starter]]
![[24-Q1 ERYN Make SCSS starter post launch improvements]]
![[24-Q1 PH Complete module 1 (up and running) content]]
![[24-Q1 PH Rebuild course.ph.com]]

### Personal

**Objective**: Get back into a regular german practice.

#### Key results
_How you will achieve your objective._

![[Learn 5 new words per week]]
![[Take 5 IRL classes]]
![[speak German for 10 minutes each day]]

## Weekly

- [[2024-W01]]
- [[2024-W02]]

## Quarterly review

### Have I completed my key results?

### If you haven’t completed key results, why was this?

### Did my key results lead to the overall objective?

### What did you learn this quarter?
```

You’ll notice that each of my key results is actually a note in itself.  I create the note for each key result using another template called `key-result`:

#### templates/key-result.md

```
---
tags: ["okr"]
---

# {{name}}

## Initiatives

- [ ] ...

```

These are essentially projects notes, where I list initiatives (actions) that lead to completing the project and so achieving the key result. 

I aim to create no more than 3-4 key results per quarter, for each objective. I then embed each key result note into my quarterly note under either my *professional* or *personal* objective using the following format: `![[YEAR-QUARTER AREA PROJECTNAME]]`. Notice the exclamation mark at the beginning. This tells Obsidian to embed the contents of the note, rather than simply link to the note. 

Here’s an example of a recent key result.

#### projects/24-Q1 ERYN Launch SCSS starter.md

```
---
tags: ["okr"]
---

# Launch [[ERYN SCSS starter (cu.css)]]

## Initiatives

- [x] Create blog post about project ([[Introducing cu.css]])
- [x] Make GitHub repo public
- [x] Pin repo to GitHub profile
- [x] Publish [[Introducing cu.css]] on personal site
```


### The weekly note

At the beginning of each week I create a weekly note.

To do this, do the same as before, by using the shortcut `Cmd+P` to open the command palette, then type *weekly* followed by `Enter`. 

This generates a new note for the week using my `weekly` template:

#### templates/weekly.md 

```
# {{date:gggg [Week] ww}}

## Reminders

- [ ] Add this weekly note to quarterly note
- [ ] Write up initiatives for the week

## Initiatives for the week
_Take a look at last weeks review and check in with OKRs_

- [ ] ...

## Weekly review

### What went well this week?

- 

### What didn’t go so well this week?

-

### What's my biggest challenge right now?

- 

### What help do I need?

- 

### What did I learn?

- 

### What are my initiatives for next week?

- 
  
```

I’ve added another reoccurring reminder in my calendar, this time every Monday, which tells me to set up a weekly note, so I never forget.

I plan each week by looking at my key results for the quarter and picking out a few initiatives that I feel like working on. I then list these under a section called *Initiatives for the week*. I also check my weekly note from the previous week, for any outstanding initiatives which I didn’t manage to complete.

Here’s an example of one of my weekly notes:

#### journal/weekly/2024-W01.md

```
# 2024 Week 01

## Reminders

- [x] Add this weekly note to Quarterly note
- [x] Write up initiatives for the week

## Initiatives for the week
_Take a look at last weeks review_
 
- [[2023 in review]]
  - [ ] Finish and publish 
- [[24-Q1 ERYN Launch SCSS starter]] 
  - [x] Finish and publish blog post about project: ([[Introducing cu.css]])
  - [x] Make GitHub repo public
  - [x] Get Rebekka to proof read copywriting on https://cu.harrycresswell.com/
  - [x] Pin repo to GitHub profile
- [[24-Q1 B32 Hugo - Cloudcannon migration]]
  - [ ] Fix JavaScript issues
  - [x] Finish migrating content
- [[24-Q1 MW Mewing app v2.0.4]]
  - [ ] Design lesson status functionality
- Submit Tax return

## Weekly review

### What went well this week?

- Finished and published [[2023 in review]]
- Finished and published [[Introducing cu.css]]
- Made good progress with [[24-Q1 B32 Hugo - Cloudcannon migration]]
- Rebekka proof read https://cu.harrycresswell.com copywriting
- I started reading The Warm Dry Home by Pete Ward.
- Completed tax return

### What didn’t go so well this week?

- Running as I still have a cold, hopefully I will get back into it next week
- Didn’t study any German. I need to organise some lessons.

### What's my biggest challenge right now?

- Studying German

### What help do I need?

- Mew app lesson status UI design

### What did I learn?

- Be patient with yourself, especially when you are sick.

### What are my initiatives for next week?

- [[24-Q1 MW Mewing app v2.0.4]]
  - Design lesson status functionality
- [[24-Q1 PH Complete module 1 (up and running) content]]
  - Reviewing where I’m with [[practical hugo]]
  - Edit styling basics lesson
- [[OKR in Obsidian]]
  - Finish draft
- [[hc.com]]
  - Open external links in new tab
- [[24-Q1 ERYN Make SCSS starter post launch improvements]]
  - Open external links in new tab
```

At the end of each week I do a *weekly review* of my OKR progress. In this review I answer  a few questions about the week, such as *what went well*, *what didn’t go so well* and *what I need help with*. This helps me reflect on the week and check in to see if I’m making progress with my key results. 

Part of my weekly review involves thinking ahead to the initiatives I want to complete in the following week. Here I list any initiatives I didn’t manage to complete that week, which will carry over to the next week. 

I have another reoccurring reminder in my calendar, this time on Fridays, which reminds me to complete my weekly review at the end of each week.

### The daily note

Every morning, the first thing I do when I fire up my laptop is open Obsidian. 

With Obsidian open, I press `Cmd + P` to launch the command palette, then type *daily* and hit `Enter`. This creates a daily note from my `daily` template:

#### templates/daily.md

```
# {{title}}

## Reminders

- [ ] Complete 6-minute diary AM
- [ ] Add morning routine to habit tracker
- [ ] Check in with [[OKR]] quarterly and weekly note
- [ ] Check in with calendar and time blocks 
- [ ] Write up tasks for the day
- [ ] 30mins German practice
- [ ] Flashcard daily review
- [ ] Readwise daily review
- [ ] Reading 5.30-6.30pm (Reader, RSS or kindle)
- [ ] Complete 6-minute diary PM

## Tasks

- [ ] ...

## 6-Minute Diary

### Morning

3 minutes in the morning.

#### I am grateful for ...

1. 
2. 
3. 

#### What would make today wonderful?

#### Positive self affirmation

### Evening

3 minutes in the evening.

#### Something good I did for someone today...

#### What will I do better tomorrow?

#### Great things I experienced today...

1. 
2. 

```

My daily note note consists of 3 main sections:

- Reminders
- Tasks
- 6-minute diary

The *Reminders* section is essentially a checklist of reoccurring tasks that I do every single day. *Check in with OKR quarterly and weekly note* is obviously the key one here. It reminds me to look at my OKRs and pick out some initiatives to work on that day. That way, (at least) I make some progress towards my key results every day.

I also include general reminders which don’t relate to my OKRs, but are easy to forget without a daily reminder. Things like *Complete 6-minute diary*, *Add morning routine to habit tracker* and *Readwise daily review*,all fall into this category. 

The second section in my daily note is *Tasks*. This is where I list granular tasks for the day, most of which will come from my weekly initiatives. When I check in with my *quarterly* and *weekly* note each morning, I choose a few initiatives to work on and add tasks to this section which satisfy those initiatives.

The final section in my daily note is called *6-minute diary*. This consists of a handful of questions that I ask myself each day. First in the morning and then again in the evening (when I remember or still have the energy). This is a fairly typical format for a gratitude practice, which I’m sure you may well be familiar with. I use it to help me stay positive and reflect each day.

### The OKR note

The final part of this workflow is The OKR note itself. This is just an index note where I lists each quarterly note by year. That way they’re all in one place and easy to access. 

My OKR index note also briefly explains OKR, in case I’m having a slow moment (which happens quite often).

Here’s what my `OKR.md` note looks like:

#### areas/okr.md

```
# OKR

Objectives and Key Results.

- **Objectives** are the overall goals you want to achieve. Objectives should be aspirational and motivating, but usually not measurable.
- **Key Results** are how you will achieve your objectives. They can be either quantifiable performance measures or deliverables (effort or projects).
- **Initiatives** are actions which lead to key results.

## 2024

- [[2024-Q1]]

## 2023

- [[2023-Q1]]
- [[2023-Q2]]
- [[2023-Q3]]
- [[2023-Q4]]

```

Every quarter, when I create a new quarterly note, I manually add it to my OKR index note for reference. 

It’s worth mentioning, this note isn’t generated using the Periodic Notes plugin. It’s just a place to reference and easily retrieve my quarterly notes. It’s also the note I link to in the *Reminders* section of my daily notes. 

### Organising notes

The Periodic Notes plugin lets you set the folder where you’d like to keep your notes. I use the following structure to keep my notes organised:

```
- journal/
  - daily/
    - 2024-01-11
    - 2024-01-12
    - ...
  - quarterly/
    - 2023-Q3
    - 2024-Q1
    - ...
  - weekly/
    - 2024-W01
    - 2024-W02
    - ...
```

Another part of my workflow is [the PARA method](https://fortelabs.com/blog/para/), which you may have already realised from the file path of my notes. I use this to organise ongoing areas of responsibility in my life and projects I’m working on. These projects aren’t necessarily part of my OKR, but quite a few will be.

My OKR index note fits nicely into my `/areas` folder and the key result notes I create for each OKR objective live inside my `/projects` folder. When I complete a project or key result, I move the note from the `/projects` folder into the `/archive` folder.

```
archive/
  23-Q4 ERYN SCSS starter build
  ...
areas/
  hc.com
  OKR
  practical hugo
  ...
journal/
  daily/
  quarterly/
  weekly/
projects/
  24-Q1 PH Rebuild course website
  24-Q2 CU launch v1.2.0
  ...
resources/
```

It might not always make sense to think of key results as dedicated projects, but I usually find this approach works well for my purposes.

### Improvements to the workflow

Currently I list weekly initiatives in my weekly note by manually copying each initiative across from my key result notes. Perhaps I could embed these initiatives so I don’t have to repeat myself. Saying that, I really don’t mind writing out my initiatives over and over. It keeps things simple and helps to solidify what I’m trying to get done.

I’ve seen a few other OKR workflows in Obsidian which use the [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) and [QuickAdd](https://github.com/chhoumann/quickadd) plugins. I’ve considered using both and they probably would improve the workflow to some degree. But, again, I’m a stickler for keeping this simple and I’d rather keep the plugins I use to a minimum.

If you have any suggestions for how I could improve this workflow further it would be great to hear from you.

## Final thoughts

These days I find myself using Obsidian for all sorts of things. From general note taking and habit tracking to [project management](/writing/simple-project-management) and pretty much anything else that involves writing or learning.

But using Obsidian for goal settings with OKR has been the real game changer. It’s made a huge improvement to my focus and work.

The Periodic Notes plugin, along with a handful of templates and a few simple reminders – either in the form of checklists or reoccurring reminders in my calendar – is, so far, what’s making all this work.

As long as I remember to begin each day by creating a daily note, then the rest is laid out. It’s not perfect, by a long shot. There are still days when I struggle to stick with it. But, so far, this is the best way I‘ve found to consistently make progress with the things I want to achieve.

Before I wrap this one up I’d like to give credit to Marcus Olsson’s [How I set and track goals using Obsidian](https://marcus.se.net/how-i-set-and-track-goals-using-obsidian/). My journey with OKR in Obsidian was heavily inspired by Marcus’ approach. So a big thanks to Marcus for helping me get my head around all this stuff. Your hard work hasn’t gone unnoticed.
