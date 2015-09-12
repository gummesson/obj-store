# obj-store

[![NPM version][npm-img]][npm-url]
[![License][license-img]][license-url]
[![Build status][travis-img]][travis-url]

An observable array or object datastore.

## Installation

```
npm install obj-store
```

## Usage

### Object

``` javascript
var Store = require('obj-store')
var store = new Store({
  foo: 'bar'
})

store.on('set', function(key, val) {
  console.log(key, val) // => "baz" "qux"
})

store.set('baz', 'qux')

store.get('foo') // => "bar"
store.get()      // => { foo: 'bar', baz: 'qux' }

store.on('del', function(key, val) {
  console.log(key, val) // => "foo" "bar"
})

store.del('foo')

store.on('close', function(data) {
  console.log(data) // => { baz: 'qux' }
})

store.close()
```

### Array

``` javascript
var Store = require('obj-store')
var store = new Store(['foo'])

store.on('set', function(key, val) {
  console.log(key, val) // => 1 "bar"
})

store.set('bar')

store.get(0) // => "foo"
store.get()  // => ['foo', 'bar']

store.on('del', function(key, val) {
  console.log(key, val) // => 0 "foo"
})

store.del(0)

store.on('close', function(data) {
  console.log(data) // => ['bar']
})

store.close()
```

[npm-img]: https://img.shields.io/npm/v/obj-store.svg?style=flat-square
[npm-url]: https://npmjs.org/package/obj-store
[license-img]: http://img.shields.io/npm/l/obj-store.svg?style=flat-square
[license-url]: LICENSE
[travis-img]: https://img.shields.io/travis/gummesson/obj-store.svg?style=flat-square
[travis-url]: https://travis-ci.org/gummesson/obj-store
