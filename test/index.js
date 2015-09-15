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

    store.set('baz', 'qux')
    assert.end()
  })

  t.test('.get([key])', function(assert) {
    var store = new Store({ foo: 'bar', baz: 'qux' })

    store.on('get', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 'foo')
      assert.equal(value, 'bar')
    })

    assert.deepEqual(store.get(), { foo: 'bar', baz: 'qux' })
    assert.deepEqual(store.get('foo'), 'bar')
    assert.end()
  })

  t.test('.del(key)', function(assert) {
    var store = new Store({ foo: 'bar', baz: 'qux' })

    store.on('del', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 'foo')
      assert.equal(value, 'bar')
    })

    store.del('foo')
    assert.equal(store.get('foo'), undefined)
    assert.deepEqual(store.get(), { baz: 'qux' })
    assert.end()
  })

  t.test('.close()', function(assert) {
    var store = new Store({ foo: 'bar' })

    store.on('close', function(value) {
      assert.pass('should emit')
      assert.deepEqual(value, { foo: 'bar' })
    })
    store.close()
    assert.equal(store.get(), undefined)
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

    store.set('bar')
    assert.end()
  })

  t.test('.get([key])', function(assert) {
    var store = new Store(['foo', 'bar'])

    store.on('get', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 0)
      assert.equal(value, 'foo')
    })

    assert.deepEqual(store.get(), ['foo', 'bar'])
    assert.equal(store.get(0), 'foo')
    assert.end()
  })

  t.test('.del(key)', function(assert) {
    var store = new Store(['foo', 'bar'])

    store.on('del', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 0)
      assert.equal(value, 'foo')
    })

    store.del(0)
    assert.equal(store.get(0), 'bar')
    assert.deepEqual(store.get(), ['bar'])
    assert.end()
  })

  t.test('.close()', function(assert) {
    var store = new Store(['foo'])

    store.on('close', function(value) {
      assert.pass('should emit')
      assert.deepEqual(value, ['foo'])
    })

    store.close()
    assert.equal(store.get(), undefined)
    assert.end()
  })
})
