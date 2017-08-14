const parseResponse = response => {
  return (
    response
      .json()
      // assume there is JSON, but catch error if the response has no JSON
      .then(data => data, () => undefined)
      .then(jsonData => {
        response.data = jsonData
        response.__error = response.status < 200 || response.status >= 400

        return response
      })
  )
}

export default parseResponse
