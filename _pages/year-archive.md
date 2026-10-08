---
title: Posts
permalink: /posts/
layout: archive
author_profile: true
---

Browse everything I've written here, or narrow the list by year, tag or type.

{% assign archive_posts = site.posts | where_exp: "item", "item.hidden != true" %}

<div class="post-filters" data-post-filters hidden>
  <div class="post-filters__field">
    <label for="posts-year">Year</label>
    <select id="posts-year" name="year">
      <option value="">All years</option>
    </select>
  </div>
  <div class="post-filters__field">
    <label for="posts-tag">Tag</label>
    <select id="posts-tag" name="tag">
      <option value="">All tags</option>
    </select>
  </div>
  <div class="post-filters__field">
    <label for="posts-type">Type</label>
    <select id="posts-type" name="type">
      <option value="">All types</option>
      <option value="weeknotes">Weeknotes</option>
      <option value="other">Other posts</option>
    </select>
  </div>
  <button class="btn btn--primary post-filters__reset" type="button" id="posts-reset">Clear filters</button>
</div>

<p class="post-filters__count" id="posts-count" role="status" aria-live="polite">{{ archive_posts.size }} posts</p>
<p id="posts-empty" hidden>No posts match those filters. <button type="button" class="post-filters__clear-link" id="posts-reset-empty">Clear filters</button></p>

<div class="entries-list" id="posts-list">
{% for post in archive_posts %}
  <div class="post-filters__item" data-year="{{ post.date | date: '%Y' }}" data-tags="{{ post.tags | jsonify | escape }}" data-type="{% if post.categories contains 'weekNotes' %}weeknotes{% else %}other{% endif %}">
    {% include archive-single.html type='list' %}
  </div>
{% endfor %}
</div>

<script defer src="{{ '/assets/js/posts-filter.js' | relative_url }}"></script>
