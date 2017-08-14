import SoFetch from './so-fetch'

const defaultClient = new SoFetch()

const defaultFetch = defaultClient.fetch.bind(defaultClient)

defaultFetch.newClient = args => new SoFetch(args)

export default defaultFetch
