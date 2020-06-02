module.exports = function (data, trim, name) {

  var svgDoctype = '<?xml version="1.0" standalone="no"?>\n'
  // If data is an element, convert to string
  var svgString = (data instanceof Element) ? (new XMLSerializer()).serializeToString(data) : data
  var filename = (typeof name === 'undefined') ? (Date.now() + '.svg') : name

  if (typeof trim !== 'undefined' && Number.isInteger(trim)) {
    svgString = svgString.replace(/([+]?\d*\.\d{3,}([eE][+]?\d+)?)/g, function (x) {
      return (+x).toFixed(trim)
    })
  }

  // remove Vue's data-v attributes
  svgString = svgString.replace(/ data-v-([0-9a-z]){8}=""/g, function () {
    return ''
  })

  var blob = new Blob([svgDoctype + svgString], { type: 'image/svg+xml;charset=utf-8' })

  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename)
  }
  else {
    var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
    var tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }

    document.body.appendChild(tempLink)
    tempLink.click()

    // Fixes "webkit blob resource error 1"
    setTimeout(function () {
      document.body.removeChild(tempLink)
      window.URL.revokeObjectURL(blobURL)
    }, 200)
  }
}
