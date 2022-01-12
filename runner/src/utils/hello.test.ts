import hello from './hello';

describe('hello', () => {
  it('should return undefined', () => {
    expect(hello()).toBeUndefined();
  });
});
