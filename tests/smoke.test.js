const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

test('la aplicación exporta un servidor Express', () => {
  assert.equal(typeof app, 'function');
  assert.equal(typeof app.listen, 'function');
});
