import SoFetchResponse from './response'

const parseResponse = <T>(response: Response): Promise<SoFetchResponse<T>> => {
  return (
    response
      .json()
      // assume there is JSON, but catch error if the response has no JSON
      .then((data: T) => data, () => undefined)
      .then(jsonData => {
        return new SoFetchResponse<T>(response, jsonData)
      })
  )
}

export default parseResponse
