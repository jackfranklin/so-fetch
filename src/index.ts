import { SoFetchInitialisation } from './interfaces'

import SoFetch from './so-fetch'

const defaultClient = new SoFetch()

const defaultFetch = defaultClient.fetch.bind(defaultClient)

const newClient = (args: SoFetchInitialisation) => new SoFetch(args)

export { newClient }

export default defaultFetch
