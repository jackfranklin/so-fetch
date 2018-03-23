import fetch from '../src/index'
import * as fetchMock from 'fetch-mock'

describe('so-fetch', () => {
  it('makes requests with the default client', () => {
    fetchMock.getOnce('/foo', { body: { name: 'Jack' }, status: 200 })
    return fetch('/foo')
      .catch(fail)
      .then(response => {
        expect(response.data.name).toEqual('Jack')
      })
  })

  it('can make a new client', () => {
    const client = fetch.newClient({
      rootUrl: () => 'http://example.com',
    })

    fetchMock.getOnce('http://example.com/foo', {
      body: { name: 'Jack' },
      status: 200,
    })
    return client
      .fetch('/foo')
      .catch(fail)
      .then(response => {
        expect(response.data.name).toEqual('Jack')
      })
  })
})
