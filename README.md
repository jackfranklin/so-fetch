# so-fetch

A small wrapper around the fetch API with some additional behaviours.

## Installation

Install this module with npm or yarn.

```bash
yarn add so-fetch-js
npm install so-fetch-js
```

This module is designed to be consumed via a build tool such as Webpack. There is no UMD build available.

You will also need to provide your own polyfill for the `fetch` API if you're working in older browsers. [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) is recommended. `so-fetch` __does not provide a `fetch` polyfill__.

`so-fetch` also assumes that `Object.assign` is available. You can use [core-js](https://github.com/zloirock/core-js) but you can also use [es6-object-assign](https://www.npmjs.com/package/es6-object-assign) or any other solution.

### Differences to `fetch`

`so-fetch` has some slightly different behaviours to the native `fetch` API:

- It assumes JSON responses, so it calls `.json()` on the response for you. If you are not regularly using JSON, `so-fetch` is not for you.
- Although it parses the response as JSON, it resolves with the full `Response` object. To access the body you should call the `.data` key:

    ```js
    import fetch from 'so-fetch-js'

    fetch('/users').then(response => {
      console.log(response.data) // the response body, parsed to a JS object
    })
    ```

- Unlike `fetch`, `so-fetch` will reject any response that does not have a `2XX` status code. When this happens, you can still read the JSON response using `.data`:

    ```js
    import fetch from 'so-fetch-js'

    fetch('/users').then(response => {
      ...
    }, errorResponse => {
      console.log(respones.data) // response body still, even though the request failed
    })
    ```

## Basic Usage

You can just import and start using `so-fetch`:

```js
import fetch from 'so-fetch-js'

fetch('http://example.com/api').then(response => ...)
```

To use `so-fetch`'s more advanced features, you will need to create clients.

## Full Usage

To use so-fetch, you should first import it and instantiate a new client:

```js
import fetch from 'so-fetch-js'
const apiClient = fetch.makeClient({
  ...
})
```

The `makeClient` call takes three options:

- `requestInterceptors: []`: an array of request interceptors. See below for documentation for interceptors.
- `responseInterceptors: []`: an array of response interceptors. See below for documentation for interceptors.
- `rootUrl: () => ''`: a function that returns a string that makes up your base URL. Normally this will just return a static string: `rootUrl: () => 'http://api.com'`.

### Making Requests with a client

Once you have created a client, you have an object with methods that you can call.

The main method provided by the client is `fetch`:

```js
const apiClient = fetch.newClient({
  rootUrl: () => 'http://api.com',
})

apiClient.fetch('/users') => GET http://api.com/users
```

The `fetch` method mirrors the native API; it also takes an optional second argument which is an object to configure your request, such as headers:

```js
apiClient.fetch('/users', {
  headers: {
    'Foo-Header': 'Bar',
  },
})
```

You can also use it to override the method used:

```js
apiClient.fetch('/users', {
  method: 'POST',
})
```

However, if you're going to do that, you should consider using the `post` or `put` method. These make POST or PUT requests, but also take an argument for the body that you want to send with the request:

```js
apiClient.post('/users', {
  name: 'Jack',
})
// POST /users with a JSON body of { name: 'Jack' }
```

The api client assumes you're using JSON - the body is passed through `JSON.stringify` and the `Content-Type` header is set to `application/json`. If you don't want these defaults, you can use the `fetch` method and configure the entire request.

### Interceptors

Interceptors can act on the configuration for a request and change it in someway before allowing the request to be made. A common use case for this is adding an API header, or a header that changes based on some value that you don't know when initialising the client. For example, this interceptor adds a header based on a value in local storage:

```js
const addHeader = config => {
  config.headers['Special-Header'] = localStorage.getItem('special-header')
  return config
}

const client = fetch.newClient({
  requestInterceptors: [
    addHeader,
  ],
})
```

A request interceptor gets called with a `config` object which contains the method, headers, URL and any other options that you can pass to `fetch`. It should return the configuration object.

A response interceptor works on the response object that is returned from the request. For example, you might want to pull a header off the response and store it in local storage:

```js
const saveHeader = response => {
  localStorage.saveItem('foo', response.headers.get('Some-Header'))
  return response
}

const client = fetch.newClient({
  responseInterceptors: [
    saveHeader,
  ],
})
```

It's important to note that `response.headers` _is not a plain JS object_, but it is an instance of [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers), because this is what the `fetch` API uses.

An api client can have as many request and response interceptors as you like. They will be executed in the order they are passed when you create the client:

```js
const client = fetch.newClient({
  requestInterceptors: [
    a, // executed first
    b,
    c,
  ],
  responseInterceptors: [
    d, // executed first
    e,
    f,
  ]
})
```


## Contributing

We welcome any contributions. Before embarking on a big piece of work it's a good idea to open an issue to discuss your idea and proposed solution.

To work on this project:

- Fork this repository
- `git clone` to your machine
- `yarn install` to install all the dependencies.
- `yarn test:watch` to run the tests in watch mode. They will rerun as you make changes.
- Run `yarn run lint` to run ESLint against the `src` and `spec` directory.
