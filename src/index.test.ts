import * as fetchMock from 'fetch-mock'
import fetch, { makeFetchClient } from '../src/index'
import SoFetchResponse from './response'

describe('so-fetch', () => {
  it('makes requests with the default client', () => {
    fetchMock.getOnce('/foo', { body: { name: 'Jack' }, status: 200 })
    return fetch('/foo').then((response: SoFetchResponse) => {
      expect(response.data!.name).toEqual('Jack')
    })
  })

  it('can make a new client', () => {
    const client = makeFetchClient({
      rootUrl: () => 'http://example.com',
    })

    fetchMock.getOnce('http://example.com/foo', {
      body: { name: 'Jack' },
      status: 200,
    })
    return client.fetch('/foo').then((response: SoFetchResponse) => {
      expect(response!.data!.name).toEqual('Jack')
    })
  })
})
