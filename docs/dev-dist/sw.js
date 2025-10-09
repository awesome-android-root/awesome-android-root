/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-edafb35b'], (function (workbox) { 'use strict';

  workbox.enable();
  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "suppress-warnings.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }], {
    "ignoreURLParametersMatching": [/^utm_/, /^fbclid$/, /^gclid$/]
  });
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(({
    request,
    url
  }) => request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/"), new workbox.NetworkFirst({
    "cacheName": "pages-runtime",
    "networkTimeoutSeconds": 3,
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 21600,
      purgeOnQuotaError: true
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    }), {
      handlerDidError: async () => caches.match("/offline.html") || Response.error()
    }]
  }), 'GET');
  workbox.registerRoute(({
    request,
    url
  }) => request.destination === "script" || request.destination === "style" || /\.(js|css)$/.test(url.pathname), new workbox.StaleWhileRevalidate({
    "cacheName": "assets-runtime",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 21600,
      purgeOnQuotaError: true
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(({
    request,
    url
  }) => request.destination === "image" || /\.(png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname), new workbox.CacheFirst({
    "cacheName": "images-runtime",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 200,
      maxAgeSeconds: 604800,
      purgeOnQuotaError: true
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(({
    request,
    url
  }) => request.destination === "font" || /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname), new workbox.CacheFirst({
    "cacheName": "fonts-runtime",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 604800
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(({
    url
  }) => url.origin === "https://img.shields.io", new workbox.StaleWhileRevalidate({
    "cacheName": "external-runtime",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 21600,
      purgeOnQuotaError: true
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(({
    url
  }) => url.origin === "https://github.com" || url.origin === "https://avatars.githubusercontent.com", new workbox.CacheFirst({
    "cacheName": "github-assets",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 518400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
