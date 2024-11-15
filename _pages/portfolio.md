---
title: "Portfolio"
permalink: /portfolio/
---

{% for collection in site.collections %}
  {% if collection.label != "posts" %}
    <h2>{{ collection.label | capitalize }}</h2>
    <ul>
    {% for item in site[collection.label] %}
      <li>
        <h3><a href="{{ item.url }}">{{ item.title }}</a></h3>
        {{ item.excerpt }}
      </li>
    {% endfor %}
    </ul>
  {% endif %}
{% endfor %}