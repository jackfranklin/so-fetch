export type RequestInterceptor = (config: any) => any
export type ResponseInterceptor = (config: any) => any

export interface SoFetchInitialisation {
  requestInterceptors?: Array<RequestInterceptor>
  responseInterceptors?: Array<ResponseInterceptor>
  rootUrl?: () => string
}

export interface FetchOptions {
  headers?: {}
  body?: {}
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url?: string
}
