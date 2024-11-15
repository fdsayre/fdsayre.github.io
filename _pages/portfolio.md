---
title: "Portfolio"
permalink: /portfolio/
---

<!-- {% for collection in site.collections %}
  <h2>Items from {{ collection.label }}</h2>
  <ul>
    {% for item in site[collection.label] %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %} -->


{% for collection in site.collections %}
{% if collection.label != 'posts' %}
## {{ collection.label | capitalize }}
[View {{ collection.label }}](/{{ collection.label }})
{% endif %}
{% endfor %}