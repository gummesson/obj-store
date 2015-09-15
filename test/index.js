/**
 * Dependencies
 */

var test = require('tape')
var Store = require('../')

/**
 * Tests
 */

test('Store()', function(assert) {
  var store = new Store()
  assert.ok(store instanceof Store, 'should be an instance')
  assert.deepEqual(store.get(), {})
  assert.end()
})

test('Store(obj)', function(t) {
  t.test('.set(key, value)', function(assert) {
    var store = new Store({ foo: 'bar' })

    store.on('set', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 'baz')
      assert.equal(value, 'qux')
    })

    store.on('set:baz', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'qux')
    })

    var value = store.set('baz', 'qux')

    assert.equal(value, 'qux')
    assert.end()
  })

  t.test('.get(key?)', function(assert) {
    var store = new Store({ foo: 'bar', baz: 'qux' })

    store.on('get', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 'foo')
      assert.equal(value, 'bar')
    })

    store.on('get:foo', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'bar')
    })

    var values = store.get()
    var value = store.get('foo')

    assert.deepEqual(values, { foo: 'bar', baz: 'qux' })
    assert.deepEqual(value, 'bar')
    assert.end()
  })

  t.test('.del(key)', function(assert) {
    var store = new Store({ foo: 'bar', baz: 'qux' })

    store.on('del', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 'foo')
      assert.equal(value, 'bar')
    })

    store.on('del:foo', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'bar')
    })

    var deleted = store.del('foo')
    var values = store.get()
    var value = store.get('foo')

    assert.equal(deleted, 'bar')
    assert.deepEqual(values, { baz: 'qux' })
    assert.equal(value, undefined)
    assert.end()
  })

  t.test('.close()', function(assert) {
    var store = new Store({ foo: 'bar' })

    store.on('close', function(value) {
      assert.pass('should emit')
      assert.deepEqual(value, { foo: 'bar' })
    })

    var closed = store.close()
    var values = store.get()

    assert.deepEqual(closed, { foo: 'bar' })
    assert.equal(values, undefined)
    assert.end()
  })
})

test('Store(arr)', function(t) {
  t.test('.set(value)', function(assert) {
    var store = new Store(['foo'])

    store.on('set', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 1)
      assert.equal(value, 'bar')
    })

    store.on('set:1', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'bar')
    })

    var value = store.set('bar')

    assert.equal(value, 'bar')
    assert.end()
  })

  t.test('.get(key?)', function(assert) {
    var store = new Store(['foo', 'bar'])

    store.on('get', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 0)
      assert.equal(value, 'foo')
    })

    store.on('get:0', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'foo')
    })

    var values = store.get()
    var value = store.get(0)

    assert.deepEqual(values, ['foo', 'bar'])
    assert.equal(value, 'foo')
    assert.end()
  })

  t.test('.del(key)', function(assert) {
    var store = new Store(['foo', 'bar'])

    store.on('del', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 0)
      assert.equal(value, 'foo')
    })

    store.on('del:0', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'foo')
    })

    var deleted = store.del(0)
    var values = store.get()
    var value = store.get(0)

    assert.equal(deleted, 'foo')
    assert.deepEqual(values, ['bar'])
    assert.equal(value, 'bar')
    assert.end()
  })

  t.test('.close()', function(assert) {
    var store = new Store(['foo'])

    store.on('close', function(value) {
      assert.pass('should emit')
      assert.deepEqual(value, ['foo'])
    })

    var closed = store.close()
    var values = store.get()

    assert.deepEqual(closed, ['foo'])
    assert.equal(values, undefined)
    assert.end()
  })
})
