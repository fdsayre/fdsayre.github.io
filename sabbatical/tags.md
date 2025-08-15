---
title: Tags
layout: default
permalink: /sabbatical/tags/
---

{% comment %} collect tags only from sabbatical posts {% endcomment %}
{% assign sab_posts = site.posts | where_exp: "p", "p.categories contains 'sabbatical'" %}
{% assign all_tags = sab_posts | map: "tags" | join: "," | split: "," | uniq | sort %}

<p>
  {% for tag in all_tags %}
    <a href="#{{ tag | uri_escape }}">{{ tag }}</a>{% unless forloop.last %} · {% endunless %}
  {% endfor %}
</p>

{% for tag in all_tags %}
  <h2 id="{{ tag | uri_escape }}">{{ tag }}</h2>
  <ul>
  {% assign tagged = sab_posts | where_exp: "p","p.tags contains tag" | sort: "date" | reverse %}
  {% for p in tagged %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a> <small>({{ p.date | date: "%Y-%m-%d" }})</small></li>
  {% endfor %}
  </ul>
{% endfor %}