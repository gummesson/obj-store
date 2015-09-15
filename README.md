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

store.on('set', function(key, value) {
  console.log(key, value) // => "baz" "qux"
})

store.on('set:baz', function(value) {
  console.log(value) // => "qux"
})

store.set('baz', 'qux') // => "qux"

store.on('get', function(key, value) {
  console.log(key, value) // => "foo" "bar"
})

store.on('get:foo', function(value) {
  console.log(value) // => "bar"
})

store.get('foo') // => "bar"
store.get()      // => { foo: "bar", baz: "qux" }

store.on('del', function(key, value) {
  console.log(key, value) // => "foo" "bar"
})

store.on('del:foo', function(value) {
  console.log(value) // => "bar"
})

store.del('foo') // => "bar"

store.on('close', function(value) {
  console.log(value) // => { baz: "qux" }
})

store.close() // => { baz: "qux" }
```

### Array

``` javascript
var Store = require('obj-store')

var store = new Store(['foo'])

store.on('set', function(key, value) {
  console.log(key, value) // => 1 "bar"
})

store.on('set:1', function(value) {
  console.log(value) // => "bar"
})

store.set('bar') // => "bar"

store.on('get', function(key, value) {
  console.log(key, value) // => 0 "foo"
})

store.on('get:0', function(value) {
  console.log(value) // => "foo"
})

store.get(0) // => "foo"
store.get()  // => ["foo", "bar"]

store.on('del', function(key, value) {
  console.log(key, value) // => 0 "foo"
})

store.on('del:0', function(value) {
  console.log(value) // => 0 "foo"
})

store.del(0) // => "foo"

store.on('close', function(value) {
  console.log(value) // => ["bar"]
})

store.close() // => ["baz"]
```

[npm-img]: https://img.shields.io/npm/v/obj-store.svg?style=flat-square
[npm-url]: https://npmjs.org/package/obj-store
[license-img]: http://img.shields.io/npm/l/obj-store.svg?style=flat-square
[license-url]: LICENSE
[travis-img]: https://img.shields.io/travis/gummesson/obj-store.svg?style=flat-square
[travis-url]: https://travis-ci.org/gummesson/obj-store
