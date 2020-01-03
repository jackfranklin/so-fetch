import * as fetchMock from 'fetch-mock'
import SoFetch from '../src/so-fetch'

describe('SoFetch', () => {
  describe('errors', () => {
    it('rejects with the response when an error occurs', () => {
      const client = new SoFetch<any>({})
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
      const client = new SoFetch<any>({})
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
      const client = new SoFetch<any>({
        requestInterceptors: [
          config => {
            config.headers = new Headers({
              SomeRandomHeader: 'foo',
            })
            return config
          },
        ],
      })
      fetchMock.getOnce('/fanclub', {
        status: 200,
        headers: {
          SomeRandomHeader: 'foo',
        },
      })

      return client.fetch('/fanclub').catch(fail)
    })

    it('can have async request interceptors', async () => {
      const client = new SoFetch<any>({
        requestInterceptors: [
          async config => {
            config.headers = await new Headers({
              SomeRandomHeader: 'foo',
            })
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

    it('can have multiple async request interceptors', () => {
      const client = new SoFetch<any>({
        requestInterceptors: [
          async config => {
            config.headers = await new Headers({
              SomeRandomHeader: 'foo',
            })
            return config
          },
          async config => {
            const headerData = await config.headers.get('SomeRandomHeader')
            config.headers.set('AnotherHeader', `${headerData}Bar`)
            return config
          },
        ],
      })
      fetchMock.getOnce('/fanclub', 200, {
        headers: {
          SomeRandomHeader: 'foo',
          AnotherHeader: 'fooBar',
        },
      })

      return client.fetch('/fanclub').catch(fail)
    })

    it('passes an empty headers obj if there are none', () => {
      const client = new SoFetch<any>({
        requestInterceptors: [
          config => {
            if (config.headers) {
              config.headers.set('SomeRandomHeader', 'foo')
            }
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

      const client = new SoFetch<any>({
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

    it('can have multiple async response interceptors', () => {
      const myAsyncFn = (data: any) => Promise.resolve(data)
      const client = new SoFetch<any>({
        responseInterceptors: [
          async response => {
            // @ts-ignore
            response.myCustomData = await myAsyncFn('first')
            return response
          },
          async response => {
            // @ts-ignore
            response.myCustomData2 = await myAsyncFn(
              // @ts-ignore
              `${response.myCustomData}Second`,
            )
            return response
          },
        ],
      })
      fetchMock.getOnce('/fanclub', 200)

      return client.fetch('/fanclub').then(response => {
        // @ts-ignore
        expect(response.myCustomData).toBe('first')
        // @ts-ignore
        expect(response.myCustomData2).toBe('firstSecond')
      })
    })

    it('gives response interceptors the final config', () => {
      const spy = jest.fn()

      const client = new SoFetch<any>({
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
      const client = new SoFetch<any>()

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
      const client = new SoFetch<any>()

      fetchMock.once(
        (url, request) => {
          if (request.method === 'POST' && url === '/fanclub') {
            expect((request.headers as Headers).get('Content-Type')).toEqual(
              'application/json',
            )
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
