# Javascript SVG File Downloader

Javascript function to trigger browser to save SVG to file as if it was downloaded.

The function takes in SVG DOM element or SVG string, optionally optimizes the SVG (by trimming decimals) and invokes download by the browser.

# Installation

`npm install svg-file-downloader --save`

# Usage

```js
var fileDownload = require('svg-file-downloader');
fileDownload(SVGElement, trim, 'filename.svg');
```

This package is a function with the following signature:
```
function (data, trim, name, removeVueAttrs)
```

Where

* **data** is your SVG DOM Element or SVG string
* **trim** (false by default, integer otherwise) if you want to trim decimals within SVG (reduces file size)
* **name** is desired filename of the file (for example, `somefile.svg`), will be automatically generated if left blank
* **removeVueAttrs** (false by default) if set to true, will remove `v-data` Vue data attributes within the SVG

# License

MIT Licensed.


