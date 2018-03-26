import { ISoFetchInitialisation } from './interfaces'

import SoFetchResponse from './response'
import SoFetch from './so-fetch'

const defaultClient = new SoFetch()

// const defaultFetch = defaultClient.fetch.bind(defaultClient)
const defaultFetch = <T>(...args: any[]): Promise<SoFetchResponse<T>> =>
  defaultClient.fetch.apply(defaultClient, args)

const makeFetchClient = <T>(args: ISoFetchInitialisation<T>): SoFetch<T> =>
  new SoFetch<T>(args)

export { makeFetchClient, SoFetchResponse }

export default defaultFetch
