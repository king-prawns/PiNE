import getBranchUrl from './getBranchUrl';

describe('getBranchUrl', () => {
  it('should create a branch url', () => {
    expect(getBranchUrl('http://myip')).toBe('http://myip:5000');
  });
});
