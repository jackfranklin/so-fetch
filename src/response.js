const copyResponseKeysToSelf = (klass, response) => {
  const properties = [
    'url',
    'useFinalURL',
    'url',
    'type',
    'statusText',
    'status',
    'redirected',
    'ok',
    'headers',
    'bodyUsed',
    'config',
  ]

  properties.forEach(prop => {
    klass[prop] = response[prop]
  })
}

class SoFetchResponse {
  constructor(response, jsonData) {
    copyResponseKeysToSelf(this, response)

    this.data = jsonData
    this.isError = this.status < 200 || this.status >= 400
  }
}

export default SoFetchResponse
