import SoFetchResponse from './response'

const parseResponse = (response: Response): Promise<SoFetchResponse> => {
  return (
    response
      .json()
      // assume there is JSON, but catch error if the response has no JSON
      .then((data: {}) => data, () => undefined)
      .then(jsonData => {
        return new SoFetchResponse(response, jsonData)
      })
  )
}

export default parseResponse
