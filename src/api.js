const prefix = 'http://localhost:3001'
const headers = { 'Content-Type': 'application/json' }

function api(url, options = {}) {
  const params = { ...options, headers }

  if (options.body) {
    params.body = JSON.stringify(options.body)
  }

  return window.fetch(prefix + url, params).then((response) => response.json())
}

export default api
