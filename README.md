# include.js
Fetches and includes an external HTML fragment

## Install
### yarn
```shell
yarn add andrewmcwatters/include.js#v1.4.10
```

## Usage
```html
<ANY
  data-include="string">
</ANY>
```

### Arguments
| Param        | Type     | Details |
| ------------ | -------- | ------- |
| data-include | `string` | URL     |

## Events
### includecontentrequested
Dispatched every time the data-include content is requested.

#### Target
the element data-include was declared in

### Parameters
| Param | Type     | Details                 |
| ----- | -------- | ----------------------- |
| src   | `string` | URL of content to load. |

### includecontentloaded
Dispatched every time the data-include content is reloaded.

#### Target
the current data-include element

### Parameters
| Param | Type     | Details                 |
| ----- | -------- | ----------------------- |
| src   | `string` | URL of content to load. |

### includecontenterror
Dispatched when a template HTTP request yields an erroneous response (status < 200 || status > 299)

#### Target
the element data-include was declared in

### Parameters
| Param | Type     | Details                 |
| ----- | -------- | ----------------------- |
| src   | `string` | URL of content to load. |

## License
MIT License

Copyright (c) 2017 Andrew McWatters

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
