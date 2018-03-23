import SoFetch from '../src/so-fetch'
import * as fetchMock from 'fetch-mock'

describe('SoFetch', () => {
  describe('errors', () => {
    it('rejects with the response when an error occurs', () => {
      const client = new SoFetch({})
      fetchMock.getOnce('/fanclub', 404)
      return client
        .fetch('/fanclub')
        .then(fail)
        .catch(response => {
          expect(response.statusText).toEqual('Not Found')
          expect(response.status).toEqual(404)
        })
    })

    it('parses any JSON', () => {
      const client = new SoFetch({})
      fetchMock.getOnce('/fanclub', {
        status: 404,
        body: { error: 'It went wrong' },
      })

      return client
        .fetch('/fanclub')
        .then(fail)
        .catch(response => {
          expect(response.data).toEqual({ error: 'It went wrong' })
        })
    })
  })

  describe('request interceptors', () => {
    it('can have request interceptors', () => {
      const client = new SoFetch({
        requestInterceptors: [
          config => {
            config.headers = {
              SomeRandomHeader: 'foo',
            }
            return config
          },
        ],
      })
      fetchMock.getOnce('/fanclub', 200, {
        headers: {
          SomeRandomHeader: 'foo',
        },
      })

      return client.fetch('/fanclub').catch(fail)
    })

    it('passes an empty headers obj if there are none', () => {
      const client = new SoFetch({
        requestInterceptors: [
          config => {
            config.headers.set('SomeRandomHeader', 'foo')
            return config
          },
        ],
      })

      fetchMock.getOnce('/fanclub', 200)

      return expect(client.fetch('/fanclub')).resolves.toEqual(
        expect.anything(),
      )
    })
  })

  describe('response interceptors', () => {
    it('can have response interceptors', () => {
      const spy = jest.fn()

      const client = new SoFetch({
        responseInterceptors: [
          response => {
            spy('foo')
            return response
          },
        ],
      })
      fetchMock.getOnce('/fanclub', 200)

      return client.fetch('/fanclub').then(() => {
        expect(spy).toHaveBeenCalledWith('foo')
      })
    })

    it('gives response interceptors the final config', () => {
      const spy = jest.fn()

      const client = new SoFetch({
        responseInterceptors: [
          response => {
            spy(response.config)
            return response
          },
        ],
      })
      fetchMock.getOnce('/fanclub', 200)

      return client.fetch('/fanclub', { headers: { foo: 'bar' } }).then(() => {
        expect(spy).toHaveBeenCalledWith({
          url: '/fanclub',
          headers: new Headers({ foo: 'bar' }),
          method: 'GET',
        })
      })
    })
  })

  describe('fetch', () => {
    it('returns the original response with an extra data property', () => {
      const client = new SoFetch()

      fetchMock.getOnce('/fanclub', {
        status: 200,
        body: { name: 'Kanye West' },
      })

      return client.fetch('/fanclub').then(resp => {
        expect(resp.data).toEqual({ name: 'Kanye West' })
        expect(resp.status).toEqual(200)
      })
    })
  })

  describe('post', () => {
    it('posts the JSON with the right headers', () => {
      const client = new SoFetch()

      fetchMock.once(
        (url, request) => {
          if (request.method === 'POST' && url === '/fanclub') {
            expect(request.headers.get('Content-Type')).toEqual(
              'application/json',
            )
            expect(request.body).toEqual(JSON.stringify({ name: 'Kanye West' }))
            return true
          }
          return false
        },
        {
          status: 200,
        },
      )

      return client.post('/fanclub', { name: 'Kanye West' }).then(resp => {
        expect(resp.status).toEqual(200)
      })
    })
  })
})
