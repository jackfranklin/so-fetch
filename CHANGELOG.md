# 0.4.0

* Rewrote in TypeScript! Types are published, so if you're using TypeScript you should be able to take advantage of them.
* **Breaking change**: rather than call `fetch.newClient`, you now `import { makeFetchClient } from 'so-fetch-js'`.

# 0.3.0

* remove polyfill version
* Change responses to be `SoFetchResponse` and add `.data` and `.isError` onto them.

# 0.2.1

* provide `so-fetch-js/lib/polyfill` that contains `Object.assign` and `fetch` polyfills

# 0.2.0

* include a UMD build and use rollups for all builds - [PR](https://github.com/jackfranklin/so-fetch/pull/10) by @RusinovAnton
* don't publish `*.test.js` files in the prod build - [PR](https://github.com/jackfranklin/so-fetch/pull/4) by @RusinovAnton

## 0.1.0

* first release
