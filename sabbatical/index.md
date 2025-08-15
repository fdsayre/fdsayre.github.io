---
title: Making in the Chthulucene
layout: default
permalink: /sabbatical/
---

{%- comment -%}
Pick the “hero” post by path (explicit) or by most recent sabbatical post.
{%- endcomment -%}

{%- assign hero = site.posts | where: "path", "_posts/2025-08-15-a-carrier-bag-sabbatical.md" | first -%}
{%- if hero == nil -%}
  {%- assign hero = site.posts | where_exp: "p","p.categories contains 'sabbatical'" | sort: "date" | last -%}
{%- endif -%}

{%- if hero -%}
  <h1 class="page__title">{{ hero.title }}</h1>
  <div class="page__content">
    {{ hero.excerpt }}
    <p><a href="{{ hero.url | relative_url }}">Read the full post →</a></p>
  </div>
  <hr>
{%- endif -%}

<h2>All sabbatical posts</h2>
<ul>
{%- assign sab_posts = site.posts | where_exp: "p","p.categories contains 'sabbatical'" | sort: "date" | reverse -%}
{%- for p in sab_posts -%}
  <li>
    <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
    <small>— {{ p.date | date: "%Y-%m-%d" }}</small>
  </li>
{%- endfor -%}
</ul>