import SoFetchResponse from './response'

export type RequestInterceptor = (
  config: IRequestInterceptorConfig,
) => IRequestInterceptorConfig | Promise<IRequestInterceptorConfig>

export type ResponseInterceptor<T> = (
  response: SoFetchResponse<T>,
) => SoFetchResponse<T> | Promise<SoFetchResponse<T>>

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
  mode?: 'cors' | 'no-cors' | 'same-origin'
  cache?: 'no-cache' | 'default' | 'reload' | 'force-cache' | 'only-if-cached'
  credentials?: 'same-origin' | 'include' | 'omit'
  redirect?: 'follow' | 'manual' | 'error'
  referrer?: 'no-referrer' | 'client'
}

export interface IRequestInterceptorConfig extends IFetchOptions {
  headers: Headers
}
