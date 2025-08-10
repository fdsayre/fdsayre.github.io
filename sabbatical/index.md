---
title: Sabbatical
layout: default
permalink: /sabbatical/
---

<h1>Sabbatical</h1>
<ul>
  {%- assign sab_posts = site.posts | where_exp: "p", "p.categories contains 'sabbatical'" -%}
  {%- for p in sab_posts -%}
    <li>
      <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
      <small>— {{ p.date | date: "%Y-%m-%d" }}</small>
      {%- if p.tags and p.tags.size > 0 -%}
        <br><small>Tags:
          {%- for t in p.tags -%}
            <a href="{{ '/sabbatical/tags/#' | append: t | relative_url }}">{{ t }}</a>{% unless forloop.last %}, {% endunless %}
          {%- endfor -%}
        </small>
      {%- endif -%}
    </li>
  {%- endfor -%}
</ul>