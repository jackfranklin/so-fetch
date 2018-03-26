import * as fetchMock from 'fetch-mock'
import fetch, { makeFetchClient } from '../src/index'
import SoFetchResponse from './response'

interface IFakeDataResponse {
  name: string
}

describe('so-fetch', () => {
  it('makes requests with the default client', () => {
    fetchMock.getOnce('/foo', { body: { name: 'Jack' }, status: 200 })
    return fetch<IFakeDataResponse>('/foo').then(
      (response: SoFetchResponse<IFakeDataResponse>) => {
        expect(response.data!.name).toEqual('Jack')
      },
    )
  })

  it('can make a new client', () => {
    const client = makeFetchClient<IFakeDataResponse>({
      rootUrl: () => 'http://example.com',
    })

    fetchMock.getOnce('http://example.com/foo', {
      body: { name: 'Jack' },
      status: 200,
    })
    return client
      .fetch('/foo')
      .then((response: SoFetchResponse<IFakeDataResponse>) => {
        expect(response!.data!.name).toEqual('Jack')
      })
  })
})
