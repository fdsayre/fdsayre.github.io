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

{% raw %}
{% assign custom_collections = site.collections | where_exp:"item", "item.label != 'posts'" %}
{% for collection in custom_collections %}
  <h2>{{ collection.label | capitalize }}</h2>
  <a href="/{{ collection.label }}">View {{ collection.label }}</a>
{% endfor %}
{% endraw %}