---
title: "Projects"
permalink: /projects/
---

{% raw %}
{% assign collections_list = site.collections | where_exp:"item", "item.label != 'posts'" %}

{% for collection in collections_list %}
  <h2>{{ collection.label | capitalize }}</h2>
  
  {% assign items = site[collection.label] %}
  {% for item in items %}
    <div class="project-item">
      <h3><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
      {% if item.description %}
        <p>{{ item.description }}</p>
      {% endif %}
    </div>
  {% endfor %}
{% endfor %}
{% endraw %}