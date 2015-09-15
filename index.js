/**
 * Dependencies
 */

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
  this._list = Array.isArray(obj)
  Evmit.call(this)
}

inherits(Store, Evmit)

/**
 * Set an item.
 *
 * @param {String} key
 * @param {String} [value]
 * @return {Mixed}
 */

Store.prototype.set = function(key, value) {
  if (this._list) {
    value = key
    key = this._data.length
    this._data.push(value)
  } else {
    this._data[key] = value
  }
  this.emit('set', key, value)
  return value
}

/**
 * Get either an item or all items.
 *
 * @param {String} [key]
 * @return {Mixed}
 */

Store.prototype.get = function(key) {
  var args = arguments.length
  var value = args ? this._data[key] : this._data
  if (args) this.emit('get', key, value)
  return value
}

/**
 * Remove an item.
 *
 * @param {Number|String} key
 * @return {Mixed}
 */

Store.prototype.del = function(key) {
  var value = this._data[key]
  if (this._list) {
    this._data.splice(key, 1)
  } else {
    delete this._data[key]
  }
  this.emit('del', key, value)
  return value
}

/**
 * Close `Store`.
 *
 * @return {Array|Object}
 */

Store.prototype.close = function() {
  var value = this._data
  delete this._data
  this.emit('close', value)
  return value
}

/**
 * Exports
 */

module.exports = Store
