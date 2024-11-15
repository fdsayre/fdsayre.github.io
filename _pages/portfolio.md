---
title: "Portfolio"
permalink: /portfolio/
---

{% raw %}
{% assign collections_list = site.collections | where_exp:"item", "item.label != 'posts'" %}

{% for collection in collections_list %}
  <h2>{{ collection.label | capitalize }}</h2>
  <div class="project-item">
    <a href="/{{ collection.label }}">View {{ collection.label }} projects</a>
  </div>
{% endfor %}
{% endraw %}