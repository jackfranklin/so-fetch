require('es6-promise').polyfill()
require('es6-object-assign').polyfill()

// use require here because imports are hosted
// and the order here is important
const soFetch = require('./index')

export default soFetch
