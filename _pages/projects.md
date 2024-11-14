---
title: Projects
layout: collection
permalink: /collections/
collection: collections
entries_layout: list
sort_by: order
classes: wide
---

## Collections

{% for collection in site.collections %}
  {% assign collection_name = collection.label %}
  - [{{ collection_name | capitalize }}]({{ collection_name | prepend: '/' }})
{% endfor %}