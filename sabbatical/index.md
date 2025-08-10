---
layout: default
title: Sabbatical
permalink: /sabbatical/
---
<h1>Sabbatical</h1>

<ul>
{% assign entries = site.sabbatical | sort: "date" | reverse %}
{% for item in entries %}
  <li>
    <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
    <small>— {{ item.date | date: "%Y-%m-%d" }}</small>
    {% if item.tags and item.tags.size > 0 %}
      <br><small>Tags: 
        {% for t in item.tags %}
          <a href="{{ '/sabbatical/tags/#' | append: t | relative_url }}">{{ t }}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      </small>
    {% endif %}
  </li>
{% endfor %}
</ul>