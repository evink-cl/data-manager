import { mainFunction } from '../src/index.js';
import { expect } from 'chai';

describe('Main Function', function() {
  it('debería ejecutarse sin errores', function() {
    expect(() => mainFunction()).to.not.throw();
  });
});