import parseResponse from './parse-response'
import {
  RequestInterceptor,
  ResponseInterceptor,
  SoFetchInitialisation,
  FetchOptions,
} from './interfaces'
import SoFetchResponse from './response'

class SoFetch {
  requestInterceptors: RequestInterceptor[]
  responseInterceptors: ResponseInterceptor[]
  rootUrl: () => string

  constructor({
    requestInterceptors = [],
    responseInterceptors = [],
    rootUrl = () => '',
  }: SoFetchInitialisation = {}) {
    this.requestInterceptors = requestInterceptors
    this.responseInterceptors = responseInterceptors
    this.rootUrl = rootUrl
  }

  applyRequestInterceptors(options: FetchOptions): FetchOptions {
    return this.requestInterceptors.reduce(
      (opts, interceptor) => {
        return interceptor(options)
      },
      { ...options },
    )
  }

  applyResponseInterceptors(
    response: SoFetchResponse,
    config: FetchOptions,
  ): SoFetchResponse {
    // chuck the config onto the response so we can get at it later
    response.config = config
    return this.responseInterceptors.reduce((newResp, interceptor) => {
      return interceptor(newResp)
    }, response)
  }

  fetch(url: string, options: FetchOptions = {}): Promise<SoFetchResponse> {
    const fullUrl = this.rootUrl() + url
    const headers = new Headers(options.headers || {})

    const finalOpts = this.applyRequestInterceptors({
      method: 'GET',
      ...options,
      headers,
      url: fullUrl,
    })
    return fetch(fullUrl, finalOpts as RequestInit)
      .then(parseResponse)
      .then(resp => this.applyResponseInterceptors(resp, finalOpts))
      .then(resp => {
        if (resp.isError) {
          throw resp
        } else {
          return resp
        }
      })
  }

  post(
    url: string,
    postBody?: {},
    options?: FetchOptions,
  ): Promise<SoFetchResponse> {
    const headers = new Headers((options && options.headers) || {})
    headers.set('Content-Type', 'application/json')

    return this.fetch(url, {
      method: 'POST',
      ...options,
      headers,
      body: postBody ? JSON.stringify(postBody) : undefined,
    })
  }

  put(
    url: string,
    postBody?: {},
    options?: FetchOptions,
  ): Promise<SoFetchResponse> {
    const headers = new Headers((options && options.headers) || {})
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
