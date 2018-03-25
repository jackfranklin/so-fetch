// TODO: fix these anys
export type RequestInterceptor = (config: any) => any
export type ResponseInterceptor = (config: any) => any

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
