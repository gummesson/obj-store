/**
 * Dependencies
 */

var test  = require('tape')
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
  var store = new Store({ foo: 'bar' })

  t.test('.set(key, val)', function(assert) {
    store.on('set', function(key, val) {
      assert.pass('should emit')
      assert.equal(key, 'baz')
      assert.equal(val, 'qux')
    })
    store.set('baz', 'qux')
    assert.end()
  })

  t.test('.get([key])', function(assert) {
    assert.deepEqual(store.get(), { foo: 'bar', baz: 'qux' })
    assert.deepEqual(store.get('foo'), 'bar')
    assert.end()
  })

  t.test('.del(key)', function(assert) {
    store.on('del', function(key, val) {
      assert.pass('should emit')
      assert.equal(key, 'foo')
      assert.equal(val, 'bar')
    })
    store.del('foo')
    assert.equal(store.get('foo'), undefined)
    assert.deepEqual(store.get(), { baz: 'qux' })
    assert.end()
  })

  t.test('.close()', function(assert) {
    store.on('close', function(data) {
      assert.pass('should emit')
      assert.deepEqual(data, { baz: 'qux' })
    })
    store.close()
    assert.equal(store.get(), undefined)
    assert.end()
  })

  t.end()
})

test('Store(arr)', function(t) {
  var store = new Store(['foo'])

  t.test('.set(val)', function(assert) {
    store.on('set', function(key, val) {
      assert.pass('should emit')
      assert.equal(key, '1')
      assert.equal(val, 'bar')
    })
    store.set('bar')
    assert.end()
  })

  t.test('.get([key])', function(assert) {
    assert.deepEqual(store.get(), ['foo', 'bar'])
    assert.equal(store.get('0'), 'foo')
    assert.end()
  })

  t.test('.del(key)', function(assert) {
    store.on('del', function(key, val) {
      assert.pass('should emit')
      assert.equal(key, '0')
      assert.equal(val, 'foo')
    })
    store.del('0')
    assert.equal(store.get('0'), 'bar')
    assert.deepEqual(store.get(), ['bar'])
    assert.end()
  })

  t.test('.close()', function(assert) {
    store.on('close', function(data) {
      assert.pass('should emit')
      assert.deepEqual(data, ['bar'])
    })
    store.close()
    assert.equal(store.get(), undefined)
    assert.end()
  })

  t.end()
})
