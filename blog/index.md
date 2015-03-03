---
layout: page_no_sidebar
title: Blog
description: Read about our quest for the holy data grail.
---

<div class="home">
  {% for post in site.posts %}
  <div class="row post-summary">
    <div class="col-md-4">
      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
        <span class="post-meta">Posted <abbr class="timeago"
                                             title="{{post.date}}">{{post.date}}</abbr> by {{post.author}}</span>
    </div>
    <div class="col-md-8 post-excerpt">
      {{post.excerpt}}
    </div>
  </div>
  {% endfor %}
</div>