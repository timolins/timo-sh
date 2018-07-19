---
title: now-client
desc: A JavaScript wrapper for ZEIT's now API.
types: code
tags: JavaScript, API Wrapper, Open Source
date: 2016-05-14
slug: now-client
---

[now-client](https://github.com/zeit/now-client) is a tiny **JavaScript wrapper** for ZEIT's **now API**, to make interacting with it as simple as possible. It started off as a personal repo, then was named official after being transferred over to [ZEIT](https://github.com/zeit). It has been [deprecated](https://zeit.co/blog/api-2#the-future-of-now-client) since the release of [API 2](https://zeit.co/blog/api-2).

### Motivation

ZEIT's [now](https://zeit.co/now) is great, but back in the days, it was missing a visual interface to manage your deployments. Luckily at that time, they released an [API](https://zeit.co/api), which got me interested in building a Now desktop client.

While dabbling around with a proof of concept, I found it cumbersome to interact with the API directly. A wrapper seemed like a good solution to "dry" things up – so I decided to write [now-client](https://github.com/zeit/now-client). I didn't end up building the desktop app and most likely never will, since [Now Desktop](https://zeit.co/download) is fantastic already. But hey, early versions of Now Desktop were based on now-client, so I guess everything went as planned.
