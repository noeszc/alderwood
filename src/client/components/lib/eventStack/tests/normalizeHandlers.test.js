import normalizeHandlers from '../normalizeHandlers';

describe('normalizeHandlers', () => {
  it('will create an array if it is not passed', () => {
    const handlers = normalizeHandlers('foo');

    expect(handlers).toBeInstanceOf(Array);
    expect(handlers).toContain('foo');
  });

  it('will return the same array', () => {
    const handlers = ['foo', 'bar'];

    expect(normalizeHandlers(handlers)).toEqual(handlers);
  });
});
