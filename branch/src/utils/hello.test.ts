import hello from './hello';

describe('hello()', () => {
  it('should return `Hello World!`', () => {
    expect(hello()).toBe('Hello world!');
  });
});
