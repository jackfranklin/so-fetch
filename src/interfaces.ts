import SoFetchResponse from './response'

export type RequestInterceptor = (config: IFetchOptions) => IFetchOptions
export type ResponseInterceptor = (response: SoFetchResponse) => SoFetchResponse

export interface ISoFetchInitialisation {
  requestInterceptors?: RequestInterceptor[]
  responseInterceptors?: ResponseInterceptor[]
  rootUrl?: () => string
}

export interface IFetchOptions {
  headers?: {}
  body?: {}
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url?: string
}
