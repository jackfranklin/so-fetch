import SoFetchResponse from './response'

export type RequestInterceptor = (
  config: IRequestInterceptorConfig,
) => IRequestInterceptorConfig
export type ResponseInterceptor<T> = (
  response: SoFetchResponse<T>,
) => SoFetchResponse<T>

export interface ISoFetchInitialisation<T> {
  requestInterceptors?: RequestInterceptor[]
  responseInterceptors?: Array<ResponseInterceptor<T>>
  rootUrl?: () => string
}

export interface IFetchOptions {
  headers?: {}
  body?: {}
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url?: string
}

export interface IRequestInterceptorConfig extends IFetchOptions {
  headers: Headers
}
