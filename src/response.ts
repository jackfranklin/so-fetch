import { IFetchOptions } from './interfaces'

class SoFetchResponse {
  public readonly data?: {
    [x: string]: any
  }
  public readonly isError: boolean
  public readonly body: ReadableStream | null
  public readonly headers: Headers
  public readonly ok: boolean
  public readonly status: number
  public readonly statusText: string
  public readonly type: string
  public readonly url: string
  public config?: IFetchOptions

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
