import { ISoFetchInitialisation } from './interfaces'

import SoFetchResponse from './response'
import SoFetch from './so-fetch'

export interface IDefaultFetchResponse {
  [x: string]: any
}

type DefaultFetchType = Promise<SoFetchResponse<IDefaultFetchResponse>>

const defaultClient = new SoFetch<IDefaultFetchResponse>()

const defaultFetch = (...args: any[]): DefaultFetchType =>
  defaultClient.fetch.apply(defaultClient, args)

const makeFetchClient = <T>(args: ISoFetchInitialisation<T>): SoFetch<T> =>
  new SoFetch<T>(args)

export { makeFetchClient, SoFetchResponse }

export default defaultFetch
