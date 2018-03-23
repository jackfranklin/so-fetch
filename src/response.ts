import { FetchOptions } from './interfaces'

class SoFetchResponse {
  readonly data?: {
    [x: string]: any
  }
  readonly isError: boolean
  readonly body: ReadableStream | null
  readonly headers: Headers
  readonly ok: boolean
  readonly status: number
  readonly statusText: string
  readonly type: string
  readonly url: string
  config?: FetchOptions

  constructor(response: Response, jsonData?: {}) {
    this.body = response.body
    this.data = jsonData
    this.headers = response.headers
    this.ok = response.ok
    this.status = response.status
    this.statusText = response.statusText
    this.type = response.type
    this.url = response.url

    this.isError = this.status < 200 || this.status >= 400
  }
}

export default SoFetchResponse
