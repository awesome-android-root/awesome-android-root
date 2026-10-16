---
title: Privacy
description: "How the Awesome Android Root documentation site handles data: Cloudflare request logs, no analytics or ads, local browser search, and offline caching."
search: false
---

# Privacy

This page describes privacy-related behavior of the Awesome Android Root documentation website. The site is a public documentation resource; it does not provide user accounts, comments, payments, or a contact form. Questions about this notice can be raised through the project's [GitHub issue tracker](https://github.com/awesome-android-root/awesome-android-root/issues/new). Do not post private or sensitive information in a public issue.

## Information handled when you visit

The site is delivered as a static website through Cloudflare Pages. A web request necessarily includes technical information such as the requested URL, network address, browser headers, and time of the request. Cloudflare processes requests to deliver and protect the site and may process or retain technical logs under its own terms and privacy documentation. The project does not control Cloudflare's infrastructure-level retention practices; consult [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/) for its terms.

The repository does not configure a first-party analytics or advertising service. The site search runs in your browser against a locally downloaded search index. Following external links, including links to GitHub and third-party projects, takes you to services governed by their own privacy policies.

## Browser storage and offline support

The VitePress theme stores your appearance preference in browser storage so the selected light, dark, or automatic theme can persist between visits. The site also registers a service worker for progressive web app support. It can cache static images and site assets in your browser to improve repeat visits and offline behavior. You can clear this data through your browser's site-data controls or remove the service worker using the browser's developer tools.

## Changes to this notice

Site features and hosting arrangements can change. This notice should be updated when the repository adds data collection, analytics, forms, accounts, or other behavior that materially changes the information described above. The publication date and current implementation are not a promise that third-party infrastructure never changes its own practices.
