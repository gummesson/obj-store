/**
 * Dependencies
 */

var isArray = Array.isArray
var Evmit = require('evmit')
var inherits = require('minherits')

/**
 * Initialize `Store`.
 *
 * @constructor
 * @param {Array|Object} [obj]
 */

function Store(obj) {
  this._data = obj || {}
  this._type = isArray(obj)
    ? 'array'
    : 'object'
  Evmit.call(this)
}

inherits(Store, Evmit)

/**
 * Set an item.
 *
 * @param {String} key
 * @param {String} [val]
 * @return {this}
 */

Store.prototype.set = function(key, val) {
  if (this._type === 'array') {
    val = key
    key = this._data.length
    this._data.push(val)
  } else {
    this._data[key] = val
  }
  this.emit('set', key, val)
  return this
}

/**
 * Get either an item or all items.
 *
 * @param {String} [key]
 * @return {Mixed}
 */

Store.prototype.get = function(key) {
  var args = arguments.length
  var data = args
    ? this._data[key]
    : this._data
  if (args) this.emit('get', key, data)
  return data
}

/**
 * Remove an item.
 *
 * @param {Number|String} key
 * @return {this}
 */

Store.prototype.del = function(key) {
  var val = this._data[key]
  if (this._type === 'array') {
    this._data.splice(key, 1)
  } else {
    delete this._data[key]
  }
  this.emit('del', key, val)
  return this
}

/**
 * Close `Store`.
 */

Store.prototype.close = function() {
  var data = this._data
  delete this._data
  this.emit('close', data)
}

/**
 * Exports
 */

module.exports = Store
