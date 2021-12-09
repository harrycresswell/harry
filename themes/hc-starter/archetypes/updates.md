---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
description: ""
slug: "{{ replace .Name "-" "-" | title | lower }}"
update_freq:  ["Daily", "Weekly", "Monthly"]
topics: ["Hugo"]
---