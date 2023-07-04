---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
description: ""
slug: "{{ .Name | urlize }}"
topics: ["Daily", "Hugo course"]
---