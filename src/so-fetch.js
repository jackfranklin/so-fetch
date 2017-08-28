import parseResponse from './parse-response'

class SoFetch {
  constructor(
    {
      requestInterceptors = [],
      responseInterceptors = [],
      rootUrl = () => '',
    } = {}
  ) {
    this.requestInterceptors = requestInterceptors
    this.responseInterceptors = responseInterceptors
    this.rootUrl = rootUrl
  }

  applyRequestInterceptors(options) {
    return this.requestInterceptors.reduce(
      (opts, interceptor) => {
        return interceptor(options)
      },
      { ...options }
    )
  }

  applyResponseInterceptors(response, config) {
    response.config = config
    return this.responseInterceptors.reduce((newResp, interceptor) => {
      return interceptor(newResp)
    }, response)
  }

  fetch(url, options = {}) {
    const fullUrl = this.rootUrl() + url
    const headers = new Headers(options.headers || {})

    const finalOpts = this.applyRequestInterceptors({
      method: 'GET',
      ...options,
      headers,
      url: fullUrl,
    })
    return fetch(finalOpts.url, finalOpts)
      .then(parseResponse)
      .then(resp => this.applyResponseInterceptors(resp, finalOpts))
      .then(resp => (resp.isError ? Promise.reject(resp) : resp))
  }

  post(url, postBody, options = {}) {
    const headers = new Headers(options.headers || {})
    headers.set('Content-Type', 'application/json')

    return this.fetch(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(postBody),
      headers,
    })
  }

  put(url, postBody, options = {}) {
    const headers = new Headers(options.headers || {})
    headers.set('Content-Type', 'application/json')

    return this.fetch(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(postBody),
      headers,
    })
  }
}

export default SoFetch
