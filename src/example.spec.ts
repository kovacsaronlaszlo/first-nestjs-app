function addNumbers(...args) {
  return args.reduce((sum, current) => sum + current, 0);
}

describe('addNumbers', () => {
  it('add two numbers', () => {
    expect(addNumbers(2, 2)).toEqual(4);
  });
});

describe('Example test', () => {
  it('equals true', () => {
    expect(true).toEqual(true);
    expect('Aron').toEqual('Aron');
  });
});
