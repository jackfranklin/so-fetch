import { IFetchOptions, ISoFetchInitialisation } from './interfaces'

import SoFetchResponse from './response'
import SoFetch from './so-fetch'

export interface IDefaultFetchResponse {
  [x: string]: any
}

const defaultClient = new SoFetch<IDefaultFetchResponse>()

const defaultFetch = <T = IDefaultFetchResponse>(
  url: string,
  options: IFetchOptions = {},
): Promise<SoFetchResponse<T>> => new SoFetch<T>({}).fetch(url, options)

const makeFetchClient = <T>(args: ISoFetchInitialisation<T>): SoFetch<T> =>
  new SoFetch<T>(args)

export { makeFetchClient, SoFetchResponse }

export default defaultFetch
