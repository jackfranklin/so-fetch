import { ISoFetchInitialisation } from './interfaces'

import SoFetchResponse from './response'
import SoFetch from './so-fetch'

const defaultClient = new SoFetch()

// const defaultFetch = defaultClient.fetch.bind(defaultClient)
const defaultFetch = (...args: any[]): Promise<SoFetchResponse> =>
  defaultClient.fetch.apply(defaultClient, args)

const makeFetchClient = (args: ISoFetchInitialisation): SoFetch =>
  new SoFetch(args)

export { makeFetchClient }

export default defaultFetch
