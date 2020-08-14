const buildHash = 'REPLACE_ME'

const searchInit = async endpoint => {
  const search = new JsSearch.Search('id')
  let data

  const tryParse = jsonString => {
    try {
      return JSON.parse(jsonString)
    } catch {
      return null
    }
  }

  // TODO: Use indexedDB

  if (
    localStorage.getItem('__siteBuildHash') !== buildHash ||
    (data = tryParse(localStorage.getItem('__siteContent'))) === null ||
    location.hostname === 'localhost'
  ) {
    data = await fetch(endpoint).then(r => r.json())
    localStorage.setItem('__siteContent', JSON.stringify(data))
    localStorage.setItem('__siteBuildHash', buildHash)
  }

  search.addIndex('title')
  search.addIndex('summary')
  search.addDocuments(data)
  window.searchPosts = search.search.bind(search)
  if (window._searchPostReady) {
    window._searchPostReady()
  }
}
